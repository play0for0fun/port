var headerHeight;
var mainimageTop;
var windowHeight;
var windowWidth;
var swipePos;
var selectedThumbnail;
var count;
var rotatingBgElements;
var bgElement;
var tempBgElement;
var photogridElement;
var mainimageElement;
var photoImageElements;
var thumbnailElements;
var infopageElement;

var bgPhotoIndex = 0;

var randomizeBackground = function() {
	bgPhotoIndex++;
	
	var randomValue = Math.floor( Math.random() * count) + 1;
	
	// THIS IS A CRAZY HACK
	// for some reason .bgimg:nth-child( <5 ) returns null... no idea why.
	if (randomValue < 5) {
		randomValue = 5;
	}
	// END CRAZY HACK
	
	
		var element = $('.bgimg:nth-child('+ bgPhotoIndex +')');
	
	
	var image = $(element).data('image');
	
	bgElement.css('background-image', 'url(' + image + ')');
}

var rotateBackground = function() {
	// diasble transitions
	rotatingBgElements.css({
		'transition': 'opacity 0s',
		'-webkit-transition': 'opacity 0s',
		'-moz-transition': 'opacity 0s',
	});
	
	// set temp background to current background
	var image = bgElement.css('background-image');
	tempBgElement.css('background-image', image);
	
	// swap temp and normal backgrounds
	tempBgElement.removeClass('hidden');
	bgElement.addClass('hidden');
	

	// once the swap is done, change the original background
	// and swap bg divs with a fade
	setTimeout(function() {
		randomizeBackground();
		// re-enable transitions
		rotatingBgElements.css({
			'transition': 'opacity 2s ease-in-out',
			'-webkit-transition': 'opacity 2s ease-in-out',
			'-moz-transition': 'opacity 2s ease-in-out',
		});
		tempBgElement.addClass('hidden');
		bgElement.removeClass('hidden');
	}, 4000);
	
	// repeat after an amount of time
	setTimeout(function() {
		rotateBackground();
	}, 6000);
}

var expandThumbnail = function(thumbnail) {
	// size calculations
	var thumbSize = thumbnail.outerWidth();
	var scrollPosition = $(document).scrollTop();		
	var thumbOffset = thumbnail.offset();
	if (windowWidth > windowHeight) {
		var fullScale = windowHeight / thumbSize;
	} else {
		var fullScale = windowWidth / thumbSize;
	}
	var fullTranslationX = windowWidth/2 - thumbOffset.left - thumbSize/2 + 'px';
	var fullTranslationY = scrollPosition + headerHeight + windowHeight/2 - thumbOffset.top - thumbSize/2 + 'px';
	
	// if the main image is being shown, remove transitions
	if( mainimageElement.hasClass('visible') ) {
		thumbnailElements.css({
			'transition': 'all 0s',
			'-webkit-transition': 'all 0s',
			'-moz-transition': 'all 0s',
		});
	}
	
	// set appearance
	thumbnail.addClass('selected');
	
	// expand the thumbnail
	thumbnail.css({
		'transform': 
			'translate3d('+ fullTranslationX +','+ fullTranslationY +',0) scale('+ fullScale +')',
		'-webkit-transform': 
			'translate3d('+ fullTranslationX +','+ fullTranslationY +',0) scale('+ fullScale +')',
		'-moz-transform': 
			'translate3d('+ fullTranslationX +','+ fullTranslationY +',0) scale('+ fullScale +')',
	});
}

var retractThumbnail = function(thumbnail) {
	thumbnail.removeClass('selected');
	thumbnail.removeAttr('style');
}

var setHeaderOpacity = function() {
	var windowScroll = $(window).scrollTop();
	
	// allow thumbnails to go over header if at the top of the page
	if (windowScroll > 0) {
		headerElement.css('z-index', '100');
	} else {
		headerElement.css('z-index', '0');
	}
	
	// calculate header opacity as you scroll
	if (windowScroll <= headerHeight) {
		var headerOpacity = (windowScroll / headerHeight) * 0.7;
	} else {
		var headerOpacity = 0.7;
	}
	
	// remove opacity when main image is visible
	if ( mainimageElement.hasClass('visible') ) {
		headerElement.removeAttr('style');
		headerElement.css('background-color', 'rgba(0,0,0,0)');
	// remove transitions if grid is visible
	} else {
		// set header opacity
		headerElement.css({
			'transition': 'all 0s',
			'-webkit-transition': 'all 0s',
			'-moz-transition': 'all 0s',
			'background-color': 'rgba(0,0,0,'+ headerOpacity +')',
		});
	}
}

var clearPhotos = function() {
	photoImageElements.css({
		'background-image': 'none'
	});
}

var loadPhoto = function(image) {
	$(image).css({
		'background-image': 'url('+$(image).data('image')+')'
	});
}

