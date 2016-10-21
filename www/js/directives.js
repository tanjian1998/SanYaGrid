﻿var maindictvs=angular.module('starter.directives',[]);
maindictvs.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        
				var position=new AMap.LngLat(116.2736372882, 40.0641972545);
				//alert($element[0].id);

        var map = new AMap.Map($element[0].id, {
		 
					view:new AMap.View2D({
					resizeEnable: false,
					
					center:position,
					 
					zoom:14,
					 
					rotation:0
					 
					})});
  
				//alert($scope.curUser+"kk");
        $scope.onCreate({map: map});
				//加入缩放工具栏
				map.addControl(new AMap.ToolBar());
				//加入鹰眼
				map.addControl(new AMap.OverView());
		
        // Stop the side bar from dragging when mousedown/tapdown on the map
        AMap.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
        // Stop the side bar from dragging when mousedown/tapdown on the map
        AMap.event.addDomListener($element[0], 'click', function (e) {
          e.preventDefault();
          return false;
        });
      }


      if (document.readyState === "complete") {
      	      	
        initialize();
      } else {
        AMap.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});
maindictvs.directive('pano', function() {
  return {
    restrict: 'E',
    scope: false,
    link: function ($scope, $element, $attr) {
      function initializePano() {
        
				//var position=new AMap.LngLat(116.2736372882, 40.0641972545);
				/*var str="";
				for(var i in $scope){str+=i+">";};
				alert(str);*/

				var PSV = new PhotoSphereViewer({
					panorama: $scope.panourl,
					container: $element[0],
					time_anim: 3000,
					navbar: true,
					navbar_style: {
						backgroundColor: 'rgba(58, 67, 77, 0.7)'
					},
				});
				
				//alert($scope.panourl);
        $scope.panoCreated(PSV);
        // Stop the side bar from dragging when mousedown/tapdown on the map
        $element[0].addEventListener('mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      };
      
      //这一句非常关键
			$scope.$watch("panourl",initializePano);

      if (document.readyState === "complete") {
        initializePano();
      } else {
        window.addEventListener('load', initializePano);
      }
    }
  }
});

maindictvs.directive('fileupload', function() {
  return {
    restrict: 'E',
    scope: false,//表示沿用所在controller的$scope对象
    templateUrl: 'templates/fileuploader.html',
    link: function ($scope, $element, $attr) {
      function initializePano() {
        
				//var position=new AMap.LngLat(116.2736372882, 40.0641972545);
				/**/
				/*var str="";
				var obj=$element[0].childNodes[9];//.childNodes[3]
				for(var i in obj){str+=i+">"+i.id+"<";};
				alert(obj.id+"\n"+str);*/
				var inpuffileNode=$element[0].childNodes[1].childNodes[3];
				var fileNameLabelNode=$element[0].childNodes[5];
				var fileSizeLabelNode=$element[0].childNodes[6];
				var fileTypeNode=$element[0].childNodes[7];
				var uploadBtm=$element[0].childNodes[9];

				var responseFun=$scope.uploadComplete;
				var uploadProgressFun=$scope.uploadProgress;
				//alert(inpuffileNode.id);
				var filedir=$attr.filedir;
				var fileuploader = new html5fileuploader(inpuffileNode,fileNameLabelNode,fileSizeLabelNode,
				fileTypeNode,responseFun,uploadProgressFun,filedir);
				//function test(){alert(1);};
				//alert($scope.panourl);
        //$scope.panoCreated(PSV);
        $scope.filenameNode=fileNameLabelNode;
        // Stop the side bar from dragging when mousedown/tapdown on the map
        inpuffileNode.addEventListener('change', fileuploader.fileSelected);
        
        uploadBtm.addEventListener('click', fileuploader.uploadFile);
        //fileuploader.okUrl();
        /**/
      }

      if (document.readyState === "complete") {

        initializePano();
      } else {
        window.addEventListener('load', initializePano);
      }
    }
  }
});
      	//alert(1);