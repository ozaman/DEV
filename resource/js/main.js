var app = angular.module("myApp", ['ngCookies']);

app.controller("main",  function($scope,$location,$http,$window,$cookies) {
        // if ($cookies.get("login") == undefined) {
        //     $window.location.href="login.php";
        // }
        $http({
                method : 'POST',
                url : "php/getUsers.php",
                //data: $.param({sv: $scope.dataSV}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(res){
                 console.log(res)
                 console.log(res[0].username)
                 if ($cookies.get("login") == undefined) {
                 	 
                   // $window.location.href = 'login.php';
                 }
                 else{
                 	//$window.location.href = 'index.php';
                 }
                 // if (res[0].username =='admin') {
                 // 	$cookies.put("users", res[0].username); 
                 // }
					var value = $cookies.get("login");
					console.log(value)
                       
                       
            });
	$scope.login = function(){


        $http({
                method : 'POST',
                url : "php/login.php",
                //data: $.param({sv: $scope.dataSV}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(res){
                 console.log(res)
                 console.log(res[0].username)
                 if ($cookies.get("users") == undefined) {
                     
                    //$window.location.href = 'login.php';
                 }
                 else{
                    //$window.location.href = 'index.php';
                 }
                 // if (res[0].username =='admin') {
                 //     $cookies.put("users", res[0].username); 
                 // }
                    var value = $cookies.get("users");
                    console.log(value)
                       
                       
            });

		//$scope.
	}
});