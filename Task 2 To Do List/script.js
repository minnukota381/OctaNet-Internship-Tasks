$(document).ready(function(){
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        let target = this.hash;
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 500);
    });
});