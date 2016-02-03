using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.DTO
{
    public class ReturnObject
    {
        public const int CODE_SUCCESS = 0;
        public const int CODE_SESSION_TIMEOUT = 1000;
        public const int CODE_SYSTEM_ERROR = 2000;
        public const int CODE_BUSINESS_ERROR = 3000;
    }
}