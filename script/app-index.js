var scotchApp = angular.module('scotchApp', ['ngRoute', 'ui.bootstrap', 'ngSanitize', 'angular-scroll-animate']);

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
    })

    .when('/search/:_term', {
        templateUrl: 'pages/for-search.html',
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
    var myId = "5981d84fb38ced0004f0c5df";
    $scope.keySearch = "";

    //Begin Sort Array
    var compare = function(a, b) {
        // Use toUpperCase() to ignore character casing
        const genreA = a.comments.length;
        const genreB = b.comments.length;

        let comparison = 0;
        if (genreA > genreB) {
            comparison = -1;
        } else if (genreA < genreB) {
            comparison = 1;
        }
        return comparison;
    }


    var compareValues = function(key, order = 'asc') {
            return function(a, b) {
                if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                    // property doesn't exist on either object
                    return 0;
                }

                const varA = (typeof a[key] === 'string') ?
                    a[key].toUpperCase() : a[key];
                const varB = (typeof b[key] === 'string') ?
                    b[key].toUpperCase() : b[key];

                let comparison = 0;
                if (varA > varB) {
                    comparison = 1;
                } else if (varA < varB) {
                    comparison = -1;
                }
                return (
                    (order == 'desc') ? (comparison * -1) : comparison
                );
            };
        }
        //begin Animation

    $scope.animateElementIn = function($el) {
        $el.removeClass('hidden');
        $el.addClass('animated fadeInUp'); // this example leverages animate.css classes
    };

    $scope.animateElementOut = function($el) {
        $el.addClass('hidden');
        $el.removeClass('animated fadeInUp'); // this example leverages animate.css classes
    };

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
    //Search Aritcle
    $scope.getArticleBySearchKey = function() {
        $scope.keyWord = $routeParams._term;
        $http.get(root + '/api/articles/search/' + $scope.keyWord)
            .then(function successCallbak(response) {
                $scope.articleGetByKey = response.data;
            }, function errorCallback(response) {
                console.log(data, status, headers, config);
            });
    }

    $scope.getAllArticleinCategories = function() {
            $scope.currentCategoryID = $routeParams.id;
            $scope.articlesInCategory = getArticlesById($scope.currentCategoryID);
            $scope.articlesInCategorySortedByDate = $scope.articlesInCategory.sort(compareValues('createdDate', 'desc'))

        }
        //Begin get articles by id
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
            if (value._category._id === id && articles.length < maximumArticle) {
                articles.push(value);
            }
        });
        return articles;

    };



    //Begin Get Category name  for article
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
    //Begin Login
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


    // Add comments for detail

    $scope.addCommentforArticle = function() {
        $scope.newComment._user = myId;
        $http.put(root + '/api/article/comment/' + $scope.article._id, $scope.newComment)
            .then(function successCallbak(response) {
                $scope.newComment.commentContent = "";
                $scope.article = response.data;

            }, function errorCallback(response) {
                console.log(data, status, headers, config);
            });
    }

    //Scope watch
    $scope.$watchCollection("Articles", function(newArticles, oldArticles) {


        if (newArticles != undefined) {
            $scope.animateElementIn = function($el) {
                $el.removeClass('hidden');
                $el.addClass('animated fadeInUp'); // this example leverages animate.css classes
            };

            $scope.animateElementOut = function($el) {
                $el.addClass('hidden');
                $el.removeClass('animated fadeInUp'); // this example leverages animate.css classes
            };
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
            $scope.viewby = 5;
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
                $scope.currentPage = 1;
            }

            //Update Most Comments Articles
            $scope.mostCommentsArticles = newArticles.sort(compare);
            console.log($scope.mostCommentsArticles);
            //Update Popular Articles
            $scope.allArticles = newArticles;
            $scope.popularArticles = newArticles.slice(0, maxPopularArticlesNumber);

            //Update New Articles
            var arrayallNewArticles = newArticles.slice();
            $scope.allNewArticles = arrayallNewArticles.sort(compareValues('createdDate', 'desc'));

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
});