
//塔的数据   0：空白  1.1：第一种类塔 等级1
var towerData = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]


var now_towerAry = new Array();

var selectedBuildTower = null;

//用于保存 点击塔显示攻击范围的 塔的坐标  坐标相对于 towerData二维数组中
var showTowerTowerX = null;
var showTowerTowerY = null;

//升级或者卖掉 按钮大小
var icon_size = 30;

var towerObj = function(x,y,image , basePower , baseSize , upPercent , imageHeight , index , speed ,gold , name , desc , refreshTime , attackSum ,upGold ){
	this.index = index;
	this.x = x;
	this.y = y;
	this.image = image;  //塔的图片
	this.basePower = 20;	   //基础攻击力
	this.power  = 20;	  //当前攻击力
	this.baseSize = baseSize; //基础攻击距离
	this.size = baseSize;       //当前攻击距离
	this.upPercent = upPercent;   //每次升级提高的百分比
	this.imageHeight = imageHeight;
	this.level = 1;
	this.speed = speed;
	this.targetMouster = null;
	this.lastUpdateTime = null;
	this.gold = gold;
	this.name = name;
	this.desc = desc;
	this.refreshTime = refreshTime; 
	this.baseRefreshTime = refreshTime; 
	this.attackSum = attackSum;	//塔的攻击数量
	this.upGold = upGold;  //升级需要的金钱
}

var tower = {
	tower1 : {	
		name:'破坏者',
		desc:'具有强大的破坏力,超远的攻击距离,但是攻击速度缓慢',
		basePower : 40,
		baseSize  : 130,
		upPercent : 0.2,
		imageHeight : 42,
		speed : 8,
		gold : 100 , 
		refreshTime : 1300,
		attackSum : 1,
		upGold : 120
	},tower2 : {	
		name:'冰塔',
		desc:'被冰塔攻击的怪物会减慢移动速度',
		basePower : 12,
		baseSize  : 90,
		upPercent : 0.2,
		imageHeight : 49,
		speed : 8,
		gold : 80,
		refreshTime : 700 ,
		attackSum : 1,
		upGold : 100
	},tower3 : {	
		name:'雷电塔',
		desc:'超快的攻击速度,但是攻击较弱',
		basePower : 6,
		baseSize  : 100,
		upPercent : 0.35,
		imageHeight : 42,
		speed : 16,
		gold : 60,
		refreshTime : 200,
		attackSum : 1,
		upGold : 110
	},tower4 : {
		name:'箭塔',
		desc:'箭塔具有多重攻击,但是攻击较弱',
		basePower : 10,
		baseSize  : 110,
		upPercent : 0.15,
		imageHeight : 42,
		speed : 12,
		gold : 80,
		refreshTime : 700,
		attackSum : 5,
		upGold : 65
	},
}



//初始化防御塔
var initTower  = function (){
	
	clearContext(tower_context);

	//清空
	now_towerAry.length = 0;
	
	//初始化
	for(var i=0;i<towerData.length;i++){
		for(var j=0;j<towerData[i].length;j++){		
			var index = towerData[i][j];
			if(index.length != 3){
				continue;
			}						
			var towerIndex = 'T' + parseInt(index.substring(0,1));
			var levelIndex = parseInt(index.substring(2,3));		
			
			var __tower = createTowerByIndex (j * mapSize , i * mapSize , towerIndex , levelIndex);
			if(__tower){
				drawTower (j , i , __tower , tower_context);
				now_towerAry.push(__tower);
			}
		}
	}						
}



//根据塔的编号 以及 等级 获取攻击范围
var getSizeByIndexAndLevel = function(index  , level){
	
	var __baseSize = null;
	var __baseUpPercent = null;
	if(index == 'T1' ){
		__baseSize = tower.tower1.baseSize;
		__baseUpPercent = tower.tower1.upPercent;
	}else if(index == 'T2'){
		__baseSize = tower.tower2.baseSize;
		__baseUpPercent = tower.tower2.upPercent;
	}else if(index == 'T3'){
		__baseSize = tower.tower3.baseSize;
		__baseUpPercent = tower.tower3.upPercent;
	}else if(index == 'T4'){
		__baseSize = tower.tower4.baseSize;
		__baseUpPercent = tower.tower4.upPercent;
	}
	
	return __baseSize + __baseSize * __baseUpPercent * (level - 1);		

}