var loadPhotos = function(image) {
	clearPhotos();
	loadPhoto(image);
	
	if ( image.next().length > 0 ) {
		loadPhoto(image.next());
	} else {
		loadPhoto($('#photos .img:first-child'));
	}
	if ( image.prev().length > 0 ) {
		loadPhoto(image.prev());
	} else {
		loadPhoto($('#photos .img:last-child'));
	}
}

// Adam's photo auto-scaling function
var scalePhoto = function(image) {
	var width = image.data('width'); // The original photo width
	var height = image.data('height'); // The original photo height
	
	console.log(width, height);
	var max = 1170;
	
	if (width > height) {
		ratio = width/height;
		if (width >= max) {
			width = max;
			height = parseInt(width/ratio);
		}
	} else if (width < height) {
		ratio = height/width;
		if (height >= max) {
			height = max;
			width = parseInt(height/ratio);
		}
	} else {
		ratio = 1;
		if (height >= max) {
			width = max;
			height = max;
		}
	}
	if (image.height() < height || image.width() < width) {
		image.css('background-size','contain')
	} else {
		image.css('background-size','auto')
	}
}

var resizePhoto = function(image) {
	$(image).css({
		'height': windowHeight,
	});	
}

var resizePhotos = function(image) {
	resizePhoto(image);
	
	// 
	// 	scalePhoto(image);
	// 
	
	if ( image.next().length > 0 ) {
		resizePhoto(image.next());
	} else {
		resizePhoto($('#photos .img:first-child'));
	}
	if ( image.prev().length > 0 ) {
		resizePhoto(image.prev());
	} else {
		resizePhoto($('#photos .img:last-child'));
	}
}

var currentPhoto = function(swipePos) {
	return $('#photos .img:nth-child(' + swipePos + ')');
}

// detect touch devices 
var isTouchDevice = function() {
	return !!('ontouchstart' in window) // works on most browsers 
		|| !!('onmsgesturechange' in window); // works on ie10
};

