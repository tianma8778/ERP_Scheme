
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Web.DTO
{
    public class ExtTreeDto
    {

        public int totalcount { get; set; }

        public int pageSize { get; set; }

        public int totalPages { get; set; }

        public int totalRows { get; set; }

        public object _tree { get; set; }

        public object _children { get; set; }

    }
}

