// var win = $(window);
var Sticky = function(config) {

    var el = document.querySelector(config.el),
        marginTop = el.style.marginTop,
        curElPos = el.style.position;

    el.style.position = '-webkit-sticky';
    el.style.width = '100%';
    el.style.zIndex = 10;
    el.style.top = 0;

    if ( el && (curElPos.indexOf("sticky") == -1)) {
       
        console.log()
        var RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
            function(c) {
                setTimeout(c, 1 / 60 * 1000);
            };

        var CAF = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;

        function timeHandler() {
            var winScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var scrollTop = el.offsetTop;
         
            if (winScrollTop > scrollTop) {
    
                el.style.marginTop = '0';
                el.style.position = 'fixed';   
                
            } else {

                el.style.position = 'static';
                el.style.marginTop = marginTop;
            }
        }


        window.addEventListener('scroll', function() {
            RAF(timeHandler);
        })
        
    }
};

Sticky.prototype.setPlaceHolder = function() {
    var nav = this.nav;
    var marginTop = nav.css('margin-top'),
        marginBottom = nav.css('margin-bottom'),
        height = nav.height();
    var placeHolder = $('<div style="height: ' + height + 'px;margin-top:' + marginTop + ';margin-bottom:' + marginBottom + ';display:none;"></div>');
    nav.before(placeHolder);
    this.placeHolder = placeHolder;
}

Sticky.prototype.destroySticky = function() {

}

module.exports = Sticky;