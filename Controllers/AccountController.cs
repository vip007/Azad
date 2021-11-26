using COMMON.LOSENTITY;
using LOS_Web.Helpers;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace LOS_Web.Controllers
{
    public class AccountController : Controller
    {
        public AccountController()
        {

        }
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Login(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
            {
                return View();
            }
            ClaimsIdentity identity = null;
            bool isAuthenticated = false;
            string endpoint = "api/User/Login?userName=" + userName + "&password=" + password;
            HttpClientHelper<LoginResponse> apiobj = new HttpClientHelper<LoginResponse>();
            LoginResponse usr = apiobj.GetSingleItemRequest(endpoint);
            if (usr != null && usr.Result == 1)
            {
                identity = new ClaimsIdentity(new[] {
                           new Claim(ClaimTypes.Name,usr.FullName),
                           new Claim(ClaimTypes.NameIdentifier,usr.LoginId),
                           new Claim(ClaimTypes.Role,usr.RoleName),
                           new Claim(ClaimTypes.PrimaryGroupSid,usr.CCode),
                           new Claim(ClaimTypes.Spn, usr.LevelId.ToString()),


                }, CookieAuthenticationDefaults.AuthenticationScheme);
                isAuthenticated = true;
            }
            else
                ViewBag.msg = usr.Msg;
            if(isAuthenticated)
            {
                var principal = new ClaimsPrincipal(identity);
                var login = HttpContext.SignInAsync(
                   CookieAuthenticationDefaults.AuthenticationScheme,
                   principal,
                   new AuthenticationProperties
                   {
                       ExpiresUtc = DateTime.UtcNow.AddHours(2),
                       IsPersistent = true
                   }
                   );

                return RedirectToAction("Index", "Home");
            }
            return View();
        }
        public IActionResult Logout()
        {
            var login = HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login");
        }
        //public IActionResult AccessDenied()
        //{
            
        //    if (!string.IsNullOrEmpty(this.User.GetController()))
        //        return RedirectToAction(this.User.GetAction(), this.User.GetController());
        //    else
        //        return View();
        //}
    }
}
