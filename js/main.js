/*
* Url preview script
* powered by jQuery - jquery.com
* written by Alen Grakalic - cssglobe.com
* for more info visit cssglobe.com/post/1695/easiest-tooltip-and-image-preview-using-jquery
*/
this.screenshotPreview = function(){
	xOffset = -10;
	yOffset = -250;
	$("a.screenshot").hover(function(e){
		this.t = this.title;
		this.title = "";
		var c = (this.t != "") ? "<br/>" + this.t : "";
		$("body").append("<p id='screenshot'><img src='"+ this.rel +"' alt='url preview' />"+ c +"</p>");								 
		$("#screenshot")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.fadeIn("slow");
    },
	function(){
		this.title = this.t;
		$("#screenshot").remove();
    });
	$("a.screenshot").mousemove(function(e){
		$("#screenshot")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});
};
$(document).ready(function(){
	screenshotPreview();
});