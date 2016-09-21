/**
 *  主文件
 *
 * Description
 */
angular.module('appModule', ['ngAnimate', 'ui.router', 'ngSanitize', 'pascalprecht.translate'])
    //路由配置
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home/authorization/userMgmt');
            $stateProvider
                .state('home', {
                    url: '/home',
                    abstract:true,
                    views: {
                        'mainframe': {
                            templateUrl: './view/home/main.html',
                            controller: 'homeCtrl'
                        }
                    }
                });
                .state('home.authorization', {
                    url: '/authorization',
                    abstract: true,
                    views: {
                        'homeMain': {
                            templateUrl: './view/authorization/authorization.html',
                            controller: 'authorizationCtrl'
                        }
                    }
                })
                .state('home.authorization.organizationMgmt', {
                    url: '/organizationMgmt',
                    views: {
                        'authorization': {
                            templateUrl: './view/authorization/organizationMgmt/organizationMgmt.html',
                            controller: 'organizationMgmt'
                        }
                    }
                });
        }
    ]);
