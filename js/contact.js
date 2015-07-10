// $(function(){
//   $(".boxer").boxer();
// });
//
$(document).ready(function(){


// jQuery(function($) {
  $("#cf").validationEngine('attach');

  $("#qname").validationEngine('attach', {
    promptPosition:"bottomLeft"
  });
  $("#qmail").validationEngine('attach', {
    promptPosition:"bottomLeft"
  });
  $("#qcomment").validationEngine('attach', {
    promptPosition:"bottomLeft"
  });

  //フォームスライダー
  var slide = $('.check-form-slide').slick({
    accessibility: false,
    slidesToShow: 1, //スライドが見える数
    slidesToScroll: 1, //スライドがスクロールする数
    infinite: false, //無限スクロール
    draggable: false, //マウスドラッグでのスクロール
    arrows: false,
    prevArrow: $( '.contact-form .reset-bt' ),
    nextArrow: $( '.contact-form .check-bt' )
  });

  $(document).on('click', '.reset-bt', function(){
    slide.slick('slickPrev');
  });

  //フォーム内容取得
  $(document).on('click', '.check-bt', function(){

    $('dd#cname').text( '' );
    $('dd#cmail').text( '' );
    $('dd#ctype').text( '' );
    $('dd#ccomment').text( '' );

    if( $("#cf").validationEngine('validate') ){
      slide.slick('slickNext');
    }

    $('dd#cname').text( qname.value );
    $('dd#cmail').text( qmail.value );
    $('dd#ctype').append( qtype.value );
    $('dd#ccomment').text( qcomment.value );

  });

  $(document).on('click', '.submit-bt', function(){
    var param = {};
    // var query = $('#cf').serializeArray();
    $( $('#cf').serializeArray() ).each(function(i, v){
      param[v.name] = v.value;
    });

    console.log(param);

    $.ajax({
      type: 'POST',
      async: true,
      data: param,
      dataType: 'text',
      url: './sendmemail.php',
      sucess: function(text){
        slide.slick('slickNext');
      },
      error: function(){
        alert("何らかの原因により、通信に失敗しました。");
        slide.slick('slickPrev');
      },
      complete: function(){
        slide.slick('slickNext');
      }
    });

  });

});
