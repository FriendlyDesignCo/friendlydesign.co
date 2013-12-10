friendly = window.friendly = {};
friendly.aboutHeight;
friendly.mainHeight;
friendly.pageHeight;
friendly.navExpandedClass = 'is-expanded';

$(document).ready(function() {

  // toggle nav and get height of main container
  // $( '#nav-toggle-switch' ).on('click', function(e) {
  //   e.preventDefault();
  //   $(this).parent().toggleClass( friendly.navExpandedClass );
  // });

  $( '.content-slider' ).on('click', function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('is-active' );
    if( $('#main').hasClass('is-modal-active') ) {
      $('#main').removeClass('is-modal-active');
    }
  });

  $( '#page-contact' ).on('click', function(e) {
    e.preventDefault();
    scrollToTop();
    $( '#contact-pulldown' ).toggleClass('is-active' );
    $('#main').toggleClass('is-modal-active');
  });

  $( '#page-contact' ).on('click', function() {
    $( '#main-navigation' ).removeClass( friendly.navExpandedClass );
  });

  // use the esc key to close the contact pulldown or the nav
  $(this).on('keyup', function(e){
    if ( e.keyCode == 27 ) {
      if ( $( '#contact-pulldown' ).hasClass('is-active' ) ) {
        $( '#contact-pulldown' ).removeClass('is-active' );
        $( '#main' ).removeClass('is-modal-active');
      } else if ( $( '#main-navigation' ).hasClass( friendly.navExpandedClass ) ) {
        $( '#main-navigation' ).removeClass( friendly.navExpandedClass );
      }
    }
  });

  // slide the homepage down to reveal the about page underneath
  // $( '#page-about' ).on('click', function(e) {
  //   e.preventDefault();
  //   pageToggle();
  // });

  // $( '#about-closer' ).on('click', function(){
  //   pageToggle();
  //   scrollToTop();
  // });

  var scrollToTop = function() {
    jQuery('body' ).animate({
      scrollTop: 0
    }, 500);
  };

  function pageToggle() {
    var $page = $( '.page-coverup' );

    if ( $page.hasClass('is-hidden' ) ) {
      $( '#main' ).height( friendly.mainHeight );
      $( '.page-container' ).height( friendly.pageHeight );
      $page.removeClass('is-hidden' ).css('top', 0);
    } else {
      $( '#main' ).height( friendly.mainHeight + friendly.aboutHeight );
      $( '.page-container' ).height( friendly.pageHeight + friendly.aboutHeight );
      $page.addClass( 'is-hidden' ).css( 'top', friendly.aboutHeight );
    }

    // this just doesn't work too well...
    // $page.animate({
    //   top: +1500
    // }, 2500, function() {
    //   $(this).remove();
    // });
  }

});

function setHeights() {
  var $main = $( '#main' )
  $('body').removeClass('is-loading');
  friendly.aboutHeight = $('.page-about').outerHeight();
  friendly.mainHeight = $( '#main' ).height();
  friendly.pageHeight = $( '.page-container' ).height();
  $main.height(friendly.mainHeight);
}

$(window).load(function() {
  // setHeights();
});

$(window).one('scroll', function() {
  $('#main-navigation').removeClass('is-expanded');
})
