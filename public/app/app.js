var myApp = angular.module('myApp',['ui.router']);

myApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('view', {
                url: '/',
                templateUrl: '/public/views/view.html',
                controller: 'ControllerExample'
            });

        $urlRouterProvider.otherwise("/");
    }
]);