$(document).ready(function() {
	// initialize all the variables!
	headerHeight = $('header').outerHeight();
	
	if (isTouchDevice()) {
		mainimageTop = 0;
		windowHeight = $(window).height();
	} else {
		mainimageTop = $('header').outerHeight();
		windowHeight = $(window).height() - headerHeight;
	}
	
	windowWidth = $(window).width();
	count = $('.bgimg').size();
	rotatingBgElements = $('.rotatingbg');
	bgElement = $('#background');
	tempBgElement = $('#tempbackground');
	headerElement = $('header');
	photogridElement = $('#photogrid');
	mainimageElement = $('#mainimage');
	photoImageElements = $('#photos .img');
	thumbnailElements = $('.thumbnail');
	infopageElement = $('.infopage');
	
	if (isTouchDevice()) {
		$('body').addClass('touchdevice');
	}
	
	// Initialize Swipe.js
	window.mySwipe = new Swipe(document.getElementById('photos'), {
		speed: 300,
		continuous: true,
		disableScroll: true,
		callback: function(index, elem) {
			// resize and load photos
			swipePos = mySwipe.getPos() + 1;
			resizePhotos(currentPhoto(swipePos));
			loadPhotos(currentPhoto(swipePos));
			
			// swap active thumbnails while main image is visible
			if (mainimageElement.hasClass('visible')) {				
				retractThumbnail(selectedThumbnail);
				selectedThumbnail.addClass('background');
				
				selectedThumbnail = $('.thumbnail:nth-child(' + swipePos + ')');
				
				expandThumbnail(selectedThumbnail);
				selectedThumbnail.removeClass('background');
			}
		}
	});

	// lazy load thumbnails
	// $('.thumbimage').unveil();
	
	// show random background
	randomizeBackground();
	
	// resize all photo divs
	photoImageElements.css({
		'height': windowHeight
	});
	
	// place photo grid
	photogridElement.css({
		'top': headerHeight,
		'width': '99%',
	});

	// place info pages
	infopageElement.css('top', headerHeight);

	$(window).load(function() {
		// animate in home page ui
		setTimeout(function() {
			$('#collections').removeClass('hidden');
			$('#titlecard .offscreen').removeClass('offscreen');
		}, 1);
		
		// animate in thumbnails
		var delay = 0;
		$('.collection').each(function() {
			delay = delay + 100;
			var $this = this;
			setTimeout(function() {
				$($this).removeClass('offscreen');
			}, delay);
		});
		$('.thumbnail').each(function() {
			var $this = this;
			setTimeout(function() {
				$($this).removeClass('hidden');
			}, delay);
			delay = delay + 25;
		});
	});
	
	// On window resize
	$(window).on("resize", function() {
		headerHeight = $("header").outerHeight();
		windowHeight = $(window).height() - headerHeight;
		windowWidth = $(window).width();
		
		photogridElement.css('top', headerHeight);
		
		// resize full size photo
		if (mainimageElement.hasClass('visible')) {
			resizePhotos(currentPhoto(swipePos));
			mainimageElement.css({
				'height': windowHeight,
				'top': mainimageTop
			});	
		}
	});
	
	// check for home page
	if( bgElement.hasClass('homebg') ) {
		// don't display collections list
		$('header ul.left').css('display', 'none');
		headerElement.css('border', 'none');
	}
	
	if ( rotatingBgElements.length > 0 ) {
		// start background image crossfading loop
		rotateBackground();
	}
	
	// allow vertical mousewheel scrolling on homepage collections list
	var hscrollElement = $('.hscroll')
	hscrollElement.mousewheel(function(event, delta, deltaX, deltaY) {
		event.preventDefault();
		var scrollPosition = $('.hscroll').scrollLeft() - deltaY + deltaX;
		hscrollElement.scrollLeft(scrollPosition);
	});

	// change header opacity on scroll
	$(window).scroll(function() {
		if (isTouchDevice() == false) {
			setHeaderOpacity();
		}
	});
	
	// clicking on a thumbnail
	thumbnailElements.click(function() {
		selectedThumbnail = $(this);
		
		// animate out other thumbnails
		var delay = 0;
		thumbnailElements.each(function() {
			delay = delay + 10;
			var $this = $(this);
			setTimeout(function() {
				$this.addClass('background');
				selectedThumbnail.removeClass('background');
			}, delay);
		});
		
		// reset header opacity
		headerElement.removeAttr('style');
		if (mainimageElement.hasClass('black')) {
			headerElement.addClass('opaque');
		}
		
		// expand thumbnail
		setTimeout(function() {
			expandThumbnail(selectedThumbnail);
		}, 250);
		
		// activate and display photo view
		setTimeout(function() {
			swipePos = thumbnailElements.index(selectedThumbnail);
			loadPhotos(currentPhoto(swipePos));
			mySwipe.slide(swipePos, 1);
			mainimageElement.addClass('visible');
			mainimageElement.css({
				'height': windowHeight,
				'top': mainimageTop
			});
			
			if (isTouchDevice()) {
				headerElement.addClass('hidden');
			}
			$('.ui').removeClass('hidden');
		}, 500);
	});
	
	// hide photo view with back button
	$('.backbutton').click(function() {
		// Hide photo layer and current photo
		mainimageElement.removeClass('visible black');
		$('.ui').addClass('hidden');
		if (isTouchDevice()) {
			headerElement.removeClass('hidden');
		}
		mainimageElement.removeAttr('style');
		thumbnailElements.removeAttr('style');
		headerElement.removeClass('opaque');
		setHeaderOpacity();
		
		// put selected thumbnail back in its place
		retractThumbnail(selectedThumbnail);
		
		setTimeout(function() {
			// animate in other thumbnails
			var delay = 0;		
			thumbnailElements.each(function() {
				delay = delay + 10;
				var $this = $(this);
				setTimeout(function() {
					$this.removeClass('background');
				}, delay);
			});
		}, 1)
		
	});
	
	// Photo view next/previous buttons
	$('.photonav.button').click(function() {
		if ( $(this).hasClass('next') ) {
			mySwipe.next()
		} else if ( $(this).hasClass('prev') ) {
			mySwipe.prev()
		}
	});

	// Click photo to toggle photo info
	photoImageElements.click(function() {
		mainimageElement.toggleClass('black');
		$('.ui').toggleClass('hidden');
		headerElement.toggleClass('opaque');
	});
	// Disable photo info fading when clicking photo info links
	$(".photoinfo a").click(function(e) {
		e.stopPropagation();
	})
	
	// Keyboard input
	$(document.documentElement).keydown(function (event) {
		// escape key and up arrow
		if ( (event.keyCode == 27 || event.keyCode == 38) && mainimageElement.hasClass('visible') ) {
			$('.backbutton').trigger('click');
		}
		
		// left/right arrows
		if (event.keyCode == 37) {
			// Left arrow
			if (mainimageElement.hasClass('visible')) {
				$('.photonav.prev').trigger('click');
			} else {
				$('#collectioninfo .prev a').trigger('click');
			}
		} else if (event.keyCode == 39) {
			// Right arrow
			if (mainimageElement.hasClass('visible')) {
				$('.photonav.next').trigger('click');
			} else {
				$('#collectioninfo .next a').trigger('click');
			}
		}
	});
	
	// Open collection links in same window in iOS
	if (("standalone" in window.navigator) && window.navigator.standalone) {
		// For iOS Apps
		$('a').on('click', function(e) {
			e.preventDefault();
			var new_location = $(this).attr('href');
			if (new_location != undefined && new_location.substr(0, 1) != '#' && $(this).attr('data-method') == undefined) {
				window.location = new_location;
			}
		});
	}
	
});