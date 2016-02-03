//using Oracle.DataAccess.Client;
//using System;
//using System.Collections;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Data;
//using System.Globalization;
//using System.Reflection;

//namespace ERP.Utility
//{
//   public  class DbHelperOracle
//    {
//       //数据库连接字符串(web.config来配置)，可以动态更改connectionString支持多数据库.		

//        public static string Connection = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
//        private DbHelperOracle()
//        {
//        }
//        #region 公用方法

//        /// <summary>
//        /// 执行查询操作[适用于读取一行数据]
//        /// </summary>
//        /// <param name="commandText">命令文本</param>
//        /// <param name="commandType">命令类型</param>
//        /// <param name="pars">参数数组</param>
//        /// <returns>读取器</returns>
//        public static OracleDataReader GetReader(string commandText, CommandType commandType, OracleParameter[] pars)
//        {
//            OracleConnection connection = new OracleConnection(Connection);
//            using (OracleCommand cmd = new OracleCommand())
//            {
//                cmd.Connection = connection;
//                cmd.CommandText = commandText;
//                cmd.CommandType = commandType;
//                if (pars != null)
//                {
//                    cmd.Parameters.AddRange(pars);
//                }
//                try
//                {
//                    connection.Open();
//                    return cmd.ExecuteReader();
//                }
//                catch (System.Data.OracleClient.OracleException ex)
//                {
//                    throw new Exception(ex.Message);
//                }
//                finally
//                {
//                    connection.Close();
//                }
//            }
//        }
//        /// <summary>
//        /// 查询多条数据
//        /// </summary>
//        /// <param name="commandText">命令文本</param>
//        /// <param name="commandType">命令类型</param>
//        /// <param name="pars">参数数组</param>
//        /// <returns>返回DataTable</returns>
//        public static DataSet GetDataSet(string commandText, CommandType commandType, OracleParameter[] pars)
//        {
//            DataSet ds = new DataSet();
//            OracleConnection connection = new OracleConnection(Connection);
//            OracleCommand cmd = new OracleCommand();
//            cmd.Connection = connection;
//            cmd.CommandText = commandText;
//            cmd.CommandType = commandType;
//            if (pars != null)
//            {
//                cmd.Parameters.AddRange(pars);
//            }
//            try
//            {
//                connection.Open();
//                OracleDataAdapter da = new OracleDataAdapter(cmd);
//                da.Fill(ds);
//                return ds;
//            }
//            catch (System.Data.OracleClient.OracleException ex)
//            {
//                 throw new Exception(ex.Message);
//            }
//            finally
//            {
//                connection.Close();
//            }

//        }

//        public static T GetEntity<T>(string commandText, CommandType commandType,params OracleParameter[] pars)
//        {
//            DataSet ds = GetDataSet(commandText, commandType, pars);
//            if (ds == null || ds.Tables.Count < 0)
//                return default(T);

//            if (ds.Tables[0].Rows.Count <= 0)
//                return default(T);
//            DataRow p_Data = ds.Tables[0].Rows[0];
//            // 返回值初始化
//            T t = (T)Activator.CreateInstance(typeof(T));
//            PropertyInfo[] propertys = t.GetType().GetProperties();
//            foreach                                                                                                                                                                                                                                                                                                                                                                         (PropertyInfo pi in propertys)
//            {
//                if (ds.Tables[0].Columns.IndexOf(pi.Name.ToUpper()) != -1 && p_Data[pi.Name.ToUpper()] != DBNull.Value)
//                {
//                    pi.SetValue(t, p_Data[pi.Name.ToUpper()], null);
//                }
//                else
//                {
//                    pi.SetValue(t, null, null);
//                }
//            }
//            return t;
//        }

//        public static IList<T> GetEntityList<T>(string commandText,params OracleParameter[] par)
//        {
//            return GetEntityList<T>(commandText, CommandType.Text, par);
//        }

