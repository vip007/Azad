function getMenu() {
	$.ajax({
		type: "post",
		url: "/Account/GetAllMenu",
		data: {},
		success: function (e) {
			var n = JSON.stringify(e);
			localStorage.saveData = n, CreateMenu(e)
		}
	})
}

function CreateMenu(e) {
	for (var n = e.menu, a = e.submenu, i = "", s = 0; s < n.length; s++)
		if (0 == n[s].fnParentId) {
			i += '<li class="nav-item nav-item-submenu"><a href="#" class="nav-link nav-itemktm"><i class="' + n[s].ftMCssIcon + '"></i> <span>' + n[s].ftMenuName + "</span></a>";
			for (var o = 0; o < n.length; o++) {
				if (1 == n[s].fnMenuId && 0 == n[o].fnParentId && 1 == n[s].fnMenuId) {
					var t = "";
					t += "", t += '<ul class="nav nav-group-sub">';
					for (var l = 0; l < a.length; l++) n[o].fnMenuId == a[l].fnMenuId && 1 == a[l].fbIsAllow && ("Home" == a[l].ftControllerName && "Index" == a[l].ftActionName ? t += '<li class="nav-item"><a href="/" class="nav-link"><i class="' + a[l].ftSCssIcon + '"></i> ' + a[l].ftSubMenuName + "</a></li>" : "THome" == a[l].ftControllerName && "Index" == a[l].ftActionName ? t += '<li class="nav-item"><a href="/Thome" class="nav-link"><i class="' + a[l].ftSCssIcon + '"></i> ' + a[l].ftSubMenuName + "</a></li>" : t += '<li class="nav-item"><a href="/' + a[l].ftControllerName + "/" + a[l].ftActionName + '" class="nav-link"><i class="' + a[l].ftSCssIcon + '"></i> ' + a[l].ftSubMenuName + "</a></li>");
					i += t += "</ul>"
				}
				if (0 != n[o].fnParentId && n[o].fnParentId == n[s].fnMenuId) {
					t = '<ul class="nav nav-group-sub" data-submenu-title="' + n[o].ftMenuName + '">';
					t += '<li class="nav-item nav-item-submenu"><a href="#" class="nav-link nav-itemktm"><i class="' + n[o].ftMCssIcon + '"></i> ' + n[o].ftMenuName + "</a>", t += '<ul class="nav nav-group-sub">';
					for (l = 0; l < a.length; l++) n[o].fnMenuId == a[l].fnMenuId && 1 == a[l].fbIsAllow && (t += '<li class="nav-item"><a href="/' + a[l].ftControllerName + "/" + a[l].ftActionName + '" class="nav-link"><i class="icon-circle-small"></i> ' + a[l].ftSubMenuName + "</a></li>");
					i += t += "</ul></li></ul>"
				}
			}
			i += "</li>"
		} $("#mMenu").append(i)
}
var App = {
	initBeforeLoad: function () {
		$("body").addClass("no-transitions")
	},
	initAfterLoad: function () {
		$("body").removeClass("no-transitions")
	},
	initSidebars: function () {
		var e;
		e = function () {
			$(".sidebar-main").find(".nav-sidebar").children(".nav-item-submenu").hover(function () {
				var e = $(this);
				e.find(".nav-group-sub").filter(":visible").outerHeight(), e.children(".nav-group-sub").length && (e.children(".nav-group-sub").offset().top + e.find(".nav-group-sub").filter(":visible").outerHeight() > document.body.clientHeight ? e.addClass("nav-item-submenu-reversed") : e.removeClass("nav-item-submenu-reversed"))
			})
		}, $("body").hasClass("sidebar-xs") && e(), $(".sidebar-main-toggle").on("click", function (n) {
			n.preventDefault(), $("body").toggleClass("sidebar-xs").removeClass("sidebar-mobile-main"), e()
		}), $(document).on("click", ".sidebar-main-hide", function (e) {
			e.preventDefault(), $("body").toggleClass("sidebar-main-hidden")
		}), $(document).on("click", ".sidebar-secondary-toggle", function (e) {
			e.preventDefault(), $("body").toggleClass("sidebar-secondary-hidden")
		}), $(document).on("click", ".sidebar-right-main-toggle", function (e) {
			e.preventDefault(), $("body").toggleClass("sidebar-right-visible"), $("body").hasClass("sidebar-right-visible") ? ($("body").addClass("sidebar-xs"), $(".sidebar-main .nav-sidebar").children(".nav-item").children(".nav-group-sub").css("display", "")) : $("body").removeClass("sidebar-xs")
		}), $(document).on("click", ".sidebar-right-main-hide", function (e) {
			e.preventDefault(), $("body").toggleClass("sidebar-right-visible"), $("body").hasClass("sidebar-right-visible") ? $("body").addClass("sidebar-main-hidden") : $("body").removeClass("sidebar-main-hidden")
		}), $(document).on("click", ".sidebar-right-toggle", function (e) {
			e.preventDefault(), $("body").toggleClass("sidebar-right-visible")
		}), $(document).on("click", ".sidebar-right-secondary-toggle", function (e) {
			e.preventDefault(), $("body").toggleClass("sidebar-right-visible"), $("body").hasClass("sidebar-right-visible") ? $("body").addClass("sidebar-secondary-hidden") : $("body").removeClass("sidebar-secondary-hidden")
		}), $(document).on("click", ".sidebar-component-toggle", function (e) {
			e.preventDefault(), $("body").toggleClass("sidebar-component-hidden")
		}), $(".sidebar-mobile-expand").on("click", function (e) {
			e.preventDefault();
			var n = $(this).parents(".sidebar");
			n.hasClass("sidebar-fullscreen") ? n.removeClass("sidebar-fullscreen") : n.addClass("sidebar-fullscreen")
		}), $(".sidebar-mobile-main-toggle").on("click", function (e) {
			e.preventDefault(), $("body").toggleClass("sidebar-mobile-main").removeClass("sidebar-mobile-secondary sidebar-mobile-right"), $(".sidebar-main").hasClass("sidebar-fullscreen") && $(".sidebar-main").removeClass("sidebar-fullscreen")
		}), $(".sidebar-mobile-secondary-toggle").on("click", function (e) {
			e.preventDefault(), $("body").toggleClass("sidebar-mobile-secondary").removeClass("sidebar-mobile-main sidebar-mobile-right"), $(".sidebar-secondary").hasClass("sidebar-fullscreen") && $(".sidebar-secondary").removeClass("sidebar-fullscreen")
		}), $(".sidebar-mobile-right-toggle").on("click", function (e) {
			e.preventDefault(), $("body").toggleClass("sidebar-mobile-right").removeClass("sidebar-mobile-main sidebar-mobile-secondary"), $(".sidebar-right").hasClass("sidebar-fullscreen") && $(".sidebar-right").removeClass("sidebar-fullscreen")
		}), $(".sidebar-mobile-component-toggle").on("click", function (e) {
			e.preventDefault(), $("body").toggleClass("sidebar-mobile-component")
		})
	},
	initNavigations: function () {
		$(document).on("click", ".nav-itemktm", function (e) {
			e.preventDefault();
			var n = $(this);
			$navSidebarMini = $(".sidebar-xs").not(".sidebar-mobile-main").find(".sidebar-main .nav-sidebar").children(".nav-item"), n.parent(".nav-item").hasClass("nav-item-open") ? n.parent(".nav-item").not($navSidebarMini).removeClass("nav-item-open").children(".nav-group-sub").slideUp(250) : n.parent(".nav-item").not($navSidebarMini).addClass("nav-item-open").children(".nav-group-sub").slideDown(250), "accordion" == n.parents(".nav-sidebar").data("nav-type") && n.parent(".nav-item").not($navSidebarMini).siblings(":has(.nav-group-sub)").removeClass("nav-item-open").children(".nav-group-sub").slideUp(250)
		}), $(document).on("click", ".nav-sidebar .disabled", function (e) {
			e.preventDefault()
		}), $(".nav-scrollspy").find(".nav-item").has(".nav-group-sub").children(".nav-item .nav-link").off("click"), $(document).on("click", ".dropdown-content", function (e) {
			e.stopPropagation()
		}), $(".navbar-nav .disabled a, .nav-item-levels .disabled").on("click", function (e) {
			e.preventDefault(), e.stopPropagation()
		}), $('.dropdown-content a[data-toggle="tab"]').on("click", function (e) {
			$(this).tab("show")
		})
	},
	initComponents: function () {
		$('[data-popup="tooltip"]').tooltip(), $('[data-popup="tooltip-demo"]').is(":visible") && ($('[data-popup="tooltip-demo"]').tooltip("show"), setTimeout(function () {
			$('[data-popup="tooltip-demo"]').tooltip("hide")
		}, 2e3)), $('[data-popup="popover"]').popover()
	},
	initCardActions: function () {
		var e;
		$(".card [data-action=reload]:not(.disabled)").on("click", function (e) {
			e.preventDefault();
			var n = $(this).closest(".card");
			$(n).block({
				message: '<i class="icon-spinner2 spinner"></i>',
				overlayCSS: {
					backgroundColor: "#fff",
					opacity: .8,
					cursor: "wait",
					"box-shadow": "0 0 0 1px #ddd"
				},
				css: {
					border: 0,
					padding: 0,
					backgroundColor: "none"
				}
			}), window.setTimeout(function () {
				$(n).unblock()
			}, 2e3)
		}), (e = $(".card-collapsed")).children(".card-header").nextAll().hide(), e.find("[data-action=collapse]").addClass("rotate-180"), $(".card [data-action=collapse]:not(.disabled)").on("click", function (e) {
			var n = $(this);
			e.preventDefault(), n.parents(".card").toggleClass("card-collapsed"), n.toggleClass("rotate-180"), n.closest(".card").children(".card-header").nextAll().slideToggle(150)
		}), $(".card [data-action=remove]").on("click", function (e) {
			e.preventDefault();
			var n = $(this);
			n.hasClass("disabled") || n.closest(".card").slideUp({
				duration: 150,
				start: function () {
					n.addClass("d-block")
				},
				complete: function () {
					n.remove()
				}
			})
		}), $(".card [data-action=fullscreen]").on("click", function (e) {
			e.preventDefault();
			var n = $(this),
				a = n.closest(".card");
			a.toggleClass("fixed-top h-100 rounded-0"), a.hasClass("fixed-top") ? (n.attr("data-fullscreen", "active"), a.removeAttr("style").children(".collapse:not(.show)").addClass("show collapsed-in-fullscreen"), $("body").addClass("overflow-hidden"), n.siblings("[data-action=move], [data-action=remove], [data-action=collapse]").addClass("d-none")) : (n.removeAttr("data-fullscreen"), a.children(".collapsed-in-fullscreen").removeClass("show"), $("body").removeClass("overflow-hidden"), n.siblings("[data-action=move], [data-action=remove], [data-action=collapse]").removeClass("d-none"))
		})
	},
	initDropdownSubmenu: function () {
		$(".dropdown-menu").find(".dropdown-submenu").not(".disabled").find(".dropdown-toggle").on("click", function (e) {
			e.stopPropagation(), e.preventDefault(), $(this).parent().siblings().removeClass("show").find(".show").removeClass("show"), $(this).parent().toggleClass("show").children(".dropdown-menu").toggleClass("show"), $(this).parents(".show").on("hidden.bs.dropdown", function (e) {
				$(".dropdown-submenu .show, .dropdown-submenu.show").removeClass("show")
			})
		})
	},
	initHeaderElementsToggle: function () {
		$(".header-elements-toggle").on("click", function (e) {
			e.preventDefault(), $(this).parents("[class*=header-elements-]").find(".header-elements").toggleClass("d-none")
		}), $(".footer-elements-toggle").on("click", function (e) {
			e.preventDefault(), $(this).parents(".card-footer").find(".footer-elements").toggleClass("d-none")
		})
	},
	initCore: function () {
		App.initSidebars(), App.initNavigations(), App.initComponents(), App.initCardActions(), App.initDropdownSubmenu(), App.initHeaderElementsToggle()
	}
};
document.addEventListener("DOMContentLoaded", function () {
	var e = JSON.parse(localStorage.saveData || null) || {
		menu: [],
		submenu: []
	};
	e.menu.length > 0 ? CreateMenu(e) : getMenu(), App.initBeforeLoad(), App.initCore()
}), window.addEventListener("load", function () {
	App.initAfterLoad()
});