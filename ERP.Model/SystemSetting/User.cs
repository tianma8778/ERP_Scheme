using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace ERP.Model.SystemSetting
{
    public class User
    {
        public decimal ID { get; set; }
        public string Username { get; set; }
        public string Phone_Number { get; set; }

        public string Password { get; set; }

        public decimal _Is_Enable=0;
        public decimal Is_Enable { get { return _Is_Enable; } set { _Is_Enable = value; } }

        public DateTime? Create_Time { get; set; }
        public decimal? Create_User { get; set; }
        public string Create_User_Text { get; set; }
        public DateTime? Update_Time { get; set; }
        public decimal? Update_User { get; set; }
        public string Update_User_Text { get; set; }



        public bool RemeberMe { get; set; }
    }
}