//        /// <summary>
//        /// DataSet转换为实体列表
//        /// </summary>
//        /// <typeparam name="T">实体类</typeparam>
//        /// <param name="ds">DataSet</param>
//        /// <param name="p_TableIndex">待转换数据表索引</param>
//        /// <returns>实体类列表</returns>
//        public static IList<T> GetEntityList<T>(string commandText, CommandType commandType = CommandType.Text,params OracleParameter[] pars)
//        {
//            DataSet ds = GetDataSet(commandText, commandType, pars);
//            if (ds == null || ds.Tables.Count < 0)
//                return default(IList<T>);
//            if (ds.Tables[0].Rows.Count <= 0)
//                return default(IList<T>);
//            DataTable p_Data = ds.Tables[0];
//            // 返回值初始化
//            IList<T> result = new List<T>();
//            for (int j = 0; j < p_Data.Rows.Count; j++)
//            {
//                T t = (T)Activator.CreateInstance(typeof(T));
//                PropertyInfo[] propertys = t.GetType().GetProperties();
//                foreach (PropertyInfo pi in propertys)
//                {
//                    if (p_Data.Columns.IndexOf(pi.Name.ToUpper()) != -1 && p_Data.Rows[j][pi.Name.ToUpper()] != DBNull.Value)
//                    {
//                        Type type = Type.GetType(pi.PropertyType.FullName);
//                        object objct = p_Data.Rows[j][pi.Name.ToUpper()];
//                        if (objct.GetType() != type)
//                        {
//                            switch (pi.PropertyType.FullName)
//                            {
//                                case "System.Double":
//                                    string str = objct.GetType().ToString();
//                                    objct = Convert.ToDouble(objct);
//                                    break;
//                                case "System.Decimal":
//                                    string str2 = objct.GetType().ToString();
//                                    objct = Convert.ToDecimal(objct);
//                                    break;
//                                default:
//                                    break;
//                            }
//                        }
//                        pi.SetValue(t, objct, null);
//                    }
//                    else if(pi.CanWrite)
//                    {
//                        pi.SetValue(t, null, null);
//                    }
//                }
//                result.Add(t);
//            }
//            return result;
//        }

//        public static int ExecuteCommand(string commandText, CommandType commandType, List<OracleParameter> pars)
//        {
//            return ExecuteCommand(commandText, commandType, pars.ToArray());
//        }
//        /// <summary>
//        /// 执行添加、修改、删除操作。
//        /// </summary>
//        /// <param name="commandText">命令文本</param>
//        /// <param name="commandType">命令类型</param>
//        /// <param name="pars">参数数组</param>
//        /// <returns>命令影响的行数</returns>
//        public static int ExecuteCommand(string commandText, CommandType commandType,OracleParameter[] pars)
//        {
//            OracleConnection connection = new OracleConnection(Connection);
//            OracleCommand cmd = new OracleCommand();
//            cmd.Connection = connection;
//            cmd.CommandText = commandText;
//            cmd.CommandType = commandType;
//            if (pars != null)
//            {
//                cmd.Parameters.AddRange(pars);
//            }
//            try
//            {
//                connection.Open();
//                return cmd.ExecuteNonQuery();
//            }
//            catch (System.Data.OracleClient.OracleException ex)
//            {
//                throw new Exception(ex.Message);
//            }
//            finally
//            {
//                connection.Close();
//            }
//        }

//        public static DataSet Query(string SQLString)
//        {
//            using (OracleConnection connection = new OracleConnection(Connection))
//            {
//                DataSet ds = new DataSet();
//                try
//                {
//                    connection.Open();
//                    OracleDataAdapter command = new OracleDataAdapter(SQLString, connection);
//                    command.Fill(ds, "ds");
//                }
//                catch (System.Data.OracleClient.OracleException ex)
//                {
//                    throw new Exception(ex.Message);
//                }
//                finally
//                {
//                    connection.Close();
//                }
//                return ds;
//            }
//        }

//        public static int ExecuteSql(string SQLString)
//        {

