/**
 * Created by m3rkz0r on 10/20/15.
 */
var app = angular.module('myApp',['ngRoute']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/about',{
            templateUrl: '/about',
            controller: 'AboutController'
        })
        .when('/archives',{
            templateUrl: '/archives',
            controller: 'ArchivesController'
        })
        .when('/register',{
            templateUrl: '/register',
            controller: 'RegisterController'
        })
        .when('/login',{
            templateUrl: '/login'
        })
        .when('/profile',{
            templateUrl: '/profile',
        });

    $locationProvider.html5Mode(true);
});


