var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
scotchApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
        templateUrl: 'pages/for-index.html',
        controller: 'mainController'
    })

    // route for the about page
    .when('/detail/:id', {
        templateUrl: 'pages/for-detail.html',
        controller: 'mainController'
    });


});

// // create the controller and inject Angular's $scope
// scotchApp.controller('mainController', function($scope, $http) {
//     // create a message to display in our view
//     $scope.message = 'Everyone come and see how good I look!';
//     var root = 'https://green-web-blog.herokuapp.com/api'
//     $http.get(root + "/categories")
//         .then(function(response) {
//             $scope.Categories = response;
//             console.log($scope.Categories)
//         });
//     $scope.login = function() {

//         $scope.login = function() {
//         console.log($scope.user);

//        //POST Login API below:
//         $http.post(root + '/api/users/auth', $scope.user)
//             .success(function(response) {
//                 var isSuccess = response.success;
//                 if (isSuccess) {
//                     console.log(response);
//                 } else {
//                     //Raise Error
//                     alert(response.message);
//                 }
//             }).error(function(data, status, headers, config) {
//                 console.log(data, status, headers, config);
//             });
//     }
// });



scotchApp.controller('mainController', function($scope, $http, $routeParams) {
    // create a message to display in our view
    var root = "https://green-web-blog.herokuapp.com";

    $scope.message = 'Everyone come and see how good I look!';
    $scope.apiGetCat = function() {
        $http.get(root + "/api/categories")
            .then(function(response) {
                //
                $scope.Categories = response.data;
            });

    };

    $scope.apiGetArt = function() {
        $http.get(root + "/api/articles")
            .then(function(response) {
                //
                $scope.Articles = response.data;
            });

    };




    $scope.getCategoryNameOfArticle = function(id) {

        if (undefined != $scope.categories) {
            for (i = 0; i < $scope.categories.length; i++) {
                var cat = $scope.categories[i];
                if (cat._id == id) {
                    return cat.name;
                };
            };
        };

    };



    $scope.getArticleID = function() {
        var id = $routeParams.id;

        angular.forEach($scope.Articles, function(value, key) {
            if (value._id === id) {
                $scope.article = value;

                return false;

            };

        });

    };

    // New

    // $scope.getArticleID = function() {
    //     $scope.currentArticleID = $routeParams.id;
    // };

    // End new




    // $scope.getArticlebyCategory = function() {
    //     var id = $routeParams.id;
    //     var

    // };



    $scope.login = function() {
        console.log($scope.user);

        $http.post(root + '/api/users/auth', $scope.user)
            .then(function successCallbak(response) {
                alert("Thành công");


            }, function errorCallback(response) {
                console.log(data, status, headers, config);
            });
    };

    $scope.summitSignup = function() {
        $http.post(root + '/api/users/signup/', $scope.signUpUser).then(function successCallbak(response) {
            var isSuccess = response.success;
            if (isSuccess) {
                $cookieStore.put('token', response.token);
                $cookieStore.put('user', response.user);
                $scope.user = $cookieStore.get('user');
                $scope.token = $cookieStore.get('token');
                //Redirect here
                $location.url("/")
            } else {
                //Raise Error
                alert(response.message);
            }
        }, function errorCallback(response) {
            console.log(data, status, headers, config);
        });
    }

    // $scope.$watchCollection("Articles",function(new){

    // });

});