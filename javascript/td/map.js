


//怪物开始 结束地图坐标
var startMapX = 0;
var startMapY = 5;
var endMapX   = 18;
var endMapY   = 5;

//地图大小
var mapSize = 50;
//地图数据  0 不可造 ， 1 怪物行走路线 2 可以建造
var mapData = [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
				[0,0,1,1,1,2,2,2,2,2,2,1,1,1,2,2,2,2,0,0],
				[0,0,2,2,2,2,2,2,2,2,1,1,2,1,2,2,2,2,0,0],
				[1,1,1,1,2,2,2,2,2,1,1,2,2,1,2,2,1,1,1,0],
				[0,0,2,1,1,2,2,2,1,1,2,2,2,1,2,2,1,2,0,0],
				[0,0,2,2,1,1,1,1,1,2,2,2,2,1,1,1,1,2,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]



//初始化地图
var initMap = function(){
	for(var i=0;i<mapData.length;i++){
		for(var j=0;j<mapData[i].length;j++){						
			map_context.beginPath();
			map_context.moveTo(j * mapSize     , i * mapSize);			
			map_context.lineTo(j * mapSize + mapSize , i * mapSize);
			map_context.lineTo(j * mapSize + mapSize , i * mapSize + mapSize );
			map_context.lineTo(j * mapSize			 , i * mapSize + mapSize );
			map_context.lineTo(j * mapSize			 , i * mapSize );
			//map_context.stroke();	

			if(mapData[i][j] == '1'){
				var random = Math.ceil(Math.random()*5);

				var __image = floor_img;
	
				/**
				if(random == '2'){
					__image = floor2_img;
				}else if(random == '3'){
					__image = floor3_img;
				}else if(random == '4'){
					__image = floor4_img;
				}else if(random == '5'){
					__image = floor5_img;
				}
				*/
			
				map_context.drawImage(__image , 0 , 0 , __image.width , __image.height ,  j * mapSize , i * mapSize , mapSize  , mapSize  );
			}
		}
	}
	map_context.drawImage(end_img , 0 , 0 , end_img.width , end_img.height , endMapX * mapSize , endMapY * mapSize , mapSize  , mapSize  );
	map_context.drawImage(end_img , 0 , 0 , end_img.width , end_img.height , startMapX * mapSize , startMapY * mapSize , mapSize  , mapSize  );
//	map_context.fillText("END!", endMapX * mapSize, endMapY * mapSize);

}