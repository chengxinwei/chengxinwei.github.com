

/**
控制类
*/


var initController = function(){

	$("#bak_canvas").bind("contextmenu",function(e){
		clearSelectTower();
		return false;
	});


	//点击事件 可能点击控制台的塔开始建造  也可能建造塔
	$("#bak_canvas").click(function(e){
		e = e || window.event;
		
		clearContext(tower_info_context);


		//如果选中了显示塔 可能会升级 或者 卖掉
		if(showTowerTowerX && showTowerTowerY){
			mayBeUpOrSaleTower(e);
			showTowerTowerX = null;
			showTowerTowerY = null;
			return ;
		}

		//如果没有选择建造的建筑 则处理下面的业务 建造建筑的优先级最高
		if(selectedBuildTower!=null ){
			var buildFlag = mayBuildTower(e);
			if(buildFlag){
				//$("canvas").unbind("mousemove");				
				clearContext(bak_context);
			}	
			//点击空白地方清空选择塔
			
		}else{						
			
			//清空bak层
			clearBak();
			//显示塔的信息
			maybeShowTowerAttackRange(e);				
			//建造塔   
			maybeChooseTower(e);

			
		}

		

	});


	//鼠标移动显示的信息  
	$("#bak_canvas").mousemove(function(e){
		clearBak();
		e = e || window.event;
		//如果选中过塔 则移动显示塔的攻击范围 
		if(selectedBuildTower !=null){
			showMoveTower(e);
		}else{
		//没有选中过的话 判断xy坐标 如果经过控制栏的塔图标需要显示塔的信息
			var __x = getMapX(e);
			var __y = getMapY(e);
			var __index =  backGroundData[__y][__x];
			var __tower = createTowerByIndex(__x , __y ,__index , 1);
			if(__tower != null){
				showTowerInfo(__x * mapSize , __y * mapSize , __tower);
			}
			
		}
	});
}