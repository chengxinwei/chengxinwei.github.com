

var task = null;
//��ʼ�Զ�����
var startTask = function(){
	task = window.setInterval(__task,25);
}

//ֹͣ�Զ�����
var stopTask = function(){
	window.clearInterval(task); 
}


var __task = function(){
	//��ʼ�������ƶ�
	autoMove();
	//��ʼ���ӵ�	
	startAutoBullet();
	//��ʾ���Ͻ���Ϣ
	showGameInfo();
	//��ʾ��Ϣ
	showInfo();
}

