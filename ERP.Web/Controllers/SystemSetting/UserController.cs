using ERP.BLL.SystemSetting;
using ERP.Model;
using ERP.Model.SystemSetting;
using ERP.Utility;
using ERP.Web.Controllers;
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
    public class UserController : BaseController
    {
        #region 初始化
        private ILog log = LogManager.GetLogger(typeof(UserController));

        private UserService userService = new UserService();

        #endregion


        public JsonResult GetUserList(string usercode, string username, string comname, string departmentname, string phonenumber, string isenable, int page, int start, int limit)
        {
            return ExtGridReturn(() =>
            {
                PageResult pageResult = userService.GetUserList(usercode, username, comname, departmentname, phonenumber, isenable, page, start, limit);
                //throw new BizException("测试业务异常");
                //throw new Exception("系统异常");
                return pageResult;

            });
        }

        public JsonResult AddUser(User user)
        {
            return SingleReturn(() =>
            {
                user.Create_User = CurrentUser.ID;
                userService.AddUser(user);
                return null;
            });
        }

        public JsonResult EditUser(User user)
        {
            return SingleReturn(() =>
            {
                user.Update_User = CurrentUser.ID;
                userService.EditUser(user);
                return null;
            });
        }

    }
}