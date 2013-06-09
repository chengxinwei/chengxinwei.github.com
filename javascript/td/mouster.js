
var now_monster = null;

//��ǰ�ؿ�
var now_gateLevel = 1;

//��ǰ�ؿ��Ĺ���
var now_mousterAry = new Array();

//�����ȴ�ʱ��
var attack_wating = 3;



//�ؿ��ȼ� ��Ӧ���Ｖ�������
var gate = {
	gate1:"mouster1,5",
	gate2:"mouster1,12",
	gate3:"mouster2,16",
	gate4:"mouster2,25",
	gate5:"mouster4,2",
	gate6:"mouster3,20",
	gate7:"mouster3,29",
	gate8:"mouster3,40",
	gate9:"mouster4,5",
	getValueByKey :function(key){
		if(key == '1'){
			return gate.gate1;
		}else if(key == '2'){
			return gate.gate2;
		}else if(key == '3'){
			return gate.gate3;
		}else if(key == '4'){
			return gate.gate4;
		}else if(key == '5'){
			return gate.gate5;
		}else if(key == '6'){
			return gate.gate6;
		}else if(key == '7'){
			return gate.gate7;
		}else if(key == '8'){
			return gate.gate8;
		}else if(key == '9'){
			return gate.gate9;
		}else{
			return null;	
		}
	}
}

//������
var mouster1 = function(x , y , lastpdateTime,image , id){
	this.id = id;
	this.image = image;
	this.speed = 5;
	this.baseSpeed = 5;
	this.updateTime = 100;
	this.lastpdateTime = lastpdateTime;
	this.x = x ;
	this.y = y ;
	this.direction = 'right';
	this.direction_bak = 'right';
	this.blood = 80;
	this.nowBlood = 80;
	this.refreshTime = 50;//����ʱ��
	this.lastUpdateTime = null;	
	this.returnSpeedTime = null;
	this.gold = 12;
	this.imageIndex = 0;
}

//������
var mouster2 = function(x , y , lastpdateTime,image , id){
	this.id = id;
	this.image = image;
	this.speed = 6;
	this.baseSpeed = 6;
	this.updateTime = 100;
	this.lastpdateTime = lastpdateTime;
	this.x = x ;
	this.y = y ;
	this.direction = 'right';
	this.direction_bak = 'right';
	this.blood = 190;
	this.nowBlood = 190;
	this.refreshTime = 50;//����ʱ��
	this.lastUpdateTime = null;	
	this.returnSpeedTime = null;
	this.gold = 15;
	this.imageIndex = 0;
}

//������
var mouster3 = function(x , y , lastpdateTime,image , id){
	this.id = id;
	this.image = image;
	this.speed = 7;
	this.baseSpeed = 7;
	this.updateTime = 100;
	this.lastpdateTime = lastpdateTime;
	this.x = x ;
	this.y = y ;
	this.direction = 'right';
	this.direction_bak = 'right';
	this.blood = 450;
	this.nowBlood = 450;
	this.refreshTime = 50;//����ʱ��
	this.lastUpdateTime = null;	
	this.returnSpeedTime = null;
	this.gold = 18;
	this.imageIndex = 0;
}

//������
var mouster4 = function(x , y , lastpdateTime,image , id){
	this.id = id;
	this.image = image;
	this.speed = 5;
	this.baseSpeed = 5;
	this.updateTime = 100;
	this.lastpdateTime = lastpdateTime;
	this.x = x ;
	this.y = y ;
	this.direction = 'right';
	this.direction_bak = 'right';
	this.blood = 1500;
	this.nowBlood = 1500;
	this.refreshTime = 50;//����ʱ��
	this.lastUpdateTime = null;	
	this.returnSpeedTime = null;
	this.gold = 100;
	this.imageIndex = 0;
}


//��������ʱ
var mybeStartAttack = function(){
	if(attack_wating>0){
		attack_wating--;
		window.setTimeout(mybeStartAttack , 1000);
		return;
	}
	
	initMouster(now_gateLevel);
	
};

