$.noConflict();
jQuery(document).ready(function() {
    jQuery(".run").animate({
        width: '100%'
    }, 5000, function() {
        jQuery('.run').hide();
    });

    jQuery(".admin-inf").click(function(){
    	jQuery(".toggle-menu").toggle();
    });
   
    


});