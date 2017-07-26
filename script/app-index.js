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
    .when('/detail', {
        templateUrl: 'pages/for-detail.html',
        controller: 'aboutController'
    });


});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope, $http) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    var root = 'https://green-web-blog.herokuapp.com/api'
    $http.get(root + "/categories")
        .then(function(response) {
            $scope.Categories = response;
            console.log($scope.Categories)
        });
    $scope.login = function() {

        $scope.summitLogin = function() {
            $http.post(root + '/users/auth', $scope.loginUser).success(function(response) {
                var isSuccess = response.success;
                if (isSuccess) {
                    alert(response.message);
                } else {
                    //Raise Error
                    alert(response.message);
                }
            }).error(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });
        }
    }
});

scotchApp.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});