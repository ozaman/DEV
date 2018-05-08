var app = angular.module("myApp", ['ngCookies']);

app.controller("pro",  function($scope,$location,$http,$window,$cookies) {
    $scope.dataTour= [];
        if ($cookies.get("login") == undefined) {
            $window.location.href="login.php";
        }
        $http({
                method : 'POST',
                url : "php/getUsers.php",
                //data: $.param({sv: $scope.dataSV}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(res){
                 console.log(res)
                 console.log(res[0].username)
                 
                 // if (res[0].username =='admin') {
                 // 	$cookies.put("users", res[0].username); 
                 // }
					
                       
                       
            });
        $http({
                method : 'POST',
                url : "php/getTour.php",
                //data: $.param({sv: $scope.dataSV}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(res){
                 console.log(res)
                 $scope.dataTour = res;
                 $scope.allTour = res;
                       
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
    $scope.removepackage = function(x){
        $scope.idpackageremove = x;
        
    }
    $scope.logout = function(){
       //alert("aaaa")
       $cookies.remove("login");
       $window.location.href = 'login.php';
        
    }
    $scope.deletePackage = function(data){
    console.log(data)
    $http({
                            method : 'POST',
                            url : "php/removePackage.php",
                            data: $.param({'id': $scope.data}),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                            }).success(function(res){
                                console.log(res)
                                $window.location.href = 'package.php';
                            });
                       

  }
    $scope.selectprovinceall = function(){
        $scope.dataTour = [];
        angular.forEach($scope.allTour, function (z) {
                $scope.dataTour.push(z);
            });
    }

    $scope.selectprovince = function(x){
        $scope.dataTour = [];
        console.log(x)
         angular.forEach($scope.allTour, function (y) {
            console.log(y.province)
            if (y.province == x) {
                $scope.dataTour.push(y);
            }
            
                            // if (y.read_msg == 0 && y.comment_from == 'driver') {                                       
                            //     angular.element(document.querySelector('#menudriver'+y.id)).addClass('menudriver')
                            //     updatenoti();
                                            
                            // }
                            // if (y.read_msg == 0 && y.comment_from == 'callcenter') {
                            //     console.log(y.id)
                            //     angular.element(document.querySelector('#menudriver'+y.id)).addClass('menudriver')
                            //     updatenoti();
                            // }
                                
                        });
        //$window.location.href = 'new.php';
    }
    $scope.getNewproduct = function(){
        $window.location.href = 'new.php';
    }
    $scope.gettourbyid = function(data){
         //$window.location.href = 'view.php#?data=' + JSON.stringify(data.id);

    }
    

});