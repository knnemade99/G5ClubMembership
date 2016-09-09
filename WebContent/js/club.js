var myModule = angular.module('ClubMembershipApplication', ['ngRoute','ngCookies']);

function clubController($rootScope,$scope,$http,$cookieStore,$location,$cookies) {
	
	
	//kunal Modules starts
	$scope.register= function() {
		$http({
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:9000'
			},
			data : {
			
				firstName: $scope.fname,
				lastName: $scope.lname,
				userName: $scope.mail,
				password: $scope.passwd,
				email: $scope.mail,
				phone: 7894561230
			}
		}).then(function successCallback(response) {
			var data = response.data;
			if (data.data.message!= null) {
				alert(data.data.message);
				$location.path("/");
			} else {
				alert("Registered Successfully");
			}		
		}, function errorCallback(response) {
			alert("Server Error. Try After Some time: " + response);

		});
	}
	//Kunal Modules ends
	
	
	
	
	//milind module starts
		$scope.login= function() {
		
		var _uname=$scope.email;
		var _passwd=$scope.passwd;
		$http({
			method : 'POST',
			url : 'http://10.20.14.83:9001/users/login',
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:9000'
			},
			data : {
				emailId : _uname,
				password : _passwd
			 }
		}).then(function successCallback(response) {
			var data = response.data;
			if (true) {
			
				$cookieStore.put('auth-token',data.data['auth-token']);
				$cookieStore.put('userId',data.data.userId);
				$location.path("#/");
			
			} else {
				alert("Invalid Credentials");
			}		
		}, function errorCallback(response) {
			alert("Server Error. Try After Some time: " + response);

		});
		}
		
	//milind module ends
	
	//sonali module starts
		$scope.viewload = function(){
			var $item = $('.carousel .item'); 	//milind correct this line. it is giving exception while running the application
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
	//sonali module ends
	
	
	
	
}

myModule.controller('ClubController', clubController);

myModule.config(function($routeProvider){
	$routeProvider
		.when('/test', {									// Correct it Milind
			controller: 'ClubController',
			templateUrl: 'index.html'   					//Taken just for testing/ developing purpose
		})
		.when('/', {
			controller: 'ClubController',
			templateUrl: 'home.html'   					//Taken just for testing/ developing purpose
		})
		.when('/login', {
			controller: 'ClubController',
			templateUrl: 'login.html'
		})
		.when('/contact', {
			controller: 'ClubController',
			templateUrl: 'contact_details.html'
		})
		.when('/about', {
			controller: 'ClubController',
			templateUrl: 'about.html'
		})
		.otherwise({redirectTo: '/'})
});
