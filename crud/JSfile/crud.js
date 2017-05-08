 var app = angular.module('mainApp', ['ngRoute']);

 var items = []
 var user = {};

 app.config(function($routeProvider, $locationProvider) {
     $locationProvider.hashPrefix('');
     $routeProvider
         .when('/index', {
             templateUrl: 'partial/index.html',
             controller: 'mainController'
         })
         .when('/view/:id', {
             templateUrl: 'partial/view.html',
             controller: 'detailController'
         }).
     otherwise({
         redirectTo: '/index'
     });
 });

 app.controller("mainController", function($scope, $location, $http) {
     $scope.items = items;
     $scope.user = user;
     var userid = '';
     
     $scope.getUserList = function() {
         $http.get('/userList').then(function(response) {
            console.log(response)
            items=response.data;
             $scope.items = response.data;
         })
     }

     $scope.getUserList()

     $scope.addItem = function() {
         console.log($scope.item);
         var newUser = JSON.stringify($scope.item);
         $scope.items.push($scope.item);
         $http.post('/insertUser', newUser).then(function(response) {

             $scope.items.push($scope.item);
             console.log(response.config.data)
         })
     }
     $scope.removeItem = function(index) {
         console.log(index);
         $scope.items.splice(index, 1)
     }
     $scope.setUserId = function(index) {
         userid = items[index].email
         console.log(userid)
     }
     $scope.editItem = function(el) {
         $scope.editMode = false;

         console.log(el)
             // $scope.user = user;
             // for (var i = 0; i < items.length; i++) {

         //     if (items[i].email == $routeParams.id) {
         //         $scope.user = items[i];

         //     }
         // } 
         // $scope.editing = $scope.items.indexOf(index);
         // var id=$routeParams.id;
         $http.put('/update', el).then(function(response) {
             window.location.href = '/';
         });
     };
 });
 app.controller("detailController", function($scope, $location, $routeParams) {
     console.log($routeParams.id)
     $scope.user = user;
     for (var i = 0; i < items.length; i++) {

         if (items[i].email == $routeParams.id) {
             $scope.user = items[i];
         }
     }

 });
 // app.controller("detailController",['$scope','$http','$routeParams',
 //      function($scope, $http, $routeParams)
 //         {    
 //             $http.get('js/data.json').success (function(data){
 //                 $scope.user = data;
 //                 $scope.aee = $routeParams.id;
 //             }); 
 //         }])
