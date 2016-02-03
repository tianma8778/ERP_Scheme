using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Utility
{
    public class BizException : Exception
    {
        public long Code;
        public BizException(string msg, long code = 3000)
            : base(msg)
        {
            this.Code = code;
        }

        public string ToString()
        {
            return "[" + Code + "] " + base.Message;
        }
    }
}