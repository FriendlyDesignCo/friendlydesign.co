window.friendly = window.friendly || {};

// (function(carousel, $) {

var rotate = friendly.rotate = {

  defaults: {
    containerElement: '.portfolio-slider',
    containerWidth: 1400
  },

  init: function() {
    rotate.gatherRotators();
    this.defaults.containerWidth = $(this.defaults.containerElement).outerWidth();
  },

  // create a carousel for every slider on the page
  gatherRotators: function() {
    $(this.defaults.containerElement).each(function() {
      var $this = $( this );
      rotate.calcWidth( $this );
      rotate.addPager( $this );
    });

    rotate.bindEvents();
  },

  addPager: function( $elem ) {
    var buttons = '<a href="#" class="carousel-pager carousel-pager--prev is-end-of-slider"><span class="ir">Previous Slide</span></a><a href="#" class="carousel-pager carousel-pager--next"><span class="ir">Next Slide</span></a>';
    $(buttons).appendTo( $elem );
  },

  bindEvents: function() {
    $('.carousel-pager--prev').on('click', this.movePrev);
    $('.carousel-pager--next').on('click', this.moveNext);
  },

  movePrev: function(e) {
    e.preventDefault();
    var $target              = $( e.currentTarget );
    var $carousel            = $target.parents(rotate.defaults.containerElement);
    var $container           = $target.siblings('ul');
    var currentLeftPosition  = rotate.pxToPercentage( $container[0].offsetLeft ) * 100;
    var moveAmount           = rotate.pxToPercentage( rotate.childItemWidth() ) * 100;
    var newLeftPosition      = currentLeftPosition + moveAmount + '%';

    $container.css( 'left', newLeftPosition );
    $carousel.data( 'position', $carousel.data('position') - 1 );

    rotate.updatePosition( $carousel );
  },

  moveNext: function(e) {
    e.preventDefault();
    var $target              = $( e.currentTarget );
    var $carousel            = $target.parents(rotate.defaults.containerElement);
    var $container           = $target.siblings('ul');
    var currentLeftPosition  = rotate.pxToPercentage( $container[0].offsetLeft ) * 100;
    var moveAmount           = rotate.pxToPercentage( rotate.childItemWidth() ) * 100;
    var newLeftPosition      = currentLeftPosition - moveAmount + '%';

    $container.css( 'left', newLeftPosition );
    $carousel.data('position', $carousel.data('position') + 1);

    rotate.updatePosition( $carousel );
  },

  updatePosition: function( $carousel ) {
    position = $carousel.data( 'position' );
    children = $carousel.data( 'children' );
    $next    = $carousel.find( '.carousel-pager--next' );
    $prev    = $carousel.find( '.carousel-pager--prev' );
    if ( position === children ) {
      $next.addClass('is-end-of-slider');
    } else if ( position === 1 ) {
      $prev.addClass('is-end-of-slider');
    } else {
      $prev.removeClass('is-end-of-slider');
      $next.removeClass('is-end-of-slider');
    }
  },

  // take a number and output a percentage of container
  pxToPercentage: function(px) {
    return px / this.defaults.containerWidth;
  },

  calcWidth: function( $elem ) {
    var numberOfChildren = this.numberOfChildren( $elem );
    var childItemWidth   = this.childItemWidth();
    var containerWidth   = numberOfChildren * childItemWidth;
    this.setContainerWidth( $elem, containerWidth );
    $elem.attr( 'data-children', numberOfChildren );
  },

  childItemWidth: function() {
    var childItemWidth   = $(this.defaults.containerElement).find( 'li' ).outerWidth();
    return childItemWidth;
  },

  numberOfChildren: function( $elem ) {
    return $elem.find( 'li' ).length;
  },

  setContainerWidth: function( $elem, containerWidth ) {
    $elem.children( 'ul' ).width( containerWidth );
  }

}

// })(window.friendly, jQuery);

rotate.init()

$(window).on('resize', function() {
  $('.carousel-pager--prev').off('click', this.movePrev);
  $('.carousel-pager--next').off('click', this.moveNext);
  rotate.init();
});
