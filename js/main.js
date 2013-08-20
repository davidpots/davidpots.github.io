// Parallax scroll for homepage
$(document).scroll(function(){
	s = $(document).scrollTop();
	$('.home-intro .content').css('-webkit-transform', 'translateY(' + (s/3) + 'px)');
});

$(document).ready(function(){
  jQuery(".home-intro h1").fitText(1.0, { minFontSize: '20px', maxFontSize: '48px' });
});