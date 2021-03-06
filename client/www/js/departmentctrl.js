﻿var accountctr=angular.module('starter.controllers');
accountctr.controller('DepartmentCtrl', function($scope,$rootScope,$state, $ionicBackdrop,$ionicPopup, $http,$ionicModal) {
	  $scope.departments = [
    {
      name: '三亚市崖州区城市管理局（综合行政执法局）',
      checked: false,
      clapse:true,
      persons:[
      {name:'赵新天'},
      {name:'刘文光'},
      {name:'吴兴学'}
      ],
      tree: [
        {
          name: '执法一队',
          checked: true,
          clapse:false,
          persons:[
			      {name:'tan',chatid:0},
			      {name:'tajjj',chatid:1},
			      {name:'tantadd',chatid:2}
			      ]
        },        
        {
          name: '执法二队',
          checked: true,
          clapse:false
        },        {
          name: '执法三队',
          checked: true,
          clapse:false
        },        {
          name: '执法机动队',
          checked: true,
          clapse:false
        },        {
          name: '市容督察大队',
          checked: true,
          clapse:false
        }
      ]
    },
    {
      name: 'first task 2',
      checked: true
    }
  ];
	
	$scope.$on('$ionTreeList:ItemClicked', function(event, item) {
	  // process 'item'
	  item.clapse=!item.clapse;
	  console.log(item);
	});
	
	$scope.$on('$ionTreeList:LoadComplete', function(event, items) {
	  // process 'items'
	  console.log(items);
	});

});