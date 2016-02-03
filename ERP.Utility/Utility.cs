using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;

namespace ERP.Utility
{
    public static class Utility
    {
        static JavaScriptSerializer Serializer = new JavaScriptSerializer();

        /// <summary>
        /// 判断是否是Web应用程序
        /// </summary>
        /// <returns></returns>
        public static bool IsWebApplicaiton()
        {
            if (HttpContext.Current == null)
                return false;
            return true;
        }

        #region 获取IP、URL等信息
        /// <summary>
        /// 获取IP地址
        /// </summary>
        /// <returns></returns>
        public static string GetIPAddress()
        {
            string ipAddress = string.Empty;
            try
            {
                if (!string.IsNullOrEmpty(System.Web.HttpContext.Current.Request.ServerVariables["HTTP_VIA"]))
                    ipAddress = Convert.ToString(System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"]);
                if (string.IsNullOrEmpty(ipAddress))
                    ipAddress = Convert.ToString(HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"]);
                return ipAddress;
            }
            catch { }

            try
            {
                System.Net.IPHostEntry HostEntry = System.Net.Dns.GetHostEntry(System.Net.Dns.GetHostName());
                if (HostEntry.AddressList.Length > 0)
                    ipAddress = HostEntry.AddressList[0].ToString();
                return ipAddress;
            }
            catch { }

            return ipAddress;
        }

        /// <summary>
        /// 获取当前URL
        /// </summary>
        /// <returns></returns>
        public static string GetPageUrl()
        {
            if (IsWebApplicaiton())
                return HttpContext.Current.Request.RawUrl;

            return string.Empty;
        }

        /// <summary>
        /// 获取上一次请求的URL
        /// </summary>
        /// <returns></returns>
        public static string GetReferrerUrl()
        {
            if (IsWebApplicaiton())
                return HttpContext.Current.Request.UrlReferrer == null ? string.Empty : HttpContext.Current.Request.UrlReferrer.ToString();

            return string.Empty;
        }

        #endregion 获取IP、URL等信息

        #region 加密解密

        /// <summary>
        /// 使用MD5加密
        /// </summary>
        /// <param name="strInput"></param>
        /// <returns></returns>
        public static string EncryptByMD5(string strInput)
        {
            StringBuilder strPwd = new StringBuilder();

            MD5 md5 = MD5.Create();//实例化一个md5对像
            //加密后是一个字节类型的数组，这里要注意编码UTF8/Unicode等的选择　
            byte[] s = md5.ComputeHash(Encoding.UTF8.GetBytes(strInput));
            // 通过使用循环，将字节类型的数组转换为字符串，此字符串是常规字符格式化所得
            for (int i = 0; i < s.Length; i++)
            {
                //将得到的字符串使用十六进制类型格式,格式后的字符是小写的字母，如果使用大写（X）则格式后的字符是大写字符 
                strPwd.Append(s[i].ToString("X"));
            }

            return strPwd.ToString();
        }

        /// <summary>
        /// 校验MD5
        /// </summary>
        /// <param name="argInput"></param>
        /// <param name="argHash"></param>
        /// <returns></returns>
        public static bool VerifyMD5(string strInput, string strHash)
        {
            string strInputHash = EncryptByMD5(strInput);
            if (strInputHash.Equals(strHash))
                return true;
            return false;
        }

        /// <summary>
        /// Base64加密
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string BaseEncode(string str)
        {
            string code = "";
            if (!string.IsNullOrWhiteSpace(str))
            {
                try
                {
                    byte[] bytes = System.Text.Encoding.Default.GetBytes(str);
                    code = Convert.ToBase64String(bytes);
                }
                catch { }
            }
            return code;

        }
        /// <summary>
        /// Base64解密
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string BaseDncode(string str)
        {
            string code = "";
            if (!string.IsNullOrWhiteSpace(str))
            {
                try
                {
                    byte[] bytes = Convert.FromBase64String(str);
                    code = System.Text.Encoding.Default.GetString(bytes);
                }
                catch { }
            }
            return code;
        }

        /// <summary>
        /// 获取AES KEY
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetAesKey(string key)
        {
            byte[] keyArray = Encoding.Default.GetBytes(key);
            using (System.Security.Cryptography.MD5CryptoServiceProvider m = new System.Security.Cryptography.MD5CryptoServiceProvider())
            {
                keyArray = m.ComputeHash(keyArray);
            }
            return Encoding.Default.GetString(keyArray);

        }
        /// <summary>
        /// AES 加密(高级加密标准，是下一代的加密算法标准，速度快，安全级别高，目前 AES 标准的一个实现是 Rijndael 算法)
        /// </summary>
        /// <param name="EncryptString">待加密密文</param>
        /// <param name="EncryptKey">加密密钥</param>
        /// <returns></returns>
        public static string AESEncrypt(string EncryptString, string EncryptKey)
        {
            if (string.IsNullOrEmpty(EncryptString)) { throw (new Exception("密文不得为空")); }

            if (string.IsNullOrEmpty(EncryptKey)) { throw (new Exception("密钥不得为空")); }

            string m_strEncrypt = "";

            byte[] m_btIV = Convert.FromBase64String("Rkb4jvUy/ye7Cd7k89QQgQ==");

            Rijndael m_AESProvider = Rijndael.Create();

            try
            {
                byte[] m_btEncryptString = Encoding.Default.GetBytes(EncryptString);

                MemoryStream m_stream = new MemoryStream();

                CryptoStream m_csstream = new CryptoStream(m_stream, m_AESProvider.CreateEncryptor(Encoding.Default.GetBytes(EncryptKey), m_btIV), CryptoStreamMode.Write);

                m_csstream.Write(m_btEncryptString, 0, m_btEncryptString.Length);

                m_csstream.FlushFinalBlock();

                m_strEncrypt = Convert.ToBase64String(m_stream.ToArray());

                m_stream.Close(); m_stream.Dispose();

                m_csstream.Close(); m_csstream.Dispose();
            }
            catch (IOException ex) { throw; }
            catch (CryptographicException ex) { throw; }
            catch (ArgumentException ex) { throw; }
            catch (Exception ex) { throw; }
            finally { m_AESProvider.Clear(); }

            return m_strEncrypt;
        }

        /// <summary>
        /// AES 解密(高级加密标准，是下一代的加密算法标准，速度快，安全级别高，目前 AES 标准的一个实现是 Rijndael 算法)
        /// </summary>
        /// <param name="DecryptString">待解密密文</param>
        /// <param name="DecryptKey">解密密钥</param>
        /// <returns></returns>
        public static string AESDecrypt(string DecryptString, string DecryptKey)
        {
            if (string.IsNullOrEmpty(DecryptString)) { throw (new Exception("密文不得为空")); }

            if (string.IsNullOrEmpty(DecryptKey)) { throw (new Exception("密钥不得为空")); }

            string m_strDecrypt = "";

            byte[] m_btIV = Convert.FromBase64String("Rkb4jvUy/ye7Cd7k89QQgQ==");

            Rijndael m_AESProvider = Rijndael.Create();

            try
            {
                byte[] m_btDecryptString = Convert.FromBase64String(DecryptString);

                MemoryStream m_stream = new MemoryStream();

                CryptoStream m_csstream = new CryptoStream(m_stream, m_AESProvider.CreateDecryptor(Encoding.Default.GetBytes(DecryptKey), m_btIV), CryptoStreamMode.Write);

                m_csstream.Write(m_btDecryptString, 0, m_btDecryptString.Length);

                m_csstream.FlushFinalBlock();

                m_strDecrypt = Encoding.Default.GetString(m_stream.ToArray());

                m_stream.Close(); m_stream.Dispose();

                m_csstream.Close(); m_csstream.Dispose();
            }
            catch (IOException ex) { throw; }
            catch (CryptographicException ex) { throw; }
            catch (ArgumentException ex) { throw; }
            catch (Exception ex) { throw; }
            finally { m_AESProvider.Clear(); }

            return m_strDecrypt;
        }


        public static string DESEncrypt(string EncryptString, string Key)
        {
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            byte[] inputByteArray;
            inputByteArray = Encoding.Default.GetBytes(EncryptString);
            des.Key = ASCIIEncoding.ASCII.GetBytes(System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(Key, "md5").Substring(0, 8));
            des.IV = ASCIIEncoding.ASCII.GetBytes(System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(Key, "md5").Substring(0, 8));
            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(), CryptoStreamMode.Write);
            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();
            StringBuilder ret = new StringBuilder();
            foreach (byte b in ms.ToArray())
            {
                ret.AppendFormat("{0:X2}", b);
            }
            ms.Dispose();
            cs.Dispose();
            return ret.ToString();
        }

        public static string DESDecrypt(string DecryptString, string Key)
        {
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();

            byte[] inputByteArray = new byte[DecryptString.Length / 2];
            for (int x = 0; x < DecryptString.Length / 2; x++)
            {
                int i = (Convert.ToInt32(DecryptString.Substring(x * 2, 2), 16));
                inputByteArray[x] = (byte)i;
            }

            des.Key = ASCIIEncoding.UTF8.GetBytes(Key);
            des.IV = ASCIIEncoding.UTF8.GetBytes(Key);
            MemoryStream ms = new MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateDecryptor(), CryptoStreamMode.Write);
            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();

            StringBuilder ret = new StringBuilder();

            return System.Text.Encoding.Default.GetString(ms.ToArray());
        }
        #endregion 加密解密

