(function($) {
    $(function() {
      
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      $('.catalog-item__link').each(function(i){
          $(this).on('click', function(e){
              e.preventDefault();
            $('.catalog-item__main').eq(i).toggleClass('catalog-item__main_active');
            $('.catalog-item__about').eq(i).toggleClass('catalog-item__about_active');
          })
      })

      $('.catalog-item__back').each(function(i){
        $(this).on('click', function(e){
            e.preventDefault();
          $('.catalog-item__main').eq(i).toggleClass('catalog-item__main_active');
          $('.catalog-item__about').eq(i).toggleClass('catalog-item__about_active');
        })
    })
      
    });
})(jQuery);