var app = angular.module('myApp', ['textAngular', 'ngTagsInput']);
app.controller("myCtrl", function($scope, $http) {
    var root = "https://green-web-blog.herokuapp.com";

    $scope.apiGetCat = function() {
        $http.get(root + "/api/categories")
            .then(function(response) {
                $scope.categories = response.data;
            })
    };

    $scope.apiGetArt = function() {
        $http.get(root + "/api/articles")
            .then(function(response) {
                //
                $scope.articles = response.data;
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


    $scope.getArticleID = function(id) {
        angular.forEach($scope.articles, function(value, key) {
            if (value._id === id) {

                $scope.article = value;
                return false;
            }
        });
    };

    $scope.getCategoryId = function(id) {
            angular.forEach($scope.categories, function(value, key) {
                if (value._id === id) {

                    $scope.category = value;
                    return false;
                }
            });
        }
        // Category update and delete

    $scope.updateCategory = function() {
        $scope.category._author = "5981d84fb38ced0004f0c5df";
        $http.patch(root + '/api/articles/' + $scope.article._id, $scope.article)
            .then(function successCallback(response) {

                window.location.href = 'admin-article-list.html';
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    }
    
    $scope.deleteCategory = function() {
        $http.delete(root + '/api/categories/' + $scope.category._id)
            .then(function successCallback(response) {
                window.location.href = 'admin-category-list.html';
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    }

    // Article delete and update


    $scope.updateArticle = function() {
        $scope.article._author = "5981d84fb38ced0004f0c5df";
        $http.patch(root + '/api/articles/' + $scope.article._id, $scope.article)
            .then(function successCallback(response) {

                window.location.href = 'admin-article-list.html';
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    }

    $scope.deleteArticle = function() {
        $http.delete(root + '/api/articles/' + $scope.article._id)
            .then(function successCallback(response) {
                window.location.href = 'admin-article-list.html';
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    }

    // Category delete and update



    $scope.submitCreateCategory = function() {

        if ($scope.newCategory.name.length > 0 &&
            $scope.newCategory.description.length > 0) {
            $http({
                method: 'POST',
                url: root + "/api/categories",
                data: $scope.newCategory
            }).then(function successCallback(response) {
                // $scope.categories.push(response.date);
                $scope.apiGetCat();
                $scope.newCategory.name = "";
                $scope.newCategory.description = "";

            }, function errorCallback(response) {
                console.log(response);
            });
        } else {
            alert("Input invalid");
        }

    }

    $scope.submitCreateArticle = function() {
        console.log($scope.newArticle);
        $scope.newArticle._author = "5981d84fb38ced0004f0c5df";
        $http.post(root + '/api/articles/', $scope.newArticle)
            .then(function successCallbak(response) {
                alert("Thành công");
                window.location.href = 'admin-article-list.html';
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    };


    $scope.login = function() {
        //console.log($scope.user);

        //POST Login API below:
        $http.post(root + '/api/users/auth', $scope.user)
            .success(function(response) {
                var isSuccess = response.success;
                if (isSuccess) {
                    console.log(response);
                } else {
                    //Raise Error
                    alert(response.message);
                }
            })
            .error(function(data, status, headers, config) {
                // console.log(data, status, headers, config);
            });

    };

    //Validation



});