var myModule = angular.module('ClubMembershipApplication', ['ngRoute','ngCookies']);

var init=3;
function clubController($window,$rootScope,$scope,$http,$cookieStore,$location,$cookies) {
	
	//kunal Modules starts
	$scope.register= function() {
		
		var TDate=new Date().toLocaleDateString().split("/");
		var TDate=TDate[0]+TDate[1]+TDate[2];
		
		
		var BDate=new Date($scope.dob).toLocaleDateString().split("/");
		var BDate=BDate[0]+BDate[1]+BDate[2];
		console.log($scope.pass);
		console.log(BDate);
		console.log("phone: "+$scope.phone+" length- "+($scope.phone+"").length); 
		console.log(TDate);
		console.log($scope.fname);
		console.log($scope.lname);
		console.log(($scope.phone+"").length);
		console.log($scope.email+" "+BDate+""+$scope.phone+" "+$scope.occupation+" "+TDate+" "+" "+$scope.pass);
		
		if($scope.fname!=""&&$scope.fname!=null&&$scope.lname!=""&&$scope.lname!=null&&$scope.email!=""&&$scope.email!=null&&$scope.pass!=""&&$scope.pass!=null&&TDate!=""&&TDate!=null&&BDate!=""&&BDate!=null&&$scope.pass2==$scope.pass&&($scope.phone+"").length==10){
			console.log("inside if");
		$http({
			method : 'POST',
			url : 'http://10.20.14.83:9001/users/register',
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:9000'
			},
			data : {
				 firstName:$scope.fname, 
				 lastName:$scope.lname, 
				 emailId:$scope.email, 
				 dateOfBirth:BDate, 
				 mobileNumber:$scope.phone+"", 
				 occupation:$scope.occupation, 
				 registeredDate:TDate, 
				 password:$scope.pass, 
				 status:0,
				 userType:"User", 
				 entranceFee: 1000, 
				 paymentDone: 0 
			}
		}).then(function successCallback(response) {
			console.log("registered successfully");
				$location.path("/");
		}, function errorCallback(response) {
			alert("Server Error. Try After Some time: " + response);

		});

		}
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
				$cookieStore.put("userType",data.userType);
				if($cookieStore.get(userType=="User"))
				$location.path("/user");
				else
					$location.path("/staff");	//Redirect to any page after successfull login
				
			} else {
				$scope.mainerror="Invalid User";
			}		
		}, function errorCallback(response) {
			alert("Server Error" + response);

		});
		}
	
	}
	$scope.logout=function(){
		$http({
			method : 'GET',
			url : 'http://10.20.14.83:9001/users/logout/'+$cookieStore.get("id"),
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:9000'
			}
			}).then(function successCallback(response) {
				$cookieStore.remove("id");
				$cookieStore.remove("userType");
				$location.path("/");
		}, function errorCallback(response) {
			alert("Server Error. Try After Some time: " + response);

		});

	}
	
	$scope.isLogin=function(){   						//Checks for login
		if($cookieStore.get("id")!=null)
			return true;
		return false;
	}
		
	//milind module ends
	
	//sonali module starts
		
		
	//sonali module ends
}

myModule.controller('ClubController', clubController);

myModule.config(function($routeProvider){
	$routeProvider
	
		.when('/', {
			controller: 'ClubController',
			templateUrl: 'home.html'   					//Taken just for testing/ developing purpose
		})
		.when('/register', {									// Correct it Milind
			controller: 'ClubController',
			templateUrl: 'signup.html'   					//Taken just for testing/ developing purpose
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
		.when('/user', {
			controller: 'ClubController',
			templateUrl: 'user.html'
		})
		.when('/staff', {
			controller: 'ClubController',
			templateUrl: 'staff.html'
		})
		.otherwise({redirectTo: '/'})
});
