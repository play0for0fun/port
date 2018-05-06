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

    var count = $('.bgimg').length;

    if (bgPhotoIndex > count) {
        bgPhotoIndex = 1;
    }
    // var randomValue = Math.floor( Math.random() * count) + 1;

    // // THIS IS A CRAZY HACK
    // // for some reason .bgimg:nth-child( <5 ) returns null... no idea why.
    // if (randomValue < 5) {
    // 	randomValue = 5;
    // }
    // END CRAZY HACK

    console.log('bgPhotoIndex', bgPhotoIndex, count);

    var element = $('.bgimg:nth-child(' + bgPhotoIndex + ')');


    var image = $(element).attr('data-image');

    bgElement.css('background-image', 'url(' + image + ')');

}

	var isMobile = false; //initiate as false
	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

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


    if (!isMobile) {

	    // repeat after an amount of time
	    setTimeout(function() {
	        rotateBackground();
	    }, 6000);

	}
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
    var fullTranslationX = windowWidth / 2 - thumbOffset.left - thumbSize / 2 + 'px';
    var fullTranslationY = scrollPosition + headerHeight + windowHeight / 2 - thumbOffset.top - thumbSize / 2 + 'px';

    // if the main image is being shown, remove transitions
    if (mainimageElement.hasClass('visible')) {
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
        'transform': 'translate3d(' + fullTranslationX + ',' + fullTranslationY + ',0) scale(' + fullScale + ')',
        '-webkit-transform': 'translate3d(' + fullTranslationX + ',' + fullTranslationY + ',0) scale(' + fullScale + ')',
        '-moz-transform': 'translate3d(' + fullTranslationX + ',' + fullTranslationY + ',0) scale(' + fullScale + ')',
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
    if (mainimageElement.hasClass('visible')) {
        headerElement.removeAttr('style');
        headerElement.css('background-color', 'rgba(0,0,0,0)');
        // remove transitions if grid is visible
    } else {
        // set header opacity
        headerElement.css({
            'transition': 'all 0s',
            '-webkit-transition': 'all 0s',
            '-moz-transition': 'all 0s',
            'background-color': 'rgba(0,0,0,' + headerOpacity + ')',
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
        'background-image': 'url(' + $(image).data('image') + ')'
    });
}

var loadPhotos = function(image) {
    clearPhotos();
    loadPhoto(image);

    if (image.next().length > 0) {
        loadPhoto(image.next());
    } else {
        loadPhoto($('#photos .img:first-child'));
    }
    if (image.prev().length > 0) {
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
        ratio = width / height;
        if (width >= max) {
            width = max;
            height = parseInt(width / ratio);
        }
    } else if (width < height) {
        ratio = height / width;
        if (height >= max) {
            height = max;
            width = parseInt(height / ratio);
        }
    } else {
        ratio = 1;
        if (height >= max) {
            width = max;
            height = max;
        }
    }
    if (image.height() < height || image.width() < width) {
        image.css('background-size', 'contain')
    } else {
        image.css('background-size', 'auto')
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

    if (image.next().length > 0) {
        resizePhoto(image.next());
    } else {
        resizePhoto($('#photos .img:first-child'));
    }
    if (image.prev().length > 0) {
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
        ||
        !!('onmsgesturechange' in window); // works on ie10
};

$(document).ready(function() {
    // initialize all the variables!
    headerHeight = $('header').outerHeight();

    if (isTouchDevice()) {
        mainimageTop = 0;
        windowHeight = window.innerHeight;
    } else {
        mainimageTop = $('header').outerHeight();
        windowHeight = window.innerHeight - headerHeight;
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

    // var  $photos = $('#photos');

    // if ($photos.hasClass('postprod') && !isMobile) {

    // 	$photos.find('.img').each(function(index, el) {
    // 		var $this = $(this);

    // 		$this.zoom({url:$this.attr('data-original'),
    // 					on:'grab'})
    // 	});

    // };

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

    function make_height() {
        headerHeight = $("header").outerHeight();
        if (isTouchDevice() == false) {

            windowHeight = window.innerHeight - headerHeight;
        } else {
            windowHeight = window.innerHeight
        }
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

    }
    // On window resize
    var height_global_timer = false;
    $(window).on("resize scroll", function() {

        if (height_global_timer) {
            clearTimeout(height_global_timer);
        }
        height_global_timer = setTimeout(function() {
            make_height()
        }, 50);

    });

    // check for home page
    if (bgElement.hasClass('homebg')) {
        // don't display collections list
        $('header ul.left').css('display', 'none');
        headerElement.css('border', 'none');
    }


    if (rotatingBgElements.length > 0) {
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
        if ($(this).hasClass('next')) {
            mySwipe.next()
        } else if ($(this).hasClass('prev')) {
            mySwipe.prev()
        }
    });

    // Click photo to toggle photo info
    // photoImageElements.click(function() {
    //     mainimageElement.toggleClass('black');
    //     $('.ui').toggleClass('hidden');
    //     headerElement.toggleClass('opaque');
    // });
    // Disable photo info fading when clicking photo info links
    photoImageElements.mouseover(function(){

    	if (!$(this).hasClass('zoom_inited') && !isMobile) {
    			var $this = $(this);
	    		$this.zoom({url:$this.attr('data-original'),
	    					on:'grab'})
	    		$this.addClass('zoom_inited');
    	}
    });

    $(".photoinfo a").click(function(e) {
        e.stopPropagation();
    })

    // Keyboard input
    $(document.documentElement).keydown(function(event) {
        // escape key and up arrow
        if ((event.keyCode == 27 || event.keyCode == 38) && mainimageElement.hasClass('visible')) {
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