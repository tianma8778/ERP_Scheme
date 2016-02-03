using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Model
{
    /// <summary>
    /// 分页结果集
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class PageResult
    {
        public int Page { get; set; }
        public int Start { get; set; }
        public int Limit { get; set; }
        public object Data { get; set; }
        public decimal TotalCount { get; set; }

        public PageResult(object resultList, decimal resultCount, int page, int start, int limit)
        {
            this.Data = resultList;
            this.TotalCount = resultCount;
            this.Page = page;
            this.Start = start;
            this.Limit = limit;
        }

    }
}
