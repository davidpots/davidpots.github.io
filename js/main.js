// Parallax scroll for homepage
$(document).scroll(function(){
  if ($(window).width() > 1028) {
  	s = $(document).scrollTop();
  	$('.home-intro .content').css('-webkit-transform', 'translateY(' + (s/3) + 'px)');
  }
});

// FitText! To ensure certain text elements fit on one line. via http://fittextjs.com/
$(document).ready(function(){
  jQuery(".home-intro h1").fitText(1.0, { minFontSize: '20px', maxFontSize: '48px' });
  jQuery(".home-main p.sub").fitText(1.0, { minFontSize: '12px', maxFontSize: '17px' });
});