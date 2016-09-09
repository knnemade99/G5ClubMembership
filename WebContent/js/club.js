var myModule = angular.module('ClubMembershipApplication', ['ngRoute','ngCookies']);
var init=3;
function clubController($window,$rootScope,$scope,$http,$cookieStore,$location,$cookies) {
	

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
		
		
		$scope.errorMsgPassword="";
		$scope.errorMsgUserName="";
		$scope.errorMsg="";
		
		var em=$scope.email;
		var p=$scope.password;
		
		if(em==""||em==null)
			$scope.errorMsgUserName="Enter UserName";
		if(p==""||p==null)
			$scope.errorMsgPassword="Enter Password";
		
		var _mail=$scope.email;
		
		var _passwd=$scope.password;
		
		if(p!=null&&p!=""&&em!=null&&em!="")
		{
		$http({
			method : 'POST',
			url : 'http://10.20.14.83:9001/users/login',
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:9000'
			},
			data : {
				emailId : _mail,
				password : _passwd
			 }
		}).then(function successCallback(response) {
			var data=response.data;
			if (data.id!="failure") {
				$cookieStore.put("id",data.id);
				$location.path("/about");							//Redirect to any page after successfull login
			} else {
				$scope.mainerror="Invalid User";
			}		
		}, function errorCallback(response) {
			alert("Sameer " + response);

		});
		}
	
	}
	$scope.logout=function(){						//Cleans the cookies on client side
		$cookieStore.remove("id");
	}
	$scope.isLogin=function(){   						//Checks for login
		if($cookieStore.get("id")!=null)
			return true;
		return false;
	}
		
	//milind module ends
	
	//sonali module starts
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
