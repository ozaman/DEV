   


$(function () {
	"use strict";
    
    // VARIABLES
    var portfolioItems          = $(".portfolio .portfolio-items .item"),
        scrollTo                = $(".scroll-to-next-section"),
        Body                    = $("body"),
        Html                    = $("html"),
        htmlBody                = $(".content"),
        $document               = $(document),
        $window                 = $(window);
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
    	console.log('incase')
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


});
function closeloading() {
	$(".preloader").fadeOut(600, function () {
		// .delay(100)
        // $(this).remove();
    });
	// body...
}
function logout(){
    swal({
          title: "คุณแน่ใจหรือไม่?",
          text: "ว่าต้องการออกจากระบบ",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-danger",
          confirmButtonText: "ตกลง",
          cancelButtonText: "ยกเลิก",
          closeOnConfirm: false
        },
        function(isConfirm) {
          if (isConfirm) {
            $.removeCookie('login',{ path: '/' });
            $.removeCookie('token',{ path: '/' });
            // $cookies.remove('login',{ path: '/' });
            // $cookies.remove('token',{ path: '/' });
            swal("ออกจากระบบสำเร็จ!", " ", "success");
            window.location.href = "/login";
          }
        });
   
   // 
}



