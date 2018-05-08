var app = angular.module("myApp", ['ngCookies','ngFileUpload']);

app.controller("pro",  function($scope,$location,$http,$window,$cookies,Upload) {
            //alert("aaa")
        if ($cookies.get("login") == undefined) {
            $window.location.href="login.php";
        }
     
    $scope.onFileSelect = function(file) {
        console.log(file)
    if (!file) return;
    Upload.upload({
        url: 'php/uploadicon.php',
        data: {file: file, username: $scope.username}
      }).success(function(resp) {
        // file is uploaded successfully
        console.log(resp);
      });    
  }
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
     $scope.logout = function(){
       //alert("aaaa")
       $cookies.remove("login");
       $window.location.href = 'login.php';
        
    }
    $scope.getNewproduct = function(){
        $window.location.href = 'new.php';
    }
    $scope.prev_img;
     window.scope = $scope;
    $scope.setFile = function (ele) {
        var photofile = ele.files[0];
        var reader = new FileReader();
        console.log(photofile);
        reader.onload = function (e) {
        $scope.$apply(function () {
        console.log(e);
        $scope.prev_img = e.target.result;
        $scope.prev_img = angular.copy($scope.prev_img);
        console.log($scope.prev_img )

        });
    }
        
    }
    $scope.chekpopulars = 0;
    $scope.chekrecommends = 0;
    $("#chekpopular").click(function(){
        if ($scope.chekpopulars == 0) {
            $scope.chekpopulars = 1;
        }
        else{
            $scope.chekpopulars = 0;

        }
        //alert( $scope.chekpopular)
    });
    $("#chekrecommend").click(function(){
        if ($scope.chekrecommends == 0) {
            $scope.chekrecommends = 1;
        }
        else{
            $scope.chekrecommends = 0;

        }
        //alert($scope.chekrecommends)
    });
    $scope.saveAddtour =function(){
       
        // if ($scope.chekpopular == true) {
        //     alert($scope.chekpopular = 1)
        // }
        // if ($scope.chekrecommend == true) {
        //     alert($scope.chekrecommend = 1)
        // }
       
        console.log($scope.chekpopulars)
        console.log($scope.chekrecommends)
       // var chekpopular = $("#chekpopular").val();
       // var chekrecommend = $("#chekrecommend").val();

       // console.log(chekpopular+'\n'+chekrecommend)
        console.log($scope.name)
        console.log($scope.city)
        console.log($scope.class)
        console.log($scope.detail)
        console.log($scope.condition)
        console.log($scope.program)
        console.log($scope.include)
        // console.log($scope.company)
        console.log($scope.contact)
        console.log($scope.note)
        console.log($scope.short)
        // console.log($scope.AdultPrice)
        // console.log($scope.ChildPrice)
        console.log($scope.cost)
         $http({
                method : 'POST',
                url : "php/addTour.php",
                data: $.param({'name_en': $scope.name
                            ,'city': $scope.city
                            ,'detail': $scope.detail
                            ,'condition': $scope.condition
                            ,'program': $scope.program 
                            ,'contact': $scope.contact
                            ,'note': $scope.note
                            ,'short': $scope.short
                            ,'classs': $scope.class
                            ,'includes':$scope.include
                            ,'chekpopulars':$scope.chekpopulars
                            ,'chekrecommends':$scope.chekrecommends
                            ,'price':$scope.cost

                            
                            }), 

                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(res){
                 console.log(res)
                 console.log("asasasasas")
                 $window.location.href = 'view.php#?data='+res;
                 
                       
            });
        













    }
});
