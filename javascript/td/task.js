

var task = null;
//开始自动行走
var startTask = function(){
	task = window.setInterval(__task,25);
}

//停止自动行走
var stopTask = function(){
	window.clearInterval(task); 
}


var __task = function(){
	//初始化怪物移动
	autoMove();
	//初始化子弹	
	startAutoBullet();
	//显示右上角信息
	showGameInfo();
	//显示信息
	showInfo();
}

