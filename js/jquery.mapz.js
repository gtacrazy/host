/**
* jQuery Mapz v1.0 by Danny van Kooten - dannyvankooten.com
* Last Modification: 20/06/2011
* For more information, visit:
* dannyvankooten.com/jquery-plugins/mapz
* Licensed under the Creative Commons Attribution 2.5 License-creativecommons.org/licenses/by/2.5
* Free for use in both personal and commercial projects
* Attribution requires leaving author name, author link, and the license info intact.
*/
(function( $ ){
  $.fn.mapz = function(options) {
		var settings = {
			createmaps:	false
		};
		var viewport = this.parent('.map-viewport');
		var map = this;
		var constraint = $(document.createElement('div')).addClass('mapz-constraint').css('position','absolute').appendTo(viewport);
		// Create constraint
		createConstraint();
		map.draggable({
			 containment : constraint
		});
		// Create a constraint div so map can't be dragged out of view.
		function createConstraint()
		{
			constraint.css({
				left : -(map.width()) + viewport.width(),
				top : -(map.height()) + viewport.height(),
				width : 2 * map.width() - viewport.width(),
				height : 2 * map.height() - viewport.height()
			});
			// Check if map is currently out of bounds, revert to closest position if so
			if(map.position().left < constraint.position().left) map.css('left',constraint.position().left);
			if(map.position().top < constraint.position().top) map.css('top',constraint.position().top);
		}
  };
})( jQuery );