        #region JSON
        /// <summary>
        /// 对象转JSON字符串，Entity 或 List<>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <returns></returns>
        public static string Obj2Json(object obj)
        {
            return Serializer.Serialize(obj);
        }

        /// <summary>
        /// JSON字符串转对象，Entity 或 List<>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="json"></param>
        /// <returns></returns>
        public static T Json2Obj<T>(string json)
        {
            return Serializer.Deserialize<T>(json);
        }

        public static T Xml2Obj<T>(string xml) where T : class
        {
            try
            {
                using (StringReader sr = new StringReader(xml))
                {
                    System.Xml.Serialization.XmlSerializer xmldes = new System.Xml.Serialization.XmlSerializer(typeof(T));
                    return xmldes.Deserialize(sr) as T;
                }
            }
            catch (Exception e)
            {

                return null;
            }
        }

        public static string Obj2Xml(object obj)
        {
            MemoryStream Stream = new MemoryStream();
            System.Xml.Serialization.XmlSerializer xml =
                new System.Xml.Serialization.XmlSerializer(obj.GetType());
            try
            {
                //序列化对象
                xml.Serialize(Stream, obj);
            }
            catch (InvalidOperationException)
            {
                throw;
            }
            Stream.Position = 0;
            StreamReader sr = new StreamReader(Stream);
            string str = sr.ReadToEnd();

            sr.Dispose();
            Stream.Dispose();

            return str;
        }

