﻿var mainctr=angular.module('starter.controllers');
mainctr.controller('TabCtrl', function($scope, $rootScope,$state,HeritagePoints, $ionicLoading) {
		$scope.isHideCss=  $rootScope.hideAccountTab;
});