//��ʼ
var initMouster = function(gateLevel){
	var gateInfo = gate.getValueByKey(gateLevel);
	if(gateInfo){
		var __mousterType = gateInfo.substring(0,gateInfo.indexOf(','));
		var __sum     = gateInfo.substring(gateInfo.indexOf(',')+1,gateInfo.length);		
		createMouster(__sum , __mousterType);
	}		
}



//��������
var createMouster = function(sum , mousterType){

	var __mouster =null;
	
	if(mousterType=='mouster1'){
		 __mouster = new mouster1(startMapX*mapSize , startMapY*mapSize  , new Date() , mouster1_img , now_mousterAry.length );
	}else if(mousterType == 'mouster2'){
		 __mouster = new mouster2(startMapX*mapSize , startMapY*mapSize  , new Date() , mouster2_img , now_mousterAry.length );
	}else if(mousterType == 'mouster3'){
		 __mouster = new mouster3(startMapX*mapSize , startMapY*mapSize  , new Date() , mouster3_img , now_mousterAry.length );
	}else if(mousterType == 'mouster4'){
		 __mouster = new mouster4(startMapX*mapSize , startMapY*mapSize  , new Date() , mouster4_img , now_mousterAry.length );
	}
	
	__mouster.lastUpdateTime = new Date();
	now_mousterAry.push(__mouster);
	sum--;
	if(sum >0){
		window.setTimeout( "createMouster('"+sum+"','"+mousterType+"')" , 500 );
	}
}


//�ж��Ƿ�ͨ����
var maybePass = function(){
	if(now_mousterAry.length == 0){
		now_gateLevel++;
		var gateInfo = gate.getValueByKey(now_gateLevel);
		if(gateInfo == null){
			stopTask();
			alert("ͨ������");
		}
		//����������� ������һ��
		attack_wating = 3;		
		mybeStartAttack();
		return;
	}	
}




