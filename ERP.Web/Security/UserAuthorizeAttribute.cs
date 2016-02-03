
using ERP.BLL.SystemSetting;
using ERP.Model.SystemSetting;
using ERP.Utility;
using ERP.Web.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Web.DTO;

namespace ERP.Web.Security
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    public class UserAuthorizeAttribute : AuthorizeAttribute
    {

        public const string AUTHORITY_USER_SESSION_KEY = "AUTHORITY_USER";

        public const string COOKIE_USER_REMEBER_KEY = "USER_REMEBER";
        public const string COOKIE_USER_IDENTITY_KEY = "USER_IDENTITY";

        public const string COOKIE_SECURITY_ENCRYPT = "CRYPT_!@$!TG#G";

        public string ControllerName { get; set; }

        public string ActionName { get; set; }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {

            if (filterContext == null)
                throw new ArgumentNullException("filterContext");


            ////获得url请求里的controller和action：
            ControllerName = filterContext.RouteData.Values["controller"].ToString().ToLower();
            ActionName = filterContext.RouteData.Values["action"].ToString().ToLower();

            base.OnAuthorization(filterContext);
        }
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {

            //验证SESSION
            if (httpContext.Request.RawUrl.Contains("/Home/Login"))
                return true;
            //if (httpContext.Request.RawUrl.Contains("/File/Upload"))
            //    return true;
            //HttpCookie IdenUser = httpContext.Request.Cookies.Get("JJY_REMEBER_USER");
            //string ident = IdenUser["USER_IDENTIY"];

            if (httpContext.Session[AUTHORITY_USER_SESSION_KEY] == null)
            {
                HttpCookie IdenUser = httpContext.Request.Cookies.Get(COOKIE_USER_REMEBER_KEY);
                if (IdenUser != null)
                {
                    string ident = IdenUser[COOKIE_USER_IDENTITY_KEY];

                    UserService userService = new UserService();
                    User user = userService.GetUser(Convert.ToInt32(EncryptUtility.AESDecrypt(ident, COOKIE_SECURITY_ENCRYPT)));

                    AuthorizedUser authorizedUser = new AuthorizedUser(user);

                    authorizedUser.Rights = userService.GetUserRights(authorizedUser.ID);
                    httpContext.Session["Authority"] = authorizedUser;
                }
                else
                {
                    return false;
                }
                //return false;
            }

            string UserName = httpContext.User.Identity.Name;    //当前登录用户的用户名

            //查询当前用户是否拥有权限
            if (UserName.ToLower().Trim() == "admin")
                return true;

            return true;
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            if (!filterContext.HttpContext.Request.IsAjaxRequest())
                filterContext.Result = new HttpUnauthorizedResult();

            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                JsonResult result=new JsonResult();
                result.Data=new SingleReturnObject(false,ReturnObject.CODE_SESSION_TIMEOUT,null,null);

                filterContext.Result = result;
            }
            else
            {
                filterContext.HttpContext.Response.Write("<script>window.top.location.href='/Home/Login'</script>");
                filterContext.Result = new EmptyResult();
            }
            //filterContext.Result = new RedirectResult(@"~\login");
            //如果是未认证的用户 则跳转到web.config 中 <authentication mode="Forms" /> 节点里配置的登陆页【loginUrl】
            //filterContext.HttpContext.Response.Write("<script>window.top.location.href='" + FormsAuthentication.LoginUrl + "'</script>");
            //filterContext.Result = new EmptyResult();

        }
    }
}