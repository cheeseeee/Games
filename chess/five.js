$(function(){
	let kongbai ={};
	for(let i=0;i<15;i++){
		//画线 
		$('<div>').appendTo('.qipan').addClass('henxian');
		$('<span>').appendTo('.qipan').addClass('shuxian')
		for(let j=0;j<15;j++){
			//给每个棋子都加一个坐标
			$('<li>').appendTo('.qipan').addClass('qizi').attr({id:`${i}-${j}`})
			.data('pos',{x:i,y:j});
			kongbai[i+'-'+j]={x:i,y:j}
		}

	};
	let ai=true;
	let flag=true;
	let hei={};
	let bai={};
	
	$('.qipan .qizi').on('click',function() {
		if($(this).hasClass('bai')||$(this).hasClass('hei')){
			return;
		};
		let pos=$(this).data('pos');
		if(flag){	
			$(this).addClass('hei');
			hei[pos.x+'-'+pos.y]=true;
			delete kongbai[pos.x+'-'+pos.y];
			if(pd(pos,hei)>=5){
				$('.qipan .qizi').off();
				alert('黑棋胜利')
			}
			if(ai){
				let wz=Ai();
				if(pd(wz,bai)>=5){
					$('.qipan .qizi').off();
					alert('白棋胜利');
				}
				$(`#${wz.x}-${wz.y}`).addClass('bai');
				bai[wz.x+'-'+wz.y]=true;
				delete kongbai[wz.x+'-'+wz.y];
				return;
			}
		}		
		else{
			$(this).addClass('hei')
			hei[pos.x+'-'+pos.y]=true;
			if(pd(pos,hei)>=6){
			$(this).off();
			alert('黑棋胜利')
			}
		}
		flag=!flag;
	});
function pd(pos,se){
   let row=1,col=1,zx=1,yx=1;
   let i,j;
//行
   i=pos.x;j=pos.y+1;
   while(se[i+'-'+j])
   {
   	j++;
   	row++;
   }
   i=pos.x;j=pos.y-1;
   while(se[i+'-'+j]){
   	j--;
   	row++;
   }
  	
//列
   i=pos.x+1;j=pos.y;
   while(se[i+'-'+j]){
   	i++;
   	col++;
   }
   i=pos.x-1;j=pos.y;
   while(se[i+'-'+j]){
   	i--;
   	col++;
   }
//左斜
   i=pos.x+1;j=pos.y-1;
   while(se[i+'-'+j]){
   	j--;
   	i++;
   	zx++;
   }
   i=pos.x-1;j=pos.y+1;
   while(se[i+'-'+j]){
   	j++;
   	i--;
   	zx++;
   }
//右斜
   i=pos.x+1;j=pos.y+1;
   while(se[i+'-'+j]){
   	j++;
   	i++;
   	yx++;
   }
   i=pos.x-1;j=pos.y-1;
   while(se[i+'-'+j]){
   	j--;
   	i--;
   	yx++;
   }
 return Math.max(row,col,zx,yx);
}
function Ai(){
		let yu=-Infinity,yu1=-Infinity;
		let n=null,n1=null;
		for(let i in kongbai){
			let fen=pd(kongbai[i],bai);
			if(fen>yu){
				yu=fen;
				n=kongbai[i];
			}
		}
		for(let i in kongbai){
			let fen=pd(kongbai[i],hei);
			if(fen>yu1){
				yu1=fen;
				n1=kongbai[i];
			}
		}
		return (yu>yu1) ? n : n1;
	}
})
