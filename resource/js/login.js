var app = angular.module("myApp", ['ngCookies']);

app.controller("Login",  function($scope,$location,$http,$window,$cookies) {
    console.log('reddy!!')
        // if ($cookies.get("login") != undefined) {
        //     $window.location.href="index.php";
        // }
        // $http({
        //         method : 'POST',
        //         url : "php/getUsers.php",
        //         //data: $.param({sv: $scope.dataSV}),
        //         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        //         }).success(function(res){
        //          console.log(res)
        //          console.log(res[0].username)
                
                       
                       
        //     });
	$scope.login = function(){
		 //alert("aaaaaa")
        console.log($scope.username)
        console.log($scope.password)

         if($scope.username!=undefined&&$scope.password!=undefined)
              {
                    $('.alert').addClass("display-hide");

                $http({
                    method:'post',
                    url: "php/loginUsers.php",
                    data: $.param({username: $scope.username,password: $scope.password}),
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(res){
                	console.log(res)
                    angular.forEach(res, function(data){
                        if(data.username == $scope.username && data.password == $scope.password){
                            $cookies.put('login', data.username);
                            $window.location.href="index.php";
                        }
                        else if(data.username != $scope.username){
                            console.log("Username is Invalid")
                            angular.element(document.querySelector('#message')).html('Username is Invalid').css('color', '#000');

                        }
                        else if(data.username == $scope.username && data.password != $scope.password){
                            console.log("Password is Invalid")

                            angular.element(document.querySelector('#message')).html('Password is Invalid').css('color', '#000');

                        }
                    });
                    
                })
            }
            else{
                
                $('.alert').removeClass("display-hide");
            }


		//$scope.
	}
});