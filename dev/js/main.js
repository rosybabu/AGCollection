
var main = {

  //1.Function to implement humburger---HEADER
  humburger: function () {
    $('.burger').click(function (e) {
      e.stopPropagation();
      $(this).toggleClass("active");
      $(this).parents(".hdr__menu-btn").find(".menu").toggleClass("header__menu");
      $(this).parents(".hdr__content").toggleClass("hdr__contentCls");
      $(this).parents(".main__hdr-wrap").toggleClass("bg-blackhd");
      $('body').toggleClass("overflowhidden");
    })
    $('html').click(function() {
      $(".burger").removeClass("active");
      $(".menu").removeClass("header__menu");
      $(".hdr__content").removeClass("hdr__contentCls");
      $(".main__hdr-wrap").removeClass("bg-blackhd");
    });
    
   ;
  },
  //2.Function to implement slider
  slider: function () {
    var pagebanner = $('.homepage__sliderwrap');

    pagebanner.slick({
      infinite: true,
      // speed: 500,
      slidesToShow: 1,
      // slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      // speed: 5000,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            arrows: false,
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            slidesToShow: 1
          }
        }
      ]
    });
  },
  //3.video
  video: function () {
    $(".btn__watchvideo").click(function (e) {
      e.preventDefault();
      $(".video-container").show();
      $(".home__videorow").hide();
      $("#myVideo")[0].play();
      $(".video-pause").show();
      $(".video-play").hide();
    })
    $(".videotoggle").click(function (e) {
      e.preventDefault();
      $(".video-container").hide();
      $(".home__videorow").show();
    })

    var video = $("#myVideo")[0];
    var progressBar = $("#progressBar");
    var isDragging = false;
    $(".video-pause").hide();
    $("#playPauseBtn").click(function () {
      if (video.paused) {
        video.play();
        $(".video-pause").show();
        $(".video-play").hide();
      } else {
        video.pause();
        $(".video-pause").hide();
        $(".video-play").show();
      }
    });

    $("#stopBtn").click(function () {
      video.pause();
      video.currentTime = 0;
      $("#playPauseBtn").text("Play");
    });
    $(".video-unmute").hide();
    $("#muteBtn").click(function () {
      if (video.muted) {
        video.muted = false;
        $(".video-mute").show();
        $(".video-unmute").hide();
      } else {
        video.muted = true;
        $(".video-unmute").show();
        $(".video-mute").hide();
      }
    });

    progressBar.on("mousedown", function () {
      isDragging = true;
      video.pause();
    });

    $(document).on("mouseup", function () {
      if (isDragging) {
        isDragging = false;
        var value = progressBar.val();
        video.currentTime = (value * video.duration) / 100;
        video.play();
      }
    });

    progressBar.on("input", function () {
      if (isDragging) {
        var value = $(this).val();
        video.currentTime = (value * video.duration) / 100;
      }
    });

    // video.addEventListener("timeupdate", function () {
    //   if (!isDragging) {
    //     var value = (100 / video.duration) * video.currentTime;
    //     progressBar.val(value);
    //   }
    // });
  },
  //4.Function to implement contactform validation
  contactValidn: function () {
    $("#contactForm").validate({
      rules: {
        contactFormName: {
          required: true,
          minlength: 2,
          alphabetsnspace: true
        },
        contactFormCountry: {
          required: true,
          minlength: 2,
          alphabetsnspace: true
        },
        email: {
          required: true,
          email: true
        },
        contactFormPhone: {
          required: true,
          uaePhone: true
        },
        contactFormMessage:{
          required:true
        },
        contactbroker:{
          required:true,
        },
        contacthear:{
          required:true,
        },
        contactinterest:{
          required:true,
        }
      },
      messages: {
        contactFormName: {
          required: main.getRequired(".contact-form #contactFormName"),
          minlength: main.getminlength('.contact-form #contactFormName'),
          alphabetsnspace: main.getalphabets('.contact-form #contactFormName'),
        },
        contactFormCountry: {
          required: main.getRequired(".contact-form #contactFormCountry"),
          minlength: main.getminlength('.contact-form #contactFormCountry'),
          alphabetsnspace: main.getalphabets('.contact-form #contactFormCountry'),
        },
        email: {
          required: main.getRequired(".contact-form .email"),
        },
        contactFormPhone: {
          required: main.getRequired(".contact-form .contactFormPhone")
        },
        contactFormMessage:{
          required: main.getRequired(".contact-form .contactFormMessage"),
        },
        contactbroker: {
          required: main.getRequired(".contact-form .contactbroker")
        },
        contacthear:{
          required: main.getRequired(".contact-form .contacthear"),
        },
        contactinterest:{
          required: main.getRequired(".contact-form .contactinterest"),
        }
      }
    });
  },
  //5.hover effect
  hoverImg:function(){
    $(".partners_name1").hover(function(){
      $(".hover__imgshow1").show();
  }, function(){
    $(".hover__imgshow1").hide();
  });
  $(".partners_name2").hover(function(){
    $(".hover__imgshow2").show();
}, function(){
  $(".hover__imgshow2").hide();
});
  },
  getminlength: function (selector) {
    return $(selector).attr('data-minLength');
  },
  getRequired: function (selector) {
    return $(selector).attr('data-required');
  },
  getalphabets: function (selector) {
    return $(selector).attr('data-alphabetsnspace');
  },

}

$(document).ready(function () {
  AOS.init();
  main.humburger();
  main.slider();
  main.video();
  main.contactValidn();
  main.hoverImg();
  // phone number regex 
  $.validator.addMethod(
    "uaePhone",
    function (value, element) {
      // UAE phone number pattern without the country code
      var regex = /^[56789]\d{8}$/;
      return this.optional(element) || regex.test(value);
    },
    "Phone Number is not valid"
  );
  $.validator.addMethod("alphabetsnspace", function (value, element) {
    return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
  })
})



