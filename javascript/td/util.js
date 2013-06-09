//��Բ
var drawCircle = function(x , y , size , color , context){
	context.beginPath();							
	context.fillStyle = color;
	context.strokeStyle = color;
	context.arc(x,y,size,0,Math.PI * 2,false);	
	context.fill();
	context.stroke();
}

//������
var drawBack  = function( x , y  , width , height , context  , color){
	
	context.fillStyle = color;
	drawRect( x , y , width , height , context);	
}

//д����
var drawText  = function(x , y , text ,  context , color , style ){
	context.textBaseline = 'top';
	context.fillStyle    = color
	context.font         = style
	context.fillText  (text , x , y);

}


//������
var drawRect = function(x , y , width , height , context , color){
	if(color){
		context.fillStyle = color;
	}
	context.fillRect(x, y, width, height);
}

//��� bak ��
var clearBak  = function(){
	bak_context.clearRect(0,0,canvasWidth,canvasHeight);
}

//����ѡ������
var clearContext = function(context){
	context.clearRect(0,0,canvasWidth,canvasHeight);
}

//��ȡ���֮���Ӧ��ͼ��x����
var getMapX = function(e){
	var clientX  = e.clientX;
	var canvasLeft = $("canvas")[0].offsetLeft;	
	var _x = parseInt((clientX - canvasLeft) / mapSize) ;	
	return _x;
}

//��ȡ���֮���Ӧ��ͼ��y����
var getMapY = function(e){
	var clientY  = e.clientY;
	var canvasTop = $("canvas")[0].offsetTop;
	var _y = parseInt((clientY - canvasTop ) / mapSize) ;
	return _y;

}

//���ݵ���������ȡcanvasX
var getCanvasY = function(e){
	var clientY  = e.clientY;
	var canvasTop = $("canvas")[0].offsetTop;
	var _y = parseInt(clientY - canvasTop );
	return _y;
}

//���ݵ���������ȡcanvasY
var getCanvasX = function(e){
	var clientX  = e.clientX;
	var canvasLeft = $("canvas")[0].offsetLeft;	
	var _x = parseInt(clientX - canvasLeft);	
	return _x;
}

//����canvas�������ȡcanvasX
var getMapXByCanvasX = function(x){	
	var _x = parseInt(x / mapSize) ;	
	return _x;
}

//����canvas�������ȡcanvasY
var getMapYByCanvasY = function(y){	
	var _y = parseInt(y / mapSize) ;	
	return _y;
}

//����canvas������ �ж��Ƿ�����ƶ�
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



//�ж����������Ƿ���ײ
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


//������һ�������ȡ��һ������
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

//��ȡ�����ķ���
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

//����2������ ��ȡ ����ľ���
var getRangeByXY  = function(x1 , x2 , y1 ,y2){
	var __range = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	return __range;
}


// ��Date����չ���� Date ת��Ϊָ����ʽ��String   
// ��(M)����(d)��Сʱ(h)����(m)����(s)������(q) ������ 1-2 ��ռλ����   
// ��(y)������ 1-4 ��ռλ��������(S)ֻ���� 1 ��ռλ��(�� 1-3 λ������)   
// ���ӣ�   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.format = function(fmt){ //author: meizz   
	var o = {   
		"M+" : this.getMonth()+1,                 //�·�   
		"d+" : this.getDate(),                    //��   
		"h+" : this.getHours(),                   //Сʱ   
		"m+" : this.getMinutes(),                 //��   
		"s+" : this.getSeconds(),                 //��   
		"q+" : Math.floor((this.getMonth()+3)/3), //����   
		"S"  : this.getMilliseconds()             //����   
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


