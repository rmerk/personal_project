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

    //Archives List
    $scope.archives = [];

    //adds a post to the database
    $scope.addPost = function(title,description,content){
        var postData = {
            title : title,
            description : description,
            content : content
        };


        $http.post('/blogposts/addPost', postData).then(function(res){
            $scope.title = null;
            $scope.description = null;
            $scope.content = null;
            $scope.getPosts();
        });
    };

    //Grabs all posts in the database
    $scope.getPosts = function(){

        $http.get('/blogposts/getPosts')
            .then(function(res){
                $scope.postlist = res.data;
            });


    };

    //Grabs the posts for archives, skips first 5 posts.
    $scope.getArchives = function(){
        $http.get('/blogposts/getArchives')
            .then(function(res){
                $scope.archives = res.data;
            })

    };

    $scope.grabBlogPost = function(){

        $http.get('blogposts/getPostById/:id')
            .then(function(res){
                $scope.blogpost = res.data;
                console.log($scope.blogpost);
            });
    };

    $scope.getPosts();
    $scope.getArchives();


    //****** Handling User Login *********//
    $scope.login = function(username,password){

        $scope.hideIcon = false;

        //username and password are the models that are being passed in by index.jade
        var values = {username: username, password: password};

        $http.post('/login', values)
            .then(function(response){
                if(response.data.success){
                    $scope.hideIcon = true;
                }
            });
    };

    $scope.logout = function(){
        $http.get('/logout').then(function(){
            $scope.hideIcon = false;
        });
    };


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
        $http.get($scope.userData.repos_url + "?sort=updated")
            .success(function (data) {
                $scope.repoData = data;
            });
    };

}]);




