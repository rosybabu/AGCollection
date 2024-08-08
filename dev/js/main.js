
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

    const startTime = 2; // Specify the start time in seconds
    const endTime = 60; // Specify the end time in seconds

    const video1 = $('#main_video')[0];

    function initializeVideo() {
        video1.currentTime = startTime;
        video1.play();
    }

    video1.addEventListener('loadedmetadata', function() {
        initializeVideo();
    });

    video1.addEventListener('timeupdate', function() {
        // Stop the video at the specified end time
        if (video1.currentTime >= endTime) {
            video1.pause();
            video1.currentTime = startTime; // Reset to the start time
        }
    });

    video1.addEventListener('pause', function() {
        // Reset to the start time when paused
        if (video1.currentTime < endTime) {
            video1.currentTime = startTime;
        }
    });

    video1.addEventListener('ended', function() {
        // Reset to the start time when the video ends
        video1.currentTime = startTime;
    });

    $(".btn__watchvideo").click(function (e) {
      e.preventDefault();
      $(".video-container").show();
      $('.home__videocontainer').addClass("videoHt");
      pdtop=$(window).height() ;
      // if ($(window).width() <= 1025){
      //   $(".home__videocontainer + .homepage__content").css("margin-top",'100vw');
      // } 
      $(".home__videorow").hide();
      $("#myVideo")[0].play();
      $(".video-pause").show();
      $(".video-play").hide();
       
    })

    $(".videotoggle").click(function (e) {
      e.preventDefault();
      $(".video-container").hide();
      $('.home__videocontainer').removeClass("videoHt");
      var video = $("#myVideo").get(0);
      video.pause();
      $(".home__videorow").show();
      // $(".home__videocontainer + .homepage__content").css("margin-top","0px");
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
    $(function () {
      $('#contactFormPhone').intlTelInput({
          autoHideDialCode: true,
          autoPlaceholder: "OFF",
          // dropdownContainer:$(".intl-tel-input"),
          formatOnDisplay: true,
         hiddenInput: "full_number",
          initialCountry: "ae",
        //  nationalMode: true,
          placeholderNumberType: "MOBILE",
          // preferredCountries: ['us','gb','in'],
          separateDialCode: true,
          fixDropdownWidth:true,
          formatAsYouType:true,
          countrySearch:true,
          validationNumberType: 'MOBILE',
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
      });
      
      $(".contactFormPhone").focus(function(){
       $(this).parents(".group").find("label").hide();
      });
    });
    
    $("#contactFormUi").validate({
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
  $(".html5-main-video").css("width", "100% !important");
  window.onload = function () {
    var element = document.getElementById('main_video');
    element.muted = "muted";
}
  main.hoverImg();
  AOS.init();
  main.contactValidn();
  main.humburger();
  main.slider();
  main.video();
  
 
  // phone number regex 
  $.validator.addMethod(
    "uaePhone",
    function (value, element) {
      // UAE phone number pattern without the country code
      var regex = /^(?:\+971|971|0)?5[0-9]{8}$|^(?:\+971|971|0)?[2-4679][0-9]{7}$/;
      return this.optional(element) || regex.test(value);
    },
    "Phone Number is not valid"
  );
  $.validator.addMethod("alphabetsnspace", function (value, element) {
    return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
  })

  // jQuery to handle form submission and message display  - Stay up to date with our latest news  
  $('#emailForm').submit(function(event) {   debugger
    event.preventDefault(); // Prevent form submission to server

    // Display the message span
    $('#message').fadeIn();
  });

// Map your choices to your option value
var lookup = {
  'jvc': ['1 Bedroom', '2 Bedroom', '3 Bedroom', 'Penthouse'],
  'businessbay': ['2 Bedroom', '3 Bedroom', '4 Bedroom', '5 Bedroom', 'Penthouse', 'Skyvilla']
};

// When an option is changed, search the above for matching choices
$('#contactinterest').on('change', function() {
  // Set selected option as variable
  var selectValue = $(this).val();

  // Empty the target field
  $('#contactinteresttype').empty();
  
  // For each chocie in the selected option
  for (i = 0; i < lookup[selectValue].length; i++) {
     // Output choice in the target field
     $('#contactinteresttype').append("<option value='" + lookup[selectValue][i] + "'>" + lookup[selectValue][i] + "</option>");
  }
});




})



