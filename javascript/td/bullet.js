

var now_bulletAry = new Array();

//子弹的对象
var bulletObj = function(x , y , speed , power ,  targetMouster , image , slower ){
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.targetMouster = targetMouster;
	this.image = image;
	this.power = power;
	this.slower = slower;
}







//初始化子弹
var startAutoBullet = function(){
	buildBullet();
	autoBulletMove();
}

//自动创建建造子弹
var buildBullet = function(){
	for(var i=0;i<now_towerAry.length ; i++ ){
		
		var __tower = now_towerAry[i];
	
		var __lastUpdateTime  = parseInt(__tower.lastUpdateTime.format('hhmmssS'));

		var __now = parseInt(new Date().format('hhmmssS'));

		//判断是否可以创建子弹  也就是攻击速度
		if(__now < __lastUpdateTime + __tower.refreshTime){
			continue;
		}
			

		var __towerTargetMouster = __tower.targetMouster;


		//塔的中心坐标
		var __tower_centerX = __tower.x + mapSize/2;
		var __tower_centerY = __tower.y + mapSize/2;
		//塔的攻击范围
		var __size =  __tower.size;


		//判断是否攻击过
		var __isAttackId = null;

		//塔的攻击数量
		var attackSum = __tower.attackSum;

		//首先判断 目标怪物是否在攻击范围以内  如果不在的话再选择其他的怪物
		if(__towerTargetMouster != null ){

			//判断怪物是否死亡
			if(__towerTargetMouster.nowBlood <= 0 ){
				__tower.targetMouster = null;
			}else{
				//如果没有死亡 则继续执行
				var __range = getRangeByXY( __tower_centerX , __towerTargetMouster.x , __tower_centerY , __towerTargetMouster.y);
				if(__range <= __size){
					__tower.lastUpdateTime = new Date();
					attack( __tower.index , __tower );
					__isAttackId = __tower.targetMouster.id;
					attackSum--;
				}else{
					//超出攻击范围则把塔的目标怪物滞空
					__tower.targetMouster = null;
				}
			}
		}

		
		//如果没有攻击过 则扫描怪物
		if(attackSum>0){	
			for(var j = 0; j <now_mousterAry.length ; j++){	
				
				var __mouster = now_mousterAry[j];

				if(__mouster.id == __isAttackId){
					continue;
				}

				var __mousterX = __mouster.x;
				var __mousterY = __mouster.y;
			
				//获取怪物和塔的距离
				var __range = 	getRangeByXY(__mousterX , __tower_centerX , __mousterY , __tower_centerY);				

				//如果距离在攻击范围以内 则可以攻击
				if(__range <= __size){
					__tower.targetMouster = __mouster;
					__tower.lastUpdateTime = new Date();
					attack( __tower.index , __tower);		
					attackSum--;
					if(attackSum<=0){
						break;
					}
				}		
			}
		}
	}
}


//攻击
var attack = function(index , tower){
	var __bulletObj  = null;
	//塔的中心坐标
	var __tower_centerX = tower.x + mapSize/2;
	var __tower_centerY = tower.y + mapSize/2;

	if(tower.index == 'T2'){
		var __bulletObj  = new bulletObj( __tower_centerX , __tower_centerY , tower.speed , tower.power , tower.targetMouster ,  bullet2_img , true);//冰塔
	}else{
		var __bulletObj  = new bulletObj( __tower_centerX , __tower_centerY , tower.speed , tower.power , tower.targetMouster ,  bullet1_img , false);//冰塔
	}

	

	if(__bulletObj){
		now_bulletAry.push(__bulletObj);
	}

}



//子弹自动移动
var autoBulletMove = function(){
	clearContext(bullet_context);
	for(var i= now_bulletAry.length-1 ;i >=0 ; i--){
	

		var __bullet =  now_bulletAry[i];

		var __mouster = __bullet.targetMouster;
	
		//判断怪物是否死亡
		if(__mouster.nowBlood <=0 ){
			__bullet.targetMouster = null;
			now_bulletAry.splice(i,1);
			continue;
		}

		var __mousterX = __mouster.x + mapSize/2;
		var __mousterY = __mouster.y + mapSize/2;
		var __bulletX  = parseInt(__bullet.x);
		var __bulletY  = parseInt(__bullet.y);

		var __limitRange = getRangeByXY( __mousterX , __bulletX , __mousterY , __bulletY);

		var __speed = __limitRange < __bullet.speed ? __limitRange:__bullet.speed;
	
		var __dx = 0;
		var __dy = 0;
		if(__limitRange != 0){
			 __dx =  parseInt( (__mousterX - __bulletX)/__limitRange * __speed );
			 __dy =  parseInt( (__mousterY - __bulletY)/__limitRange * __speed );
		}
		

		__bullet.x  = __bulletX + __dx;
		__bullet.y  = __bulletY + __dy;

		var __image = __bullet.image;
	
		bullet_context.drawImage( __image , 0 , 0 , __image.width/3 , __image.height  ,  __bullet.x , __bullet.y , 20 , 20 );


		//判断子弹是否打击到了怪物 如果打击到了 则删除子弹 怪物扣血
		if(   ((__dx > (0 - 2) && __dx <= 0)
			||(__dx <  2 && __dx >= 0))
			&&((__dy > (0 - 2) && __dy <= 0)
			||(__dy <  2 && __dy >= 0))){

			__mouster.nowBlood =  __mouster.nowBlood - __bullet.power;

			//如果子弹带减速 怪物移动速度降低  恢复移动速度根据 returnSpeedTime 来判断 到0则恢复
			if(__bullet.slower){				
				__mouster.speed = __mouster.baseSpeed/2;										
				__mouster.returnSpeedTime = 3000;
			}
			now_bulletAry.splice(i,1);
		}		
	}
}



