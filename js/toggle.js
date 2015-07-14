$(document).ready(function(){
  $( ".toggle-bt a" ).on("click", function(){
    $( ".toggle-bt a" ).removeClass("active");
    $( ".toggle-bt" ).toggleClass( "active" );
    // $( ".privacy-hidden" ).toggleClass( "active" );
    $(".privacy-hidden").slideToggle("fast");
    return false;
  });
});
