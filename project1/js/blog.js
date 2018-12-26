function showTime(){
	var myTime=new Date();
	var myHour=myTime.getHours();
	switch(myHour ){
		case 12:
		case 13:
		case 14:
			document.getElementById("time").innerHTML="中午好！欢迎来到Jinz博客";
		break;
		case 15:
		case 16:
		case 17:
		case 18:
			document.getElementById("time").innerHTML="下午好！欢迎来到Jinz博客";
		break;
		case 19:
		case 20:
		case 21:
		case 22:
		case 23:
			document.getElementById("time").innerHTML="晚上好！欢迎来到Jinz博客";
		break;
		default:
		document.getElementById("time").innerHTML="上午好！欢迎来到Jinz博客";
	}
}
window.onload=showTime;
