// jQuery
$(function(){

    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if(this.hash != "") {

            // Prevent default scroll
            event.preventDefault();

            // Add smooth scroll
            smoothScroll(this.hash);
        }
    });

    // Add smooth scrolling when page load
    if(window.location.hash) {
        var hash = window.location.hash;

        // Check tabs
        var isTab = false;
        var tabList = $('.tabs li a');
        for(var i = 0; i < tabList.length; i++) {
            var tab = $(tabList[i]);
            var target = tab.attr('data-tab') || null;
            if(target && target.toLowerCase() == hash.replace('#', '').toLowerCase()) {
                tab.click();
                isTab = true;
            }
        }

        if(!isTab) {
            smoothScroll(hash);
        }
    }

    // Smooth scroll
    function smoothScroll(hash) {
        // Check if hash isn't null
        if (hash !== "" && hash != "#") {
            hash = hash.replace('#', '');

            // Navbar
            var navbar = $('nav#navbar');

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: ($("#" + hash).offset().top - (navbar.innerHeight() + 16 /* <- Padding*/ )) // Calc navbar
            }, 800, function(){

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    }
});

// Tabs Script
function openTab(event, tabId) {

    var i, tabs, switchers;

    tabs = document.getElementsByClassName("tab");
    for (i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        tab.className = tab.className.replace(" active", "");
    }

    switchers = document.getElementsByClassName("tab-switcher");
    for (i = 0; i < switchers.length; i++) {
        var switcher = switchers[i];
        switcher.className = switcher.className.replace(" active", "");
    }

    document.getElementById(tabId).className += " active";
    event.currentTarget.className += " active";

    // Add delay for bug correction
    setTimeout(function () { window.location.hash = tabId;window.scrollTo(0, 0); }, 1);
}

// Demo Script

var color;

demo(document.getElementById('color-input'));

function demo(el) {
    var input = el.id == "color-input";

    if(input) {
        var val = el.value;
        if(val != "") {
            color = new EasyColorParser(val);
        }
    } else {
        if(color != null) {
            var val = el.value;

            var params = {r:color.rgb.r, g:color.rgb.g, b:color.rgb.b, a:color.alpha};
            switch (el.id) {
                case "red":
                    params.r = val;
                    break;
                case "green":
                    params.g = val;
                    break;
                case "blue":
                    params.b = val;
                    break;
                case "alpha":
                    params.a = val;
                    break;
            }
            console.log(params);
            color = EasyColorParser.fromRGBA(params);
            console.log(color.toRGBA());
        }
    }

    if(val != "") {
        var colorEl = document.getElementById("color");
        var hex = document.getElementById("hex");
        var rgb = document.getElementById("rgb");
        var rgba = document.getElementById("rgba");
        var hsl = document.getElementById("hsl");
        var hsla = document.getElementById("hsla");
        var cmyk = document.getElementById("cmyk");
        var red = document.getElementById("red");
        var green = document.getElementById("green");
        var blue = document.getElementById("blue");
        var alpha = document.getElementById("alpha");

        if(color.success) {
            colorEl.style.backgroundColor = color.toRGBA();
            hex.innerHTML = color.toHex();
            rgb.innerHTML = color.toRGB();
            rgba.innerHTML = color.toRGBA();
            hsl.innerHTML = color.toHSL();
            hsla.innerHTML = color.toHSLA();
            cmyk.innerHTML = color.toCMYK();
            red.value = color.rgb.r;
            green.value = color.rgb.g;
            blue.value = color.rgb.b;
            alpha.value = color.alpha;

            if (!input) {
                var colorInput = document.getElementById("color-input");

                var oldVal = colorInput.value;
                colorInput.value = color.to(new EasyColorParser(oldVal).colorType());
            }
        }
    }
}