//根据塔的编号 以及 等级 获取攻击速度
var getFreshTimeByIndexAndLevel = function(index  , level){
	
	var __baseRefreshTime = null;
	var __baseUpPercent = null;
	if(index == 'T1' ){
		__baseRefreshTime = tower.tower1.refreshTime;
		__baseUpPercent = tower.tower1.upPercent;
	}else if(index == 'T2'){
		__baseRefreshTime = tower.tower2.refreshTime;
		__baseUpPercent = tower.tower2.upPercent;
	}else if(index == 'T3'){
		__baseRefreshTime = tower.tower3.refreshTime;
		__baseUpPercent = tower.tower3.upPercent;
	}else if(index == 'T4'){
		__baseRefreshTime = tower.tower4.refreshTime;
		__baseUpPercent = tower.tower4.upPercent;
	}

	var resultRefreshTime =  __baseRefreshTime  -  __baseRefreshTime *  (  __baseUpPercent  * (level - 1)) / 2;	
	
	return resultRefreshTime;

}


//获取塔的价值
var getGoldByIndexAndLevel = function(index  , level){
	var __gold = null;
	var __upGold = null;
	if(index == 'T1' ){
		__gold = tower.tower1.gold;
		__upGold = tower.tower1.upGold;
	}else if(index == 'T2'){
		__gold = tower.tower2.gold;
		__upGold = tower.tower2.upGold;
	}else if(index == 'T3'){
		__gold = tower.tower3.gold;
		__upGold = tower.tower3.upGold;
	}else if(index == 'T4'){
		__gold = tower.tower4.gold;
		__upGold = tower.tower4.upGold;
	}
	
	return  (__gold +  __upGold  * (level - 1)) * 0.6;		
}


//根据塔的编号 以及 等级 获取攻击力
var getPowerByIndexAndLevel = function(index  , level){
	
	var __basePower = null;
	var __baseUpPercent = null;
	if(index == 'T1' ){
		__basePower = tower.tower1.basePower;
		__baseUpPercent = tower.tower1.upPercent;
	}else if(index == 'T2'){
		__basePower = tower.tower2.basePower;
		__baseUpPercent = tower.tower2.upPercent;
	}else if(index == 'T3'){
		__basePower = tower.tower3.basePower;
		__baseUpPercent = tower.tower3.upPercent;
	}else if(index == 'T4'){
		__basePower = tower.tower4.basePower;
		__baseUpPercent = tower.tower4.upPercent;
	}
	
	return __basePower + __basePower * __baseUpPercent * 2  * (level - 1);		

}


//鼠标经过显示塔的信息
var showTowerInfo = function(x,y,tower){
	
	var gold = tower.gold;
	var name = tower.name; //第一行

	var power = tower.power; //第二行
	var size = tower.size; //第3行
	var refreshTime = tower.refreshTime; //第4行
	var desc = tower.desc; ////第5行以下
	
	var font_size = 15;
	//总行数
	var basic_rows = 5;
	var info_rows = basic_rows + 2;
	//最大宽度
	var limit_width = font_size * 10;
	//描述的文字长度
	var desc_length = desc.length;
	//计算描述一共多少行
	while(desc_length * font_size  > limit_width){
		desc_length = desc_length - 10;
		info_rows++;
	}		
	
	y =  y -  info_rows * font_size;
	

	drawRect( x , y  ,limit_width , info_rows  * font_size ,  bak_context , 'RGBA(242,203,148,0.9)' );	
	drawText( x + font_size + 2  , y  , gold ,  bak_context , 'RGB(0,0,0)' , 'italic 14px sans-serif');
	drawText( x + font_size + 2 + 30  , y  , name ,  bak_context , 'RGB(0,0,0)' , 'italic 14px sans-serif');
	drawText( x  , y + font_size  ,   '伤害     : '+power ,  bak_context , 'RGB(0,0,0)' , 'italic 14px sans-serif');
	drawText( x  , y + font_size*2  , '攻击距离 : '+size ,  bak_context , 'RGB(0,0,0)' , 'italic 14px sans-serif');
	drawText( x  , y + font_size*3  , '攻击速度 : '+refreshTime / 1000 ,  bak_context , 'RGB(0,0,0)' , 'italic 14px sans-serif');
	


	//如果超过了行数 则折行
	for(var i = basic_rows ; i <info_rows ; i++){
		var __index = i - basic_rows;
		drawText( x  , y + font_size * i  , desc.substring(__index * 10 , (__index+1)*10) ,  bak_context , 'RGB(0,0,0)' , 'italic 14px sans-serif');
	}
	
	bak_context.drawImage(icon_img1 , icon_img1.width/3 *2 , 0 , icon_img1.width /3  , icon_img1.height , x , y  , font_size  , font_size );
}

