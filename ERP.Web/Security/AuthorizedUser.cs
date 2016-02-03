using ERP.Model.SystemSetting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Web.Security
{
    public class AuthorizedUser : User
    {
        public AuthorizedUser()
        { }

        public AuthorizedUser(User user)
        {
            this.ID = user.ID;
            this.Username = user.Username;
            this.Password = user.Password;
            this.Is_Enable = user.Is_Enable;
        }

        private IList<decimal> _rights = new List<decimal>();
        public IList<decimal> Rights { get { return _rights; } set { _rights = value; } }

        private IList<Role> _roles = new List<Role>();
        public IList<Role> Roles { get { return _roles; } set { _roles = value; } }
    }
}
