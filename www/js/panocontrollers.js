var mainctr=angular.module('starter.controllers');
mainctr.controller('panoCtrl', function($scope,$stateParams,$compile, $rootScope,$ionicBackdrop,$ionicPopup, $http,$ionicModal,HeritagePoints) {
	$scope.panobaseurl=hpPanoBaseUrl;
	$scope.panoImgurl;
	$scope.panourl=hpPanoBaseUrl+firstpanourl;
  $scope.panoCreated = function(pano) {
  	//alert("传过来的值："+$stateParams.panoId);
  	$scope.curheritagePoint = HeritagePoints.getHPbyId($stateParams.panoId);
  
    $scope.pano = pano;
    $scope.heritagePoints=HeritagePoints.all();
    
    if(!$scope.curheritagePoint){
    	$scope.curheritagePoint=$scope.heritagePoints[0];
    }
    $scope.panolistShow=false;
    /*
    var str="";
				for(var i in pano){str+=i+">";};
				alert(str);*/
   // $pano.testpan();
  };
  
//这一句非常关键
$rootScope.$watch("heritagePoints",$scope.panoCreated);

	$scope.showpanolist = function(){
    $scope.panolistShow=!$scope.panolistShow;
  };
  
  $scope.allHpts=HeritagePoints.all();
  $scope.newPanourl;
  $scope.newPanoImg={};     
  $scope.addpano=function(){

			// 生成添加全景图的模态窗口
			$ionicModal.fromTemplateUrl('templates/demo-panoImgNew.html', {
					scope: $scope,
					animation: 'slide-in-up'		
			}).then( function(modal) 
			{		
				$scope.panoImgurl="";
				$scope.panouploaded=false;
				$scope.AddWin = modal; // 创建模态窗口 personModal
		    $scope.AddWin.show();			
			}); 
  };
  
  // 全局方法：关闭窗口		
	$scope.closeAddWin = function() {		
		     $scope.AddWin.remove();		
	};
	
				    //上传成功响应
    $scope.uploadComplete=function(evt) {
    	//服务断接收完文件返回的结果
    	$scope.panoImgurl=evt.target.responseText;//evt.target.responseText;"2.jpg";
    	$scope.panouploaded=true;
				
    	//$scope.dirty();
    	alert($scope.panoImgurl+"上传成功!");
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
   
   $scope.delpano= function(PanoImg) {
   	     var confirmPopup = $ionicPopup.confirm({
       title: '确认',
       template: '你确认要删除全景图?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('确认');
          //保存提交到服务器	
          //alert(PanoImg._id);
					$http({  
			         method:'POST',
			         url:'http://58.64.149.165:2000/panoimg/remove',
			         
					      data:{_id:PanoImg._id},
			        //params:[data:$scope.movieTestData ],
			         headers: {'Content-Type': 'application/json;charset=utf-8'},
			         dataType:'JSON'
			        //params:[data:$scope.movieTestData ],			         
			         })
					.success(function(data,status,headers,config){ 
										alert("删除全景图成功！");
			              $scope.resMsg=data;
			              var pls=$scope.curheritagePoint.panolist;
			              pls.splice(pls.indexOf(PanoImg), 1);
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
   
		// 全局方法：确认提交窗口		
		$scope.confirmAddPanoImgWin = function(newPImg) {
			$scope.newPanoImg=newPImg;
			$scope.newPanoImg.url=$scope.panoImgurl;
			
    	
				if(!$scope.newPanoImg.url){alert("没有选中图片文件！");return;}
				
				  //保存提交到服务器	
					$http({  
			         method:'POST',
			         url:'http://58.64.149.165:2000/panoimg/add',  
			         data:$scope.newPanoImg,
			        //params:[data:$scope.movieTestData ],
			         headers: {'Content-Type': 'application/json;charset=utf-8'},
			         dataType:'JSON'
			         })
					.success(function(data,status,headers,config){ 
										alert("添加全景图成功！");
			              $scope.resMsg=data;
			              if(status==200)//添加成功后
			              {			              	
											HeritagePoints.refresh();
			              	$scope.newPanoImg={};
											//$scope.AddWin.remove();
			              };
			         }).error(function(data,status,headers,config){  
			              
			         });  
		};
	
  
	$scope.changepanourl = function(pano){
			$scope.panourl=$scope.panobaseurl+pano.url;

    };
    



		$scope.btnBarShow=false;
		//左上角的应用设置
		$scope.locationAppSetting=function(){
			//$scope.btnBarShow=true;
			//alert('1');
			$scope.btnBarShow=!($scope.btnBarShow);
			};
});
