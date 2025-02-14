$(document).ready(function () {
  // Инициализация Fancybox
  // $(".fancybox").fancybox({
  //   type: "iframe", // Указываем тип контента как iframe
  //   iframe: {
  //     preload: false, // Отключаем предварительную загрузку iframe
  //   },
  // });
  // $(function () {
  //   var mixer = mixitup(".directions__list");

  //   $(".directions__filter-btn").on("click", function () {
  //     $(".directions__filter-btn").removeClass(
  //       "directions__filter-btn--active"
  //     );
  //     $(this).addClass("directions__filter-btn--active");
  //   });
  // });

  $(".team__slider").slick({
    arrows: false,
    slidesToShow: 4,
    infinite: true,
    draggable: false,
    waitForAnimate: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          draggable: true,
        },
      },
    ],
  });

  $(".team__slider-prev").on("click", function (e) {
    e.preventDefault();
    $(".team__slider").slick("slickPrev");
  });

  $(".team__slider-next").on("click", function (e) {
    e.preventDefault();
    $(".team__slider").slick("slickNext");
  });

  $(".testimonials__slider").slick({
    arrows: false,
    dots: true,
    adaptiveHeight: true,
    appendDots: $(".testimonials__dots"),
    waitForAnimate: false,
    adaptiveHeight: true,
    // responsive:
    //   [
    //     {
    //       breakpoint: 700,
    //       settings: {

    //       },
    //     },
    //   ]
  });

  $(".testimonials__prev").on("click", function (e) {
    e.preventDefault();
    $(".testimonials__slider").slick("slickPrev");
  });

  $(".testimonials__next").on("click", function (e) {
    e.preventDefault();
    $(".testimonials__slider").slick("slickNext");
  });

  $(".program__acc-link").on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("program__acc-link--active")) {
      $(this).removeClass("program__acc-link--active");
      $(this).children(".program__acc-text").slideUp();
    } else {
      $(".program__acc-link").removeClass("program__acc-link--active");
      $(".program__acc-text").slideUp();
      $(this).addClass("program__acc-link--active");
      $(this).children(".program__acc-text").slideDown();
    }
  });

  $(".header__nav-list a, .header__top-btn").on("click", function (e) {
    e.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 800);
  });

  setInterval(() => {
    if (
      $(window).scrollTop() > 0 &&
      $(".header__top").hasClass("header__top--open") === false
    ) {
      $(".burger").addClass("burger--follow");
    } else {
      $(".burger").removeClass("burger--follow");
    }
  }, 0);
  $(".burger, .overlay, .header__top a").on("click", function (e) {
    e.preventDefault();
    $(".header__top").toggleClass("header__top--open");
    $(".overlay").toggleClass("overlay--show");
  });

  $(".footer__top-title--slide").on("click", function () {
    $(this).next().slideToggle();
  });

  //------------------whatsapp переадресация//-----------------------
  // Получение ссылки по id
  var whatsappLink = document.getElementById("whatsappLink");

  // Добавление обработчика события click
  whatsappLink.addEventListener("click", function () {
    // Получение значения атрибута href
    var hrefValue = this.getAttribute("href");

    // Открытие ссылки в новом окне или в том же окне
    window.open(hrefValue, "_blank"); // '_blank' открывает в новом окне
  });

  function check_form(cur_id) {
    var error = 0;
    $("#" + cur_id + ' input[type="text"]').each(function () {
      if ($(this).val() == "") {
        $(this).css("border", "1px solid red");
        error = 1;
      } else {
        $(this).css("border", "1px solid #3c3c3c");
      }
    });

    return error;
  }

  $("body").on("click", 'button[type="submit"]', function (e) {
    e.preventDefault();

    var cur_id = $(this).closest("form").attr("id");

    var error = check_form(cur_id);
    if (error == 0) {
      var msg = $("#" + cur_id).serialize();
      console.log(msg);
      $.ajax({
        dataType: "json",
        type: "POST",
        url: "mail.php",
        data: msg,
        success: function (result) {
          if (result.status == "success") {
            closePopup();
            openThanks();
          } else {
            alert("Не заполнены обязательные поля, повторите отправку");
          }
        },
        error: function (xhr, str) {
          alert("Возникла ошибка: " + xhr.responseCode);
        },
      });
    }
  });
});
