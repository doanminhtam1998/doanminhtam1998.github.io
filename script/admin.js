$.noConflict();
jQuery(document).ready(function() {
    jQuery(".run").animate({
        width: '100%'
    }, 5000, function() {
        jQuery('.run').hide();
    });

    jQuery(".admin-inf").click(function(){
    	jQuery(".toggle-menu").toggle(400);
    });
   
    
    jQuery(".button-hide").click(function(){
    	jQuery(".button-show").show(400);
    	jQuery(".button-hide").hide(400);
    	jQuery("div.admin-nav").addClass('hidden-lg');
    	jQuery("div.admin-nav").addClass('hidden-md');
    	jQuery("div.admin-nav").addClass('hidden-sm');
    	jQuery("div.admin-nav").addClass('hidden-xs');
    	jQuery("div.main-page").removeClass('col-xs-11');
    	jQuery("div.main-page").removeClass('col-sm-11');
    	jQuery("div.main-page").removeClass('col-md-10');
    	jQuery("div.main-page").removeClass('col-lg-10');
    	jQuery("div.main-page").addClass('col-xs-12');
    	jQuery("div.main-page").addClass('col-sm-12');
    	jQuery("div.main-page").addClass('col-md-12');
    	jQuery("div.main-page").addClass('col-lg-12');
    });
    jQuery(".button-show").click(function(){
    	jQuery(".button-show").hide(400);
    	jQuery(".button-hide").show(400);
    	jQuery("div.admin-nav").removeClass('hidden-lg');
    	jQuery("div.admin-nav").removeClass('hidden-md');
    	jQuery("div.admin-nav").removeClass('hidden-sm');
    	jQuery("div.admin-nav").removeClass('hidden-xs');
    	jQuery("div.main-page").addClass('col-xs-11');
    	jQuery("div.main-page").addClass('col-sm-11');
    	jQuery("div.main-page").addClass('col-md-10');
    	jQuery("div.main-page").addClass('col-lg-10');

    	jQuery("div.main-page").removeClass('col-xs-12');
    	jQuery("div.main-page").removeClass('col-sm-12');
    	jQuery("div.main-page").removeClass('col-md-12');
    	jQuery("div.main-page").removeClass('col-lg-12');
    });

});