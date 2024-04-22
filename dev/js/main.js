
var main = {
 
  //1.Function to implement humburger---HEADER
  humburger: function () {
    $('.burger').click(function () {
      $(this).toggleClass("active");
      $(this).parents(".hdr__menu-btn").find(".menu").toggleClass("header__menu");
      $(this).parents(".hdr__content").toggleClass("hdr__contentCls");
      $('body').toggleClass("overflowhidden");
    })
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



