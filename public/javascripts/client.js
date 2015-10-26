/**
 * Created by m3rkz0r on 10/20/15.
 */


var myApp = angular.module('myApp',['ngMaterial', 'ui.tinymce']);

myApp.controller('MainController',['$scope','$http', function($scope, $http) {

    $scope.tinymceOptions = {
        height: 400,
        resize: true,
        skin: "custom"
    };

    //Postlist stores my blog values
    $scope.postlist = [];
    //Stores my selected post by id
    $scope.postById = [];

    //adds a post to the database
    $scope.addPost = function(){
        var postData = {
            title : $scope.title,
            description : $scope.description,
            content : $scope.content
        };

        $http.post('/blogposts/addPost', postData).then(function(res){
            $scope.getPosts();
            $scope.title = null;
            $scope.description = null;
            $scope.content = null;
        });

        console.log(postData);
    };

    //Grabs all posts in the database
    $scope.getPosts = function(){

        $http({
            url: '/blogposts/getPosts',
            method: 'GET'
        }).then(function(res){
            $scope.postlist = res.data;
            console.log($scope.postlist);
        });
    };

    //calling getPosts() so blog posts load off the bat.
    $scope.getPosts();


}]);

