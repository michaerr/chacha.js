ChaCha.js
=========

Easy routing script for jquery mobile. Use chacha to define all your templates in a config.js file (similar to routes in Ruby on Rails). Use ChaCha to load pages in runtime. The script uses 'mustache' to renders all the templates once before it loads and then again with the data returned from a 'post' or 'get' everytime the page is loaded. Chacha is running under jquerymobile and is using 'mustache' for templating.

Instructions
------------

The following deffinition are defined in config.js:

```javascript
// 
var app_pages = {
	page: {
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
};
```

In your index.html add an empty div with the page:
```javascript 
<div data-role="page" id="page"></div>
```

Now create a template called page and load it into the screen using:
```javascript
chacha.load_page(page)
```


Examples
------------
Check out the working sample. The chacha script is in the js folder.


Enjoy.
