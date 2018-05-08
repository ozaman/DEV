/*global $, document, window, console, setInterval, clearInterval, Hammer*/

$(function () {
    
    "use strict";
    
    // VARIABLES
    var Nav                     = $("nav"),
        menuButton              = $("nav .menu-button"),
        firstLine               = $("nav .menu-button span:first-of-type"),
        lastLine                = $("nav .menu-button span:last-of-type"),
        menuLinks               = $(".menu-body ul li a"),
        menuBg1                 = $("nav .menu-body .menu-bg1"),
        menuBg2                 = $("nav .menu-body .menu-bg2, nav .menu-body .nav-and-footer-bg"),
        menuBody                = $("nav .menu-body"),
        sections                = $("body .section"),
        HeaderAndNavFooterBg    = $("header, .nav-and-footer-bg span"),
        navAndFooterBg          = $(".nav-and-footer-bg span"),
        sectionsHeight          = $("body, body .section:not(.home)"),
        sectionsTotal           = "0" + sections.length,
        portfolioItems          = $(".portfolio .portfolio-items .item"),
        scrollTo                = $(".scroll-to-next-section"),
        Body                    = $("body"),
        Html                    = $("html"),
        htmlBody                = $("html, body"),
        $document               = $(document),
        $window                 = $(window);
    
    // Nav on Scroll in Mobile
    $window.on("resize scroll", function () {
        if ($(this).width() < 768 && $(this).scrollTop() > 0) {
            
            Nav.css({
                boxShadow: "0px 10px 10px -3px rgba(34, 40, 42, 0.2)"
            });
            Nav.find(".container").css({
                height: "50px"
            });
            
        } else {
            
            Nav.css({
                boxShadow: ""
            });
            Nav.find(".container").css({
                height: ""
            });
            
        }
        
    });
    
    // Height of Header in Home Page
    HeaderAndNavFooterBg.height($window.height());
    navAndFooterBg.width($window.width());
    
    $window.on("resize", function () {
        HeaderAndNavFooterBg.height($(this).height());
        navAndFooterBg.width($(this).width());
    });
    
    // Height of Main Sections in Home Page
    if ($window.width() >= 1200) {
        sectionsHeight.height($window.height());
    }
    
    $window.on("resize", function () {
        if ($(this).width() >= 1200) {
            sectionsHeight.height($window.height());
        } else {
            sectionsHeight.css("height", "auto");
        }
    });
    
    // fullPage Plugin
    var pageURL = window.location.href,
        pageID  = pageURL.substring(pageURL.lastIndexOf("#"));
    
    if (pageURL.includes("#") && pageURL[pageURL.length - 1] !== "#") {
        $(pageID).addClass("active");
    }
    
    if ($window.width() >= 1200) {
        Body.fullpage({
            css3: true,
            scrollingSpeed: 600,
            scrollBar: true,
            fitToSection: false
        });
    }
    
    $window.on("resize", function () {
        if ($(this).width() >= 1200) {
            Body.fullpage({
                css3: true,
                scrollingSpeed: 600,
                scrollBar: true,
                fitToSection: false
            });
        }
    });
    
    // Show and Hide Menu
    $document.on('click', function (e) {
        
        if ($(e.target).closest($("nav .menu-button:not(.button-when-menu-is-open)")).length) {
            
            menuButton.addClass("button-when-menu-is-open");
            
            firstLine.addClass("first-line-when-menu-is-open");
            lastLine.addClass("last-line-when-menu-is-open");
            
            menuLinks.addClass("show-links");
            menuBg1.addClass("menu-bg1-open");
            menuBg2.addClass("menu-bg2-open");
            
            menuBody.show(0);
            
        } else if (!$(e.target).closest(menuBody).length || $(e.target).closest($("nav .button-when-menu-is-open")).length || $(e.target).closest($("nav .menu-body ul li")).length) {
            
            menuButton.removeClass("button-when-menu-is-open");
            
            firstLine.removeClass("first-line-when-menu-is-open");
            lastLine.removeClass("last-line-when-menu-is-open");
            
            menuLinks.removeClass("show-links");
            menuBg1.removeClass("menu-bg1-open");
            menuBg2.removeClass("menu-bg2-open");
            
            menuBody.delay(1000).hide(0);
            
        }
        
    });
    
    // Smooth Scroll
    
    // Get Total Sections Number and Current Section Number on Scrolling
    $window.on('scroll', function () {
        
        var cur_pos = $(this).scrollTop();
        
        sections.each(function () {
            
            var top     = $(this).offset().top,
                bottom  = top + $(this).outerHeight(),
                currentSection,
                currentSectionFinal;
            
            if (sections.index($(this)) < 9) {
                
                currentSection      = sections.index($(this)) + 1;
                currentSectionFinal = "0" + currentSection;
                
            } else {
                
                currentSectionFinal = sections.index($(this)) + 1;
                
            }
            
            if (cur_pos >= top && cur_pos <= bottom) {
                
                $("footer .section-number .current").text(currentSectionFinal);
                
            }
            
        });
        
    });
    
    if (sections.length < 10) {
        
        $("footer .section-number .total").text(sectionsTotal);
        
    } else {
        
        $("footer .section-number .total").text(sections.length);
        
    }
    
    // Button of Scroll to Next Section
    if ($window.scrollTop() >= $window.height()) {
        scrollTo.removeClass("scroll-down").addClass("scroll-up");
    } else {
        scrollTo.removeClass("scroll-up").addClass("scroll-down");
    }
    
    $window.on("scroll", function () {
        
        if ($(this).scrollTop() >= $window.height()) {
            scrollTo.removeClass("scroll-down").addClass("scroll-up");
        } else {
            scrollTo.removeClass("scroll-up").addClass("scroll-down");
        }
        
    });
    
    scrollTo.on("click", function () {
        $(this).each(function () {
            
            if ($(this).hasClass("scroll-up")) {
                
                htmlBody.animate({
                    scrollTop: 0
                }, 600);
                
            } else if ($(this).hasClass("scroll-down")) {
                
                htmlBody.animate({
                    scrollTop: $window.scrollTop() + $window.height()
                }, 600);
                
            }
            
        });
    });
    
    // Waterpipe Plugin
    $('#wavybg-wrapper').waterpipe({
        gradientStart: '#ed11ff',
        gradientEnd: '#2f52ff',
        smokeOpacity: 0.01,
        numCircles: 1,
        maxMaxRad: 300,
        minMaxRad: 500,
        minRadFactor: 0,
        iterations: 4,
        drawsPerFrame: 2,
        lineWidth: 1,
        speed: 0.2,
        bgColorInner: "#2b387d",
        bgColorOuter: "#6b345b"
    });
    
    // Fire Direction Aware Hover Plugin in Portfolio Section
    $(".da-thumbs .item").hoverdir();
    
    // Filtering Portfolio
    $(".portfolio .portfolio-content ul.work-cat li span").on("click", function () {
        $(this).parent("li").addClass("active").siblings("li").removeClass("active");
    });
    
    $(".portfolio .portfolio-content ul.work-cat li:first-of-type span").on("click", function () {
        portfolioItems.hide(0).show(0);
    });
    
    $(".portfolio .portfolio-content ul.work-cat li:not(:first-of-type) span").on("click", function () {
        portfolioItems.hide(0);
        $('.' + $(this).parent("li").data('value')).show(0);
    });
    
    // Fire Magnific Popup Plugin in Portfolio Section
    portfolioItems.each(function () {
        
        if (!$(this).attr('href') || $(this).attr('href') === '#') {
            
            $(this).attr('href', $(this).children("img").attr('src'));
            
        }
        
    });
    
    $(".portfolio .portfolio-items").magnificPopup({
        delegate: '.item',
        type: 'image',
        gallery: {
            enabled: true
        },
        titleSrc: function (item) {
            return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
        }
    });
    
    // Create Preview Image For Posts in News Section
    var newsPosts       = $(".news .news-content .posts .post"),
        postsImgs       = $(".news .news-content .posts .post > img").clone();
    
    $(".news .news-content .post-img").html(postsImgs);
    
    var postPreviewImg  = $(".news .news-content .post-img img");
    
    postPreviewImg.first().addClass("active");
    newsPosts.first().addClass("active");
    
    newsPosts.on("mouseover", function () {
        
        var thisPost    = $(this),
            curImgIndex = thisPost.index();
        
        thisPost.addClass("active").siblings(".post").removeClass("active");
        postPreviewImg.eq(curImgIndex).addClass("active").siblings("img").removeClass("active");
        
    });
    
    // Create Single Post Popup in News Section
    var postTitle       = $(".news .posts .post .post-text .post-title"),
        postPopupBg     = $(".news .posts .post .post-popup-bg");
    
    postTitle.on("click", function () {
        
        var postPopup = $(this).parents(".post").children(".post-popup-bg");
        
        postPopup.fadeIn(300);
        
        // Set Post Popup Content Height
        $(".news .posts .post .post-popup-bg .post-content-and-comments").css({
            marginTop: postPopup.find(".post-header").outerHeight()
        });
        
        if ($window.width() >= 1200 && $.fn.fullpage) {
            Body.fullpage.setAutoScrolling(false);
        }
        
        htmlBody.css("overflow-y", "hidden");
        
    });
    
    $document.on("click", function (e) {
        if ($(e.target).closest(postTitle).length) {
            console.log("by Webrouk");
        } else if (!$(e.target).closest(".news .posts .post .post-popup-bg .post-popup-content").length) {
            
            postPopupBg.fadeOut(300);
            
            if ($window.width() >= 1200 && $.fn.fullpage) {
                Body.fullpage.setAutoScrolling(true);
            }
            
            htmlBody.css("overflow-y", "");
            
        } else if ($(e.target).closest(".news .posts .post .post-popup-bg .popup-close-btn").length) {
            
            postPopupBg.fadeOut(300);
            
            if ($window.width() >= 1200 && $.fn.fullpage) {
                Body.fullpage.setAutoScrolling(true);
            }
            
            htmlBody.css("overflow-y", "");
            
        }
    });
    
    // next/prev controls on click
    $(".news .posts .post .post-popup-bg .sidebar .navigation-buttons .prev-button").on("click", function () {
        
        if ($(this).parents(".post").is(":first-child")) {
            
            $(this).css({
                cursor: 'not-allowed',
                backgroundColor: '#353535',
                color: '#888'
            });
            
        } else {
            
            $(this).parents(".post-popup-bg").hide().parents(".post").prev(".post").children(".post-popup-bg").show();
            
        }
        
    });
    
    $(".news .posts .post .post-popup-bg .sidebar .navigation-buttons .next-button").on("click", function () {
        
        if ($(this).parents(".post").is(":last-child")) {
            
            $(this).css({
                cursor: 'not-allowed',
                backgroundColor: '#353535',
                color: '#888'
            });
            
        } else {
            
            $(this).parents(".post-popup-bg").hide().parents(".post").next(".post").children(".post-popup-bg").show();
            
        }
        
    });
    
    // Nice Scroll Plugin
    var niceScrollOption = {
            background: "rgba(37, 37, 37, 0.4)",
            cursorcolor: "#6495ed",
            cursorborder: "none",
            cursorwidth: "4px",
            cursorborderradius: "3px",
            cursorminheight: 130,
            hidecursordelay: 1000,
            boxzoom: true,
            horizrailenabled: false,
            zindex: "4000"
        };
    
    if ($window.width() < 1200) {
        Html.niceScroll(niceScrollOption);
    }
    
    $window.on("resize", function () {
        if ($(this).width() < 1200) {
            Html.niceScroll(niceScrollOption);
        } else {
            Html.getNiceScroll().hide();
        }
    });
    
    // Fix NiceScroll Plugin After Loading
    $window.on("scroll", function () {
        Html.getNiceScroll().resize();
    });
    
});

