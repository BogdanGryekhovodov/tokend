$(function()
{
  'use strict';

  handleMainMenu();
  handleResponsiveSidebar();
  handleAccordionMenu();
  handleTooltips();
  handleFloatingLabels();
  handlePackageSwitcher();
  checkBoxes($('body'));

  var animation_offset_px = 200;
  if (typeof onGetAnimationOffsetPx === 'function')
  {
    animation_offset_px = onGetAnimationOffsetPx();
  }
  handlePageAnimations(animation_offset_px);

  if ($('body').hasClass('page-scrollspy'))
  {
    handleScrollSpySidebar();
  }

  $('.reponsive-image-types > li > a').on('click', function(e)
  {
    e.preventDefault();
    var imageType = $(this).data('type');
    var imagePreview = $('.responsive-image .browser');
    imagePreview.removeClass('desktop-size mobile-size').addClass(imageType);
    $(this).closest('ul').find('li').removeClass('active');
    $(this).parent().addClass('active');
    imagePreview.find('.control-panel').removeClass('animated');
    setTimeout(function()
		{
      imagePreview.find('.control-panel').addClass('animated');
    }, 1000);
  });

  $('.play').on('click', function() {
    var $controlPanel = $(this).parent();

    $(this).closest('.responsive-image').find('.animated').removeClass('animated').parent();
    $controlPanel.removeClass('animated');

    setTimeout(function()
		{
      $controlPanel.addClass('animated');
    }, 10);
  });

  //Change the browser to mobile phone in the Control Panel feature subapge
  if ($(window).width() < 768) {
    $('.repsonsive-image-multiple .browser').removeClass('desktop-size').addClass('mobile-size');
  }
  $(window).resize(function()
  {
    if ($(window).width() < 768) {
      $('.repsonsive-image-multiple .browser').removeClass('desktop-size').addClass('mobile-size');
    }
  });
  $('.tabs-responsive .dropdown').on('show.bs.dropdown', function () {
       $('.tabs-responsive, .tabs-responsive .nav').css( "overflow", "inherit" );
  });

  $('.tabs-responsive .dropdown').on('hide.bs.dropdown', function () {
       $('.tabs-responsive, .tabs-responsive .nav').removeAttr('style')
  });
});

var handleTooltips = function()
{
  "use strict";
	$('[data-toggle="tooltip"]').tooltip();
};

var handleMainMenu = function()
{
  "use strict";

	var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  var menuList = $('.page-navbar .navbar-main > li');

	// Disable floating menu on mobile phones
	if (!mobile) {
		navfloat();
		//close dropdown on hover
		menuList.on('mouseover', function()
		{
			if(!$(this).hasClass('open')) {
				$(this).closest('.nav').find('.open').removeClass('open');
			}
		});
	}
	else {
		$('html').addClass('mobile');
	}
	// Show navigation menu on button click
	$('.navbar-toggle').on('click', function()
	{
		var btn = $(this);
		var target = $('body');
		var navIcon = $('#nav-icon4');
		
		if (!target.hasClass('navbar-open'))
		{
			btn.addClass('active');
			navIcon.addClass('open');
			target.addClass('navbar-open');
		}
		else
		{
			target.addClass('navbar-closing');
			setTimeout(function()
			{
				target.addClass('navbar-bgfade');
			 }, 400);
			setTimeout(function()
			{
				btn.removeClass('active');
        target.removeClass('navbar-open navbar-closing navbar-bgfade');
      }, 800);
      navIcon.removeClass('open');
		}
	});
	// Floating menu function
  function navfloat()
  {
    var pageNav = $('.page-navbar');
    var prevScroll = '0';
    var curDir = 'down';
    var prevDir = 'up';
		var fixedSidebar = $('.main-sidebar-scrollspy');

    $(window).scroll(function ()
    {
      if($(this).scrollTop() > 100 && (!pageNav.hasClass('navbar-hidden') && !pageNav.hasClass('navbar-fixed')))
      {
        pageNav.addClass('navbar-hidden');
      }
      else if ($(this).scrollTop() < 100 && (!pageNav.hasClass('navbar-fixed') && pageNav.hasClass('navbar-hidden')))
      {
        pageNav.removeClass('navbar-hidden');
      }
      if ($(this).scrollTop() > 300)
      {
        if (!pageNav.hasClass('navbar-fixed'))
        {
          pageNav.addClass('navbar-fixed');
        }
        if ($(this).scrollTop() >= prevScroll)
        {
          curDir = 'down';
          if (curDir !== prevDir)
          {
            prevDir = curDir;
            pageNav.removeClass('navbar-visible').addClass('navbar-hidden');
            fixedSidebar.removeClass('main-sidebar-floating-nav');
          }
        }
        else
        {
          curDir = 'up';
          if (curDir !== prevDir)
          {
            pageNav.removeClass('navbar-hidden').addClass('navbar-visible');
						fixedSidebar.addClass('main-sidebar-floating-nav');
            prevDir = curDir;
          }
        }
        prevScroll = $(this).scrollTop();
      }
      if (pageNav.hasClass('navbar-fixed') && $(this).scrollTop() <= 10)
      {
        pageNav.removeClass('navbar-fixed navbar-visible');
        fixedSidebar.removeClass('main-sidebar-floating-nav');
      }
    });
  }
};

