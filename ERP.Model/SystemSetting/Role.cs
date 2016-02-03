using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Model.SystemSetting
{
    public class Role
    {
        public decimal ID { get; set; }

        public string ROLE_NAME { get; set; }


        public string ROLE_REMARK { get; set; }


        public DateTime? CREATETIME { get; set; }


        public decimal? CREATEUSER { get; set; }


        public DateTime? UPDATETIME { get; set; }


        public decimal? UPDATEUSER { get; set; }


        public string CR_USER { get; set; }


        public string UP_USER { get; set; }

    }
}
