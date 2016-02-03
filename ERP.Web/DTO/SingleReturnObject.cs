using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.DTO;

namespace ERP.Web.DTO
{
    public class SingleReturnObject
    {
        public bool success { get; set; }
        public int code { get; set; }
        public string message { get; set; }
        public object data { get; set; }

        public SingleReturnObject(bool success, int code, string message, object data)
        {
            this.success = success;
            this.code = code;
            this.message = message;
            this.data = data;
        }

        public static SingleReturnObject BuildSuccess(object data)
        {
            return new SingleReturnObject(true, ReturnObject.CODE_SUCCESS, null, data);
        }

        public static SingleReturnObject BuildError(string message, object data)
        {
            return new SingleReturnObject(false, ReturnObject.CODE_SYSTEM_ERROR, message, data);
        }

        public static SingleReturnObject BuildBizError(string message)
        {
            return new SingleReturnObject(false, ReturnObject.CODE_BUSINESS_ERROR, message, null);
        }


    }
}
