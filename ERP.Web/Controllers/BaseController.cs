using ERP.Model;
using ERP.Utility;
using ERP.Web.DTO;
using ERP.Web.Security;
using JJY.ILS.WebApp;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;


namespace ERP.Web.Controllers
{
    [UserAuthorize]
    public class BaseController : Controller
    {
       
        public AuthorizedUser CurrentUser
        {
            get
            {
                AuthorizedUser user = Session[UserAuthorizeAttribute.AUTHORITY_USER_SESSION_KEY] as AuthorizedUser;
                return user;
            }
        }

        public JsonResult SingleReturn(Func<object> func)
        {
            SingleReturnObject result;
            
            try
            {
                result = SingleReturnObject.BuildSuccess(func());
            }
            catch (BizException ex)
            {
                result = SingleReturnObject.BuildBizError(ex.Message);
            }
            catch (Exception ex)
            {
                ILog log=log4net.LogManager.GetLogger(typeof(BaseController));
                log.Error(ex);

                result = SingleReturnObject.BuildError("系统错误", ex.Message);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ExtGridReturn(Func<PageResult> func, string dateFormatString="yyyy-MM-dd hh:mm:ss")
        {
            ExtGridReturnObject result;

            try
            {
                result = ExtGridReturnObject.BuildSuccess(func());
            }
            catch (BizException ex)
            {
                result = ExtGridReturnObject.BuildBizError(ex.Message);
            }
            catch (Exception ex)
            {
                ILog log = log4net.LogManager.GetLogger(typeof(BaseController));
                log.Error(ex);

                result = ExtGridReturnObject.BuildError("系统错误");
            }

           JsonResult jsonResult= new DataFormatJsonResult() { Data = result, JsonRequestBehavior = JsonRequestBehavior.AllowGet, FormatString = dateFormatString };

           return jsonResult;
        }



    }
}