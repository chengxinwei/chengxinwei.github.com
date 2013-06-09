

var now_bulletAry = new Array();

//�ӵ��Ķ���
var bulletObj = function(x , y , speed , power ,  targetMouster , image , slower ){
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.targetMouster = targetMouster;
	this.image = image;
	this.power = power;
	this.slower = slower;
}







//��ʼ���ӵ�
var startAutoBullet = function(){
	buildBullet();
	autoBulletMove();
}

//�Զ����������ӵ�
var buildBullet = function(){
	for(var i=0;i<now_towerAry.length ; i++ ){
		
		var __tower = now_towerAry[i];
	
		var __lastUpdateTime  = parseInt(__tower.lastUpdateTime.format('hhmmssS'));

		var __now = parseInt(new Date().format('hhmmssS'));

		//�ж��Ƿ���Դ����ӵ�  Ҳ���ǹ����ٶ�
		if(__now < __lastUpdateTime + __tower.refreshTime){
			continue;
		}
			

		var __towerTargetMouster = __tower.targetMouster;


		//������������
		var __tower_centerX = __tower.x + mapSize/2;
		var __tower_centerY = __tower.y + mapSize/2;
		//���Ĺ�����Χ
		var __size =  __tower.size;


		//�ж��Ƿ񹥻���
		var __isAttackId = null;

		//���Ĺ�������
		var attackSum = __tower.attackSum;

		//�����ж� Ŀ������Ƿ��ڹ�����Χ����  ������ڵĻ���ѡ�������Ĺ���
		if(__towerTargetMouster != null ){

			//�жϹ����Ƿ�����
			if(__towerTargetMouster.nowBlood <= 0 ){
				__tower.targetMouster = null;
			}else{
				//���û������ �����ִ��
				var __range = getRangeByXY( __tower_centerX , __towerTargetMouster.x , __tower_centerY , __towerTargetMouster.y);
				if(__range <= __size){
					__tower.lastUpdateTime = new Date();
					attack( __tower.index , __tower );
					__isAttackId = __tower.targetMouster.id;
					attackSum--;
				}else{
					//����������Χ�������Ŀ������Ϳ�
					__tower.targetMouster = null;
				}
			}
		}

		
		//���û�й����� ��ɨ�����
		if(attackSum>0){	
			for(var j = 0; j <now_mousterAry.length ; j++){	
				
				var __mouster = now_mousterAry[j];

				if(__mouster.id == __isAttackId){
					continue;
				}

				var __mousterX = __mouster.x;
				var __mousterY = __mouster.y;
			
				//��ȡ��������ľ���
				var __range = 	getRangeByXY(__mousterX , __tower_centerX , __mousterY , __tower_centerY);				

				//��������ڹ�����Χ���� ����Թ���
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


//����
var attack = function(index , tower){
	var __bulletObj  = null;
	//������������
	var __tower_centerX = tower.x + mapSize/2;
	var __tower_centerY = tower.y + mapSize/2;

	if(tower.index == 'T2'){
		var __bulletObj  = new bulletObj( __tower_centerX , __tower_centerY , tower.speed , tower.power , tower.targetMouster ,  bullet2_img , true);//����
	}else{
		var __bulletObj  = new bulletObj( __tower_centerX , __tower_centerY , tower.speed , tower.power , tower.targetMouster ,  bullet1_img , false);//����
	}

	

	if(__bulletObj){
		now_bulletAry.push(__bulletObj);
	}

}



//�ӵ��Զ��ƶ�
var autoBulletMove = function(){
	clearContext(bullet_context);
	for(var i= now_bulletAry.length-1 ;i >=0 ; i--){
	

		var __bullet =  now_bulletAry[i];

		var __mouster = __bullet.targetMouster;
	
		//�жϹ����Ƿ�����
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


		//�ж��ӵ��Ƿ������˹��� ���������� ��ɾ���ӵ� �����Ѫ
		if(   ((__dx > (0 - 2) && __dx <= 0)
			||(__dx <  2 && __dx >= 0))
			&&((__dy > (0 - 2) && __dy <= 0)
			||(__dy <  2 && __dy >= 0))){

			__mouster.nowBlood =  __mouster.nowBlood - __bullet.power;

			//����ӵ������� �����ƶ��ٶȽ���  �ָ��ƶ��ٶȸ��� returnSpeedTime ���ж� ��0��ָ�
			if(__bullet.slower){				
				__mouster.speed = __mouster.baseSpeed/2;										
				__mouster.returnSpeedTime = 3000;
			}
			now_bulletAry.splice(i,1);
		}		
	}
}



