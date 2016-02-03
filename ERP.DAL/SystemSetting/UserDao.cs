
using ERP.Model;
using ERP.Model.SystemSetting;
using ERP.Utility;
using log4net;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.OracleClient;
using System.Linq;
using System.Web;

namespace ERP.DAL.SystemSetting
{
    public class UserDao
    {
        #region 初始化
        private ILog log = LogManager.GetLogger(typeof(UserDao));
        #endregion

        public User GetUserByUsernameAndPassword(string Username, string Password)
        {
            string Sql = @"SELECT * FROM SYS_USER U WHERE U.USERNAME=:USERNAME AND U.PASSWORD=:PASSWORD";
            User result = DbHelperOra.GetEntity<User>(Sql, CommandType.Text, new OracleParameter[]{
                   new OracleParameter("USERNAME",Username),
                   new OracleParameter("PASSWORD",Password),
            });
            return result;
        }


        public int UpdateUserLogonDate(decimal UserID)
        {
            return DbHelperOra.ExecuteCommand("UPDATE SYS_USER SET LAST_LOGON_DATE=SYSDATE WHERE ID=:ID", CommandType.Text, new OracleParameter[]{
                new OracleParameter("ID",UserID)});
        }

        public int TestUpdate(decimal UserID)
        {
            return DbHelperOra.ExecuteCommand("UPDATE SYS_USER SET UPDATE_TIME=SYSDATE WHERE ID=:ID", CommandType.Text, new OracleParameter[]{
                new OracleParameter("ID",UserID)});
        }

        public IList<User> GetAllUser()
        {
            return DbHelperOra.GetEntityList<User>("SELECT * FROM SYS_USERS U");
        }

        public int DeleteUser(decimal UserID)
        {
            return DbHelperOra.ExecuteCommand("DELETE SYS_USERS WHERE ID=:ID", CommandType.Text, new OracleParameter[]{
                new OracleParameter("ID",UserID)});
        }

        //public int UpdateUser(User user)
        //{
        //    return DbHelperOra.ExecuteCommand("INSERT", CommandType.Text, new OracleParameter[]{
        //        new OracleParameter("ID",UserID)});
        //}

        public User GetUser(decimal id)
        {
            return DbHelperOra.GetEntity<User>("SELECT * FROM SYS_USER U WHERE U.ID=:ID", CommandType.Text, new OracleParameter[]{
                new OracleParameter("ID",id)
            });
        }

        public IList<decimal> GetUserRights(decimal UserId)
        {
            return DbHelperOra.GetEntityList<decimal>(
           @"SELECT RS.RIGHTS_ID FROM SYS_RIGHTS RS,SYS_ROLE_RIGHTS RR,SYS_ROLE R,SYS_USER_ROLE UR
                WHERE RS.ID=RR.RIGHTS_ID AND RR.ROLE_ID=R.ID
                AND R.ID=UR.ROLE_ID
                AND UR.USER_ID=:ID",
           CommandType.Text, new OracleParameter[]{
                new OracleParameter("ID",UserId)
            });



        }

        public IList<Rights> GetUserTopMenuRights(decimal UserId)
        {
            string sql = @"
                    SELECT DISTINCT RI.*  
                    FROM SYS_RIGHTS RI
                      INNER JOIN SYS_ROLE_RIGHTS RR ON RI.ID = RR.RIGHTS_ID
                      INNER JOIN SYS_USER_ROLE UR ON UR.ROLE_ID=RR.ROLE_ID
                    WHERE UPPER(RIGHTS_TYPE) = 'HTML'  AND RIGHTS_PARENT_ID = 0 AND UR.USER_ID=:USER_ID
                    ORDER BY RI.RIGHTS_ID";

            //IList<Rights> res = DbHelperOra.GetEntityList<Rights>(sql);

            IList<Rights> res = DbHelperOra.GetEntityList<Rights>(sql, CommandType.Text, new OracleParameter[] { 
                new OracleParameter("USER_ID",UserId)
            });
            return res;
        }


