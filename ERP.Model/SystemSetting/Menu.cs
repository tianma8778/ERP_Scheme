using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Model.SystemSetting
{
    public class Menu
    {
        public decimal ID { get; set; }

        public decimal RIGHTS_ID { get; set; }

        public string RIGHTS_NAME { get; set; }

        public string CONTROLLER_NAME { get; set; }

        public string VIEW_NAME { get; set; }

        public string PANEL_NAME { get; set; }

    }
}