var handleScrollSpySidebar = function()
{
  "use strict";
  var headerHeight = $('.page-banner').outerHeight(true); // true value, adds margins to the total height
  var footerHeight = $('.page-footer').innerHeight() + $('.section-blue').innerHeight();

  if (window.location.pathname.match('\/docs\/') !== null)
  {
  	footerHeight = footerHeight + $('.docs-contribute').innerHeight();
  }
	$('.page-scrollspy').scrollspy({ target: '.main-sidebar-scrollspy' });
	$('.main-sidebar-scrollspy .nav-sidebar').affix({
		  offset: {
			  top: headerHeight,
			  bottom: footerHeight,
		  }
	}).on('affix.bs.affix', function () { // before affix
    $(this).width();
  }).on('affix-bottom.bs.affix', function () { // before affix-bottom
      $(this).css('bottom', 'auto'); // THIS is what makes the jumping
  });

	$('.main-sidebar-scrollspy .nav > li > a').on('click', function(e)
	{
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 250);
	});
};

var handleResponsiveSidebar = function()
{
  "use strict";

  $('.nav-responsive .btn').on('click', function()
	{
		var target = $('.nav-responsive');

		if (!target.hasClass('open'))
		{
			target.addClass('open');
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 250);
		}
		else
		{
			target.removeClass('open');
		}
	});
	$('.nav-responsive > .nav-sidebar a').on('click', function()
	{
		$(this).closest('.nav-responsive').removeClass('open');
	});
	$(document).on('click','.nav-responsive.open > .nav-sidebar > .dropdown > a', function(e)
	{
		e.preventDefault();
		$(this).parent().addClass('active');
	});
	$(document).mouseup(function (e)
	{
		var target = $('.nav-responsive');
		if (!target.is(e.target) && target.has(e.target).length === 0)
		{
			target.removeClass('open');
		}
	});
};

var handleFloatingLabels = function()
{
  "use strict";

  $('.floatlabel').floatlabel();
};

var handleAccordionMenu = function()
{
  "use strict";

  $('.accordion .accordion-title').on('click', function ()
  {
		var currLi = $(this).closest('li');
		if (!currLi.hasClass('open'))
		{
			$('.accordion .collapse.in').collapse('hide');
			$('.accordion li').removeClass('open');
			currLi.find('.collapse').collapse('toggle');
			currLi.closest('li').addClass('open');

      if ($('.career-accordion').is(':visible'))
      {
        currLi.on('shown.bs.collapse', function () {
          $('html, body').animate({
            scrollTop: currLi.offset().top - 60
          }, 500);
        });
      }

		}
		else
		{
			$('.accordion li').removeClass('open');
			currLi.find('.collapse').collapse('toggle');
		}
  });
};

var handlePackageSwitcher = function()
{
  "use strict";
  var switcher = $('.packages-switcher');
  switcher.on('click', function()
  {
    if($(this).hasClass('monthly'))
    {
      $(this).removeClass('monthly');
      $('.package').each(function()
      {
        $(this).find('.package-price > span').html($(this).find('.package-price').data('hourly'));
      });
    }
    else
    {
      $(this).addClass('monthly');
      $('.package').each(function()
      {
        $(this).find('.package-price > span').html($(this).find('.package-price').data('monthly'));
      });
    }
  });
};

var handlePageAnimations = function(offset)
{
  "use strict";

	var wow = new WOW(
	  {
	  boxClass:     'animate',
	  animateClass: 'animated',
	  offset:       offset,
	  mobile:       false,
	  live:         true
	});
	wow.init();
};

