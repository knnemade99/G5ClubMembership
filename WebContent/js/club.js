var myClub = angular.module('club', ['ngRoute']);


//ClubController starts
function ClubController(){
	
}
//Clubcontroller ends

myClub.controller("ClubController",ClubController);


//config starts
myClub.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'ClubController',
			templateUrl: 'home.html',
		})
		.when('/contact', {
			controller: 'ClubController',
			templateUrl: 'contact_details.html',
		})
		.otherwise({redirectTo: '/'})
});
//config ends