var app = angular.module('myApp', ['textAngular']);
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

    // $scope.getCatNameOFArt = function() {
    //     if (!undefined = $scope.categories) {
    //         for (i = 0; i < $scope.categories.length; i++) {
    //             var cat = $scope.categories[i];
    //             if (cat._id == id) {
    //                 return cat.name
    //             };
    //         };
    //     };

    // };

    $scope.getCategoryNameOfArticle = function(id) {

        if (undefined != $scope.categories) {
            for (i = 0; i < $scope.categories.length; i++) {
                var cat = $scope.categories[i];
                if (cat._id == id) {
                    return cat.name;
                }
            }
        };

    }

    // var init = function() {
    //     apiGetCat();
    // }
    // init();
});