//            using (OracleConnection connection = new OracleConnection(Connection))
//            {
//                using (OracleCommand cmd = new OracleCommand(SQLString, connection))
//                {
//                    try
//                    {
//                        connection.Open();
//                        int rows = cmd.ExecuteNonQuery();
//                        return rows;
//                    }
//                    catch (System.Data.OracleClient.OracleException E)
//                    {
//                        connection.Close();
//                        throw new Exception(E.Message);
//                    }
//                    finally
//                    {
//                        cmd.Dispose();
//                        connection.Close();
//                    }
//                }
//            }
//        }


//        public static string ExecuteSqlReturnObject(string commandText, CommandType commandType, List<OracleParameter> pars)
//        {
//            return ExecuteSqlReturnObject(commandText, commandType, pars.ToArray());
//        }

//        /// <summary>
//        /// 返回结果集中的第一行第一列
//        /// </summary>
//        /// <param name="SQLString">sql语句</param>
//        /// <param name="commandType">默认 Text</param>
//        /// <param name="pars"> 默认 null</param>
//        /// <returns>返回第一行第一列的数据类型</returns>
//        public static string ExecuteSqlReturnObject(string SQLString, CommandType commandType = CommandType.Text, OracleParameter[] pars = null)
//        {
//            using (OracleConnection connection = new OracleConnection(Connection))
//            {
//                using (OracleCommand cmd = new OracleCommand())
//                {
//                    cmd.Connection = connection;
//                    cmd.CommandText = SQLString;
//                    cmd.CommandType = commandType;
//                    if (pars != null)
//                    {
//                        cmd.Parameters.AddRange(pars);
//                    }
//                    try
//                    {
//                        connection.Open();
//                        OracleDataAdapter da = new OracleDataAdapter("", connection) { SelectCommand = cmd };
//                        using (DataSet ds = new DataSet())
//                        {
//                            da.Fill(ds, "A");
//                            if (ds.Tables["A"].Rows.Count != 0)
//                            {
//                                if (ds.Tables["A"].Rows[0][0] == null)
//                                    return "";
//                                else
//                                {
//                                    string Result=  ds.Tables["A"].Rows[0][0].ToString();
//                                    return Result;
//                                }
//                            }
//                            else
//                                return "";
//                        }
//                        //return cmd.ExecuteScalar();
//                    }
//                    catch (System.Data.OracleClient.OracleException E)
//                    {
//                        connection.Close();
//                        throw new Exception(E.Message);
//                    }
//                    finally
//                    {
//                        cmd.Dispose();
//                        connection.Close();
//                    }
//                }
//            }
//        }

//        //事务处理 ORACLE
//        public static string ExecuteSqlTran(ArrayList SQLStringList)
//        {
//            string message = "yes";
//            using (OracleConnection connection = new OracleConnection(Connection))
//            {
//                OracleCommand cmd = new OracleCommand();
//                cmd.Connection = connection;
//                connection.Open();
//                OracleTransaction tx = connection.BeginTransaction();
//                cmd.Transaction = tx;
//                try
//                {

//                    for (int n = 0; n < SQLStringList.Count; n++)
//                    {
//                        string strsql = SQLStringList[n].ToString();
//                        if (strsql.Trim().Length > 1)
//                        {
//                            cmd.CommandText = strsql;
//                            int i = cmd.ExecuteNonQuery();
//                            CompareInfo Compare = CultureInfo.InvariantCulture.CompareInfo;
//                            if (Compare.IndexOf(strsql, "DELETE", CompareOptions.IgnoreCase) < 0)
//                            {
//                                if (i < 0)
//                                {
//                                    message = "sql执行失败！";
//                                }
//                            }
//                        }
//                    }
//                    tx.Commit();
//                }
//                catch (System.Data.OracleClient.OracleException E)
//                {
//                    tx.Rollback();
//                    message= E.Message;
//                }
//                finally
//                {
//                    cmd.Dispose();
//                    connection.Close();
//                }
//                return message;
//            }
//        }

//        public static object GetScalar(string commandText, CommandType commandType, List<OracleParameter> pars)
//        {
//            return GetScalar(commandText, commandType, pars.ToArray());
//        }

