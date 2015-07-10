$(function() {
  var top = $('.sec1').offset().top; //初期値を取得

  $(window).scroll(function() {
    var value = $(this).scrollTop(); //スクロールの値を取得
    console.log( value );//182
    $('#sec1').css('top', top + value / 3);
  });
});