var checkBoxes = function (container)
{
  "use strict";
  container.find('input:not(.switch-checkbox)').icheck({
    checkboxClass: 'checkbox-styled',
    radioClass: 'radio-styled',
    increaseArea: '20%'
  });
};

//  ---------------------------------------- phone and desktop slider -----------------------------------------------
$(document).ready(function(){
  $('.desktop__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    speed: 1,
    swipe: false,
    autoplaySpeed: 10000,
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
    asNavFor: '.phone__slider'
  });
  $('.phone__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    speed: 1,
    swipe: false,
    autoplaySpeed: 10000,
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
    asNavFor: '.desktop__slider'
  });
});
//  ---------------------------------------- phone and desktop slider -----------------------------------------------


//  ---------------------------------------- smooth nav scroll -----------------------------------------------

jQuery(document).ready(function ($) {
	var contentSections = $('#pricing, #benefits, #features, #resources, #fund'),
    navigationItems = $('.point-nav a');
    menuNavigationItems = $('.navbar-main a');
    

	updateNavigation();
	$(window).on('scroll', function () {
		updateNavigation();
	});

	//smooth scroll to the section
	navigationItems.on('click', function (event) {
		event.preventDefault();
		smoothScroll($(this).attr('href'));
  });
  
	menuNavigationItems.on('click', function (event) {
		event.preventDefault();
		smoothScroll($(this).attr('href'));
  });

	function updateNavigation() {
		contentSections.each(function () {
			$this = $(this);
			var activeNavigationItem = $('.point-nav a[href="#' + $this.attr('id') + '"]');
			var activeMenuNavigationItem = $('.navbar-main a[href="#' + $this.attr('id') + '"]');

			if ($(window).scrollTop() >= $this.offset().top - $(window).height() / 2) {
				navigationItems.removeClass('point-active');
				activeNavigationItem.addClass('point-active');
				menuNavigationItems.removeClass('active');
				// activeMenuNavigationItem.addClass('active');
			}
		});
	}

	function smoothScroll(target) {
		$('body, html').animate(
			{ 'scrollTop': $(target).offset().top },
			600
		);
	}
});

//  ---------------------------------------- smooth nav scroll -----------------------------------------------


// ------------------------------------------smooth anchors----------------------------------------

$('.smooth-anchors').click(function (e) {
  e.preventDefault();

  document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
      });
});

// ------------------------------------------smooth anchors----------------------------------------


// ------------------------------------------show/hide point-nav----------------------------------------
let $pointNav = $('.point-nav');
let offsetForPoints = 350;

function checkHeightFromTop() {
let scrollTop = $(this).scrollTop();

  if (scrollTop > offsetForPoints) {
    $pointNav.fadeIn('fast');
  } else {
    $pointNav.fadeOut('fast');
  }
} 

checkHeightFromTop();

$(window).scroll(() => {
  checkHeightFromTop(); 
});
// ------------------------------------------show/hide point-nav----------------------------------------



// ----------------------------------------------------------text fade-in and out ------------------------------------------------------------------------
// var bannerSlogan = $('.banner-slogan .container');
// var offset = 100;
// var animationFinishScrollHeight = 220;
// var fadeOutText = function () {
//   if (window.matchMedia("(min-width: 768px)").matches) {
//     $(window).on('scroll', function () {
//       var scrollTop = $(this).scrollTop();
//       if (scrollTop > offset) {
//       var calc = 1 - (scrollTop - offset)/animationFinishScrollHeight;
    
//         bannerSlogan.css({ 'opacity': calc });
        
//         if ( calc > '1') {
//           bannerSlogan.css({ 'opacity': 1 });
//         } else if ( calc < '0' ) {
//           bannerSlogan.css({ 'opacity': 0 });
//         }
//       }
//     });
//   }
// }

// fadeOutText();

// $(window).on('resize', function () {
//   fadeOutText();
  
// });

// ----------------------------------------------------------text fade-in and out ------------------------------------------------------------------------

//ticking machine
var percentTime;
var tick;
var progressBarIndex = 0;
let currentSlide;
let nextSlide;
let currentFlowCount;
let currentSlideIndex;

$('.progressBarContainer .progressBar').each(function(index) {
    var progress = "<div class='inProgress inProgress" + index + "'></div>";
    $(this).html(progress);
});

