/*
 * Chacha.js is a js template that implements multipass rendering with jquery mobile and mustache. 
 * The templates are all added  to DOM when the page loads. When a user clicks a link therefore 
 * loading a page, chacha renders the internal part of the script by calling the server with params.
 * 
 * The chacha script uses a config.js page that contains the page definitions.
 * The templates are loaded from separate pages in the views folder. Each page can have a different header
 * or footer. Chacha loads a header (if non is defined that simply 'header.htm') and a footer (same)
 * logic as header, for each page and generates the DOM
 */


// Begin chacha code

// Use the before hide event to add the ui-btn-active class to the navigation footer
$(document).bind( "pagebeforehide", function(event,data) {
	// The pagebeforehide event returns a data object called nextPage that points to the "page" 
	// div in the DOM. We use this event to add the "ui-btn-active" class to the navbar
	data.nextPage.contents().find("a").filter(function(){
		return this.text.toLowerCase().trim() === data.nextPage.attr('id');
	}).each(function(index){
		if(this.className.indexOf("ui-btn-active")<0){
			$(this).addClass("ui-btn-active");
		}
	});
});

// We catch the before change event. If the link type contains the link_prefix we call
// the load function
$(document).bind( "pagebeforechange", function( e, data ) {

	if ( typeof data.toPage === "string" ) {	
		var u = $.mobile.path.parseUrl( data.toPage ),
			re = app_data.link_prefix;

			if ( u.hash.search(re) !== -1 ) { 	
				// We get the page_name out of the url string before we load the page
				page_name = u.hash.split('?')[1].split('&')[0];
				params = u.hash.split('?')[1].split('&')[1];
				chacha.load_page(page_name,{data: data, params: params});
				e.preventDefault();
		}		
	}
});


var chacha = {
	init_app: function(){
		console.log('App is initializing');
		$('div[data-role="page"]').each(function(index) {
			if (index>0){
				var page_name = $(this).attr("id");
				if (app_pages[page_name]){
					var header = check_val(app_pages[page_name].header,'header');
					var footer = check_val(app_pages[page_name].footer,'footer');
					$.when( $.ajax( app_data.path_to_views+"app.htm" ), 
						$.ajax( app_data.path_to_views+header+".htm" ), 
						$.ajax( app_data.path_to_views+page_name+".htm" ), 
						$.ajax( app_data.path_to_views+footer+".htm" ))
					.done(function( app, header, content, footer ) {
						var page_template = (app[0]+header[0]+content[0]+footer[0]);
						// Break the page template into partials				
						var p_template = $(page_template).filter('#app_page').html();
						var p_header = $(page_template).filter('#page_header').html();
						var p_content = $(page_template).filter('#page_content').html();
						var p_footer = $(page_template).filter('#page_footer').html();
						partials = {
							"page_header": p_header,
							"page_content": p_content,
							"page_footer": p_footer
						};
						
						//If Header text is defined add it to app_data before creating it
						if(app_pages[page_name].header_text){
							app_data["page_header"]=app_pages[page_name].header_text;
						};
					
						//Render the template and partials
						html = Mustache.to_html(p_template, app_data, partials);
						$('#'+page_name).html(html);
						$('#'+page_name).page();
						$('#'+page_name).trigger('create');
						
						if(is_last_page_in_DOM (page_name)) {
							$.event.trigger({
								type: "appready"
							});
						}
					});	
				}
			}
		});
	},
	
	load_page: function(page_name, options){

		var reload = options.reload || false;
		var params = options.params || '';
		var data = options.data || [];
		var content = options.content || null;
		
		$.ajax({
			type: check_val(app_pages[page_name].request_type,'get'),
			url: check_val(app_pages[page_name].request_url, app_data.path_to_views+page_name+'.htm'),
			data: check_val(app_pages[page_name].request_params,'')
		}).done(function (result) {
			var template = $('#inner_'+page_name+'_content').html();//inner_wiz_settings_content
			
			if (content){
				var html = Mustache.render(template, content);	
			}else{
				var html = Mustache.render(template, result);
			}
    		
    		$('#'+page_name+'_content').html(html).trigger('create');
    		
    		// Allows reloading the same page with different content
    		if (reload){
    			$.mobile.changePage('#'+page_name, {allowSamePageTransition: true, transition: "slide"});	
    		}else{
    			$.mobile.changePage('#'+page_name, data.options);
    		}
		});
	}
};

/* Utilities */

function check_val (value, def){
	var ret = value !== undefined ? value : def;
	return ret;
}

function is_last_page_in_DOM (page){
	return page == $('div[data-role="page"]').last().attr("id");
}





