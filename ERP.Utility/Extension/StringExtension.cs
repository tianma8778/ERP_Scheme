
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ERP.Utility.Extension
{
    public static partial class @string
    {

        #region 字符串转换为Pascal格式
        /// <summary>
        /// 字符串转换为Pascal格式
        /// </summary>
        /// <param name="s">要转换的字符串</param>
        /// <returns>返回Pascal格式字符串</returns>
        /// <example>输入myString,返回MyString这种字符串</example>
        public static string ToPascal(this string p_str)
        {
            return p_str.Substring(0, 1).ToUpper() + p_str.Substring(1);
        }
        #endregion

        #region 字符串转换为camel格式
        /// <summary>
        /// 字符串转换为camel格式
        /// </summary>
        /// <param name="p_str">要转换的字符串</param>
        /// <returns></returns>
        public static string ToCamel(this string p_str)
        {
            return p_str.Substring(0, 1).ToLower() + p_str.Substring(1);
        }
        #endregion

        #region 字符串转换为数字
        public static decimal ToDecimal(this object p_self)
        {
            try
            {
                return Convert.ToDecimal(p_self);
            }
            catch
            {
                return decimal.MinValue;
            }
        }
        public static decimal ToDecimal(this object p_self, decimal p_defaultValue)
        {
            try
            {
                return Convert.ToDecimal(p_self);
            }
            catch
            {
                return p_defaultValue;
            }
        }
        /// <summary>
        /// 字符串转换为 Int32格式
        /// </summary>
        /// <param name="p_self"></param>
        /// <returns>int类型字符串，出错返回int.MinValue</returns>
        public static int ToInt32(this object p_self)
        {
            try
            {
                return Convert.ToInt32(p_self);
            }
            catch
            {
                return int.MinValue;
            }
        }

        public static int ToInt32(this object p_self, int p_defaultValue)
        {
            try
            {
                return Convert.ToInt32(p_self);
            }
            catch
            {
                return p_defaultValue;
            }
        }
        /// <summary>
        /// 字符串转换为 Int64格式
        /// </summary>
        /// <param name="p_Self"></param>
        /// <returns>long类型字符串，出错返回int.MinValue</returns>
        public static long ToInt64(this object p_Self)
        {
            try
            {
                return Convert.ToInt64(p_Self);
            }
            catch
            {
                return int.MinValue;
            }
        }

        public static long ToInt64(this object self, long p_defaultValue)
        {
            try
            {
                return Convert.ToInt64(self);
            }
            catch
            {
                return p_defaultValue;
            }
        }
        #endregion

        #region 字符串转换为decimal

        public static decimal ToDecimal(this string self, decimal def)
        {
            try
            {
                return Convert.ToDecimal(self);
            }
            catch (FormatException)
            {
                return def;
            }
        }

        public static decimal? ToNullableDecimal(this string self)
        {
            try
            {
                if (self == null || self == "")
                    return null;

                return Convert.ToDecimal(self);
            }
            catch (FormatException)
            {
                return null;
            }
        }

        #endregion

        #region 字符串转换为date

        public static DateTime? ToNullableDate(this string self)
        {
            if (string.IsNullOrEmpty(self))
                return null;
            try
            {
                return Convert.ToDateTime(self);
            }
            catch (FormatException)
            {
                return null;
            }
        }

        #endregion

        #region 将字符串转换成bool

        public static bool ToBoolean(this string self)
        {
            try
            {
                return Convert.ToBoolean(self);
            }
            catch (FormatException)
            {
                return false;
            }
        }

        #endregion

        #region 字符串转换成int

        public static int? ToNullableInt(this string self)
        {
            try
            {
                return Convert.ToInt32(self);
            }
            catch (FormatException)
            {
                return null;
            }
        }

        #endregion

        #region 转换成UTF-8字符串
        /// <summary>
        /// 转换成UTF-8字符串
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public static String toUtf8String(this string s)
        {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < s.Length; i++)
            {
                char c = s[i];
                if (c >= 0 && c <= 255)
                {
                    sb.Append(c);
                }
                else
                {
                    byte[] b;
                    try
                    {
                        b = Encoding.UTF8.GetBytes(c.ToString());
                    }
                    catch (Exception ex)
                    {
                        b = new byte[0];
                    }
                    for (int j = 0; j < b.Length; j++)
                    {
                        int k = b[j];
                        if (k < 0) k += 256;

                        sb.Append("%" + Convert.ToString(k, 16).ToUpper());
                    }
                }
            }
            return sb.ToString();
        }
        #endregion

        #region 字符串编码转换
        /// <summary>
        /// 字符串编码转换
        /// </summary>
        /// <param name="str"></param>
        /// <param name="oldCoding">原编码</param>
        /// <param name="newEncoding">新编码</param>
        /// <returns></returns>
        public static string ConvertEnCoding(this string str, Encoding oldCoding, Encoding newEncoding)
        {
            return newEncoding.GetString(oldCoding.GetBytes(str));
        }
        #endregion

        #region IP地址转换为秘密的IP地址
        /// <summary>
        /// IP地址转换为秘密的IP地址
        /// </summary>
        /// <param name="p_ipAddress">如：202.195.224.100</param>
        /// <returns>返回202.195.224.*类型的字符串</returns>
        public static string ipSecret(this string p_ipAddress)
        {
            string[] ips = p_ipAddress.Split('.');
            StringBuilder sb_screcedIp = new StringBuilder();
            int ipsLength = ips.Length;
            for (int i = 0; i < ipsLength - 1; i++)
            {
                sb_screcedIp.Append(ips[i].ToString() + ".");

            }
            sb_screcedIp.Append("*");
            return sb_screcedIp.ToString();
        }
        #endregion

        #region base64url编码处理

        public static string ToEnBase64(this string str)
        {
            return Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(str));
        }

        public static string ToUnBase64(this string str)
        {
            return System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(str));
        }

        #endregion

        #region 判断字符串是否在字符串数组中
        /// <summary>
        /// 判断字符串是否在字符串数组中
        /// </summary>
        /// <param name="str">要判断的字符串</param>
        /// <param name="p_targrt">目标数组</param>
        /// <returns></returns>
        public static bool IsInArray(this string str, string[] p_targrt)
        {
            return p_targrt.Contains(str);
            //for (int i = 0; i < targrt.Length; i++)
            //{
            //    if (str == targrt[i])
            //    {
            //        return true;
            //    }
            //}
            //return false;
        }
        #endregion

        #region 字符串数组转换为数字数组
        /// <summary>
        /// 字符串数组转换为数字数组
        /// </summary>
        /// <param name="p_stringArray"></param>
        /// <returns></returns>
        public static int[] toIntArray(this string[] p_stringArray)
        {
            int[] returnValue = new int[p_stringArray.Length];
            for (int i = 0; i < p_stringArray.Length; i++)
            {
                returnValue[i] = Convert.ToInt32(p_stringArray[i]);
            }
            return returnValue;

        }
        #endregion

        #region 去除HTML标记
        public static string TrimScript(this string str)
        {
            str = Regex.Replace(str, "<script[\\w\\W]*?</script>", "", RegexOptions.IgnoreCase);
            str = Regex.Replace(str, "<style[\\w\\W]*?</style>", "", RegexOptions.IgnoreCase);
            str = Regex.Replace(str, "<iframe[\\w\\W]*?</iframe>", "", RegexOptions.IgnoreCase);
            return str;
        }
        #endregion

        #region 去除换行符
        /// <summary>
        /// 去除换行符
        /// </summary>
        /// <param name="str">要进行处理的字符串</param>
        /// <returns></returns>
        public static string TrimBR(this string str)
        {
            str = str.Replace("\n", "");
            str = str.Replace("\r", "");
            str = str.Replace("\t", "");
            return str;
        }
        #endregion

        #region 截取文字
        /// <summary>
        /// 截取一段文字.
        /// </summary>
        /// <param name="str">要截取的原文本.</param>
        /// <param name="p_maxLength">截取长度，多少个字</param>
        /// <param name="suffix">The suffix.</param>
        /// <returns></returns>
        public static string Truncate(this string str, int p_maxLength, string suffix = "...")
        {
            // 剩余的用 ...替换
            var truncatedString = str;

            if (p_maxLength <= 0) return truncatedString;
            var strLength = p_maxLength - suffix.Length;

            if (strLength <= 0) return truncatedString;

            if (str == null || str.Length <= p_maxLength) return truncatedString;

            truncatedString = str.Substring(0, strLength);
            truncatedString = truncatedString.TrimEnd();
            truncatedString += suffix;

            return truncatedString;
        }

        #endregion

        #region 去除XSS攻击字符
        /// <summary>
        /// 清除字符串中带有的XSS攻击威胁的字符
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string CleanForXss(this string input)
        {
            //remove any html
            input = input.StripHtml();
            //strip out any potential chars involved with XSS
            return input.ExceptChars(new HashSet<char>("*?(){}[];:%<>/\\|&'\"".ToCharArray()));
        }

        public static string ExceptChars(this string str, HashSet<char> toExclude)
        {
            var sb = new StringBuilder(str.Length);
            foreach (var c in str.Where(c => toExclude.Contains(c) == false))
            {
                sb.Append(c);
            }
            return sb.ToString();
        }
        #endregion

        #region 去除全部HTML标签
        /// <summary>
        /// 去除全部HTML标签
        /// </summary>
        /// <param name="str">原始字符串</param>
        /// <returns>返回无任何标签的字符串</returns>
        public static string StripHtml(this string str)
        {
            const string const_pattern = @"<(.|\n)*?>";
            return Regex.Replace(str, const_pattern, String.Empty);
        }

        #endregion

        #region 删除字符串尾部的回车/换行/空格
        /// <summary>
        /// 删除字符串尾部的回车/换行/空格
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string RTrim(this string str)
        {
            for (int i = str.Length; i >= 0; i--)
            {
                if (str[i].Equals(" ") || str[i].Equals("\r") || str[i].Equals("\n"))
                {
                    str.Remove(i, 1);
                }
            }
            return str;
        }
        #endregion

        #region SQL注入敏感字符剔除
        /// <summary>
        /// SQL注入敏感字符剔除
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string ToSqlEnCode(this string str)
        {
            if (string.IsNullOrEmpty(str))
            {
                return "";
            }

            System.Text.RegularExpressions.Regex regex1 = new System.Text.RegularExpressions.Regex(@"<script[\s\S]+</script *>", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            System.Text.RegularExpressions.Regex regex2 = new System.Text.RegularExpressions.Regex(@" href *= *[\s\S]*script *:", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            System.Text.RegularExpressions.Regex regex3 = new System.Text.RegularExpressions.Regex(@" on[\s\S]*=", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            System.Text.RegularExpressions.Regex regex4 = new System.Text.RegularExpressions.Regex(@"<iframe[\s\S]+</iframe *>", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            System.Text.RegularExpressions.Regex regex5 = new System.Text.RegularExpressions.Regex(@"<frameset[\s\S]+</frameset *>", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            System.Text.RegularExpressions.Regex regex6 = new System.Text.RegularExpressions.Regex(@"(\bselect\b.+\bfrom\b)|(\binsert\b.+\binto\b)|(\bdelete\b.+\bfrom\b)|(\bcount\b\(.+\))|(\bdrop\b\s+\btable\b)|(\bupdate\b.+\bset\b)|(\btruncate\b\s+\btable\b)|(\bxp_cmdshell\b)|(\bexec\b)|(\bexecute\b)|(\bnet\b\s+\blocalgroup\b)|(\bnet\b\s+\buser\b)", System.Text.RegularExpressions.RegexOptions.IgnoreCase);

            str = str.Replace("'", "''");
            str = regex1.Replace(str, ""); //过滤<script></script>标记 
            str = regex2.Replace(str, ""); //过滤href=javascript: (<A>) 属性 
            str = regex3.Replace(str, " _disibledevent="); //过滤其它控件的on...事件 
            str = regex4.Replace(str, ""); //过滤iframe 
            str = regex5.Replace(str, ""); //过滤frameset
            str = regex6.Replace(str, ""); //过滤frameset
            return str;

        }
        #endregion

        #region 生成以日期时间为基础的随机字符串
        /// <summary>
        /// 生成以日期时间为基础的随机字符串
        /// </summary>
        /// <returns></returns>
        public static string Getfilename()
        {
            Random number = new Random();
            //下面的number.Next(10000,99999).ToString()加入一个5位的在10000到99999之间的随机数
            //yyyyMMdd代码年月日。hhmmss代表小时分钟秒钟 。fff代表毫秒

            //暂时使用了GUID的那个文件名filenameGUID
            return DateTime.Now.ToString("yyyyMMddhhmmssfff") + "_" + number.Next(10000, 99999).ToString();

        }
        #endregion

        #region 返回GUID唯一标示符
        public static string GetGuid()
        {
            return Guid.NewGuid().ToString();
        }
        #endregion

        #region  验证字符串是否为空字符串
        /// <summary>
        /// 验证字符串是否为空字符串
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static bool IsNullOrEmpty(this string str)
        {
            if (str == null || str.Length == 0)
            {
                return true;
            }
            return false;
        }
        #endregion

        #region 检测是否有Sql危险字符
        /// <summary>
        /// 检测是否有Sql危险字符
        /// </summary>
        /// <param name="str">要判断字符串</param>
        /// <returns>判断结果</returns>
        public static bool IsSafeSqlString(this string str)
        {
            return !Regex.IsMatch(str, @"[-|;|,|\/|\(|\)|\[|\]|\}|\{|%|@|\*|!|\']");
        }
        #endregion

        #region 检测是否符合邮箱地址规则
        /// <summary>
        /// 检测是否是邮箱地址格式
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static bool IsanEmailString(this string str)
        {
            return Regex.IsMatch(str, @"^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$");
        }

        #endregion

    }
}
