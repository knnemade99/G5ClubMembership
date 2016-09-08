var myModule = angular.module('clubApplication', ['ngRoute','ngCookies']);

/**
 * @param $scope
 * @param $http
 * @param $cookieStore
 * @returns
 */

function testController($rootScope,$scope,$http,$cookieStore,$location,$cookies) {
	$scope.register= function() {
		$http({
			method : 'POST',
			url : 'http://10.20.14.83:9000/register',
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
	$scope.login= function() {
		
		var _uname=$scope.uname;
		var _passwd=$scope.passwd;
		$http({
			method : 'POST',
			url : 'http://10.20.14.83:9000/login',
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:9000'
			},
			data : {
				userName : _uname,
				password : _passwd
			 }
		}).then(function successCallback(response) {
			var data = response.data;
			if (data.data['auth-token']!= null) {
			
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
	
}
myModule.controller('TestController', testController);

myModule.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'TestController',
			templateUrl: 'index.html'
		})
		.when('/login', {
			controller: 'TestController',
			templateUrl: 'login.html'
		})
		.otherwise({redirectTo: '/'})
});




