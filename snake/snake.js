/*
* @Author: 靳振国
* @Date:   2017-09-29 15:34:53
* @Last Modified by:   靳振国
* @Last Modified time: 2017-09-30 08:54:00
*/
function snake(){
	this.sna = ['4_1','5_1','6_1'];   //设置坐标
	this.box = document.querySelector('.box');    //获取盒子
	this.direction = '40';   //设置默认向下
	this.flag = {'4_1':true,'5_1':true,'6_1':true};    //给flag添加一个属性
}
snake.prototype = {                 //原型函数，获取方法
	start:function(){
		this.draw();
		this.drawSnake();
		this.move();
		this.key();
	},

	draw:function(){
		for(let i=0;i<20;i++){
			for(let j=0;j<20;j++){
				this.box.innerHTML += `<div class='litter' id='${i}_${j}'></div>`;       //画格子
			}
		}
	},
	drawSnake:function(){
		this.sna.forEach(element=>{   //遍历数组	
			console.log(element);
			document.getElementById(element).classList.add('hot');     //定义类
		})
	},
	move:function(){
		let that = this;  //把this换成that
		this.t = setInterval(function(){
			let oldt = that.sna[that.sna.length-1];        //旧头得位置
			let arr =  oldt.split('_');           //截取，把坐标变成数组
			let newt =  '';
			if(that.direction == 37){               //设置键盘按下方向
				newt = `${arr[0]*1}_${arr[1]*1-1}`;
			}else if(that.direction == 38){
				newt = `${arr[0]*1-1}_${arr[1]}`;
			}else if(that.direction == 39){
				newt = `${arr[0]}_${arr[1]*1+1}`;
			}else if(that.direction == 40){
				newt = `${arr[0]*1+1}_${arr[1]}`;
			}

			if(arr[0]<1 || arr[0]>18 || arr[1]<1 || arr[1]>18){     //判断墙壁位置设置边界
				clearInterval(that.t);//事件函数停止
				alert('游戏结束,按f5重新开始');         
				return ;          //结束
			}

			that.sna.push(newt);      //新头得位置
			that.flag[newt] = true;     
			let weiba = that.sna.shift();       //设置尾巴
			delete that.flag[weiba];     //删除旧的尾巴啊
			document.getElementById(weiba).classList.remove('hot');   //移除尾巴后面的样式
			that.drawSnake();     //调用
		},1000)
		},
		key:function(){
			document.onkeydown = function(e){
				let keycode = e.keyCode;          
				if(Math.abs(keycode - this.direction)==2){        //不能反方向行走
					return ;
				}
				this.direction = keycode;         //设置按键
			}.bind(this);   //不懂
		},
		dropFood:function(){

		}
	}
