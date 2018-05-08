var app = angular.module("myApp", ['ngCookies','ngFileUpload']);

app.controller("pro",  function($scope,$location,$http,$window,$cookies,Upload) {
            //alert("aaa")
            $scope.tours;
            $scope.err = $location.search().err;
            $scope.data = JSON.parse($location.search().data);
            console.log($scope.data)

                if($scope.err){
                    //$('#err').modal("show");
                    window.location.href = 'package.php';
                }
        if ($cookies.get("login") == undefined) {
            $window.location.href="login.php";
        }
        $http({
                method : 'POST',
                url : "php/getTourbyid.php",
                data: $.param({id: $scope.data}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(res){
                 console.log(res)
                 $scope.tours = res[0];
                 if (res[0].show_recommend == 1) {
                        $scope.echekrecommends = true;
                 }
                  if (res[0].show_popular == 1) {
                        $scope.echekpopulars = true;
                 }

                 console.log($scope.tours)
                 $scope.program = res[0].program;
                 console.log($scope.program)
                  $scope.setIndex = function(index){
                            $scope.tourData = res[index] ;
                        }
                       
            });
                $scope.dataGallery = '';
                $http({
                            method : 'POST',
                            url : "php/getGallery.php",
                            data: $.param({id: $scope.data}),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                            }).success(function(res){
                                console.log(res)
                                $scope.dataGallery = res;
                            });
     
    $scope.onFileSelect = function(file) {
     // alert($scope.data)
        console.log(file)
    if (!file) return;
    Upload.upload({
        url: 'php/uploadicon.php',
        data: {file: file, 'imagename': $scope.data}
      }).success(function(resp) {
        // file is uploaded successfully
        console.log(resp);
      });    
  }
  $scope.addGallery = function(file) {
    console.log(file)
     $http({
                method : 'POST',
                url : "php/getGallery.php",
                data: $.param({'id': $scope.data}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(res){
                 console.log(res)
                 if (res == 0) {
                    $scope.nameGallery = 1;
                    //alert($scope.nameGallery)
                 }
                 else{
                 $scope.nameGallery = res.length+1;

                 }
                 console.log($scope.nameGallery)

                 
               if (!file) return;
                    Upload.upload({
                        url: 'php/uploadGallery.php',
                        data: {file: file, 'imagename': $scope.data+'_'+$scope.nameGallery,'id':$scope.data}
                      }).success(function(resp) {
                        // file is uploaded successfully
                        console.log(resp);
                        $scope.dataGallery='';
                        $http({
                            method : 'POST',
                            url : "php/getGallery.php",
                            data: $.param({id: $scope.data}),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                            }).success(function(res){
                                console.log(res)
                                $scope.dataGallery = res;
                            });
                    });     
                       
            });
        //console.log(file)
    
  }
   $scope.logout = function(){
       //alert("aaaa")
       $cookies.remove("login");
       $window.location.href = 'login.php';
        
    }
  $scope.view = function(data){
    console.log(data)
    $scope.viewgallery = data.gallery;

  }
  $scope.remove = function(data){
    console.log(data)
    $http({
                            method : 'POST',
                            url : "php/removeGallery.php",
                            data: $.param({'id': data.id,'gallery':data.gallery}),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                            }).success(function(res){
                                console.log(res)
                                $scope.dataGallery= '';
                                $http({
                            method : 'POST',
                            url : "php/getGallery.php",
                            data: $.param({'id': $scope.data}),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                            }).success(function(res){
                                console.log(res)
                                $scope.dataGallery = res;
                            });
                            });
                       

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
        if ($scope.echekrecommends == 0) {
            $scope.echekrecommends = 1;
        }
        else{
            $scope.echekrecommends = 0;

        }
        //alert($scope.chekrecommends)
    });
    $("#echekpopular").click(function(){
        if ($scope.echekpopulars == 0) {
            $scope.echekpopulars = 1;
        }
        else{
            $scope.echekpopulars = 0;

        }
        //alert( $scope.chekpopular)
    });
    $("#echekrecommend").click(function(){
        if ($scope.echekrecommends == 0) {
            $scope.echekrecommends = 1;
        }
        else{
            $scope.echekrecommends = 0;

        }
        //alert($scope.chekrecommends)
    });
    $scope.eincludes = function(a){
        console.log(a);
        $scope.include = a;
    }
    $scope.edit =function(){

        $scope.show_recommend = $scope.tours.show_recommend;                
        $scope.show_popular = $scope.tours.show_popular;
                
        //alert('aaaa')
        // angular.forEach($scope.tours, function (data) {
                           
                
                            
                                
        //                 });
       $scope.eprovince =  $scope.tours.province;
       $scope.ename = $scope.tours.name_en;
       // $scope.ecity = $scope.tours.province;
        $scope.eclass = $scope.tours.class;
        $scope.edetail = $scope.tours.detail;
        $scope.econdition = $scope.tours.conditions;
        $scope.eprogram = $scope.tours.program;
        $scope.include = $scope.tours.include;
        // console.log($scope.company)
        $scope.econtact = $scope.tours.contact;
        $scope.enote = $scope.tours.note;
        $scope.edescription = $scope.tours.description;
         $scope.echekpopulars = $scope.tours.show_recommend;
        $scope.echekrecommends = $scope.tours.show_popular;

        console.log($scope.echekpopulars)
        console.log($scope.echekrecommends)
        
    }
    $scope.editprice =function(){
        //alert('aaaa')
        $scope.ecost = $scope.tours.cost;
       
        // console.log($scope.AdultPrice)
        // console.log($scope.ChildPrice)
        
    }
    $scope.editchangeprice =function(x){
        //alert('aaaa')
        $scope.ecost = x;
        console.log($scope.ecost)
       
        // console.log($scope.AdultPrice)
        // console.log($scope.ChildPrice)
        
    }
    $scope.saveeditprice =function(){
        //alert($scope.ecost)
        $http({
                method : 'POST',
                url : "php/editPrice.php",
                data: $.param({'id':$scope.data                            
                            ,'ecost': $scope.ecost 
                            }), 

                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(res){
                 console.log(res)
                 console.log("asasasasas")
                  $window.location.reload();
                 
                       
            });
        
    }
    $scope.saveEditpackage =function(){
        //$scope.eprovince = '';
        // if ($scope.chekpopular == true) {
        //     alert($scope.chekpopular = 1)
        // }
        // if ($scope.chekrecommend == true) {
        //     alert($scope.chekrecommend = 1)
        // }
       
        // console.log($scope.echekpopulars)
        // console.log($scope.echekrecommends)
       // var chekpopular = $("#chekpopular").val();
       // var chekrecommend = $("#chekrecommend").val();

       // console.log(chekpopular+'\n'+chekrecommend)
        // console.log($scope.ename)
        // console.log($scope.eprovince)
        // console.log($scope.eclass)
        // console.log($scope.edetail)
        // console.log($scope.econdition)
        // console.log($scope.eprogram)
        console.log($scope.include)
        // console.log($scope.company)
        // console.log($scope.econtact)
        // console.log($scope.enote)
        // console.log($scope.edescription)
        // // console.log($scope.AdultPrice)
        // // console.log($scope.ChildPrice)
        // console.log($scope.ecost)
        console.log($scope.echekpopulars)
        console.log($scope.echekrecommends)
         
         $http({
                method : 'POST',
                url : "php/editTour.php",
                data: $.param({'id':$scope.data
                            ,'ename_en': $scope.ename
                            ,'eprovince': $scope.eprovince
                            ,'edetail': $scope.edetail
                            ,'econdition': $scope.econdition
                            ,'eprogram': $scope.eprogram 
                            ,'econtact': $scope.econtact
                            ,'enote': $scope.enote
                            ,'eincludes': $scope.include
                            ,'eclasss': $scope.eclass
                           
                            ,'echekpopulars':$scope.echekpopulars
                            ,'echekrecommends':$scope.echekrecommends
                            ,'edescription': $scope.edescription
                           
                            
                            }), 

                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(res){
                 console.log(res)
                 console.log("asasasasas")
                  $window.location.reload();
                 
                       
            });
        













    }
});
