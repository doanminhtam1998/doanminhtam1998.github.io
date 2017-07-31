
jQuery(document).ready(function() {
    // console.log(jQuery('.tags-appear').val());
    // var x=jQuery('.tags-appear').val();
    // jQuery(".cat-input").change(function() {
    // 	console.log(jQuery('.cat-input').val());
    // 	x.push(jQuery('.cat-input').val());
    	
    // });
     
     jQuery(".cat-input").change(function() {
    	

    	jQuery('.tags-appear').tagsinput('add', jQuery('.cat-input').val(), {preventPost: true});
     });
});