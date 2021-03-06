﻿var mainctr=angular.module('starter.controllers');
mainctr.controller('MapCtrl', function($scope,$state, $rootScope,HeritagePoints,$ionicPopup,$cordovaDevice,$http, $ionicLoading,$timeout) {
		//崖州的中心点坐标
		$scope.centerLong=109.1736372882;
		$scope.centerLat=18.341972545;
	//directive初始化好地图后，调用的第一个函数，这个函数把地图对象和$Scope对象连接起来
  $scope.mapCreated = function(map) {
    $scope.map = map;
    // 进行定位
    /*
		baidu_location.getCurrentPosition(function(successData){
			$scope.centerLong=successData.lontitude;
			$scope.centerLat=successData.latitude;
			$scope.map.setCenter([$scope.centerLong,$scope.centerLat]);		
					//添加点标记，并使用自己的icon
			    var newicon=new AMap.Marker({
			        map: $scope.map,
							position: new AMap.LngLat($scope.centerLong,$scope.centerLat),		 
							draggable: true,
			      	cursor: 'move',
			      	raiseOnDrag: true,
			        icon: new AMap.Icon({            
			            size: new AMap.Size(40, 40),  //图标大小
			            image: '../img/map/heritageBuilding.png',
			            imageOffset: new AMap.Pixel(0, 0)
			        })        
			    });
			}, function(errData){
						alert(errData);
						$scope.map.setCenter([$scope.centerLong,$scope.centerLat]);
								//添加点标记，并使用自己的icon
				    var newicon=new AMap.Marker({
				        map: $scope.map,
							  position: new AMap.LngLat($scope.centerLong,$scope.centerLat),			 
								draggable: true,
				      	cursor: 'move',
				      	raiseOnDrag: true,
				        icon: new AMap.Icon({            
				            size: new AMap.Size(40, 40),  //图标大小
				            image: '../img/map/heritageBuilding.png',
				            imageOffset: new AMap.Pixel(0, 0)
				        })        
				    });
			});*/
			
			
			
			
			
		window.setInterval(function(){
			//开始定位刷新
			$scope.refeshLocation($scope.uploadLocation);
		},$rootScope.locationRefreshTime);
		//上传一个定位点试试
		//$scope.uploadLocation();
		
//		$rootScope.heritagePoints=[];
//		HeritagePoints.refresh($scope.loadHeritagePoints);

		//   	if ($cordovaDevice) {
		//   		   	var uuid = $cordovaDevice.getUUID();
		//		
		//					alert("手机信息："+uuid); 
		//					//根据uuid取到当前用户
		//   				$state.go('tab.dash');
		//    			//如果此uuid没有用户，则转到注册画面 
		//   				$state.go('tab.login');
		//   	}
		    
		    //根据uuid取到当前用户
		    //如果此uuid没有用户，则转到注册画面
		
  };
  //$rootScope.hideAccount=true;
  $rootScope.editable=false;
  $scope.showAccountTab=true;
  
  //实时手机定位刷新
  //定位是定位，上传是上传，所以这里函数通过回调来传递
  $scope.refeshLocation=function (callback){
  	var locationMethod;
  	//先用百度的定位服务
  	if(baidu_location){
  		locationMethod=baidu_location;
  		}
  	else if(navigator.geolocation)//如果百度的不行再用html5的
  		{
  		locationMethod=navigator.geolocation;
  		};
  	locationMethod.getCurrentPosition(
  	function(successData){
  		$scope.centerLong=successData.lontitude;
			$scope.centerLat=successData.latitude;
			//如果有回调函数，就把位置传进去
			var locationObj={ 
				positioningdate:new Date(),
				SRS:'4321',
				geolocation:{type:[successData.lontitude,successData.latitude]}
				};
				
				//如果当前没有跟踪对象
				if (!$rootScope.focusMapObject) {
					$scope.map.setCenter([$scope.centerLong,$scope.centerLat]);	
					//如果当前用户没有地图标记
					if (!$rootScope.curUserMapIcon) {
						$rootScope.curUserMapIcon=new AMap.Marker({
			    		id:$rootScope.curUser._id,
			        position: new AMap.LngLat($scope.centerLong,$scope.centerLat),
			        draggable: false,
			        cursor: 'move',
			        raiseOnDrag: true,
			        label:{//label默认蓝框白底左上角显示，样式className为：amap-marker-label
			        offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
			        content: $rootScope.curUser.name
			   			 },
			        map: $scope.map
			    });
			    
					}else {
						//如果有就刷新位置
						$rootScope.curUserMapIcon.setPosition(new AMap.LngLat($scope.centerLong,$scope.centerLat));
					}
				}
				
			if(callback)(callback(locationObj));
			//上传一个定位点试试,上面这部分是实时的
			//$scope.uploadLocation();
			//alert(successData);
			//注意：以下的迭代是没有用的，会造成无数个子分支，导致最后的调用周期非常短
			//注意刷新时间是从全局获取的，这部分要成为可配置项
			//$timeout($scope.refeshLocation(callback),
			//		$rootScope.locationRefreshTime);
		},function(errData){
			//对于迭代来说没有办法，错误数据仍然要传回服务器端
		//$timeout($scope.refeshLocation(callback),
		//$rootScope.locationRefreshTime);
		});			
  }
  

  
  $scope.uploadLocation=function(locationObj){
  	//alert("uploadLocation");
  	var curUserId;
  	if ($rootScope.curUser._id) {
  		var curUserId=$rootScope.curUser._id;  		
  	}else {
  		alert("当前用户为空，取消定位！");
  		return;
  	}
  	//保存提交到服务器	
			$http({  
	         method:'POST',
	         url:'http://120.76.228.172:2000/person/addlocation',  
	         //params:{personid:curUserId},
	         data:{personid:curUserId,
	         			curlocation:
	         			//这是一个测试数据
//	         			{ 
//	         				positioningdate:new Date(),
//									SRS:'4321',
//									geolocation:{
//										type:[109.1,38.6]
//										}
//							}
								locationObj
							},
	         headers: {'Content-Type': 'application/json;charset=utf-8'},
	         dataType:'JSON'
	         })
			.success(function(data,status,headers,config){ 
								//alert("用户定位点修改成功！");
								curUser=$scope.curUser;
	              $scope.resMsg=data;
	              if(status==200){
	              	//说明服务器端新定位点保存成功
	              	
	              	};
	         }).error(function(data,status,headers,config){  
	              
	         });  
			
  	}
  
  //随机生成10个图标点
	$scope.draw = function(){
			for(var i=0;i<10;i++){
		//添加点标记，并使用自己的icon
    var newicon=new AMap.Marker({
        map: $scope.map,
				position: new AMap.LngLat($scope.centerLong+Math.random()/8,$scope.centerLat+Math.random()/8),		 
				draggable: true,
      	cursor: 'move',
      	raiseOnDrag: true,
        icon: new AMap.Icon({            
            size: new AMap.Size(40, 40),  //图标大小
            image: '../img/map/heritageBuilding.png',
            imageOffset: new AMap.Pixel(0, 0)
        })        
    }); };
    };



 $scope.markerClick=function(e) {
		var hpid=e.target.content._id;
  	//alert(hpid);
		$state.go('tab.news-detail',{hpdetailId:hpid});
};

 $scope.loadHeritagePoint=function(hp,mapobj){
    var marker = new AMap.Marker({
    		id:hp._id,
        position: hp.location, 
        draggable: true,
        cursor: 'move',
        raiseOnDrag: true,
        label:{//label默认蓝框白底左上角显示，样式className为：amap-marker-label
        offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
        content: hp.name
   			 },
        map: mapobj
    });
    
    marker.setTitle("点击查看"+hp.name+"详情");
    marker.content = hp;
    marker.on('click', $scope.markerClick);
   // marker.emit('click', {target: marker});
};

//这一句非常关键
$rootScope.$watch("heritagePoints",$scope.loadHeritagePoints);

$scope.loadHeritagePoints=function ()
{
	//alert("调用了地图标注");
	$scope.hps=$rootScope.heritagePoints;
	for(var curindex=0; curindex<$rootScope.heritagePoints.length;curindex++){
		$scope.loadHeritagePoint($rootScope.heritagePoints[curindex],$scope.map)
		};
		
};

$scope.closePoints=function ()
{
    document.getElementById("closeinfo").addEventListener("click", function(){ alert("Hello World")}); 
};

		//点击显示按钮条
		$scope.btnBarShow=false;
		//左上角的应用设置
		$scope.login=function(){
					alert("1");
   	$state.go('tab.account-login');
   	alert("2");
			};
		//左上角的应用设置
		$scope.locationAppSetting=function(){
	
           $scope.data = {name:"admin"}

           // 自定义弹窗
           var myPopup = $ionicPopup.show({
             template: '<input type="text" ng-model="data.name"><br><input type="password" ng-model="data.pwd">',
             title: '用户登录',
             subTitle: '选择超级用户或者输入自己的用户名',
             scope: $scope,
             buttons: [
               { text: '退出' },
               {
                 text: '<b>登录</b>',
                 type: 'button-positive',
                 onTap: function(e) {
                   if (!$scope.data.pwd) {
                     // 不允许用户关闭，除非输入 用户 密码
                     e.preventDefault();
                   } else {
                   	//超级用户的密码在这里就是123456
                   	if($scope.data.name=="admin"&& $scope.data.pwd=="123456"){
                   		curUser={'_id':"dfgdfgdfgdfg",
															    'name': 'admin',
																	'alias':'admin',
																	'title':'admin',
																	'mobile':'admin',
																	'age':'admin'
															};
  										$rootScope.hideAccount=false;
  										$rootScope.editable=true;
											              	alert("用户已登录，当前用户名称："+curUser.name);
															//alert(managerCss);
                   		}else{
                       //获取用户名密码对应的用户
											  $http({  
											         method:'post',
											         url:'http://58.64.149.165:2000/person/check',  
											         data:{'name': $scope.data.name,
																	'alias':$scope.data.pwd}     
											         })
													.success(function(data,status,headers,config){
														if(!data.name){ alert("输入用户名密码错误或未注册");}else{ 							
											             curUser=data;
											              if(status==200){
											              	alert("用户已登录，当前用户名称："+curUser.name);
											              	$rootScope.hideAccount=false;
  																		$rootScope.editable=true;
											              };}
											         }).error(function(data,status,headers,config){  
											              alert("提示：当前可连接到的景区服务器数量为"+status);
											         }); 
                   }
                   }
                   
                 }
               },
             ]
           });
           myPopup.then(function(res) {
             console.log($scope.showAccountTab, res);
           });

          };
			
});
