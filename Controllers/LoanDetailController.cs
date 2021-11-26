using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LOS_Web.Controllers
{
    public class LoanDetailController : Controller
    {
        public IActionResult LoanDetail()
        {
            return View();
        }
    }
}