$(window).on("load", function () {
    
    "use strict";
    
    var Html = $("html");
    
    // Preloader
    $(".preloader").delay(400).fadeOut(600, function () {
        $(this).remove();
    });
    
    /*
    ** My Custom Slider in Header
    ** create pager list items
    */
    var headerSliderItems = $("header .slider .slider-item");
    
    headerSliderItems.each(function () {
        $("header .slider .pagers").append("<li><span></span></li>");
    });
    
    // set up vars
    var headerSliderPagers  = $("header .slider .pagers li"),
        headerSliderSpeed   = 6000,
        headerLastElem      = headerSliderPagers.length,
        headerSliderTarget  = 0;
        
    // set up first slide
    headerSliderPagers.first().addClass('active');
    headerSliderItems.hide().first().show();
    
    // transition function
    function headerSliderResponse(headerSliderTarget) {
        headerSliderItems.hide().eq(headerSliderTarget).show();
        headerSliderPagers.removeClass('active').eq(headerSliderTarget).addClass('active');
    }
    
    // pager controls
    headerSliderPagers.on('click', function () {
        
        if (!$(this).hasClass('active')) {
            
            headerSliderTarget = $(this).index();
            
            headerSliderResponse(headerSliderTarget);
            headerResetTiming();
        }
        
    });
    
    // next/prev controls on Swipe
    if (Html.attr("dir") === "ltr") {
        
        new Hammer(document.getElementById("header-slider")).on("swipeleft", function () {
            
            headerSliderTarget += 1;
            
            if (headerSliderTarget === headerLastElem) {
                headerSliderTarget = 0;
            }
            
            headerSliderResponse(headerSliderTarget);
            headerResetTiming();
        });
        
        new Hammer(document.getElementById("header-slider")).on("swiperight", function () {
            
            headerSliderTarget -= 1;
            
            if (headerSliderTarget === -1) {
                headerSliderTarget = headerLastElem - 1;
            }
            
            headerSliderResponse(headerSliderTarget);
            headerResetTiming();
        });
        
    } else if (Html.attr("dir") === "rtl") {
        
        new Hammer(document.getElementById("header-slider")).on("swiperight", function () {
            
            headerSliderTarget += 1;
            
            if (headerSliderTarget === headerLastElem) {
                headerSliderTarget = 0;
            }
            
            headerSliderResponse(headerSliderTarget);
            headerResetTiming();
        });
        
        new Hammer(document.getElementById("header-slider")).on("swipeleft", function () {
            
            headerSliderTarget -= 1;
            
            if (headerSliderTarget === -1) {
                headerSliderTarget = headerLastElem - 1;
            }
            
            headerSliderResponse(headerSliderTarget);
            headerResetTiming();
        });
    }
    
    // slider timing
    function headerSliderTiming() {
        
        headerSliderTarget += 1;
        
        if (headerSliderTarget === headerLastElem) {
            headerSliderTarget = 0;
        }
        
        headerSliderResponse(headerSliderTarget);
    }
    
    // slider autoplay
    var headerTimingRun = setInterval(function () {
        headerSliderTiming();
    }, headerSliderSpeed);
    
    function headerResetTiming() {
        
        clearInterval(headerTimingRun);
        
        headerTimingRun = setInterval(function () {
            headerSliderTiming();
        }, headerSliderSpeed);
        
    }
    
    /*
    ** My Custom Slider in Team Section
    ** set up vars
    */
    var teamSliderItems = $(".team .team-members .member"),
        teamSliderSpeed   = 100000000000000000,
        teamLastElem      = teamSliderItems.length,
        teamSliderTarget  = 0;
        
    // set up first slide
    teamSliderItems.hide().first().fadeIn(300).css("display", "flex");
    
    // transition function
    function teamSliderResponse(teamSliderTarget) {
        teamSliderItems.hide().eq(teamSliderTarget).fadeIn(300).css("display", "flex");
    }
    
    // next/prev controls on Swipe & click
    var teamNext = function () {
        
        teamSliderTarget += 1;
        
        if (teamSliderTarget === teamLastElem) {
            teamSliderTarget = 0;
        }
        
        teamSliderResponse(teamSliderTarget);
        teamResetTiming();
    };
    
    var teamPrev = function () {
        
        teamSliderTarget -= 1;
        
        if (teamSliderTarget === -1) {
            teamSliderTarget = teamLastElem - 1;
        }
        
        teamSliderResponse(teamSliderTarget);
        teamResetTiming();
    };
    
    
    if (Html.attr("dir") === "ltr") {
        
        new Hammer(document.getElementById("team-slider")).on("swipeleft", teamNext);
        new Hammer(document.getElementById("team-slider")).on("swiperight", teamPrev);
        
    } else if (Html.attr("dir") === "rtl") {
        
        new Hammer(document.getElementById("team-slider")).on("swiperight", teamNext);
        new Hammer(document.getElementById("team-slider")).on("swipeleft", teamPrev);
    }
    
    $(".team .slider-controls .next-button").on("click", teamNext);
    $(".team .slider-controls .prev-button").on("click", teamPrev);
    
    // slider timing
    function teamSliderTiming() {
        
        teamSliderTarget += 1;
        
        if (teamSliderTarget === teamLastElem) {
            teamSliderTarget = 0;
        }
        
        teamSliderResponse(teamSliderTarget);
    }
    
    // slider autoplay
    var teamTimingRun = setInterval(function () {
        teamSliderTiming();
    }, teamSliderSpeed);
    
    function teamResetTiming() {
        
        clearInterval(teamTimingRun);
        
        teamTimingRun = setInterval(function () {
            teamSliderTiming();
        }, teamSliderSpeed);
        
    }
    
    // Fix Height of Team Members
    var teamMember  = $(".team .team-members .member"),
        maxHeight   = -1;
    
    teamMember.each(function () {
        maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    });
    
    teamMember.each(function () {
        $(this).height(maxHeight);
    });
    
});


	function login2()
	{
		document.getElementById('login2').style.display='block';
		document.getElementById('registration').style.display='none';
		document.getElementById('restore').style.display='none';
	};
	function registration()
	{
		document.getElementById('login2').style.display='none';
		document.getElementById('registration').style.display='block';
		document.getElementById('restore').style.display='none';
	};
	function restore()
	{
		document.getElementById('login2').style.display='none';
		document.getElementById('registration').style.display='none';
		document.getElementById('restore').style.display='block';
	};
	function close2()
	{
		document.getElementById('login2').style.display='none';
		document.getElementById('registration').style.display="none";
		document.getElementById('restore').style.display='none';
	};
