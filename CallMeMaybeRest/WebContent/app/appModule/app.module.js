angular.module('appModule',['ngRoute'])
.config(function($routeProvider){
	
	$routeProvider
	.when('/', {
	      template : `<people></people>`
	    })
    .when('people/:id', {
    	template : `<people></people>`
    })
	.when('/_404', {
		template : `<not-found></not-found>`
	})
	.otherwise({
	  template : `<not-found></not-found>`
	})
	
});