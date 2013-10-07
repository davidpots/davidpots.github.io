// FitText! To ensure certain text elements fit on one line. via http://fittextjs.com/
$(document).ready(function(){
  jQuery(".home-intro h1").fitText(1.0, { minFontSize: '12px', maxFontSize: '54px' });
  jQuery(".home-main p.sub").fitText(1.0, { minFontSize: '12px', maxFontSize: '19px' });
});