$(document).ready(function(){
	
	
	
		setInterval(function() {
  			
			var speedbtc = parseFloat($("#cashbtc").val());
			$("#vbtc").val(parseFloat($("#vbtc2").val()) + speedbtc);
			$("#vbtc2").val($("#vbtc").val());
			$("#amountbtc").val(parseFloat($("#vbtc").val()).toFixed(8));
			
			var speedltc = parseFloat($("#cashltc").val());
			$("#vltc").val(parseFloat($("#vltc2").val()) + speedltc);
			$("#vltc2").val($("#vltc").val());
			$("#amountltc").val(parseFloat($("#vltc").val()).toFixed(8));
			
			var speeddoge = parseFloat($("#cashdoge").val());
			$("#vdoge").val(parseFloat($("#vdoge2").val()) + speeddoge);
			$("#vdoge2").val($("#vdoge").val());
			$("#amountdoge").val(parseFloat($("#vdoge").val()).toFixed(8));
			
			var speedeth = parseFloat($("#casheth").val());
			$("#veth").val(parseFloat($("#veth2").val()) + speedeth);
			$("#veth2").val($("#veth").val());
			$("#amounteth").val(parseFloat($("#veth").val()).toFixed(8));
			
			var speedxmr = parseFloat($("#cashxmr").val());
			$("#vxmr").val(parseFloat($("#vxmr2").val()) + speedxmr);
			$("#vxmr2").val($("#vxmr").val());
			$("#amountxmr").val(parseFloat($("#vxmr").val()).toFixed(8));
			
			var speeddash = parseFloat($("#cashdash").val());
			$("#vdash").val(parseFloat($("#vdash2").val()) + speeddash);
			$("#vdash2").val($("#vdash").val());
			$("#amountdash").val(parseFloat($("#vdash").val()).toFixed(8));
			
			var speedzcash = parseFloat($("#cashzcash").val());
			$("#vzcash").val(parseFloat($("#vzcash2").val()) + speedzcash);
			$("#vzcash2").val($("#vzcash").val());
			$("#amountzcash").val(parseFloat($("#vzcash").val()).toFixed(8));
			
			var speedppc = parseFloat($("#cashppc").val());
			$("#vppc").val(parseFloat($("#vppc2").val()) + speedppc);
			$("#vppc2").val($("#vppc").val());
			$("#amountppc").val(parseFloat($("#vppc").val()).toFixed(8));
			
			
			
		}, 100);
	
	
	});
	
	function rin(cr)
{
	
	
	var sum = parseFloat($("#text"+cr).val());
	
	$.ajax({
	  url: "ex.c.php?cr="+cr+"&sum="+sum,
	  success: function(html){
		  
			if(html=="Successfully")
				{
					location.reload();
				}else
					{
						$("#errorexchange").text(html);
					}
				
	  }
	});
	
}

