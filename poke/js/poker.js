/*
* @Author: 靳振国
* @Date:   2017-10-17 16:22:33
* @Last Modified by:   靳振国
* @Last Modified time: 2017-10-18 15:53:14
*/
$(function(){
	let color = ['c','h','d','s']
	let poke = [];
	let flag = {};
	let num,hua;
	while(poke.length < 52){
		let hua = color[Math.floor(Math.random()*color.length)];
		let num = Math.floor(Math.random()*13+1);
		if(!flag[`${hua}_${num}`]){
			poke.push({hua,num})
			flag[`${hua}_${num}`] = true;
		}
	}
	let index = 0;
	for(let i=0;i<7;i++){
		// $('<div>').addClass('box').appendTo('.desk');
		for(let j=0;j<=i;j++){
	
			let left = 320 - 50*i + 100*j,
				top = 50*i;
				$('<div>').addClass('box')
				.attr('id',`${i}_${j}`)
				.data('num',poke[index].num)
				.css({'background':`url(img/${poke[index].num}${poke[index].hua}.jpg) center/cover`})
				.appendTo('.desk')
				.delay(index*10)
				.animate({left,top,opacity:1});
				index++;
		}
		 
	}
	for(;index<poke.length;index++){
		let left = 50, top = 480;
				$('<div>').addClass('box')
				.attr('id',`${-2}_${-2}`)
				.data('num',poke[index].num)
				.css({'background':`url(img/${poke[index].num}${poke[index].hua}.jpg) center/cover`})
				.appendTo('.desk')
				.addClass('zuo')
				.delay(index*10)
				.animate({left,top,opacity:1});
	}

	let first = null;
	$('.desk').on('click','.box',function(e){
		let element = $(e.target);
		let ids = element.attr('id').split('_');
		// console.log(ids);
		let ele1 = `#${ids[0]*1+1}_${ids[1]*1}`;
		let ele2 = `#${ids[0]*1+1}_${ids[1]*1+1}`;

		console.log(ele2);

		if($(ele1).length || $(ele2).length){
			return;
		}

		element.toggleClass('active');

		if(element.hasClass('active')){
			element.animate({top:'-=10'});
		}else{
			element.animate({top:'+=10'});
		}

		if(!first){
			first = element;
		}else{
			if(first.data('num') + element.data('num') == 14){
				
				$('.active').animate({'left':'600',top:0,opacity:0},function(){
					$(this).remove();
				})
			}else{
				$('.active').animate({top:'+=10'},function(){
					$(this).removeClass('active');
					
				})
			}
			first = null;
		}

	})
		let zindex = 0;
		$('.send').on('click',function(){
			if(!$('.zuo').length){return}
			$('.zuo').eq(-1).css('zIndex',zindex++).animate({left:600}).removeClass('zuo').addClass('you');
		})

		$('.sendd').on('click',function(){
			zindex = 0;
			if(!$('.you').length){return}
			$('.you').each(function(index){
				$(this).delay(index*100).css('zIndex',zindex++).animate({left:50}).removeClass('you').addClass('zuo');
			})
		})
})