        public IList<Menu> GetMenuTree(decimal userId, int topMenuId)
        {
            string sql = @"
                    SELECT R.RIGHTS_ID, R.RIGHTS_NAME,M.CONTROLLER_NAME,M.VIEW_NAME,M.PANEL_NAME 
                    FROM  SYS_USER_ROLE UR,SYS_ROLE_RIGHTS RR,SYS_RIGHTS R, SYS_MENU M 
                    WHERE UR.ROLE_ID=RR.ROLE_ID
                        AND RR.RIGHTS_ID=R.ID
                        AND R.ID = M.RIGHTS_ID 
                        AND R.RIGHTS_PARENT_ID =:TOP_MENU_ID
                        AND UR.USER_ID=:USER_ID";

            IList<Menu> res = DbHelperOra.GetEntityList<Menu>(sql, CommandType.Text, new OracleParameter[] { 
                new OracleParameter("TOP_MENU_ID",topMenuId),
                new OracleParameter("USER_ID",userId)
            });
            return res;

        }

        public PageResult GetUserList(string usercode, string username, string comname, string departmentname, string phonenumber, string isenable, int page, int start, int limit)
        {
            string querySql = @"SELECT u.*
                    ,(SELECT U1.USERNAME FROM SYS_USER U1 WHERE U1.ID=U.CREATE_USER) AS CREATE_USER_TEXT 
                    ,(SELECT U2.USERNAME FROM SYS_USER U2 WHERE U2.ID=U.UPDATE_USER) AS UPDATE_USER_TEXT
                    FROM SYS_USER U";
            string countSql = @"SELECT COUNT(1) FROM SYS_USER";
            IList<User> resultList = DbHelperOra.GetEntityList<User>(querySql);
            decimal resultCount = (decimal)DbHelperOra.GetScalar(countSql, CommandType.Text, new OracleParameter[] { });

            return new PageResult(resultList, resultCount, page, start, limit);
        }

        public void AddUser(User user)
        {
            string sql = @"
            INSERT INTO SYS_USER
                (ID, USERNAME, IS_ENABLE, PASSWORD, PHONE_NUMBER, CREATE_TIME, CREATE_USER )
            VALUES
                (SEQ_MASTER.NEXTVAL, :USERNAME, :IS_ENABLE, :PASSWORD, :PHONE_NUMBER, SYSDATE, :CREATE_USER)";
            DbHelperOra.ExecuteCommand(sql, CommandType.Text, new OracleParameter[] { 
                new OracleParameter("USERNAME",user.Username),
                new OracleParameter("IS_ENABLE",user.Is_Enable),
                new OracleParameter("PASSWORD",user.Password),
                new OracleParameter("PHONE_NUMBER",string.IsNullOrEmpty(user.Phone_Number)?DBNull.Value:(object)user.Phone_Number),
                new OracleParameter("CREATE_USER",user.Create_User),
            });

        }

        public void EditUser(User user)
        {
            string sql;
            List<OracleParameter> pars = new List<OracleParameter>();

            pars.Add(new OracleParameter("IS_ENABLE", user.Is_Enable));
            pars.Add(new OracleParameter("PHONE_NUMBER", string.IsNullOrEmpty(user.Phone_Number) ? DBNull.Value : (object)user.Phone_Number));
            pars.Add(new OracleParameter("UPDATE_USER", user.Update_User));
            pars.Add(new OracleParameter("ID", user.ID));

            if (string.IsNullOrWhiteSpace(user.Password))
            {
                sql = @"UPDATE SYS_USER SET 
                            IS_ENABLE   = :IS_ENABLE ,   PHONE_NUMBER = :PHONE_NUMBER ,
                            UPDATE_TIME = SYSDATE , UPDATE_USER  = :UPDATE_USER
                        WHERE ID = :ID";
            }
            else
            {
                sql = @"UPDATE SYS_USER SET 
                            IS_ENABLE   = :IS_ENABLE ,  PASSWORD    = :PASSWORD , PHONE_NUMBER = :PHONE_NUMBER ,
                            UPDATE_TIME = SYSDATE ,UPDATE_USER = :UPDATE_USER
                        WHERE ID = :ID";
                pars.Add(new OracleParameter("PASSWORD", user.Password));
            }

            DbHelperOra.ExecuteCommand(sql, CommandType.Text, pars.ToArray());
        }

    }
}