//点击塔显示塔攻击范围
var maybeShowTowerAttackRange = function(e){
	
	var _x = getMapX(e);
	var _y = getMapY(e);

	var index = towerData[_y][_x];

	if(index.length == '3'){	

		var towerIndex = parseInt(index.substring(0,1));
		var levelIndex = parseInt(index.substring(2,3));				
		var centerX = _x * 50 + (mapSize/2);
		var centerY = _y * 50 + (mapSize/2);

		//获取 指定类型和等级 塔信息
		var __tower = createTowerByIndex(null , null  ,"T" +  towerIndex ,levelIndex  );

		
		var __size = __tower.size;
		var __upGold  = __tower.upGold;
		var __sale_gold = getGoldByIndexAndLevel( "T" + towerIndex ,levelIndex);

		showTowerTowerX = _x;
		showTowerTowerY = _y;

		drawCircle(centerX , centerY ,__size , "RGBA(0,100,0,0.2)" , tower_info_context);	

		var __up_x = getUpX(_x);
		var __sale_x = getSaleX(_x);
		
		if(levelIndex >= 5 ){
			drawBack( __up_x ,   _y * mapSize + (icon_size/2) , icon_size , 16 , tower_info_context  , "RGBA(241,183,72,0.8)");
			drawText(  __up_x ,   _y * mapSize + (icon_size/2)    , "顶级" ,  tower_info_context , 'RGB(0,0,0)' , 'italic 16px sans-serif');
		}else{
			
			tower_info_context.drawImage(icon_img , icon_img.width/8 * 1  , icon_img.height/2 * 1 , icon_img.width/8   , icon_img.height/2  ,   __up_x ,   _y * mapSize , icon_size , icon_size   );

			drawBack(  __up_x ,   _y * mapSize + icon_size , icon_size , 16 , tower_info_context  , "RGBA(241,183,72,0.8)");
			drawText(  __up_x ,   _y * mapSize + icon_size  , __upGold ,  tower_info_context , 'RGB(0,0,0)' , 'italic 16px sans-serif');
		}	

		tower_info_context.drawImage(icon_img , icon_img.width/8 * 6  , icon_img.height/2 * 1 , icon_img.width/8   , icon_img.height/2  ,   __sale_x , _y * mapSize , icon_size , icon_size   );

		drawBack(  __sale_x , _y * mapSize + icon_size , icon_size , 16 , tower_info_context  , "RGBA(241,183,72,0.8)");
		drawText(  __sale_x , _y * mapSize + icon_size  , __sale_gold ,  tower_info_context , 'RGB(0,0,0)' , 'italic 16px sans-serif');
	}
}


//获取卖掉的 X 轴坐标
var getSaleX = function(_x){
	return _x * mapSize + mapSize + 5;	
}


//获取升级的 X 轴坐标
var getUpX = function(_x){
	return _x * mapSize - icon_size - 5;
}


