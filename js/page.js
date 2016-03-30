$(document).ready(function(){
	sizeChange();
	navChange();
});

$(window).resize(function(){
	sizeChange();
});

$(window).scroll(function() {
	parallax();
	navChange();
});

function sizeChange(){               
	var h = $(window).height();
	$(".ch").css("min-height",h+"px");
}

function navChange(){
	var h = $(window).height();
	if($(window).scrollTop()>h/2){
		$('.nav').removeClass("onfirst");
	}else{
		$('.nav').addClass("onfirst");
	}
}

//Parallax Scrolling
function parallax(){
	var scrollh = $(document).height() - $(window).height();
	var scrollp = $(window).scrollTop();
	var pre = scrollp / scrollh * 100;
	console.log('scrollh:'+scrollh+'\n'+'scrollp:'+scrollp+'\n'+'pre:'+pre);
	//Background
	$(".background").css("top","-"+pre*0.2+"%");
	//nav
	var navtop = 5+ pre /30;
	$(".nav").css("bottom",navtop+"%");
}

//Go Top Buttom
function gotop(){
    $("body,html").animate({scrollTop:0},1000);
}

//Circular Diagram
$(function() {
	$('.circle').each(function(index, el) {
		var num = $(this).find('span').text() * 3.6;
		if (num<=180) {
			$(this).find('.right').css('transform', "rotate(" + num + "deg)");
		} else {
			$(this).find('.right').css('transform', "rotate(180deg)");
			$(this).find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
		};
	});

});