
// For Cordova applications use the deviceready event to load the page
$( document ).ready(function() {
  chacha.init_app();	
});

// The "appready" event is triggered by the chacha code once all pages are added to DOM
$(document).on( "appready", function() {
	chacha.load_page(app_data.home_page,{data: {options: {transition: "slide"}}});
});
