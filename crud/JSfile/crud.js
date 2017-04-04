 var app = angular.module('MyApp', []);

 app.controller("Details", function($scope) {
     $scope.items = [];
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
        app .config(['$routeProvider',
      function($routeProvider) {
    $routeProvider.
      when('/', {
    templateUrl: '/details.html',
    controller: 'detailMsg'
      });
}]);

 });





