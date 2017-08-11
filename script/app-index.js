var scotchApp = angular.module('scotchApp', ['ngRoute', 'ui.bootstrap', 'ngSanitize']);

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
    })

    .when('/categories/:id', {
        templateUrl: 'pages/for-categories.html',
        controller: 'mainController'
    });


});

scotchApp.controller('mainController', function($scope, $http, $routeParams, $location, $sanitize) {
    // create a message to display in our view
    var root = "https://green-web-blog.herokuapp.com";
    var maxRandomArticleNumber = 5;
    var maxPopularArticlesNumber = 5;
    var idCat1 = "5983510622fd58000478aaa8";
    var idCat2 = "5981d787b38ced0004f0c5db";
    var idCat3 = "5981d805b38ced0004f0c5dd";


    //Get Category and Article
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

    $scope.init = function() {
        $scope.apiGetCat();
        $scope.apiGetArt();
    };







    $scope.getArticleID = function() {
        var id = $routeParams.id;

        $scope.currentArticleID = id;
    };

    $scope.getAllArticleinCategories = function() {
        $scope.currentCategoryID = $routeParams.id;
        $scope.articlesInCategory = getArticlesById($scope.currentCategoryID);

    }
    var getArticlesById = function(id, maximumArticle) {
        if (maximumArticle === undefined) {
            if ($scope.Articles === undefined) {
                maximumArticle = 0;
            } else {
                maximumArticle = $scope.Articles.length;
            }
        }
        var articles = [];
        angular.forEach($scope.Articles, function(value, key) {
            if (value._category === id && articles.length < maximumArticle) {
                articles.push(value);
            }
        });
        return articles;
        console.log("Articles in Id:" + id + articles);
    };

    $scope.getCategoryNameOfArticle = function(id) {

        if (undefined != $scope.Categories) {
            for (i = 0; i < $scope.Categories.length; i++) {
                var cat = $scope.Categories[i];
                if (cat._id == id) {
                    return cat.name;
                };
            };
        };

    };






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


    $scope.$watchCollection("Articles", function(newArticles, oldArticles) {


        if (newArticles != undefined) {
            //Begin Find current article
            angular.forEach(newArticles, function(value, key) {
                if (value._id === $scope.currentArticleID) {

                    $scope.article = value;
                    return false;
                }
            });
            //Begin Find Article in Category

            //Const
            $scope.articlesInCat1 = getArticlesById(idCat1, 3);
            $scope.articlesInCat2 = getArticlesById(idCat2, 3);
            $scope.articlesInCat3 = getArticlesById(idCat3, 3);
            //Dynamic
            $scope.getAllArticleinCategories();

            //Begin Pagination
            $scope.viewby = 3;
            $scope.totalItems = newArticles.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $scope.maxSize = 5;

            $scope.setPage = function(pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function() {
                console.log('Page changed to: ' + $scope.currentPage);
            };

            $scope.setItemsPerPage = function(num) {
                    $scope.itemsPerPage = num;
                    $scope.currentPage = 1; //reset to first pahe
                }
                //Update Popular Articles
            $scope.allArticles = newArticles;
            $scope.popularArticles = newArticles.slice(0, maxPopularArticlesNumber);

            //Update random articles
            $scope.randomArticles = [];
            var listArticles = newArticles.slice();
            for (var i = 0; i < maxRandomArticleNumber; i++) {
                if (listArticles.length > 0) {
                    var random = Math.floor(Math.random() * listArticles.length);
                    $scope.randomArticles.push(listArticles[random]);
                    listArticles.splice(random, 1);
                };
            };

        }




    });





    // Use $location
    // $scope.getArticleID = function() {
    //     $http.get(root + "/api/articles")
    //         .then(function(response) {
    //             $scope.articles = response.data;
    //             var id = $location.search().id;
    //             for (i = 0; i < $scope.articles.length; ++i) {
    //                 if ($scope.articles[i]._id == id) {
    //                     $scope.art = $scope.articles[i];
    //                 }
    //             }
    //         });
    // }





    // $scope.getArticleforCategoriesDA =function(){
    //     var id = "5983510622fd58000478aaa8";

    //     $scope.DAid = id;

    // };

    //  $scope.$watchCollection("Articles", function(newArticles, oldArticles) {
    //     var arrayforarticle = [];
    //     angular.forEach($scope.Articles, function(value, key) {
    //         if (value._category === DAid) {
    //             arrayforarticle.push(value);

    //             $scope.articleCatDA = arrayforarticle;



    //             return false;

    //         };

    //     });
    // });

});
// .filter('startFrom',function(){
//         return function(data,start){
//             // start = 0 + start;
//             return data.slice(start);
//         }
//     });