function helpform()
{
	var email = $("#email11").val();
	var mess = $("#mess").val();
	

	
	$.ajax({
	  url: "h.c.php?email="+email+"&sub=help&mess="+mess,
	  success: function(html){
			$("#errorm").text(html);
	  }
	});
}

function restorepass()
{
	var email = $("#email3").val();
	
	$.ajax({
	  url: "h.c.php?get=1&email="+email,
	  success: function(html){
			$("#errorrestore").text(html);
	  }
	});
}

function buycloudpay2()
{
 
			var email = $("#useremail").val();
			var summ = parseFloat($("#summbuy").val());
			window.location.href = "https://brynex.com/en/payeer.php?email="+email+"&amount="+summ;
}

function buycloudpm2()
{
 
			var email = $("#useremail1").val();
			var summ = parseFloat($("#summbuy1").val());
			window.location.href = "https://brynex.com/en/pm.php?email="+email+"&amount="+summ;
}

function sendmoney(cr)
{
	var sum = parseFloat($("#amountw"+cr).val());
	var wal = $("#wallet"+cr).val();
	
	$.ajax({
	  url: "w.c.php?cr="+cr+"&sum="+sum+"&wal="+wal,
	  success: function(html){
			if(html=="Successfully")
				{
					location.reload();
				}
		  else
			  {
				  $("#errorwith"+cr).text(html);
			  }
				
	  }
	});
}

