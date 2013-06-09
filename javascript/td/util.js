//画圆
var drawCircle = function(x , y , size , color , context){
	context.beginPath();							
	context.fillStyle = color;
	context.strokeStyle = color;
	context.arc(x,y,size,0,Math.PI * 2,false);	
	context.fill();
	context.stroke();
}

//画背景
var drawBack  = function( x , y  , width , height , context  , color){
	
	context.fillStyle = color;
	drawRect( x , y , width , height , context);	
}

//写文字
var drawText  = function(x , y , text ,  context , color , style ){
	context.textBaseline = 'top';
	context.fillStyle    = color
	context.font         = style
	context.fillText  (text , x , y);

}


//画方块
var drawRect = function(x , y , width , height , context , color){
	if(color){
		context.fillStyle = color;
	}
	context.fillRect(x, y, width, height);
}

//清空 bak 层
var clearBak  = function(){
	bak_context.clearRect(0,0,canvasWidth,canvasHeight);
}

//根据选择层清空
var clearContext = function(context){
	context.clearRect(0,0,canvasWidth,canvasHeight);
}

//获取点击之后对应地图的x坐标
var getMapX = function(e){
	var clientX  = e.clientX;
	var canvasLeft = $("canvas")[0].offsetLeft;	
	var _x = parseInt((clientX - canvasLeft) / mapSize) ;	
	return _x;
}

//获取点击之后对应地图的y坐标
var getMapY = function(e){
	var clientY  = e.clientY;
	var canvasTop = $("canvas")[0].offsetTop;
	var _y = parseInt((clientY - canvasTop ) / mapSize) ;
	return _y;

}

//根据点击的坐标获取canvasX
var getCanvasY = function(e){
	var clientY  = e.clientY;
	var canvasTop = $("canvas")[0].offsetTop;
	var _y = parseInt(clientY - canvasTop );
	return _y;
}

//根据点击的坐标获取canvasY
var getCanvasX = function(e){
	var clientX  = e.clientX;
	var canvasLeft = $("canvas")[0].offsetLeft;	
	var _x = parseInt(clientX - canvasLeft);	
	return _x;
}

//根据canvas的坐标获取canvasX
var getMapXByCanvasX = function(x){	
	var _x = parseInt(x / mapSize) ;	
	return _x;
}

//根据canvas的坐标获取canvasY
var getMapYByCanvasY = function(y){	
	var _y = parseInt(y / mapSize) ;	
	return _y;
}

//根据canvas的坐标 判断是否可以移动
var canMove  = function(x,y,limit,direction){
	var _x = getMapXByCanvasX(x);
	var _y = getMapYByCanvasY(y);
	if(mapData[_y][_x] == '1'){
		return limit;
	}
	if(direction == 'left' || direction == 'right'){
		var resultX = _x * 50 - (x -limit) ;
		if(resultX < 0){
			resultX = 0;
		}
		return resultX;
	}else{
		var resultY = _y * 50 - (y - limit) ;
		if(resultY < 0){
			resultY = 0;
		}
		return resultY
	}
}



//判断两个坐标是否碰撞
var isCollide = function (x1,x2,y1,y2,width,height){
	
	var __collideX = false;
	var __collideY = false;
	if(x1 <= x2 && x1 + width >= x2 ){
		__collideX = true;
	}else if(x2 <= x1 && x2 + width >= x1){
		__collideX = true;
	}

	if(y1 <= y2 && y1 + height >= y2 ){
		__collideY = true;
	}else if(y2 <= y1 && y2 + height >= y1){
		__collideY = true;
	}

	if(__collideY && __collideX){
		return true;
	}
	return false;






}


//根据上一个方向获取下一个方向
var getNextDirection = function(direction){	
	if(direction == 'left'){
		return 'up';
	}else if (direction == 'up'){
		return 'right';
	}else if(direction == 'right'){
		return 'down';
	}else if(direction == 'down'){
		return 'left';
	}
}

//获取对立的方向
var getOppositeDirection  = function(direction){
	if(direction == 'left'){
		return 'right';
	}else if (direction == 'up'){
		return 'down';
	}else if(direction == 'right'){
		return 'left';
	}else if(direction == 'down'){
		return 'up';
	}
	
}

//根据2个坐标 获取 坐标的距离
var getRangeByXY  = function(x1 , x2 , y1 ,y2){
	var __range = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	return __range;
}


// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.format = function(fmt){ //author: meizz   
	var o = {   
		"M+" : this.getMonth()+1,                 //月份   
		"d+" : this.getDate(),                    //日   
		"h+" : this.getHours(),                   //小时   
		"m+" : this.getMinutes(),                 //分   
		"s+" : this.getSeconds(),                 //秒   
		"q+" : Math.floor((this.getMonth()+3)/3), //季度   
		"S"  : this.getMilliseconds()             //毫秒   
	};   
	if(/(y+)/.test(fmt)){
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	}
	for(var k in o)   {
		if(new RegExp("("+ k +")").test(fmt))   {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
			
		}
	}  
	return fmt;		
}  