//�Զ�����
var autoMove = function(){
	clearContext(mouster_context);
	for(var i=now_mousterAry.length-1;i>=0;i--){
		var __mouster = now_mousterAry[i];
		var __direction = __mouster.direction;
		var __mousterX = __mouster.x;
		var __mousterY = __mouster.y;
		var __refreshTime = __mouster.refreshTime;		
		
		//�жϹ����Ƿ�����
		if(parseInt(__mouster.nowBlood) <=0 ){
			__removeMouster(i , false);
			continue;
		}

		//�ж��Ƿ�����ƶ�
		var __lastUpdateTime  = parseInt(__mouster.lastUpdateTime.format('hhmmssS'));

		var __now = parseInt(new Date().format('hhmmssS'));

		
		if(__now < __lastUpdateTime + __refreshTime){

		}else{
			__mouster.lastUpdateTime = new Date();
			var __mapX = getMapXByCanvasX(__mousterX);
			var __mapY = getMapYByCanvasY(__mousterY);
			
			//���ﵽ�յ��� �Ƴ�
			if(__mapX == endMapX && __mapY == endMapY ){
				__removeMouster(i , true);
				continue;
			}

			//�жϼ���ʱ���Ƿ񵽴�  ������� ��ָ��ƶ��ٶ�
			if(__mouster.returnSpeedTime <=0 ){
				__mouster.speed  = __mouster.baseSpeed;
			}else{
				__mouster.returnSpeedTime  = __mouster.returnSpeedTime - __mouster.refreshTime;
			}	
	

			var isMove = false;

			if(__direction == 'left'){
				//��������ƶ��ľ���
				var moveIndex =  canMove( __mousterX - __mouster.speed - mapSize  , __mousterY , __mouster.speed ,__direction );			
				if(moveIndex != 0){
					isMove = true;
					__mouster.x = __mouster.x - moveIndex;
					__mouster.imageIndex = __mouster.imageIndex + 1 ;
				}
			}else if(__direction == 'right'){
				//��������ƶ��ľ���
				var moveIndex =  canMove( __mousterX + __mouster.speed + mapSize  , __mousterY , __mouster.speed ,__direction );			
				if(moveIndex != 0){
					isMove = true;
					__mouster.x = __mouster.x + moveIndex;
					__mouster.imageIndex = __mouster.imageIndex + 1 ;
				}
			}else if(__direction == 'up' ){
				var moveIndex =  canMove( __mousterX  , __mousterY -  __mouster.speed , __mouster.speed ,__direction );	
				if(moveIndex != 0){
					isMove = true;
					__mouster.y = __mouster.y - moveIndex;
					__mouster.imageIndex = __mouster.imageIndex + 1 ;
				}
			}else if(__direction == 'down' ){
				var moveIndex =  canMove( __mousterX  , __mousterY +  __mouster.speed + mapSize , __mouster.speed ,__direction );	
				if(moveIndex != 0){
					isMove = true;
					__mouster.y = __mouster.y + moveIndex;
					__mouster.imageIndex = __mouster.imageIndex + 1 ;
				}
			}
			//���û���ƶ�������ײ���� ��任����
			if(!isMove){			
				__mouster.direction = getNextDirection(__direction);
				
				//��ȡ�����ķ���
				var __oppositeDirection = getOppositeDirection( __mouster.direction_bak );
				
				//��ɫ��һ�������ܺͶ����ķ�����ͬ   ���ǽ�ɫ����ԭ·����  �����ͬ �������ȡ��һ������
				if( __mouster.direction == __oppositeDirection){
					var __nextDirection = getNextDirection(__mouster.direction);
					__mouster.direction = __nextDirection;
				}
			}else{
				//��������ƶ��� ���Ҳ��Ƕ����ķ��� ���滻
				if( __mouster.direction != getOppositeDirection( __mouster.direction_bak )){
					__mouster.direction_bak = __mouster.direction;
				}
			}		
		}


		//�滭������Ϣ
		var __image = __mouster.image;
		
		var __blood = __mouster.nowBlood / __mouster.blood;

		mouster_context.fillStyle = 'RGB(255,255,255)';
		mouster_context.fillRect(  __mouster.x , __mouster.y - 6 , mapSize   ,  4 );
		mouster_context.drawImage( __image , __image.width/3*0  , __image.height/4*2,  __image.width/3 ,  __image.height/4 , __mouster.x , __mouster.y , mapSize , mapSize  );
		mouster_context.fillStyle = 'RGB(50,200,0)';
		mouster_context.fillRect(  __mouster.x , __mouster.y - 6 , mapSize * __blood  ,  4 );

		//��������ƶ��ٶ� �Ȼ����ƶ����û� ��Ҫ�滭����Ч��
		if(__mouster.speed < __mouster.baseSpeed){
			mouster_context.drawImage( slower_img , 0  , 0 ,  slower_img.width/3 ,  slower_img.height , __mouster.x , __mouster.y + mapSize - 10 , mapSize , 20 );
		}

	}	
}


//��������Ѫ����ȡ����
var getMousterByXy = function (x , y ,blood ){
	for(var i = 0 ; i <now_mousterAry.length ; i++){
		
		var __mouster = now_mousterAry[i];

		if(__mouster.x == x && __mouster.y == y && __mouster.nowBlood == blood){
			return __mouster;
		}
	}
}




//����ɾ��  �����ﱻɾ����ʱ����Ҫ��һЩҵ�� ������ȡ��
var __removeMouster = function(i , isEscape){
	var mouster = now_mousterAry[i];

	//�����������ӽ�Ǯ
	if(!isEscape){
		now_gold = now_gold + mouster.gold;
		var __info = new info(mouster.x , mouster.y , '+'+mouster.gold , 'RGB(255,200,40)' , 3000 , new Date());
		now_infoAry.push(__info);
	}else{
		//�������� ���ӽ�Ǯ ��Ѫ
		now_blood--;
		if(now_blood <=0){
			stopTask();
			alert("��ô���㶼����������������");
		}
	}
	//��������
	now_mousterAry[i]=null;
	now_mousterAry.splice(i,1);
	//�ж��Ƿ�ͨ�ػ����Ƿ���һ��
	maybePass();

	
}

