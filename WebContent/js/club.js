var myClub = angular.module('club', ['ngRoute']);


//ClubController starts
function ClubController($scope){
	$scope.viewload = function(){
		var $item = $('.carousel .item'); 
		var $wHeight = $(window).height()-100;
		$item.eq(0).addClass('active');
		$item.height($wHeight); 
		$item.addClass('full-screen');

		$('.carousel img').each(function() {
		  var $src = $(this).attr('src');
		  var $color = $(this).attr('data-color');
		  $(this).parent().css({
		    'background-image' : 'url(' + $src + ')',
		    'background-color' : $color
		  });
		  $(this).remove();
		});

		$(window).on('resize', function (){
		  $wHeight = $(window).height();
		  $item.height($wHeight);
		});

		$('.carousel').carousel({
		  interval: 6000,
		  pause: "false"
		});
	}
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