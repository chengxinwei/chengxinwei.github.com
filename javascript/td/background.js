


var backGroundData =  [ ["2,gold",2,'2,num',2,'2,time',2,2,2,2,2,2,2,2,2,2,2,2,2,'2,b',2],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						['logo',0 , 0 ,'T1','T2','T3','T4',0,0,0,0,0,0,0,0,0,0,0,0,0,0]]



//≥ı ºªØ±≥æ∞
var initBackGround = function(){						
	background_context.drawImage(backGround_img , 0 , 0 , backGround_img.width , backGround_img.height , 0 ,0 , canvasWidth  , canvasHeight  );		
	
  
	for(var i=0;i<backGroundData.length;i++){
		for(var j=0;j<backGroundData[i].length;j++){	
			var __index = backGroundData[i][j].toString();
			var indexAry = __index.split(",");
			for(var k = 0 ; k< indexAry.length ; k++){
				var index = indexAry[k];
				if(index != '0'){				
					if(index == 'T1'){
						var iconWidth = icon_img.width/8;
						var iconHeight = icon_img.height/2;
						background_context.drawImage(icon_img , 0 , iconHeight , iconWidth , iconHeight , j * mapSize , i * mapSize , mapSize , mapSize );
					}else if(index == 'T4'){
						var iconWidth = icon_img.width/8;
						var iconHeight = icon_img.height/2;
						background_context.drawImage(icon_img , iconWidth*2 , iconHeight , iconWidth , iconHeight , j * mapSize , i * mapSize , mapSize , mapSize );
					}else if(index == 'T3'){
						var iconWidth = icon_img.width/8;
						var iconHeight = icon_img.height/2;
						background_context.drawImage(icon_img , iconWidth*3 , iconHeight , iconWidth , iconHeight , j * mapSize , i * mapSize , mapSize , mapSize );
					}else if(index == 'T2'){
						var iconWidth = icon_img.width/8;
						var iconHeight = icon_img.height/2;
						background_context.drawImage(icon_img , iconWidth*5 , iconHeight , iconWidth , iconHeight , j * mapSize , i * mapSize , mapSize , mapSize );
					}else if(index == 'logo'){
						var logoWidth = logo_img.width;
						var logoHeight = logo_img.height;
						background_context.drawImage(logo_img , 0 , 0 , logoWidth , logoHeight , j * mapSize , i * mapSize , mapSize  , mapSize  );
					}else if(index == 'info'){
						drawBack(j * mapSize ,  i * mapSize  , 180 , 40 , background_context , "RGBA(10,241,10,0.5)");
						info_x = j * mapSize;
						info_y = i * mapSize;
					}else if(index == 'sign'){
						drawBack(j * mapSize ,  i * mapSize  , 180 , 18 , background_context , "RGBA(10,241,10,0.5)");					
					}else if(index == '1'){
						background_context.drawImage(back_img , 0 , 0 , back_img.width , back_img.height , j * mapSize ,  i * mapSize ,  mapSize ,  mapSize);
					}else if(index == 'gold'){
						gold_x = j * mapSize +mapSize / 2 + 5;
						gold_y = i * mapSize ;
						background_context.drawImage(icon_img1 , icon_img1.width/3 *2 , 0 , icon_img1.width /3  , icon_img1.height , j * mapSize ,  i * mapSize  , mapSize/2  ,mapSize/2);						
					}else if(index == 'message'){						
						background_context.drawImage(icon_img , icon_img.width/8 * 7  , icon_img.height/2 , icon_img.width/8  , icon_img.height/2 , j * mapSize ,  i * mapSize +  mapSize/2  , mapSize/2  ,mapSize/2);
					}else if(index == '2'){			
						drawRect(j * mapSize ,  i * mapSize  , mapSize , mapSize / 2  , background_context ,  "RGBA(114,143,148,0.5)");						
					}else if(index == 'num'){
						num_x = j * mapSize  + mapSize / 2 + 5 ;
						num_y = i * mapSize ;
						background_context.drawImage(icon_img1 , icon_img1.width/3 *1 , 0 , icon_img1.width /3   , icon_img1.height , j * mapSize ,  i * mapSize  , mapSize/2  ,mapSize/2);	
					}else if(index == 'time'){
						time_x = j * mapSize + mapSize  + 5;
						time_y = i * mapSize + 5;
						background_context.drawImage(time_img , 0 , 0 , time_img.width , time_img.height , j * mapSize ,  i * mapSize  , mapSize  ,mapSize/2);	
					}else if(index == 'b'){
						background_context.drawImage(blood_img , 0 , 0 , blood_img.width , blood_img.height , j * mapSize ,  i * mapSize  , mapSize/2  ,mapSize/2);	
						blood_x = j * mapSize - mapSize / 2 - 5;
						blood_y = i * mapSize + 5 ;
					}
				}
			}
		}
	}	
}



