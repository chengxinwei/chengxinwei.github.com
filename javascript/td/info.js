
//�Զ��ϸ�����Ϣ
var now_infoAry = new Array();

var now_blood = 10;

var now_gold = 230 ; 

var info_x = null;
var info_y = null;

var gold_x = null;
var gold_y = null;

var num_x = null;
var num_y = null;

var time_x = null;
var time_y = null;


//��ʾ��Ϸ��Ϣ
var showGameInfo = function(){
	clearContext(info_context);
	__showGoldInfo();
	__showMousterNum();
	__showMousterTime();
	__showBlood();
}

//��Ϣ����
var info = function(x , y , context , color , lifeTime , createTime){
	this.x = x;
	this.y = y;
	this.context = context;
	this.color = color;
	this.lifeTime = lifeTime;
	this.createTime  = createTime;
}

//��ʾ��Ϣ
var showInfo = function(){
	for(var i=now_infoAry.length -1 ;i>=0 ; i--){


		var __info = now_infoAry[i];
		
		var __createTime  = parseInt(__info.createTime.format('hhmmssS'));

		var __now = parseInt(new Date().format('hhmmssS'));

		
		//�������ʱ��Ӵ���ʱ�� ���ڵ�ǰʱ�����Ƴ�

		if(__now > __createTime + __info.lifeTime){
			now_infoAry.splice(i,1);
			continue;
		}
		
		drawText(__info.x , __info.y , __info.context , info_context , __info.color , 'bold 23px Arial' );
		__info.y = __info.y - 1 ;		
	}
}




//��ʾ��Ǯ��Ϣ
var __showGoldInfo = function(){
	drawText(gold_x , gold_y , now_gold , info_context , 'RGB(255,255,255)' , 'italic 22px sans-serif' );	
}

//��ʾʣ��Ĺ���
var __showMousterNum = function(){	
	drawText(num_x , num_y , now_mousterAry.length , info_context , 'RGB(255,255,255)' , 'italic 22px sans-serif' );
}


//��ʾ��һ��ʱ��
var __showMousterTime = function(){	
	drawText(time_x , time_y , "��"+now_gateLevel+"��"+attack_wating+"��" , info_context ,  'RGB(0,0,0)' , 'italic 17px sans-serif' );
}

//��ʾ��ǰѪ��
var __showBlood = function(){	
	drawText(blood_x , blood_y , now_blood , info_context ,  'RGB(0,0,0)' , 'italic 17px sans-serif' );
}