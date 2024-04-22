var main = {
  /**
   * Function to activate testimonial slider
   */
  hometestimonialSlider: function () {
    $('.testimonials_right').slick({
      dots: true,
      infinite: true,
      slidesToShow: 2,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1.1,
            arrows: false,
            adaptiveHeight: true,
            dots: false,
          }
        },
      ]
    });

  },
  /**
  * Function to activate mobile toggle
  */
  hometoggle: function () {
    $("#menu__toggle").change(function () {
      if (this.checked) {
        $(".hdr-mobdropdown").css("display", "block");
      }
      else {
        $(".hdr-mobdropdown").css("display", "none");
      }
    });

    $(document).on('click', '.dropdown', function () {
      if ($(window).width() < 767) {
        $(this).find(".hdr_dropdown").toggleClass("openClass");
        $(this).siblings(".dropdown").find(".hdr_dropdown").removeClass("openClass");
      }
    })

    $(window).on('resize', function () {
      if ($(window).width() > 767) {
        $(".hdr-mobdropdown").css("display", "none");
      }
    })
  },
  /**
  * Function to activate map in footer
  */
  footerMap: function () {

    $(document).on('click', '.map_icon', function () {
      $(this).find(".footer-bg").show();
      var latitude = $(this).find(".googlemap_lat").text();
      var longitude = $(this).find(".googlemap_longi").text();
      console.log(latitude, longitude)
      var mapProp = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 5,
      };
      var map = new google.maps.Map(document.getElementsByClassName("googleMap"), mapProp);
      $("body").css("overflow", "hidden");
    })
    $(".footer-bg,.footer-close").click(function () {
      $(".footer-bg").hide();
      $("body").css("overflow", "auto");
    })
    $(document).on('click', '.footer-bg', function (event) {
      event.stopPropagation();
    })
  },
  /**
 * Function to activate fixed menu
 */
  aboutusfixed: function () {
    if ($(".about_us_menu--list")[0]) {
      var fixmeTop = $('.about_us_menu--list').offset().top;
    }
    $(window).scroll(function () {
      var currentScroll = $(window).scrollTop();
      if (currentScroll >= fixmeTop) {
        $('.about_us_menu--list').css({
          position: 'fixed',
          left: '50%',
          transform: 'translate(-50%, 0)',
          top: '60px'
        });
      } else {
        $('.about_us_menu--list').css({
          position: 'static',
          transform: 'none',
        });
      }
    });
  },
  /**
  * Function to activate banner slider 
  */
  aboutusScroll: function () {
    var sections = $('.about_us--section')
      , nav = $('.about_us_menu--list')
      , nav_height = nav.outerHeight() + $('header').outerHeight();
    $(window).on('scroll', function () {
      var cur_pos = $(this).scrollTop();

      sections.each(function () {
        var top = $(this).offset().top - nav_height,
          bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
          nav.find('a').removeClass('activeNav');
          sections.removeClass('activeNav');

          $(this).addClass('activeNav');
          nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('activeNav');
        }
      });
    });

    nav.find('a').on('click', function () {
      var $el = $(this)
        , id = $el.attr('href');
      nav.find('a').removeClass('activeNav');
      sections.removeClass('activeNav');

      $(this).addClass('activeNav');
      $('html, body').animate({
        scrollTop: $(id).offset().top
      }, 500);

      return false;
    });
    $(".dealershipashok_imagetablist a").click(function (e) {
      e.preventDefault();
      $(".dealershipashok_imagetablist a").removeClass("bgcolor");
      $(this).addClass("bgcolor");
      var id = $(this).attr("href");
      $('.dealershipashok_imagetab img').addClass("hidden")
      $(id).removeClass("hidden");
    });
  },
  /**
    * Function to activate banner slider 
    */
  slider: function () {
    var slider = $('.pdt-slider-single-wrap');
    $('.prev').click(function () {
      slider.slick('slickPrev');
      return false;
    });

    $('.next').click(function () {
      slider.slick('slickNext');
      return false;
    });
    slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: false,
      adaptiveHeight: true,
      useTransform: true,
      speed: 400,
      accessibility: false,
      lazyLoad: 'ondemand',
      prevArrow: $('.prev'),
      nextArrow: $('.next'),
      responsive: [{
        breakpoint: 1024,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      }]
    });

    $('.pdt-slider-nav-wrap')
      .on('init', function (event, slick) {
        $('.pdt-slider-nav-wrap .slick-slide.slick-current').addClass('is-active');
      })
      .slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        focusOnSelect: false,
        infinite: false,
        vertical: false,
        arrows: true,
        responsive: [{
          breakpoint: 1024,
          settings: {
            dots: false,
            slidesToShow: 4.8,
            slidesToScroll: 1,
            vertical: false,
            arrows: false,
            infinite: false,
          }
        }]
      });

    $('.pdt-slider-single-wrap').on('afterChange', function (event, slick, currentSlide) {
      $('.pdt-slider-nav-wrap').slick('slickGoTo', currentSlide);
      var currrentNavSlideElem = '.pdt-slider-nav-wrap .slick-slide[data-slick-index="' + currentSlide + '"]';
      $('.pdt-slider-nav-wrap .slick-slide.is-active').removeClass('is-active');
      $(currrentNavSlideElem).addClass('is-active');
    });

    $('.pdt-slider-nav-wrap').on('click', '.slick-slide', function (event) {
      event.preventDefault();
      var goToSingleSlide = $(this).data('slick-index');
      $('.pdt-slider-single-wrap').slick('slickGoTo', goToSingleSlide);
    });

  },
  /**
     * Function to activate zoom slider
     */
  sliderZoom: function () {
    $(document).on("click", ".pdt-zoom", function (e) {
      var clickedIndex = $(".pdt-slider-single-wrap  .slick-current").data("slick-index");
      $(".zoom-modal-singleSlider").slick("slickGoTo", clickedIndex);
      $(".zoom-modal").addClass("zoom-modalactive");
      $("body").addClass("body-overflow");
      e.preventDefault();
    });
    var slider = $('.zoom-modal-singleSlider');
    $('.prev').click(function () {
      slider.slick('slickPrev');
      return false;
    });

    $('.next').click(function () {
      slider.slick('slickNext');
      return false;
    });
    $(".zoom-modal-singleSlider")
      .not(".slick-initialized")
      .slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        adaptiveHeight: true,
        useTransform: true,
        speed: 400,
        accessibility: false,
        lazyLoad: 'ondemand',
        prevArrow: $('.prevzoom'),
        nextArrow: $('.nextzoom'),
        responsive: [{
          breakpoint: 1024,
          settings: {
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          }
        }]
      });
    $(".zoom-modalNav")
      .on("init", function (event, slick) {
        $(".zoom-modalNav .slick-slide.slick-current").addClass("is-active");
      })
      .not(".slick-initialized")
      .slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        focusOnSelect: false,
        infinite: false,
        vertical: false,
        arrows: false,
        responsive: [{
          breakpoint: 1024,
          settings: {
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            vertical: false,
            arrows: false,
            infinite: false,
          }
        }]
      });
    $(".zoom-modal-singleSlider").on("afterChange", function (event, slick, currentSlide) {
      $(".zoom-modalNav").slick("slickGoTo", currentSlide);
      var currrentNavSlideElem = '.zoom-modalNav .slick-slide[data-slick-index="' + currentSlide + '"]';
      $(".zoom-modalNav .slick-slide.is-active").removeClass("is-active");
      $(currrentNavSlideElem).addClass("is-active");
    });
    $(".zoom-modalNav").on("click", ".slick-slide", function (event) {
      event.preventDefault();
      var goToSingleSlide = $(this).data("slick-index");
      $(".zoom-modal-singleSlider").slick("slickGoTo", goToSingleSlide);
    });
    $(document).on('click', '.zoom-close', function (e) {
      $(".zoom-modal").removeClass("zoom-modalactive");
      $("body").removeClass("body-overflow");
      e.preventDefault();
    });
  },
  /**
   * Function to activate validation
   */
  contactusValidn: function () {
    $("#contactForm").validate({
      rules: {
        companyname: "required",
        contactperson: {
          required: true,
          minlength: 2,
          alphabetsnspace: true
        },
        email: {
          required: true,
          email: true
        },
        phone: {
          required: true
        }
      },
      messages: {
        contactperson: {
          minlength: main.getminlength('.contactperson'),
          alphabetsnspace: main.getalphabets('.contactperson'),
          required: main.getRequired('.contactperson')
        },
        companyname: {
          required: main.getRequired('.companyname')
        },
        email: {
          required: main.getRequired('.email')
        },
        phone: {
          required: main.getRequired('.phone')
        }
      }
    });

    $.validator.addMethod("alphabetsnspace", function (value, element) {
      return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
    })
    var input = document.querySelector(".phone"),
      errorMsg = document.getElementById("error-msg"),
      validMsg = document.getElementById("valid-msg");

    if ($('html').attr('lang') == "uae-ar") {
      var errorMap = ["رقم غير صالح", "رمز الدولة غير صالح", "قصير جدًا", "طويل جدًا", "رقم غير صالح"];
    }
    else {
      var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
    }

    // initialise plugin
    var iti = window.intlTelInput(input, {
      utilsScript: "../../js/lib/utils.js?1638200991544",
      formatOnDisplay: false,
      nationalMode: false,
      autoPlaceholder: 'aggressive',
      separateDialCode: true,
      onlyCountries: ['IN', 'JO', 'QA', 'KW', 'SA', 'AE']
    });


    var reset = function () {
      input.classList.remove("error");
      errorMsg.innerHTML = "";
      errorMsg.classList.add("hide");
      validMsg.classList.add("hide");
    };

    // on blur: validate
    input.addEventListener('blur', function () {
      reset();
      if (input.value.trim()) {
        if (iti.isValidNumber()) {
          validMsg.classList.remove("hide");
        } else {
          input.classList.add("error");
          var errorCode = iti.getValidationError();
          errorMsg.innerHTML = errorMap[errorCode];
          errorMsg.classList.remove("hide");
        }
      }
    });

    // on keyup / change flag: reset
    input.addEventListener('change', reset);
    input.addEventListener('keyup', reset);

  },
  /**
  * Function to activate validation in bookservice
  */
  bookServiceValidn: function () {
    $(".datepicker").datepicker(
      {
        changeMonth: true,
        changeYear: true
      }
    );
    $('input.timepicker').timepicker();
    $("#bookserviceForm").validate({
      rules: {
        full_name: {
          required: true,
          minlength: 2,
          alphabetsnspace: true
        },
        bookemail: {
          required: true,
          email: true
        },
        phone: {
          required: true
        },
        bookcity: {
          required: true
        },
        veh_brand: {
          required: true
        },
        veh_model: {
          required: true
        },
        veh_number: {
          required: true
        },
        service_center: {
          required: true
        },
        date: {
          required: true
        },
        time: {
          required: true
        },
      },
      messages: {
        full_name: {
          required: main.getRequired(".full_name"),
          minlength: main.getminlength('.full_name'),
          alphabetsnspace: main.getalphabets('.full_name'),
        },
        bookemail: {
          required: main.getRequired(".bookemail"),
        },
        phone: {
          required: main.getRequired(".phone"),
        },
        bookcity: {
          required: main.getRequired(".bookcity"),
        },
        veh_brand: {
          required: main.getRequired(".veh_brand"),
        },
        veh_model: {
          required: main.getRequired(".veh_model"),
        },
        veh_number: {
          required: main.getRequired(".veh_number"),
        },
        service_center: {
          required: main.getRequired(".service_center"),
        },
        date: {
          required: main.getRequired(".datepicker"),
        },
        time: {
          required: main.getRequired(".timepicker")
        }
      }
    });
    $.validator.addMethod("alphabetsnspace", function (value, element) {
      return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
    })
    $("#bookcity").select2({
    });
    $("#service_center").select2({
    });

  },
  rqTabs: function () {
    $(document).on('click', '.rq__tab-headwrap a', function (e) {
      e.preventDefault();
      $('.rq__tab-headwrap li').removeClass('section__rqtabs--active');
      $(this).parent().addClass('section__rqtabs--active');
      let currentTab = $(this).attr('href');
      $('.rq__tab--bodyWrap').hide();
      $(currentTab).show();
    });
  },
  rqSelect:function(){
   // $(".rq_formContainer").find('.form_field_outer').first().find('.remove_node_btn_frm_field').prop('disabled', true);
    $(".brandVeh").select2({
      templateResult: formatState,
      dropdownPosition: 'below',
      containerCssClass: "custom-container",
      dropdownCssClass: "rq_brandVehdropdown",
    });
    $(".vehicle_brand").select2({
      dropdownPosition: 'below'
    });
	$(".vehicle_brandpart").select2({
      dropdownPosition: 'below'
    });
    $(".city_select").select2({
      dropdownPosition: 'below'
    });
    $(".brandParts").select2({
      dropdownPosition: 'below',
      containerCssClass: "rq_partsbrand",
      dropdownCssClass: "rq_partsbranddropdown",
    });
    function formatState(state) {
      var data = $(state.element).data();
      var text = $(state.element).text();
      if (data && data['img_src']) {
        img_src = data['img_src'];
        template = $("<div class='veh__type--option'><div class='veh__single'><img src=\"" + img_src + "\"/><p>" + text + "</p></div>");
        return template;
      }
    }
    
    $('#fileUpload1').change(function() {
      var file = $('#fileUpload1')[0].files[0].name;
      $(this).parents('.upload-btn-wrapper').find('span').text(file);
    });
  },
  rqValidn:function(){
    
     $("#requestFormVehs").validate({ 
      rules: {
        contactperson: {
          required: true,
          minlength: 2,
          alphabetsnspace: true
        },
        brand: {
          required: false
        },
        email: {
          required: true,
          email: true
        },
        phone: {
          required: true
        },
        city_select: {
          required: true
        },
        companyname: {
          required: true
        },
        file: {
          extension: "pdf,docx,txt"
      }
      },
      messages: {
        contactperson: {
          required: main.getRequired(".rq_formField .contactperson"),
          minlength: main.getminlength('.rq_formField .contactperson'),
          alphabetsnspace: main.getalphabets('.rq_formField .contactperson'),
        },
        email: {
          required: main.getRequired(".rq_formField .email"),
        },
        phone: {
          required: main.getRequired(".rq_formField .phone"),
        },
        city_select: {
          required: main.getRequired(".rq_formField .city_select"),
        },
        companyname: {
          required: main.getRequired(".rq_formField .companyname"),
        },
       
      }
    });
    var input = document.querySelector(".phone"),
    errorMsg = document.getElementById("error-msg"),
    validMsg = document.getElementById("valid-msg");
  
  if ($('html').attr('lang') == "uae-ar") {
    var errorMap = ["رقم غير صالح", "رمز الدولة غير صالح", "قصير جدًا", "طويل جدًا", "رقم غير صالح"];
  }
  else {
    var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
  }
  
  // initialise plugin
  var iti = window.intlTelInput(input, {
    utilsScript: "../../js/lib/utils.js?1638200991544",
    formatOnDisplay: false,
    nationalMode: false,
    autoPlaceholder: 'aggressive',
    separateDialCode: true,
    onlyCountries: ['IN', 'JO', 'QA', 'KW', 'SA', 'AE']
  });
  
  
  var reset = function () {
    input.classList.remove("error");
    errorMsg.innerHTML = "";
    errorMsg.classList.add("hide");
    validMsg.classList.add("hide");
  };
  
  // on blur: validate
  input.addEventListener('blur', function () {
    reset();
    if (input.value.trim()) {
      if (iti.isValidNumber()) {
        validMsg.classList.remove("hide");
      } else {
        input.classList.add("error");
        var errorCode = iti.getValidationError();
        errorMsg.innerHTML = errorMap[errorCode];
        errorMsg.classList.remove("hide");
      }
    }
  });
  
  // on keyup / change flag: reset
 // on keyup / change flag: reset
 input.addEventListener('change', reset);
 input.addEventListener('keyup', reset);
    $("#requestFormParts").validate({ 
      rules: {
        contactperson: {
          required: true,
          minlength: 2,
          alphabetsnspace: true
        },
        brand: {
          required: false
        },
        email: {
          required: true,
          email: true
        },
        phone: {
          required: true
        },
        city_select: {
          required: true
        },
        companyname: {
          required: true
        },
        file: {
          extension: "pdf,docx,txt"
      }
      },
      messages: {
        contactperson: {
          required: main.getRequired("#requestFormParts .rq_formField .contactperson"),
          minlength: main.getminlength('#requestFormParts .rq_formField .contactperson'),
          alphabetsnspace: main.getalphabets('#requestFormParts .rq_formField .contactperson'),
        },
        email: {
          required: main.getRequired("#requestFormParts .rq_formField .email"),
        },
        phone: {
          required: main.getRequired("#requestFormParts .rq_formField .phone"),
        },
        city_select: {
          required: main.getRequired("#requestFormParts .rq_formField .city_select"),
        },
        companyname: {
          required: main.getRequired("#requestFormParts .rq_formField .companyname"),
        },
       
      }
    });
    $.validator.addMethod("alphabetsnspace", function (value, element) {
      return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
    })
    $('input[type="file"]').each(function() {
      $(this).change(function(e){
          var val = $(this).val();
          var filename = val.replace(/^.*[\\\/]/, '');
          $(this).siblings('.file-selected').text(filename);
      });
  });
  var input1 = document.querySelector("#requestFormParts .rq_formField .phone1"),
  errorMsg1 = document.getElementById("error-msg1"),
  validMsg1 = document.getElementById("valid-msg1");

if ($('html').attr('lang') == "uae-ar") {
  var errorMap = ["رقم غير صالح", "رمز الدولة غير صالح", "قصير جدًا", "طويل جدًا", "رقم غير صالح"];
}
else {
  var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
}

// initialise plugin
var iti = window.intlTelInput(input1, {
  utilsScript: "../../js/lib/utils.js?1638200991544",
  formatOnDisplay: false,
  nationalMode: false,
  autoPlaceholder: 'aggressive',
  separateDialCode: true,
  onlyCountries: ['IN', 'JO', 'QA', 'KW', 'SA', 'AE']
});


var reset = function () {
  input1.classList.remove("error");
  errorMsg1.innerHTML = "";
  errorMsg1.classList.add("hide");
  validMsg1.classList.add("hide");
};

// on blur: validate
input1.addEventListener('blur', function () {
  reset();
  if (input1.value.trim()) {
    if (iti.isValidNumber()) {
      validMsg1.classList.remove("hide");
    } else {
      input1.classList.add("error");
      var errorCode = iti.getValidationError();
      errorMsg1.innerHTML = errorMap[errorCode];
      errorMsg1.classList.remove("hide");
    }
  }
});

// on keyup / change flag: reset
input1.addEventListener('change', reset);
input1.addEventListener('keyup', reset);
  },
  getRequired: function (selector) {
    return $(selector).attr('data-required');
  },
  getalphabets: function (selector) {
    return $(selector).attr('data-alphabetsnspace');
  },
  getExtension: function (selector) {
    return $(selector).attr('data-extension');
  },
  getminlength: function (selector) {
    return $(selector).attr('data-minLength');
  },
 newRow:function(){
  $('.rq_formField .cmcclass').change(function() {
    var empty = false;
    $('.rq_formField .cmcclass').each(function() {
        if ($(this).val() == '') {
            empty = true;
        }
    });
    if (empty) {
        $('.add_new_frm_field_btn').prop('disabled', true);    } else {
         $('.add_new_frm_field_btn').prop('disabled', false);;  }
});
$('.rq_formField .cmcclass1').change(function() {
  var empty = false;
  $('.rq_formField .cmcclass1').each(function() {
      if ($(this).val() == '') {
          empty = true;
      }
  });
  if (empty) {
      $('.add_new_parts_field_btn').prop('disabled', true);    } else {
       $('.add_new_parts_field_btn').prop('disabled', false);;  }
});
  $("body").on("click",".add_new_frm_field_btn", function (e){ 
    e.preventDefault();
       $('.add_new_frm_field_btn').prop('disabled', true);
    
    $(".brandVeh").prop('disabled', false);
    
    $('.vehicle_brand').select2("destroy");
    $(".brandVeh").select2("destroy")
     noOfDivs = $(this).parents(".rq_formContainer").find('.form_field_outer').length;
    var clonedDiv =  $(this).parents(".rq_formContainer").find('.form_field_outer').first().clone(true);
    clonedDiv.find('.brandVeh').attr('id', 'brandveh' + noOfDivs)
    clonedDiv.insertBefore(".tool-placeholder");
    clonedDiv.attr('id', 'tooltest' + noOfDivs);
    
	$(this).parents(".rq_formContainer").find('.form_field_outer:last').find(".brandVeh").prop('disabled', true);
	var empty = false;
    $('.form_field_outer:last').find('.rq_formField .cmcclass').each(function() {
        if ($(this).val() == '') {
            empty = true;
            console.log("empty");
        }
    });
    if (empty) {
        $('.add_new_frm_field_btn').prop('disabled', true);    } else {
         $('.add_new_frm_field_btn').prop('disabled', false);;  }
    $(".vehicle_brand").select2({
      dropdownPosition: 'below'
    });
    $(".brandVeh").select2({
      templateResult: formatState,
      dropdownPosition: 'below',
      containerCssClass: "custom-container",
      dropdownCssClass: "rq_brandVehdropdown",
    });
    
    function formatState(state) {
      var data = $(state.element).data();
      var text = $(state.element).text();
      if (data && data['img_src']) {
        img_src = data['img_src'];
        template = $("<div class='veh__type--option'><div class='veh__single'><img src=\"" + img_src + "\"/><p>" + text + "</p></div>");
        return template;
      }
    }
  });
  $("body").on("click",".add_new_parts_field_btn", function (e){ 
    e.preventDefault();
        $(".brandParts").prop('disabled', false);
           $('.vehicle_brandpart').select2("destroy");
       $(".brandParts").select2("destroy");
       var noOfDivs = $(this).parents(".rq_formContainer").find('.form_field_outer1').length;
       var clonedDiv =  $(this).parents(".rq_formContainer").find('.form_field_outer1').first().clone(true);
     clonedDiv.find('.brandParts').attr('id', 'brandPart' + noOfDivs)
       clonedDiv.insertBefore(".tool-placeholder1");
       clonedDiv.attr('id', 'tooltest' + noOfDivs);
     $(this).parents(".rq_formContainer").find('.form_field_outer1:last').find(".brandParts").prop('disabled', true);
       $(".vehicle_brandpart").select2({
         dropdownPosition: 'below'
       });
       $(".brandParts").select2({
         dropdownPosition: 'below',
         containerCssClass: "rq_partsbrand",
         dropdownCssClass: "rq_partsbranddropdown",
       });
       
     });
  $("body").on("click", ".remove_node_btn_frm_field", function () {
    $(this).closest(".form_field_outer_row").remove();
  }); 
 
 }

}

$(document).ready(function () {
	var noOfDivs = "";
  main.rqSelect();
  main.rqTabs();
  main.newRow();
  main.rqValidn();
  main.aboutusScroll();
  main.aboutusfixed();
  main.hometestimonialSlider();
  main.hometoggle();
  main.footerMap();
  main.slider();
  main.sliderZoom();
  main.contactusValidn();
  main.bookServiceValidn();
})