function sendmoney(cr)
{
	var sum = parseFloat($("#amountw"+cr).val());
	var wal = $("#wallet"+cr).val();
	
	$.ajax({
	  url: "w.c.php?cr="+cr+"&sum="+sum+"&wal="+wal,
	  success: function(html){
			if(html=="Successfully")
				{
					location.reload();
				}
		  else
			  {
				  $("#errorn").text(html);
				  document.getElementById("errorn").style.display='block';
   				 $( "#errorn" ).animate({
	  			opacity: "1"});
			  }
				
	  }
	});
}


function signup2()
{

	
	var pass = $("#password").val();
	var pass2 = $("#rpassword").val();
	var email = $("#email").val();
	var name = $("#name").val();
	

	
	$.ajax({
	  url: "l.c.php?m=signup&email="+email+"&password="+pass+"&passwordr="+pass2+"&name="+name,
	  success: function(html){
			$("#error").text(html);
		  	if(html=="Successfully")
				{
					window.location.href = "panel.php";
				}
	  }
	});
}


function signin()
{

	var pass = $("#password1").val();
	var email = $("#email1").val();
	

	
	$.ajax({
	  url: "l.c.php?m=login&email="+email+"&password="+pass,
	  success: function(html){
			$("#error1").text(html);
		  	if(html=="Successfully")
				{
					window.location.href = "panel.php";
				}
	  }
	});
}


