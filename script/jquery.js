/*$(document).ready(function() {
	$('body').onclick(function(){

	})
	$.get("https://jsonplaceholder.typicode.com/photos",function(data){
		$(data).each(function(index){
			var template = "<div class=' col-sm-6 col-md-4 col-lg-4'>"+
						"<div class='post'>"+
							"<img src="images/train.jpg" class="img-responsive">"+
							"<h3>Traveling time</h3>"+
							"<small>12/5/2016</small>"+
							"<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"+
							"tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"+
							"quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"+
							"consequat."+ " </p>"+
							"<p class='rm'>"+
							"<button class='snip1582'>"+"Read More"+"</button>"+
							"</p>"+
						"</div>"+
					"</div>"
			$("body").prepend(template);
           	return index<9;
		})
	})
});*/

	
    	 
    
	var app = angular.module("myApp", []);
		app.controller("myCtrl", function($scope, $http) {
    	
         $http.get( 'https://jsonplaceholder.typicode.com' + '/posts/')
          .then(function(response) {
        	$scope.listdata=response.data;
});
});
