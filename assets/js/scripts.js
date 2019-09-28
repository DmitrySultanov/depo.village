(function() {

	function init() {
    	initWow();
		bindEvents();
        initPhoneMask();
        mfPopup();
        initFancybox();
        initGallerySlider();
        initTabs();
        initEventSlider();
        initDatepicker();
        parallaxBG();
        headerScroll();
        initMap();
    }

    function initWow() {
    	var wow = new WOW({
		    mobile: false,
		  });
		wow.init();
    }

    function bindEvents() {
        $('nav > a').on('click', pushyLinkClicked);
        $('.popup-modal-dismiss').on('click', popupModalDismiss);
        $('.js-booking-go').on('click', toggleDatepicker);
        $('.js-lang-select').on('click', langSelect);
        $('.accordion-item__title').on('click', accordion);
        $('.clicked').trigger('click');
    }

    function parallaxBG() {
    	$(window).scroll(function () {
    		$('.js-parallax-bg').css({'background-position-y' : -$(window).scrollTop() / 3 + 'px'});
		});
    }

    function initPhoneMask() {

        $('input.phone').inputmask("+79999999999");
    }

    function initFancybox() {
        $('[data-fancybox]').fancybox({
        // Options will go here
        });
    }

	function initGallerySlider() {
		var gallerySwiper = new Swiper('.gallery .swiper-container', {
			grabCursor: true,
			effect: 'coverflow',
			centeredSlides: true,
			slidesPerView: 3,
			speed: 600,
			loop: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
			},
			watchSlidesProgress: true,
			coverflowEffect: {
				rotate: 20,
				stretch: 0,
				depth: 200,
				modifier: 1,
				slideShadows : true,
			},
			pagination: {
				el: '.gallery .swiper-pagination'
			},
			navigation: {
				prevEl: '.gallery .swiper-button-prev',
				nextEl: '.gallery .swiper-button-next',
			},
			breakpoints: {
		    // when window width is <= 320px
		    1200: {
		      slidesPerView: 2,
		    },
		    // when window width is <= 640px
		    767: {
		      slidesPerView: 1
		    }
		  }
		});

		// gallerySwiper.forEach(function(elem){
		// 	elem.slideNext();
		// });
	};

	function initTabs() {
		var roomSlider = new Swiper('.nav-slider .rooms-slider', {
			effect: 'coverflow',
			speed: 900,
			grabCursor: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
			},
			watchSlidesProgress: true,
			coverflowEffect: {
				rotate: 50,
				stretch: 0,
				depth: 40,
				modifier: 1,
				slideShadows : true,
			},
			navigation: {
				nextEl: '.nav-slider .swiper-button-next',
				prevEl: '.nav-slider .swiper-button-prev',
			}
		});

		$('.tabs-nav li').each(function(i){
			$(this).attr('data-tab', i);
		});

		$('.tab-content>li').each(function(i){
			$(this).attr('data-tab', i);
		});

		$('.tabs-nav li').on('click', function(){
			var dataTab = $(this).data('tab');
			var getWrapper = $(this).closest('.tabs-wrapper');

			$(this).siblings().removeClass('active');
			$(this).addClass('active');

			getWrapper.find('.tab-content>li').hide();
			getWrapper.find('.tab-content>li[data-tab='+dataTab+']').fadeIn('slow');
			roomSlider[dataTab].update();

			return false
		});
	}

	function initEventSlider() {
		eventsSwiper = new Swiper('.events-slider .swiper-container', {
			grabCursor: true,
			// loop: true, //включить когда будет больше одного события
			speed: 600,
			slidesPerView: 1,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
			},
			watchSlidesProgress: true,
	        navigation: {
	            nextEl: '.events-slider .swiper-button-next',
	            prevEl: '.events-slider .swiper-button-prev',
	        }
	    });
	}

	function accordion (context) {
		var  context = context.currentTarget,
			 count = $(context).parent().attr('data-count'),
		 	 itemRow = $(context).closest('.item-row'),
		     currentExpandedTop = $('li[data-count='+ count +']', itemRow).find('.gallery-top'),
		     currentExpandedNext = $('li[data-count='+ count +']', itemRow).find('.gallery-top > .swiper-navigation > .swiper-button-next.js-mas-next'),
		     currentExpandedPrev = $('li[data-count='+ count +']', itemRow).find('.gallery-top > .swiper-navigation > .swiper-button-prev.js-mas-prev'),
		     currentExpanded = $('li[data-count='+ count +']', itemRow);


        $('.accordion-item__title').removeClass('active');
      	$('.item-row').removeClass('active');
      	$(context).addClass('active');
      	itemRow.addClass('active');

      	$('.expanded-row > li').slideUp();
      	currentExpanded.slideDown();
      	if(currentExpandedTop.length) {
	      	var galleryTop = new Swiper($(currentExpandedTop), {
		      	effect: 'cube',
		      	speed: 500,
		      	preloadImages: false,
				lazy: {
					loadPrevNext: true,
				},
				watchSlidesProgress: true,
		      	navigation: {
					nextEl: $(currentExpandedNext),
					prevEl: $(currentExpandedPrev),
				}
		    });
	      	setTimeout(function(){
	      		galleryTop.update();
	      	}, 200);
      	}

      	if($('.js-single-gallery').length) {
			$(".js-single-gallery .js-mas-slider").each(function(index, element){
				var $this = $(this);
			    $this.addClass("instance-" + index);
			    $this.find(".swiper-button-prev").addClass("btn-prev-" + index);
			    $this.find(".swiper-button-next").addClass("btn-next-" + index);
			    var swiper = new Swiper(".instance-" + index, {
			        effect: 'cube',
		      		speed: 500,
		      		navigation: {
				        nextEl: ".btn-next-" + index,
				        prevEl: ".btn-prev-" + index
		      		}
			    });
			});
      		var singleGallerySwiper = new Swiper('.js-single-gallery.swiper-container', {
				slidesPerView: 1,
				autoHeight: true,
				speed: 600,
				navigation: {
					prevEl: '.js-single-gallery.swiper-container > .swiper-navigation > .js-single-prev',
					nextEl: '.js-single-gallery.swiper-container > .swiper-navigation > .js-single-next',
				}
			});
      	}
	}

    function initMap() {
        var myMap;
        ymaps.ready(function () {
            myMap = new ymaps.Map('map', {
                controls: ['zoomControl', 'fullscreenControl'],
                center: [52.646410, 44.262220],
                zoom: 9
            }, {
                searchControlProvider: 'yandex#search'
            });

            myMap.behaviors.disable('scrollZoom');

            var myPlacemark = new ymaps.Placemark([52.646410, 44.262220], {
                hintContent: 'Деревушка на опушке'
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'assets/img/map_icon.svg',
                iconImageSize: [76, 94],
                iconImageOffset: [-38, -94]
            });


            myMap.geoObjects.add(myPlacemark);
        });
    }

    function initDatepicker() {
    	$('.airdatepicker').datepicker({
		    minDate: new Date(),
		    inline: true,
		    placeholder: 'Выберите дату',
		    range: true,
		    multipleDatesSeparator: " - ",
		});
    }

    function mfPopup(context) {
	    $('.popup-modal-up').magnificPopup({
	        type: 'inline',
	        preloader: false,
	        modal: true,
	        callbacks: {
			    open: function() {
			    	if($(this.currItem.el).hasClass('js-routemap-up')) {
				      	initRouteMap();
			    	}
			    	if($(this.currItem.el).hasClass('hab-btn')) {
				      	orderHabitation(this);
			    	}
			    },
			    close: function() {
			    	// initRouteMap.myRouteMap.destroy();
			    }
			}
	    });
    }

    function toggleDatepicker (e) {
        e.preventDefault();
        $(this).parent().toggleClass('active');
        $(this).siblings('.bookdate-picker').slideToggle('slow');
    }

    function popupModalDismiss (e) {
        e.preventDefault();
        $.magnificPopup.close();
    }

    function initRouteMap() {
        var myRouteMap;

	    myRouteMap = new ymaps.Map('routemap', {
	        center: [53.19627116225333,45.01854251843261],
	        zoom: 9,
	        controls: ['routePanelControl', 'zoomControl']
	    }, {
	        searchControlProvider: 'yandex#search'
	    });

	    var control = myRouteMap.controls.get('routePanelControl');
	    var from = control.routePanel.geolocate('from');
	    control.routePanel.options.set({
          	types: {
              auto: true,
              pedestrian: true,
              taxi: true
          	}
      	});
      	control.routePanel.state.set({
          type: "auto",
          from: from || [53.19627116225333,45.01854251843261],
          to: [52.646410, 44.262220]
      	});

	    myRouteMap.behaviors.disable('scrollZoom');

	    $('.popup-modal-dismiss').on('click', function(){
	    	myRouteMap.destroy();
	    });
    }

    function pushyLinkClicked(e) {
        var body = $('body');
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;

        if(body.hasClass('pushy-open-left')) {
        	body.removeClass('pushy-open-left');
        }

        body.animate( { scrollTop: destination }, 1100 );
        $('html').animate( { scrollTop: destination }, 1100 );
        body.removeClass('pushy-open-left');
        return false;
    }

    function headerScroll() {
    	var headerNav = $('header');

    	$(window).scroll(function () {
    		if($('.js-lang-select').hasClass('active')){
    			$('.js-lang-select').removeClass('active');
    			$('.js-lang-select').children('ul').fadeOut();
    		}

		  	if($(window).scrollTop() > headerNav.outerHeight()) {
		  		headerNav.addClass('active');
		  	} else {
		  		headerNav.removeClass('active');
		  	}
		});
    }

    function langSelect(e) {
        var elem = e.currentTarget,
        	dropdown = $('ul', elem),
        	field = $('.selected', elem);

        $(elem).toggleClass('active');
        dropdown.fadeToggle();

        dropdown.children().on('click', function() {
        	field.html($(this).html());
        });
    }

    function orderHabitation(context) {
    	var	contextBtn = $(context.currItem.el),
    		titleInPopup = contextBtn.parent().find('.hab-card__title').text(),
    		contextPopup = $(context.content),
    		hiddenFormField = contextPopup.find('input[type="hidden"]'),
    		habType = contextBtn.attr('data-habtype'),
    		contextPopupTitle = contextPopup.find('.popup-title');

    	contextPopupTitle.text(titleInPopup);
    	hiddenFormField.val(habType);
    }

    init();
})();