        /// <summary>
        /// JSON字符串转对象，Entity 或 List<>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="json"></param>
        /// <returns></returns>
        public static List<T> JsonToList<T>(string json)
        {

            JavaScriptSerializer Serializer = new JavaScriptSerializer();
            List<T> jsonclassList = Serializer.Deserialize<List<T>>(json);
            return jsonclassList;
        }




        /// <summary>    
        //将时间字符串转为Json时间    
        /// </summary>    
        public static string ConvertDateStringToJsonDate(Match m)
        {
            string result = string.Empty;
            DateTime dt = DateTime.Parse(m.Groups[0].Value);
            dt = dt.ToUniversalTime();
            TimeSpan ts = dt - DateTime.Parse("1970-01-01");
            result = string.Format("///Date({0}+0800)///", ts.TotalMilliseconds);
            return result;
        }



        #endregion

        #region 汉字拼音转换

        ///   <summary>  
        ///   判断是否为汉字  
        ///   </summary>  
        ///   <param   name="chrStr">待检测字符串</param>  
        ///   <returns>是汉字返回true</returns>  
        public static bool IsChineseCharacters(string chrStr)
        {
            Regex CheckStr = new Regex("[\u4e00-\u9fa5]");
            return CheckStr.IsMatch(chrStr);
        }

        /// <summary>
        /// 得到每个汉字的字首拼音码字母(大写)
        /// </summary>
        /// <param name="chrStr">输入字符串</param>
        /// <returns>返回结果</returns>
        public static string GetHeadCharacters(string chrStr)
        {
            string strHeadString = string.Empty;

            Encoding gb = System.Text.Encoding.GetEncoding("gb2312");
            for (int i = 0; i < chrStr.Length; i++)
            {
                //检测该字符是否为汉字
                if (!IsChineseCharacters(chrStr.Substring(i, 1)))
                {
                    strHeadString += chrStr.Substring(i, 1);
                    continue;
                }

                byte[] bytes = gb.GetBytes(chrStr.Substring(i, 1));
                string lowCode = System.Convert.ToString(bytes[0] - 0xA0, 16);
                string hightCode = System.Convert.ToString(bytes[1] - 0xA0, 16);
                int nCode = Convert.ToUInt16(lowCode, 16) * 100 + Convert.ToUInt16(hightCode, 16);      //得到区位码
                strHeadString += FirstLetter(nCode);
            }
            return strHeadString;
        }

