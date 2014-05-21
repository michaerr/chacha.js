//config file is the main routing mechanism

//Define main url for app
var app_server = "http://localhost:8080/";

//Define general information for the app
var app_data = {
    // Use for headers on pages
    name: "Application Name",
    // First page that should be loaded by main.js
    home_page: "default",
   
    // Used as the default prefix to differentiate regular links from links that need to be handled
    link_prefix: "app-page",
    
    // Path to views folder. All *.htm pages will be located in this folder
    path_to_views: "js/view/",
    
    user_id: 5,
    app_id: 5,
    
    // Do not remove
    // Used to close scripts that are loaded into the page
    script: "script",
};

//All routes are defined here
var app_pages = {
	default: {
		// Select the page that will be used as the header. If nothing is defined the default is 'header.htm'
		header: 'custom_header',
		
		// Select the page that will be used as the footer. If nothing is defined the default is 'footer.htm'
		footer: 'custom_footer',
		
		// Can be used to add a back button in the page
		back_button: true,
		
		// chacha supports post and get
		request_type: 'post',
		
		//URL for posting or getting
		request_url: app_server + 'request_page.json',
		
		//Params are send to request as a JS object
		request_params: {
			user_id: function () {
				return 5;
			},
			app_id: 5,
		}
	},
	sample: {
		back_button: true,
		request_type: 'post',
		request_url: app_server + 'request_page.json',
		request_params: {
			user_id: function () {
				return 5;
			},
			app_id: 5,
		}
	}

};

