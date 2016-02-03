using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERP.Utility.Extension;

namespace ERP.Utility.Helper
{
    public class ConfigHelper
    {
        public static string ServiceFilePath
        {
            get
            {
                return GetAppConfig("ServiceFilePath");
            }
        }

        //依据连接串名字connectionName返回数据连接字符串  
        public static string GetConnectionStringsConfig(string connectionName)
        {
            string connectionString =
                ConfigurationManager.ConnectionStrings[connectionName].ConnectionString;
            return connectionString;
        }

        ///<summary> 
        ///返回*.exe.config文件中appSettings配置节的value项  
        ///</summary> 
        ///<param name="strKey"></param> 
        ///<returns></returns> 
        public static string GetAppConfig(string strKey)
        {
            foreach (string key in ConfigurationManager.AppSettings.AllKeys)
            {
                if (key == strKey)
                {
                    return ConfigurationManager.AppSettings[strKey];
                }
            }
            return null;
        }

    }
}
