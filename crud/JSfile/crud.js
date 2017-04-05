 var app = angular.module('mainApp', ['ngRoute']);

 var items=[]
 var user={};

app.config(function($routeProvider) {
             $routeProvider
             .when('/index', {
                     templateUrl: 'partial/index.html',
                     controller: 'mainController'
                 })
                 .when('/view', {
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
app.controller("detailController", function($scope, $location) {
    
     $scope.user=user;

    
 });


