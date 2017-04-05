 var app = angular.module('mainApp', ['ngRoute']);

 var items=[]
 var user={};

app.config(function($routeProvider) {
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
                    redirectTo:'/index'
                 });
         });

 app.controller("mainController", function($scope, $location) {
     $scope.items = items;
     $scope.user=user;
     $scope.selectedRow =null;
     $scope.addItem = function(item) {
             $scope.items.push(item);
             $scope.item = {};
         },
         $scope.removeItem = function(index) {
             console.log(index);
             $scope.items.splice(index, 1)
         },
         $scope.editItem = function(index) {
             $scope.editing = $scope.items.indexOf(index);
         };

     $scope.setClickedRow= function(index){
        // $scope.selectedRow =index;
        // console.log(items[index]);
        user=items[index];
        console.log(user);        
        $location.path('/view')
     }
 });
app.controller("detailController", function($scope, $location,$routeParams) {
    
     $scope.user=user;
     for(var i=0;i<items.length;i++)
     {
     
     if(items[i].email==$routeParams.id)
     {
        $scope.user=items[i];
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