//升级或者卖出
var mayBeUpOrSaleTower = function(e){
	var _clickX = getCanvasX(e);
	var _clickY = getCanvasY(e);

	var __up_x = getUpX(showTowerTowerX);
	var __sale_x = getSaleX(showTowerTowerX);

	
	//升级
	if(isCollide(_clickX , __up_x , _clickY , showTowerTowerY  * mapSize  , icon_size , icon_size )){
		var index = towerData[showTowerTowerY][showTowerTowerX];
		var towerIndex = parseInt(index.substring(0,1));
		var levelIndex = parseInt(index.substring(2,3));	

		//最高5级
		if(levelIndex<5){

			var __tower = createTowerByIndex(null,null,"T"+towerIndex,levelIndex);

			//判断金币
			if(__tower.upGold > now_gold){
				var __info = new info(canvasWidth /2 - 100 , 400 , '金币不足' , 'RGB(0,0,0)' , 3000 , new Date());
				now_infoAry.push(__info);
				return true;
			}

			now_gold = now_gold - __tower.upGold;

			towerData[showTowerTowerY][showTowerTowerX] = towerIndex + "." + (levelIndex +1 );
			initTower();
		}
		return true;		
	}
	//贩卖
	else if(isCollide(_clickX , __sale_x , _clickY , showTowerTowerY  * mapSize  , icon_size , icon_size )){
		var index = towerData[showTowerTowerY][showTowerTowerX];
		var towerIndex = parseInt(index.substring(0,1));
		var levelIndex = parseInt(index.substring(2,3));	
		
		var __gold = getGoldByIndexAndLevel("T"+towerIndex , levelIndex);
		now_gold = now_gold + __gold;

		towerData[showTowerTowerY][showTowerTowerX] = 0 ;
		initTower();
		
		return true;		
	}

	return false;



};



//建造塔
var mayBuildTower = function(e){
	var _x = getMapX(e);
	var _y = getMapY(e);
	
	var buildFlag = false;

	if(canBuild(_x , _y)){
		if(selectedBuildTower == 'T1'){
			towerData[_y][_x] = '1.1';
			now_gold = now_gold - tower.tower1.gold;
			buildFlag =  true;
		}else if(selectedBuildTower == 'T2'){
			towerData[_y][_x] = '2.1';
			now_gold = now_gold - tower.tower2.gold;
			buildFlag = true;
		}else if(selectedBuildTower == 'T3'){
			towerData[_y][_x] = '3.1';
			now_gold = now_gold - tower.tower3.gold;
			buildFlag = true;
		}else if(selectedBuildTower == 'T4'){
			towerData[_y][_x] = '4.1';
			now_gold = now_gold - tower.tower4.gold;
			buildFlag = true;
		}
		
		//如果已经建造了  则清空选中的塔
		if(buildFlag){		
			clearContext(tower_context);
			clearSelectTower();
			initTower();
			return true;
		}
		return false;
	}
	return false;
}





 //点击建造塔 在鼠标移动的过程中 显示塔
var maybeChooseTower = function(e){
	var _x = getMapX(e);
	var _y = getMapY(e);

	var index = backGroundData[_y][_x];

	if(index != 0 ){	
		var __gold = null;
		if(index == 'T1'){
			__gold = tower.tower1.gold;
		}else if(index == 'T2'){
			__gold = tower.tower2.gold;
		}else if(index == 'T3'){
			__gold = tower.tower3.gold;
		}else if(index == 'T4'){
			__gold = tower.tower4.gold;
		}

		if(__gold != null){		

			if(__gold > now_gold){
				var __info = new info(canvasWidth /2 - 100 , 400 , '金币不足' , 'RGB(0,0,0)' , 3000 , new Date());
				now_infoAry.push(__info);
				return;
			}

			// t1 t2 t3 t4 根据不同的 类型建造不同的 塔
			selectedBuildTower = index;		
		}			
	}
}


//清楚点击塔之后的鼠标移动显示  并且取消 已经选中的塔
var clearSelectTower = function(){
	clearContext(bak_context);
	selectedBuildTower = null;//选中的塔至空
	showTowerTowerX = null;
	showTowerTowerY = null;
}


