using ERP.BLL.SystemSetting;
using ERP.Model.SystemSetting;
using ERP.Utility;
using ERP.Web.DTO;
using ERP.Web.Security;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Web.Controllers
{
    public class HomeController : BaseController
    {
        #region 初始化
        private ILog log = LogManager.GetLogger(typeof(HomeController));

        private UserService userService = new UserService();

        #endregion
        public ActionResult Index()
        {
            return View("Main", CurrentUser);
        }

        public ActionResult Login()
        {
            return View();
        
        }
        public ActionResult Logout()
        {
            Session[UserAuthorizeAttribute.AUTHORITY_USER_SESSION_KEY] = null;

            HttpCookie cookie = new HttpCookie(UserAuthorizeAttribute.COOKIE_USER_REMEBER_KEY);
            if (cookie != null)
            {
                cookie.Expires = DateTime.Now.AddDays(-1);
                Response.Cookies.Add(cookie);
            }

            return RedirectToAction("Login");
        }

        [HttpPost]
        public ActionResult Login(User user)
        {
            User loginedUser;
            try
            {
                loginedUser = userService.Login(user.Username, user.Password);
            }
            catch (BizException e)
            {
                ModelState.AddModelError("", e.ToString());
                return View();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("", "系统错误");
                log.Error("登录错误", e);
                return View();
            }

            if (user.RemeberMe)
            {
                HttpCookie cookie = new HttpCookie(UserAuthorizeAttribute.COOKIE_USER_REMEBER_KEY);
                cookie.Expires = DateTime.Now.AddDays(7);
                cookie[UserAuthorizeAttribute.COOKIE_USER_IDENTITY_KEY] = EncryptUtility.AESEncrypt(user.ID.ToString(), UserAuthorizeAttribute.COOKIE_SECURITY_ENCRYPT);
                Response.Cookies.Add(cookie);
            }
            
            AuthorizedUser author = new AuthorizedUser(loginedUser);
            author.Rights = userService.GetUserRights(loginedUser.ID);
            Session[UserAuthorizeAttribute.AUTHORITY_USER_SESSION_KEY] = author;

            return RedirectToAction("Index", "Home");

        }


        public JsonResult GetUserTopMenuRights()
        {
            return SingleReturn(() =>
            {
                IList<Rights> rightsList = userService.GetUserTopMenuRights(CurrentUser.ID);
                var result = (from u in rightsList
                           select new
                           {
                               id = u.Rights_ID,
                               title = u.Rights_Name
                           }).ToList();
                return result;

            });
        }


        public JsonResult GetMenuTree(int topMenuId)
        {
            return SingleReturn(() =>
            {
                IList<Menu> listMenu = userService.GetMenuTree(CurrentUser.ID, topMenuId);
                if (listMenu == null)
                    return null;
                var res = from menu in listMenu
                          select new
                          {
                              id = menu.RIGHTS_ID,
                              text = menu.RIGHTS_NAME,
                              leaf = true,
                              controllername = menu.CONTROLLER_NAME,
                              viewname = menu.VIEW_NAME,
                              panelname = menu.PANEL_NAME
                          };
                return res;
            });
        }

    }
}