function startProgressbar() {
    resetProgressbar();
    percentTime = 0;
    tick = setInterval(interval, 7);
}
function drow() {
  currentSlide = $('.browser__slider .slick-track .slick-current.slick-active').data("index");
  nextSlide = $('.browser__slider .slick-track img[data-index="' + (currentSlide + 1) + '"]').data('slickIndex');
  progressBarIndex++;

  if (!$('.browser__slider .slick-track img[data-index="' + (currentSlide + 1) + '"]').length) {
    $('.browser__slider').slick('slickGoTo', 0, false);
    progressBarIndex = 0;
  }

  $('.browser__slider').slick('slickGoTo', nextSlide, false);
  startProgressbar();
}

function interval() {
  currentSlideIndex = $('.browser__slider .slick-track .slick-current.slick-active').data("index");
    if (($('.browser__slider .slick-track img[data-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
        progressBarIndex = $('.browser__slider .slick-current.slick-active').data("index");
        percentTime += 0.1;

        $('.inProgress' + progressBarIndex).css({
          width: percentTime + "%"
        });

        if (currentFlowCount == 3) {
          if (percentTime >= 33.9 && percentTime <= 34) {
            $('.browser__slider').slick('slickNext');
          }
          if (percentTime >= 66.9 && percentTime <= 67) {
            $('.browser__slider').slick('slickNext');
          }
        }  
        if (currentFlowCount == 4) {
          if (percentTime >= 24.9 && percentTime <= 25) {
            $('.browser__slider').slick('slickNext');
          }
          if (percentTime >= 49.9 && percentTime <= 50) {
            $('.browser__slider').slick('slickNext');
          }
          if (percentTime >= 74.9 && percentTime <= 75) {
            $('.browser__slider').slick('slickNext');
          }
        }  
        if (currentFlowCount == 5) {
          if (percentTime >= 19.9 && percentTime <= 20) {
            $('.browser__slider').slick('slickNext');
          }
          if (percentTime >= 39.9 && percentTime <= 40) {
            $('.browser__slider').slick('slickNext');
          }
          if (percentTime >= 59.9 && percentTime <= 60) {
            $('.browser__slider').slick('slickNext');
          }
          if (percentTime >= 79.9 && percentTime <= 80) {
            $('.browser__slider').slick('slickNext');
          }
        }  
  

        if (percentTime >= 100) {
          drow();
        }

    } else {
      currentFlowCount = $('.browser__slider .slick-track img[data-index="' + currentSlideIndex + '"]').length;
        percentTime += 0.1;
        $('.inProgress' + progressBarIndex).css({
            width: percentTime + "%"
        });

        if (currentFlowCount == 3) {
          if (percentTime >= 33.9 && percentTime <= 34) {
            $('.browser__slider').slick('slickNext');
          }
          if (percentTime >= 66.9 && percentTime <= 67) {
            $('.browser__slider').slick('slickNext');
          }
        }  
        if (currentFlowCount == 4) {
          if (percentTime >= 24.9 && percentTime <= 25) {
            $('.browser__slider').slick('slickNext');
          }
          if (percentTime >= 49.9 && percentTime <= 50) {
            $('.browser__slider').slick('slickNext');
          }
          if (percentTime >= 74.9 && percentTime <= 75) {
            $('.browser__slider').slick('slickNext');
          }
        }  
        if (currentFlowCount == 5) {
          if (percentTime >= 19.9 && percentTime <= 20) {
            $('.browser__slider').slick('slickNext');
          }
          if (percentTime >= 39.9 && percentTime <= 40) {
            $('.browser__slider').slick('slickNext');
          }
          if (percentTime >= 59.9 && percentTime <= 60) {
            $('.browser__slider').slick('slickNext');
          }
          if (percentTime >= 79.9 && percentTime <= 80) {
            $('.browser__slider').slick('slickNext');
          }
        }  

        if (percentTime >= 100) {
          drow();
        }
    }
}

function resetProgressbar() {
    $('.inProgress').css({
        width: 0 + '%'
    });
    clearInterval(tick);
}
startProgressbar();
// End ticking machine

$('.progressBarContainer div').click(function () {
  clearInterval(tick);
  var goToThisIndex = $(this).find("span").data("index");
  $('.browser__slider').slick('slickGoTo', goToThisIndex, false);
  startProgressbar();
});