//显示移动中的塔
var showMoveTower  = function(e){
	clearBak();
	
	//selectedBuildTower  范围 T1 T2 T3 T4
	var __tower = createTowerByIndex(null , null , selectedBuildTower , 1);

	if(!__tower){
		//$("canvas").unbind("mousemove");
		selectedBuildTower = null;
		return;
	}

	//获取坐标
	e = e || window.event;
	var _x = getMapX(e);
	var _y = getMapY(e);

	//画塔
	drawTower(_x , _y ,__tower , bak_context );

	//画攻击范围
	var centerX = _x * 50 + (mapSize/2);
	var centerY = _y * 50 + (mapSize/2);
	drawCircle(centerX , centerY , __tower.size , "RGBA(0,100,0,0.2)" , bak_context);

	//地图不能建造  或者  已经建造过塔了
	if(!canBuild(_x , _y)){
		bak_context.fillStyle = canNotBuildColor;
		bak_context.fillRect(_x * 50 , _y * 50, mapSize, mapSize);		
	}else{
		//可以建造
		bak_context.fillStyle = canBuildColor;
		bak_context.fillRect(_x * 50 , _y * 50, mapSize, mapSize);		
	}
	
	
	
}



//画塔
var drawTower = function( x , y , __tower , context){
	var __image = __tower.image;
	var __imageWidth = __tower.image.width /5 ;
	var __imageHeight = __image.height  - __tower.imageHeight;
	context.drawImage(__image , __imageWidth * (__tower.level - 1) , __imageHeight , __image.width/5  ,  __tower.imageHeight  , x  * mapSize , y * mapSize , mapSize  , mapSize  );
}



//判断当前坐标是否可以建造
var canBuild = function(x , y ){
	var mapDataFlag = mapData[y][x] == 2 ;
	var towerDataFlag =  towerData[y][x] == 0;
	var flag = mapDataFlag && towerDataFlag;
	return flag;
}



//根据塔的编号建造塔  
var createTowerByIndex = function( x , y ,index , level){
	var __tower = null;	

	if(index == 'T1'){		
		__tower = new towerObj(x , y , tower1_img , tower.tower1.basePower , tower.tower1.baseSize , tower.tower1.upPercent  , tower.tower1.imageHeight , index , tower.tower1.speed ,  tower.tower1.gold ,  tower.tower1.name ,  tower.tower1.desc  ,  tower.tower1.refreshTime , tower.tower1.attackSum  , tower.tower1.upGold  );				
	}else if(index == 'T2'){
		__tower = new towerObj(x , y , tower2_img , tower.tower2.basePower , tower.tower2.baseSize , tower.tower2.upPercent  , tower.tower2.imageHeight  , index , tower.tower2.speed ,  tower.tower2.gold ,  tower.tower2.name  ,  tower.tower2.desc  ,  tower.tower2.refreshTime  , tower.tower2.attackSum , tower.tower2.upGold  );	
	}else if(index == 'T3'){
		__tower = new towerObj(x , y , tower3_img , tower.tower3.basePower , tower.tower3.baseSize , tower.tower3.upPercent  , tower.tower3.imageHeight , index , tower.tower3.speed , tower.tower3.gold ,  tower.tower3.name ,  tower.tower3.desc  ,  tower.tower3.refreshTime  , tower.tower3.attackSum , tower.tower3.upGold  );	
	}else if(index == 'T4'){
		__tower = new towerObj(x , y , tower4_img , tower.tower4.basePower , tower.tower4.baseSize , tower.tower4.upPercent  , tower.tower4.imageHeight  , index , tower.tower4.speed , tower.tower4.gold ,  tower.tower4.name ,  tower.tower4.desc  ,  tower.tower4.refreshTime  , tower.tower4.attackSum , tower.tower4.upGold  );	
	}
	if(__tower!=null){
		__tower.level = level;

		__tower.size =  getSizeByIndexAndLevel (__tower.index , __tower.level);
		__tower.power = getPowerByIndexAndLevel(__tower.index , __tower.level);
		__tower.refreshTime = getFreshTimeByIndexAndLevel(__tower.index , __tower.level);
		__tower.lastUpdateTime = new Date();
	}
	return __tower;
}