//        /// <summary>
//        /// 执行聚合函数,返回第一行第一列的值。
//        /// </summary>
//        /// <param name="commandText">命令文本</param>
//        /// <param name="commandType">命令类型</param>
//        /// <param name="pars">参数数组</param>
//        /// <returns>聚合值</returns>
//        public static object GetScalar(string commandText, CommandType commandType,params OracleParameter[] pars)
//        {
//            OracleConnection connection = new OracleConnection(Connection);
//            OracleCommand cmd = new OracleCommand();
//            cmd.Connection = connection;
//            cmd.CommandText = commandText;
//            cmd.CommandType = commandType;

//            if (pars != null)
//            {
//                cmd.Parameters.AddRange(pars);
//            }
//            try
//            {
//                connection.Open();
//                return cmd.ExecuteScalar();
//            }
//            finally
//            {
//                connection.Close();
//            }
//        }


//        //public static bool ExecuteSqlTran(object[,] ob)
//        //{
//        //    bool flag = true;
//        //    using (OracleConnection connection = new OracleConnection(Connection))
//        //    {
//        //        OracleCommand cmd = new OracleCommand();
//        //        cmd.Connection = connection;
//        //        connection.Open();
//        //        OracleTransaction tx = connection.BeginTransaction();
//        //        cmd.Transaction = tx;
//        //        try
//        //        {

//        //            for (int n = 0; n < ob.GetLength(0); n++)
//        //            {
//        //                string strsql = Convert.ToString(ob[n, 0]);
//        //                OracleParameter[] pars = (OracleParameter[])ob[n, 1];
//        //                if (strsql.Trim().Length > 1)
//        //                {
//        //                    cmd.CommandText = strsql;

//        //                    if (pars != null)
//        //                    {
//        //                        cmd.Parameters.AddRange(pars);
//        //                    }
//        //                    int i = cmd.ExecuteNonQuery();
//        //                    if (i < 0)
//        //                    {
//        //                        flag = false;
//        //                    }
//        //                    cmd.Parameters.Clear();
//        //                }
//        //            }
//        //            tx.Commit();
//        //        }
//        //        catch (System.Data.OracleClient.OracleException E)
//        //        {
//        //            flag = false;
//        //            tx.Rollback();
//        //            throw new Exception(E.Message);
//        //        }
//        //        finally
//        //        {
//        //            cmd.Dispose();
//        //            connection.Close();
//        //        }
//        //        return flag;
//        //    }
//        //}

//        public static string ExecuteSqlTran_paras(ArrayList arr)
//        {
//            string message = "yes";
//            using (OracleConnection connection = new OracleConnection(Connection))
//            {
//                OracleCommand cmd = new OracleCommand();
//                cmd.Connection = connection;
//                connection.Open();
//                OracleTransaction tx = connection.BeginTransaction();
//                cmd.Transaction = tx;
//                try
//                {
//                    object[] sql_par = new object[2];
//                    for (int n = 0; n < arr.Count; n++)
//                    {
//                        sql_par = (object[])arr[n];
//                        string strsql = sql_par[0].ToString();
//                        OracleParameter[] pars = (OracleParameter[])sql_par[1];
//                        if (strsql.Trim().Length > 1)
//                        {
//                            cmd.CommandText = strsql;
//                            if (pars != null)
//                            {
//                                cmd.Parameters.AddRange(pars);
//                            }
//                            int i = cmd.ExecuteNonQuery();
//                            if (i < 0)
//                            {
//                                message = "sql执行失败！";
//                            }
//                            cmd.Parameters.Clear();
//                        }
//                    }
//                    tx.Commit();
//                }
//                catch (System.Data.OracleClient.OracleException E)
//                {
//                    tx.Rollback();
//                    message = E.Message;
//                }
//                finally
//                {
//                    cmd.Dispose();
//                    connection.Close();
//                    cmd.Parameters.Clear();
//                }
//                return message;
//            }
//        }



//        #endregion
//    }
//}
