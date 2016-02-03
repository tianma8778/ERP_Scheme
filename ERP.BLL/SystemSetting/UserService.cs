
using ERP.DAL.SystemSetting;
using ERP.Model;
using ERP.Model.SystemSetting;
using ERP.Utility;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ERP.BLL.SystemSetting
{
    public class UserService
    {
        #region 初始化
        private ILog log = LogManager.GetLogger(typeof(UserDao));

        private UserDao userDao = new UserDao();
        #endregion

        public User Login(string Username, string Password)
        {

            if (string.IsNullOrEmpty(Username) || string.IsNullOrEmpty(Password))
            {
                throw new BizException("用户名和密码不能为空");
            }

            User sysUser = userDao.GetUserByUsernameAndPassword(Username, Password);


            if (sysUser == null)
            {
                throw new BizException("用户名或密码错误");
            }

            if (sysUser.Is_Enable != 1)
            {
                throw new BizException("用户已被锁定");
            }

            userDao.UpdateUserLogonDate(sysUser.ID);

            userDao.TestUpdate(sysUser.ID);

            return sysUser;
        }


        public IList<decimal> GetUserRights(decimal UserId)
        {
            return userDao.GetUserRights(UserId);
        }

        public User GetUser(decimal id)
        {
            User user = userDao.GetUser(id);
            if (user != null) user.Password = "******";
            return user;
        }

        public IList<Rights> GetUserTopMenuRights(decimal p)
        {
            return userDao.GetUserTopMenuRights(p);
        }

        public IList<Menu> GetMenuTree(decimal p, int topMenuId)
        {
            return userDao.GetMenuTree(p, topMenuId);
        }

        public PageResult GetUserList(string usercode, string username, string comname, string departmentname, string phonenumber, string isenable, int page, int start, int limit)
        {
            return userDao.GetUserList(usercode, username, comname, departmentname, phonenumber, isenable, page, start, limit);
        }

        public void AddUser(User user)
        {
            userDao.AddUser(user);
        }

        public void EditUser(User user)
        {
            userDao.EditUser(user);
        }
    }
}