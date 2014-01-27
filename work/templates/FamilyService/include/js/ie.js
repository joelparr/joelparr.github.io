sfHover = function() {
	var sfEls = document.getElementById("navigation-header").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);

/*
// onload
$(function() 
{
	// Dropdown fix
var sfEls = document.getElementById("navigation-header").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
	
	// Fix select boxes
	$("#navigation-header a").hover(function() {
		$("select").css({visibility:"hidden"});
	},function(){
		$("select").css({visibility:"visible"});
	});
});
*/