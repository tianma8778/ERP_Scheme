
using ERP.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.DTO;

namespace ERP.Web.DTO
{
    public class ExtGridReturnObject
    {
        public bool success { get; set; }
        public int code { get; set; }
        public string message { get; set; }
        public object data { get; set; }

        public decimal pageSize { get; set; }
        public decimal totalPages { get; set; }
        public decimal totalRows { get; set; }


        public ExtGridReturnObject(bool succ, int code, string message, PageResult page)
        {
            this.success = succ;
            this.code = code;
            this.message = message;
            if (page != null)
            {
                this.data = page.Data;
                this.totalRows = page.TotalCount;
                this.pageSize = page.Limit;
                this.totalPages = (long)page.TotalCount / (long)page.Limit + 1;
            }
        }


        public static ExtGridReturnObject BuildSuccess(PageResult data)
        {
            return new ExtGridReturnObject(true, ReturnObject.CODE_SUCCESS, null, data);
        }

        public static ExtGridReturnObject BuildError(string message)
        {
            return new ExtGridReturnObject(false, ReturnObject.CODE_SYSTEM_ERROR, message, null);
        }

        public static ExtGridReturnObject BuildBizError(string message)
        {
            return new ExtGridReturnObject(false, ReturnObject.CODE_BUSINESS_ERROR, message, null);
        }


    }
}

