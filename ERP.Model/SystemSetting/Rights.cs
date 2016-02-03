using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Model.SystemSetting
{
    public class Rights
    {
        public decimal ID { get; set; }

        public decimal Rights_ID { get; set; }

        public string Rights_Name { get; set; }

        public string Rights_Type { get; set; }

        public decimal Rights_Parent_ID { get; set; }

    }
}