        /// <summary>
        /// 通过汉字区位码得到其首字母(大写)
        /// </summary>
        /// <param name="nCode">汉字编码</param>
        /// <returns></returns>
        private static string FirstLetter(int nCode)
        {
            if (nCode >= 1601 && nCode < 1637) return "A";
            if (nCode >= 1637 && nCode < 1833) return "B";
            if (nCode >= 1833 && nCode < 2078) return "C";
            if (nCode >= 2078 && nCode < 2274) return "D";
            if (nCode >= 2274 && nCode < 2302) return "E";
            if (nCode >= 2302 && nCode < 2433) return "F";
            if (nCode >= 2433 && nCode < 2594) return "G";
            if (nCode >= 2594 && nCode < 2787) return "H";
            if (nCode >= 2787 && nCode < 3106) return "J";
            if (nCode >= 3106 && nCode < 3212) return "K";
            if (nCode >= 3212 && nCode < 3472) return "L";
            if (nCode >= 3472 && nCode < 3635) return "M";
            if (nCode >= 3635 && nCode < 3722) return "N";
            if (nCode >= 3722 && nCode < 3730) return "O";
            if (nCode >= 3730 && nCode < 3858) return "P";
            if (nCode >= 3858 && nCode < 4027) return "Q";
            if (nCode >= 4027 && nCode < 4086) return "R";
            if (nCode >= 4086 && nCode < 4390) return "S";
            if (nCode >= 4390 && nCode < 4558) return "T";
            if (nCode >= 4558 && nCode < 4684) return "W";
            if (nCode >= 4684 && nCode < 4925) return "X";
            if (nCode >= 4925 && nCode < 5249) return "Y";
            if (nCode >= 5249 && nCode < 5590) return "Z";
            return "";
        }

        #endregion

        #region DataTable To Entity

        /// <summary>
        /// DataTable To IList<T>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static IList<T> ToList<T>(this DataTable dt)
        {
            if (dt == null || dt.Rows.Count == 0) return null;
            IList<T> list = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T obj = row.ToEntity<T>();
                list.Add(obj);
            }
            return list;
        }

        /// <summary>
        /// DataRow To T
        /// </summary>
        public static T ToEntity<T>(this DataRow row)
        {
            Type objType = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in row.Table.Columns)
            {
                PropertyInfo property =
                objType.GetProperty(column.ColumnName,
                BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
                if (property == null || !property.CanWrite)
                {
                    continue;
                }
                object value = row[column.ColumnName];
                if (value == DBNull.Value) value = null;

                property.SetValue(obj, value, null);

            }
            return obj;
        }


