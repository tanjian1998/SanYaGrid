﻿
var mainctr=angular.module('starter.controllers');
mainctr.controller('NewsCtrl', function($scope, $state,$stateParams, $rootScope, $ionicBackdrop,$ionicPopup, $http,$ionicModal,HeritagePoints) {

  
  
	HeritagePoints.refresh($scope.refresh);
  
  $scope.refresh=function(){
  		$scope.heritagePoints =HeritagePoints.all();
  	
  	};
  
	 $scope.data = {
    showDelete: false
  };
  
  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };
  $scope.share = function(item) {
    alert('Share Item: ' + item.id);
  };
  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };
  
  $scope.hpImgBaseUrl=hpImgBaseUrl;
	$scope.imgFilename;
  
  
   $scope.onItemDelete= function(heritageImg) {
   	     var confirmPopup = $ionicPopup.confirm({
       title: '确认',
       template: '你确认要删除文化遗产?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('确认');
          //保存提交到服务器	
          //alert(heritageImg._id);
					$http({  
			         method:'POST',
			         url:'http://58.64.149.165:2000/heritagepoint/remove',
			         
					      data:{_id:heritageImg._id},
			        //params:[data:$scope.movieTestData ],
			         headers: {'Content-Type': 'application/json;charset=utf-8'},
			         dataType:'JSON'
			        //params:[data:$scope.movieTestData ],			         
			         })
					.success(function(data,status,headers,config){ 
										alert("删除文化遗产成功！");
			              $scope.resMsg=data;
			              var pls=$scope.heritagePoints;
			              pls.splice(pls.indexOf(heritageImg), 1);
			              if(status==200)//添加成功后
			              {			              	
											//HeritagePoints.refresh();
			              	//$scope.newPanoImg={};
											//$scope.AddWin.remove();
			              };
			         }).error(function(data,status,headers,config){  
			              
			         });  
       } else {
         console.log('You are not sure');
       }
     });
   };
   
  
  //alert("heritagePoints:"+$scope.heritagePoints.length);
	$scope.curHeritpoint;
	//查看一个文化遗产的全景图
		$scope.lookthepano= function(hp) {
			$scope.curHeritpoint=hp;     
			$state.go('tab.pano-detail',{panoId:hp._id});
		}
		
		$scope.addHpoint=function(){
			$scope.newAddWin();
			}
			
			    //上传成功响应
    $scope.uploadComplete=function(evt) {
    	//服务断接收完文件返回的结果
    	$scope.imgFilename=evt.target.responseText;//evt.target.responseText;"2.jpg";
    	alert($scope.imgFilename+"上传成功!");

    }
       	    //上传进度
    $scope.uploadProgress=function(evt) {
    	  if (evt.lengthComputable) {
    	    $scope.percentComplete = Math.round(evt.loaded * 100 / evt.total)+ '%';
    	    //document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
    	  }
    	  else {
    	    //document.getElementById('progressNumber').innerHTML = 'unable to compute';
    	  }
    }
		 //////////////////////////////////////////////////////////
		// 全局方法：打开添加文化遗产窗口		
		$scope.newAddWin = function() {
			$scope.imgFilename="";
			$scope.newHeritpoint={};     
			//$scope.newHeritpoint.id=HeritagePoints.guid();
			$scope.newHeritpoint.location=[];
			// 生成关于模态窗口
			$ionicModal.fromTemplateUrl('templates/demo-hPointNew.html', {
					scope: $scope,
					animation: 'slide-in-up'		
			}).then( function(modal) 
			{		
			$scope.AddWin = modal; // 创建模态窗口 personModal

		     $scope.AddWin.show();			
			}); 
	
		};
				
		// 全局方法：关闭窗口		
		$scope.closeAddWin = function() {		
		     $scope.AddWin.remove();		
		};

		// 全局方法：确认提交窗口		
		$scope.confirmAddWin = function(newHeritpoint) {
				$scope.newHeritpoint=newHeritpoint;
				if(!$scope.imgFilename){alert("没有选中图片文件！");return;}
				$scope.newHeritpoint.icon=$scope.imgFilename;
				
				//alert($scope.newHeritpoint.id+"<>"+$scope.newHeritpoint.name);
				//HeritagePoints.addNew($scope.newHeritpoint);
		     
		     //$scope.AddWin.remove();		
		     //保存提交到服务器	
					$http({  
			         method:'POST',
			         url:'http://58.64.149.165:2000/heritagepoint/add',  
			         data:$scope.newHeritpoint,
			        //params:[data:$scope.movieTestData ],
			         headers: {'Content-Type': 'application/json;charset=utf-8'},
			         dataType:'JSON'
			         })
					.success(function(data,status,headers,config){ 
										alert("添加文化遗产点成功！");
			              $scope.resMsg=data;
			              if(status==200)//添加成功后
			              {			              	
											HeritagePoints.refresh($scope.refresh);
			              	$scope.newHeritpoint={};
											$scope.AddWin.remove();
			              };
			         }).error(function(data,status,headers,config){  
			              
			         });  
		};
		
	
	///////////////////////////////////////////////////////////////////	
			
  //////////////////////////////////////////////////////////
		// 全局方法：打开编辑文化遗产窗口		
		$scope.edit = function(item) {
			//$scope.imgFilename=$scope.curHeritpoint.icon;
			$scope.curHeritpoint=item;     
			//$scope.newHeritpoint.id=HeritagePoints.guid();
			//$scope.newHeritpoint.location=[];
			// 生成关于模态窗口
			$ionicModal.fromTemplateUrl('templates/demo-hPointEdit.html', {
					scope: $scope,
					animation: 'slide-in-up'		
			}).then( function(modal) 
			{		
			$scope.EditWin = modal; // 创建模态窗口 personModal

		     $scope.EditWin.show();			
			}); 
	
		};
				
		// 全局方法：关闭窗口		
		$scope.closeEditWin = function() {		
		     $scope.EditWin.remove();		
		};

		// 全局方法：确认提交窗口		
		$scope.confirmEditWin = function(newHeritpoint) {
				$scope.curHeritpoint=newHeritpoint;
				if(!$scope.imgFilename){alert("没有选中图片文件！");return;}
				$scope.curHeritpoint.icon=$scope.imgFilename;
				
		     //保存提交到服务器	
					$http({  
			         method:'POST',
			         url:'http://58.64.149.165:2000/heritagepoint/edit',  
			         data:$scope.curHeritpoint,
			         headers: {'Content-Type': 'application/json;charset=utf-8'},
			         dataType:'JSON'
			         })
					.success(function(data,status,headers,config){ 
										alert("编辑文化遗产点成功！");
			              $scope.resMsg=data;
			              if(status==200)//添加成功后
			              {			              	
											HeritagePoints.refresh();
			              	$scope.curHeritpoint={};
											$scope.EditWin.remove();
			              };
			         }).error(function(data,status,headers,config){  
			              
			         });  
		};
		
	
	///////////////////////////////////////////////////////////////////	
			
  //////////////////////////////////////////////////////////
		// 全局方法：打开详细信息窗口		
		$scope.newAbout = function(hp) {
			$scope.curHeritpoint=hp;     
			// 生成关于模态窗口
			$ionicModal.fromTemplateUrl('templates/demo-hPointDetail.html', {
					scope: $scope,
					animation: 'slide-in-up'		
			}).then( function(modal) 
			{		
			$scope.aboutModal = modal; // 创建模态窗口 personModal

		     $scope.aboutModal.show();			
			}); 
	
		};
				
		// 全局方法：关闭窗口		
		$scope.closeAbout = function() {		
		     $scope.aboutModal.remove();		
		};

		//如果信息页面是从地图点过来的，弹出详细信息
		if($stateParams.hpdetailId)
  	{
  		//alert("传过来的值："+$stateParams.hpdetailId);
  		$scope.curHeritpoint = HeritagePoints.getHPbyId($stateParams.hpdetailId);
  		$scope.newAbout($scope.curHeritpoint);
  		};
	///////////////////////////////////////////////////////////////////
	});