$(document).ready(function(){
	
	
	
		setInterval(function() {
  			
			var speedbtc = parseFloat($("#cashbtc").val());
			$("#vbtc").val(parseFloat($("#vbtc2").val()) + speedbtc);
			$("#vbtc2").val($("#vbtc").val());
			$("#amountbtc").val(parseFloat($("#vbtc").val()).toFixed(8));
			
			var speedltc = parseFloat($("#cashltc").val());
			$("#vltc").val(parseFloat($("#vltc2").val()) + speedltc);
			$("#vltc2").val($("#vltc").val());
			$("#amountltc").val(parseFloat($("#vltc").val()).toFixed(8));
			
			var speeddoge = parseFloat($("#cashdoge").val());
			$("#vdoge").val(parseFloat($("#vdoge2").val()) + speeddoge);
			$("#vdoge2").val($("#vdoge").val());
			$("#amountdoge").val(parseFloat($("#vdoge").val()).toFixed(8));
			
			var speedeth = parseFloat($("#casheth").val());
			$("#veth").val(parseFloat($("#veth2").val()) + speedeth);
			$("#veth2").val($("#veth").val());
			$("#amounteth").val(parseFloat($("#veth").val()).toFixed(8));
			
			var speedxmr = parseFloat($("#cashxmr").val());
			$("#vxmr").val(parseFloat($("#vxmr2").val()) + speedxmr);
			$("#vxmr2").val($("#vxmr").val());
			$("#amountxmr").val(parseFloat($("#vxmr").val()).toFixed(8));
			
			var speeddash = parseFloat($("#cashdash").val());
			$("#vdash").val(parseFloat($("#vdash2").val()) + speeddash);
			$("#vdash2").val($("#vdash").val());
			$("#amountdash").val(parseFloat($("#vdash").val()).toFixed(8));
			
			var speedzcash = parseFloat($("#cashzcash").val());
			$("#vzcash").val(parseFloat($("#vzcash2").val()) + speedzcash);
			$("#vzcash2").val($("#vzcash").val());
			$("#amountzcash").val(parseFloat($("#vzcash").val()).toFixed(8));
			
			var speedppc = parseFloat($("#cashppc").val());
			$("#vppc").val(parseFloat($("#vppc2").val()) + speedppc);
			$("#vppc2").val($("#vppc").val());
			$("#amountppc").val(parseFloat($("#vppc").val()).toFixed(8));
			
			
			
		}, 100);
	 
	
	});
	