        /// <summary>
        /// List To DataTable
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="list"></param>
        /// <returns></returns>
        public static DataTable ToDataTable<T>(this List<T> list)
        {
            try
            {
                Type objType = typeof(T);
                DataTable dataTable = new DataTable(objType.Name);
                if (list != null ? list.Count > 0 : false)
                {
                    PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(objType);
                    foreach (PropertyDescriptor property in properties)
                    {
                        Type propertyType = property.PropertyType;

                        //nullables must use underlying types
                        if (propertyType.IsGenericType && propertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
                            propertyType = Nullable.GetUnderlyingType(propertyType);
                        //enums also need special treatment
                        if (propertyType.IsEnum)
                            propertyType = Enum.GetUnderlyingType(propertyType); //probably Int32

                        dataTable.Columns.Add(property.Name, propertyType);
                    }

                    foreach (T li in list)
                    {
                        DataRow row = dataTable.NewRow();
                        foreach (PropertyDescriptor property1 in properties)
                        {
                            row[property1.Name] = property1.GetValue(li) ?? DBNull.Value; //can't use null
                        }
                        dataTable.Rows.Add(row);

                    }
                }
                return dataTable;
            }
            catch
            {
                return null;
            }
        }
        #endregion

        #region 图片转换
        /// <summary>
        /// 图片 转为 base64编码的文本
        /// </summary>
        /// <param name="Imagefilename">D:\JJYApp\20151105\鲁KRR516.jpg</param>
        /// <returns></returns>
        public static string ImgToBase64String(string Imagefilename)
        {
            try
            {
                Bitmap bmp = new Bitmap(Imagefilename);
                //this.pictureBox1.Image = bmp;
                //FileStream fs = new FileStream(Imagefilename + ".txt", FileMode.Create);
                //StreamWriter sw = new StreamWriter(fs);

                MemoryStream ms = new MemoryStream();
                bmp.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                byte[] arr = new byte[ms.Length];
                ms.Position = 0;
                ms.Read(arr, 0, (int)ms.Length);
                ms.Close();
                String strbaser64 = Convert.ToBase64String(arr);
                //sw.Write(strbaser64);

                //sw.Close();
                //fs.Close();
                return strbaser64;
                //MessageBox.Show(strbaser64);
            }
            catch (Exception ex)
            {
                return string.Empty;
                //MessageBox.Show("ImgToBase64String 转换失败\nException:" + ex.Message);

            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="inputStr">base64编码的数据</param>
        /// <param name="saveFileFullPath">D:\JJYApp\</param>
        /// <param name="fileName">鲁KRR516_门店ID_封车条号_拆(封).jpg"</param>
        public static bool strBase64ToImage(string inputStr, string saveFileFullPath, string fileName)
        {
            try
            {
                fileName = fileName.ToUpper();
                if (!fileName.Contains(".JPG"))
                {
                    return false;
                }
                //string yyyyMMdd =  DateTime.Now.ToString("yyyyMMdd");
                //string physicalPath = saveFileFullPath + yyyyMMdd + "\\";

                string physicalPath = saveFileFullPath.EndsWith("\\") ? saveFileFullPath : saveFileFullPath + "\\";
                string fullPath = physicalPath + fileName;
                if (!Directory.Exists(physicalPath))
                {
                    Directory.CreateDirectory(physicalPath);
                }
                //FileStream ifs = new FileStream(txtFileName, FileMode.Open, FileAccess.Read);
                //StreamReader sr = new StreamReader(ifs);

                //String inputStr = sr.ReadToEnd();
                byte[] arr = Convert.FromBase64String(inputStr);
                MemoryStream ms = new MemoryStream(arr);
                Bitmap bmp = new Bitmap(ms);

                bmp.Save(fullPath, System.Drawing.Imaging.ImageFormat.Jpeg);
                //bmp.Save(txtFileName + ".bmp", ImageFormat.Bmp);
                //bmp.Save(txtFileName + ".gif", ImageFormat.Gif);
                //bmp.Save(txtFileName + ".png", ImageFormat.Png);
                ms.Close();
                return true;
                //sr.Close();
                //ifs.Close();
                //this.pictureBox2.Image = bmp;
                //if (File.Exists(txtFileName))
                //{
                //    File.Delete(txtFileName);
                //}


                //if (!Directory.Exists(Server.MapPath(saveFileFullPath)))
                //{
                //    Directory.CreateDirectory(Server.MapPath(saveFileFullPath));
                //}
                //var physicalPath = Server.MapPath(文件虚拟路径); 这样可以获得物理路径
                //var dir = System.IO.Path.GetDirectoryName(physicalPath); //可以获得不带文件名的路径
                //MessageBox.Show("转换成功！");
            }
            catch (Exception ex)
            {
                return false;
                //MessageBox.Show("Base64StringToImage 转换失败\nException：" + ex.Message);
            }
        }

        #endregion

        public static string Proces(string DataParam, string Secret_Key)
        {
            string[] ArrayParameters = DataParam.Split('&');
            Array.Sort(ArrayParameters);

            StringBuilder sbParamet = new StringBuilder();
            sbParamet.Append(Secret_Key);
            for (int i = 0; i < ArrayParameters.Length; i++)
            {
                if (ArrayParameters[i].Split('=').Length != 2)
                {
                    throw new Exception("参数格式不正确");
                }
                string ParName = (ArrayParameters[i].Split('='))[0].Trim();
                string ParValue = (ArrayParameters[i].Split('='))[1].Trim();
                sbParamet.Append(ParName + ParValue);
            }
            sbParamet.Append(Secret_Key);
            string a = sbParamet.ToString(); //待加密的拼接字符串
            MD5 md5Hasher = MD5.Create();
            byte[] data = md5Hasher.ComputeHash(Encoding.UTF8.GetBytes(a));
            StringBuilder sBuilder = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("X2"));
            }
            //return sBuilder.ToString();
            //string Sign = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(sbParamet.ToString(), "MD5").ToUpper();
            return DataParam + "&sign=" + sBuilder.ToString(); //生成的sign
        }


    }
}
