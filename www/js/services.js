﻿angular.module('starter.services', [])
//文化遗产对象与服务器和数据库通信的操作方法,用一个服务表示
.factory('HeritagePoints', function($http,$rootScope) {
	//文化遗产对象集合：单例模式的内部存储对象，不提供直接访问
	$rootScope.heritagePoints=[];
				//根据id从内部文化遗产集合中取出对应文化遗产
				function ghpbyId(hptId){
					for (var i = 0; i < $rootScope.heritagePoints.length; i++) {
			        if ($rootScope.heritagePoints[i]._id == hptId) {
			          return $rootScope.heritagePoints[i];
			        }}
			      return null;
			      };
			  return {
			  	//获取文化遗产全集:提供给各个controller的公用方法
			    all: function() {
			      return $rootScope.heritagePoints;
			    },
			    //删除一个指定的文化遗产
			    remove: function(hpt) {
			      $rootScope.heritagePoints.splice($rootScope.heritagePoints.indexOf(hpt), 1);
			    },
			    //添加一个指定的文化遗产
			    addNew: function(hpt) {
			      $rootScope.heritagePoints[$rootScope.heritagePoints.length]=hpt;
			    },
			    //获得一个指定的文化遗产
			    getHPbyId: function(hptId) {
			      	return ghpbyId(hptId);
			    },
			    //刷新文化遗产对象,与服务器通信
			    refresh: function(postfun) {
			    	//获取所有的文化遗产
						$http({  
						     method:'get',
						     url:'http://58.64.149.165:2000/heritagepoint/findall'					         
						     })
						//异步获取文化遗产数据后的回调函数
						.success(function(data,status,headers,config){
						         $rootScope.heritagePoints=data;
						         if(postfun){postfun();};
						         for(var i=0;i<$rootScope.heritagePoints.length;i++){
								    		var hid=$rootScope.heritagePoints[i]._id;
								    		//根据文化遗产id进一步查找对应的全景图								    		
								    		$http({  
											     method:'get',
											     url:'http://58.64.149.165:2000/panoimg/:hpId'	,
					        					params:{hpId:hid}    				         
											     })
											.success(function(data,status,headers,config){
															//得到全景图数据后将其装配到文化遗产中,构造一个完整的文化遗产对象	
											         panoimgs=data;
											         if(panoimgs.length)
											         {
											         	var heritagePoint=	ghpbyId(panoimgs[0].hpFK); 
											         	//heritagePoint.panolist=panoimgs;											         	
											         }
											          if(status==200){											          	
											          	};
											     }).error(function(data,status,headers,config){
											     			$rootScope.heritagePoints[i].panolist  =[];
											     });
								    		}
						          if(status==200){
						          	};
						     }).error(function(data,status,headers,config){
						     			$rootScope.heritagePoints  =[];
						          alert("提示：当前查询到文化遗产数量为"+status);
						     }); 
			      return $rootScope.heritagePoints;
			    },
			    //工具函数,生成uuid
					guid: function () {
						return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					  var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
					  return v.toString(16);
					    });
					}
			  };
	}).factory('CurUser', function($http,$rootScope) {
		
		}).factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: '盛来运',
    lastText: '保平村路口有一堆废轮胎',   
    msgNums:3,
    face: 'img/men1.jpg',
    msgs:[
    	{
    		img:'img/men1.jpg',
    		text:'不知道谁堆的'
    	},
    	{
				img:'img/men1.jpg',
    		text:'不知道谁堆的'
    	}
    ]
  }, {
    id: 1,
    name: '席慕蓉',
    lastText: '今天要去市局开会',
    msgNums:3,
    face: 'img/men2.jpg',
    msgs:[
    	{
    		img:'img/men1.jpg',
    		text:'不知道谁堆的'
    	},
    	{
				img:'img/men1.jpg',
    		text:'不知道谁堆的'
    	}
    ]
  }, {
    id: 2,
    name: '寿致和',
    lastText: '渔港有条船搁浅了',
    msgNums:3,
    face: 'img/men3.jpg',
    msgs:[
    	{
    		img:'img/men1.jpg',
    		text:'不知道谁堆的'
    	},
    	{
				img:'img/men1.jpg',
    		text:'不知道谁堆的'
    	}
    ]
  }, {
    id: 3,
    name: '穆育才',
    lastText: '请看a栋新入住的外来人口',
    msgNums:3,
    face: 'img/men4.jpg',
    msgs:[
    	{
    		img:'img/men1.jpg',
    		text:'不知道谁堆的'
    	},
    	{
				img:'img/men1.jpg',
    		text:'不知道谁堆的'
    	}
    ]
  }, {
    id: 4,
    name: '马超',
    lastText: '帮我预订一下食堂的工作餐',
    msgNums:13,
    face: 'img/men5.jpg',
    msgs:[
    	{
    		img:'img/men1.jpg',
    		text:'不知道谁堆的'
    	},
    	{
				img:'img/men1.jpg',
    		text:'不知道谁堆的'
    	}
    ]
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})/**
 * 拍照功能
 */
.factory('Camera', function($q) {
	return {
		getPicture: function(options) {
			var q = $q.defer();
			navigator.camera.getPicture(function(result) {
				// Do any magic you need
				q.resolve(result);
			}, function(err) {
				q.reject(err);
				//alert(err);
			}, options);

			return q.promise;
		}
	}
})


/**
 * Upyun认证数据
 */
.factory('Upyun', function($http) {
	return {
		token: function(name, size) {
			return $http.jsonp("http://transfer.impress.pw/upyun?callback=JSON_CALLBACK", {
				cache: false
			});
		}
	}
});
