

/**
������
*/


var initController = function(){

	$("#bak_canvas").bind("contextmenu",function(e){
		clearSelectTower();
		return false;
	});


	//����¼� ���ܵ������̨������ʼ����  Ҳ���ܽ�����
	$("#bak_canvas").click(function(e){
		e = e || window.event;
		
		clearContext(tower_info_context);


		//���ѡ������ʾ�� ���ܻ����� ���� ����
		if(showTowerTowerX && showTowerTowerY){
			mayBeUpOrSaleTower(e);
			showTowerTowerX = null;
			showTowerTowerY = null;
			return ;
		}

		//���û��ѡ����Ľ��� ���������ҵ�� ���콨�������ȼ����
		if(selectedBuildTower!=null ){
			var buildFlag = mayBuildTower(e);
			if(buildFlag){
				//$("canvas").unbind("mousemove");				
				clearContext(bak_context);
			}	
			//����հ׵ط����ѡ����
			
		}else{						
			
			//���bak��
			clearBak();
			//��ʾ������Ϣ
			maybeShowTowerAttackRange(e);				
			//������   
			maybeChooseTower(e);

			
		}

		

	});


	//����ƶ���ʾ����Ϣ  
	$("#bak_canvas").mousemove(function(e){
		clearBak();
		e = e || window.event;
		//���ѡ�й��� ���ƶ���ʾ���Ĺ�����Χ 
		if(selectedBuildTower !=null){
			showMoveTower(e);
		}else{
		//û��ѡ�й��Ļ� �ж�xy���� �����������������ͼ����Ҫ��ʾ������Ϣ
			var __x = getMapX(e);
			var __y = getMapY(e);
			var __index =  backGroundData[__y][__x];
			var __tower = createTowerByIndex(__x , __y ,__index , 1);
			if(__tower != null){
				showTowerInfo(__x * mapSize , __y * mapSize , __tower);
			}
			
		}
	});
}