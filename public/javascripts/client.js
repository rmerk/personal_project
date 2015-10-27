/**
 * Created by m3rkz0r on 10/20/15.
 */
var myApp = angular.module('myApp',['ngMaterial', 'ui.tinymce']);

myApp.controller('MainController',['$scope','$http', function($scope, $http) {

    //These set the values for my tiny mce editor
    $scope.tinymceOptions = {
        height: 400,
        resize: true,
        skin: "custom"
    };

    //Postlist stores my blog values
    $scope.postlist = [];

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



myApp.controller('ApiController', ['$scope', '$http', function($scope, $http){

    /***************** Github API Calls ********************/
    $scope.username = 'rmerk';

    $http.get("https://api.github.com/users/" + $scope.username)
        .success(function (data) {
            $scope.userData = data;
            loadRepos();
        });

    var loadRepos = function () {
        $http.get($scope.userData.repos_url + "?sort=created")
            .success(function (data) {
                $scope.repoData = data;
            });
    };

}]);

