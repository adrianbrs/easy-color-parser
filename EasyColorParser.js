/**
 * A class to convert colors between formats hex, rgb, rgba, hsl, cmyk, etc ...
 * @author Adrian Cerbaro
 * @link https://github.com/cerbaro-adrian/js-simple-color-parser
 * @license MIT
 */

/**
 * EasyColorParser class to convert color string into HEX, RGB, RGBA, HSL or CMYK color values
 * @param colorString
 * @constructor
 */
function EasyColorParser(colorString) {

    // Var to return the constructor
    var _this = this;

    /**
     * Convert HSL to RGB
     * @param h hue
     * @param s saturation
     * @param l lightness
     * @returns {{r: Number, g: Number, b: Number}}
     * @private
     */
    this._HSLtoRGB = function(h, s, l) {
        if (h <= 0 || isNaN(h)) { h = 0; }
        if (s <= 0 || isNaN(s)) { s = 0; }
        if (l <= 0 || isNaN(l)) { l = 0; }

        if (h > 360) { h = 360; }
        if (s > 100) { s = 100; }
        if (l > 100) { l = 100; }

        var m1, m2, hue;
        var r, g, b;
        s /=100;
        l /= 100;
        if (s == 0)
            r = g = b = (l * 255);
        else {
            if (l <= 0.5)
                m2 = l * (s + 1);
            else
                m2 = l + s - l * s;
            m1 = l * 2 - m2;
            hue = h / 360;

            /**
             * @return {number}
             */
            function HueToRgb(m1, m2, hue) {
                var v;
                if (hue < 0)
                    hue += 1;
                else if (hue > 1)
                    hue -= 1;
                if (6 * hue < 1)
                    v = m1 + (m2 - m1) * hue * 6;
                else if (2 * hue < 1)
                    v = m2;
                else if (3 * hue < 2)
                    v = m1 + (m2 - m1) * (2/3 - hue) * 6;
                else
                    v = m1;

                return 255 * v;
            }
            r = HueToRgb(m1, m2, hue + 1/3);
            g = HueToRgb(m1, m2, hue);
            b = HueToRgb(m1, m2, hue - 1/3);
        }

        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);

        return {r:parseInt(r), g:parseInt(g), b:parseInt(b)};
    };

    /**
     * Convert RGB to HSL
     * @param r red
     * @param g green
     * @param b blue
     * @returns {{h: Number, s: Number, l: Number}}
     * @private
     */
    this._RGBtoHSL = function(r, g, b) {
        if (r <= 0 || isNaN(r)) { r = 0; }
        if (g <= 0 || isNaN(g)) { g = 0; }
        if (b <= 0 || isNaN(b)) { b = 0; }

        if (r > 255) { r = 255; }
        if (g > 255) { g = 255; }
        if (b > 255) { b = 255; }

        r /= 255;
        g /= 255;
        b /= 255;

        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        h = h * 360;
        s = s * 100;
        l = l * 100;

        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);

        h = isNaN(h) ? 0 : h;
        s = isNaN(s) ? 0 : s;
        l = isNaN(l) ? 0 : l;

        return {h:parseFloat(h), s:parseFloat(s), l:parseFloat(l)};
    };

    /**
     * Convert CMYK to RGB
     * @param c cyan
     * @param m magenta
     * @param y yellow
     * @param k key
     * @returns {{r: Number, g: Number, b: Number}}
     * @private
     */
    this._CMYKtoRGB = function(c, m, y, k) {
        if (c <= 0 || isNaN(c)) { c = 0; }
        if (m <= 0 || isNaN(m)) { m = 0; }
        if (y <= 0 || isNaN(y)) { y = 0; }
        if (k <= 0 || isNaN(k)) { k = 0; }

        if (c > 100) { c = 100; }
        if (m > 100) { m = 100; }
        if (y > 100) { y = 100; }
        if (k > 100) { k = 100; }

        c /= 100;
        m /= 100;
        y /= 100;
        k /= 100;

        var r = 1 - Math.min( 1, c * ( 1 - k ) + k );
        var g = 1 - Math.min( 1, m * ( 1 - k ) + k );
        var b = 1 - Math.min( 1, y * ( 1 - k ) + k );

        r = Math.round( r * 255 );
        g = Math.round( g * 255 );
        b = Math.round( b * 255 );

        return {r:parseInt(r), g:parseInt(g), b:parseInt(b)};
    };

    /**
     * Convert RGB to CMYK
     * @param r red
     * @param g green
     * @param b blue
     * @returns {{c: Number, m: Number, y: Number, k: Number}}
     * @private
     */
    this._RGBtoCMYK = function(r, g, b) {
        if (r <= 0 || isNaN(r)) { r = 0; }
        if (g <= 0 || isNaN(g)) { g = 0; }
        if (b <= 0 || isNaN(b)) { b = 0; }

        if (r > 255) { r = 255; }
        if (g > 255) { g = 255; }
        if (b > 255) { b = 255; }

        r /= 255;
        g /= 255;
        b /= 255;

        var k = Math.min( 1 - r, 1 - g, 1 - b );
        var c = ( 1 - r - k ) / ( 1 - k );
        var m = ( 1 - g - k ) / ( 1 - k );
        var y = ( 1 - b - k ) / ( 1 - k );

        c = Math.round( c * 100 );
        m = Math.round( m * 100 );
        y = Math.round( y * 100 );
        k = Math.round( k * 100 );

        c = isNaN(c) ? 0 : c;
        m = isNaN(m) ? 0 : m;
        y = isNaN(y) ? 0 : y;
        k = isNaN(k) ? 0 : k;

        return {c:parseInt(c), m:parseInt(m), y:parseInt(y), k:parseInt(k)};
    };

    /**
     * Returns true if the parsing was success
     * @type {boolean}
     */
    this.success = false;

    // Initialize vars for prevent errors
    /**
     * RGB color array
     * @type {{r: number, g: number, b: number}}
     */
    this.rgb  = {r:0,g:0,b:0};
    /**
     * HSL color array
     * @type {{h: number, s: number, l: number}}
     */
    this.hsl  = {h:0,s:0,l:0};
    /**
     * CMYK color array
     * @type {{c: number, m: number, y: number, k: number}}
     */
    this.cmyk = {c:0,m:0,y:0,k:0};
    /**
     * Alpha channel
     * @type {number}
     */
    this.alpha = 1;

    // Return if constructor param is empty
    if(colorString == null) return;

    // Replace somethings
    colorString = colorString.replace('#', '');
    colorString = colorString.replace(/ /g, '');
    colorString = colorString.toLowerCase();

    /**
     * Returns the CSS colors
     * @type {{transparent: string, aliceblue: string, antiquewhite: string, aqua: string, aquamarine: string, azure: string, beige: string, bisque: string, black: string, blanchedalmond: string, blue: string, blueviolet: string, brown: string, burlywood: string, cadetblue: string, chartreuse: string, chocolate: string, coral: string, cornflowerblue: string, cornsilk: string, crimson: string, cyan: string, darkblue: string, darkcyan: string, darkgoldenrod: string, darkgray: string, darkgrey: string, darkgreen: string, darkkhaki: string, darkmagenta: string, darkolivegreen: string, darkorange: string, darkorchid: string, darkred: string, darksalmon: string, darkseagreen: string, darkslateblue: string, darkslategray: string, darkslategrey: string, darkturquoise: string, darkviolet: string, deeppink: string, deepskyblue: string, dimgray: string, dimgrey: string, dodgerblue: string, firebrick: string, floralwhite: string, forestgreen: string, fuchsia: string, gainsboro: string, ghostwhite: string, gold: string, goldenrod: string, gray: string, grey: string, green: string, greenyellow: string, honeydew: string, hotpink: string, indianred: string, indigo: string, ivory: string, khaki: string, lavender: string, lavenderblush: string, lawngreen: string, lemonchiffon: string, lightblue: string, lightcoral: string, lightcyan: string, lightgoldenrodyellow: string, lightgray: string, lightgrey: string, lightgreen: string, lightpink: string, lightsalmon: string, lightseagreen: string, lightskyblue: string, lightslategray: string, lightslategrey: string, lightsteelblue: string, lightyellow: string, lime: string, limegreen: string, linen: string, magenta: string, maroon: string, mediumaquamarine: string, mediumblue: string, mediumorchid: string, mediumpurple: string, mediumseagreen: string, mediumslateblue: string, mediumspringgreen: string, mediumturquoise: string, mediumvioletred: string, midnightblue: string, mintcream: string, mistyrose: string, moccasin: string, navajowhite: string, navy: string, oldlace: string, olive: string, olivedrab: string, orange: string, orangered: string, orchid: string, palegoldenrod: string, palegreen: string, paleturquoise: string, palevioletred: string, papayawhip: string, peachpuff: string, peru: string, pink: string, plum: string, powderblue: string, purple: string, rebeccapurple: string, red: string, rosybrown: string, royalblue: string, saddlebrown: string, salmon: string, sandybrown: string, seagreen: string, seashell: string, sienna: string, silver: string, skyblue: string, slateblue: string, slategray: string, slategrey: string, snow: string, springgreen: string, steelblue: string, tan: string, teal: string, thistle: string, tomato: string, turquoise: string, violet: string, wheat: string, white: string, whitesmoke: string, yellow: string, yellowgreen: string}}
     */
    this.CSSColorTable = {
        "transparent":"rgba(0,0,0,0)",
        "aliceblue":"rgba(240,248,255,1)",
        "antiquewhite":"rgba(250,235,215,1)",
        "aqua":"rgba(0,255,255,1)",
        "aquamarine":"rgba(127,255,212,1)",
        "azure":"rgba(240,255,255,1)",
        "beige":"rgba(245,245,220,1)",
        "bisque":"rgba(255,228,196,1)",
        "black":"rgba(0,0,0,1)",
        "blanchedalmond":"rgba(255,235,205,1)",
        "blue":"rgba(0,0,255,1)",
        "blueviolet":"rgba(138,43,226,1)",
        "brown":"rgba(165,42,42,1)",
        "burlywood":"rgba(222,184,135,1)",
        "cadetblue":"rgba(95,158,160,1)",
        "chartreuse":"rgba(127,255,0,1)",
        "chocolate":"rgba(210,105,30,1)",
        "coral":"rgba(255,127,80,1)",
        "cornflowerblue":"rgba(100,149,237,1)",
        "cornsilk":"rgba(255,248,220,1)",
        "crimson":"rgba(220,20,60,1)",
        "cyan":"rgba(0,255,255,1)",
        "darkblue":"rgba(0,0,139,1)",
        "darkcyan":"rgba(0,139,139,1)",
        "darkgoldenrod":"rgba(184,134,11,1)",
        "darkgray":"rgba(169,169,169,1)",
        "darkgrey":"rgba(169,169,169,1)",
        "darkgreen":"rgba(0,100,0,1)",
        "darkkhaki":"rgba(189,183,107,1)",
        "darkmagenta":"rgba(139,0,139,1)",
        "darkolivegreen":"rgba(85,107,47,1)",
        "darkorange":"rgba(255,140,0,1)",
        "darkorchid":"rgba(153,50,204,1)",
        "darkred":"rgba(139,0,0,1)",
        "darksalmon":"rgba(233,150,122,1)",
        "darkseagreen":"rgba(143,188,143,1)",
        "darkslateblue":"rgba(72,61,139,1)",
        "darkslategray":"rgba(47,79,79,1)",
        "darkslategrey":"rgba(47,79,79,1)",
        "darkturquoise":"rgba(0,206,209,1)",
        "darkviolet":"rgba(148,0,211,1)",
        "deeppink":"rgba(255,20,147,1)",
        "deepskyblue":"rgba(0,191,255,1)",
        "dimgray":"rgba(105,105,105,1)",
        "dimgrey":"rgba(105,105,105,1)",
        "dodgerblue":"rgba(30,144,255,1)",
        "firebrick":"rgba(178,34,34,1)",
        "floralwhite":"rgba(255,250,240,1)",
        "forestgreen":"rgba(34,139,34,1)",
        "fuchsia":"rgba(255,0,255,1)",
        "gainsboro":"rgba(220,220,220,1)",
        "ghostwhite":"rgba(248,248,255,1)",
        "gold":"rgba(255,215,0,1)",
        "goldenrod":"rgba(218,165,32,1)",
        "gray":"rgba(128,128,128,1)",
        "grey":"rgba(128,128,128,1)",
        "green":"rgba(0,128,0,1)",
        "greenyellow":"rgba(173,255,47,1)",
        "honeydew":"rgba(240,255,240,1)",
        "hotpink":"rgba(255,105,180,1)",
        "indianred":"rgba(205,92,92,1)",
        "indigo":"rgba(75,0,130,1)",
        "ivory":"rgba(255,255,240,1)",
        "khaki":"rgba(240,230,140,1)",
        "lavender":"rgba(230,230,250,1)",
        "lavenderblush":"rgba(255,240,245,1)",
        "lawngreen":"rgba(124,252,0,1)",
        "lemonchiffon":"rgba(255,250,205,1)",
        "lightblue":"rgba(173,216,230,1)",
        "lightcoral":"rgba(240,128,128,1)",
        "lightcyan":"rgba(224,255,255,1)",
        "lightgoldenrodyellow":"rgba(250,250,210,1)",
        "lightgray":"rgba(211,211,211,1)",
        "lightgrey":"rgba(211,211,211,1)",
        "lightgreen":"rgba(144,238,144,1)",
        "lightpink":"rgba(255,182,193,1)",
        "lightsalmon":"rgba(255,160,122,1)",
        "lightseagreen":"rgba(32,178,170,1)",
        "lightskyblue":"rgba(135,206,250,1)",
        "lightslategray":"rgba(119,136,153,1)",
        "lightslategrey":"rgba(119,136,153,1)",
        "lightsteelblue":"rgba(176,196,222,1)",
        "lightyellow":"rgba(255,255,224,1)",
        "lime":"rgba(0,255,0,1)",
        "limegreen":"rgba(50,205,50,1)",
        "linen":"rgba(250,240,230,1)",
        "magenta":"rgba(255,0,255,1)",
        "maroon":"rgba(128,0,0,1)",
        "mediumaquamarine":"rgba(102,205,170,1)",
        "mediumblue":"rgba(0,0,205,1)",
        "mediumorchid":"rgba(186,85,211,1)",
        "mediumpurple":"rgba(147,112,219,1)",
        "mediumseagreen":"rgba(60,179,113,1)",
        "mediumslateblue":"rgba(123,104,238,1)",
        "mediumspringgreen":"rgba(0,250,154,1)",
        "mediumturquoise":"rgba(72,209,204,1)",
        "mediumvioletred":"rgba(199,21,133,1)",
        "midnightblue":"rgba(25,25,112,1)",
        "mintcream":"rgba(245,255,250,1)",
        "mistyrose":"rgba(255,228,225,1)",
        "moccasin":"rgba(255,228,181,1)",
        "navajowhite":"rgba(255,222,173,1)",
        "navy":"rgba(0,0,128,1)",
        "oldlace":"rgba(253,245,230,1)",
        "olive":"rgba(128,128,0,1)",
        "olivedrab":"rgba(107,142,35,1)",
        "orange":"rgba(255,165,0,1)",
        "orangered":"rgba(255,69,0,1)",
        "orchid":"rgba(218,112,214,1)",
        "palegoldenrod":"rgba(238,232,170,1)",
        "palegreen":"rgba(152,251,152,1)",
        "paleturquoise":"rgba(175,238,238,1)",
        "palevioletred":"rgba(219,112,147,1)",
        "papayawhip":"rgba(255,239,213,1)",
        "peachpuff":"rgba(255,218,185,1)",
        "peru":"rgba(205,133,63,1)",
        "pink":"rgba(255,192,203,1)",
        "plum":"rgba(221,160,221,1)",
        "powderblue":"rgba(176,224,230,1)",
        "purple":"rgba(128,0,128,1)",
        "rebeccapurple":"rgba(102,51,153,1)",
        "red":"rgba(255,0,0,1)",
        "rosybrown":"rgba(188,143,143,1)",
        "royalblue":"rgba(65,105,225,1)",
        "saddlebrown":"rgba(139,69,19,1)",
        "salmon":"rgba(250,128,114,1)",
        "sandybrown":"rgba(244,164,96,1)",
        "seagreen":"rgba(46,139,87,1)",
        "seashell":"rgba(255,245,238,1)",
        "sienna":"rgba(160,82,45,1)",
        "silver":"rgba(192,192,192,1)",
        "skyblue":"rgba(135,206,235,1)",
        "slateblue":"rgba(106,90,205,1)",
        "slategray":"rgba(112,128,144,1)",
        "slategrey":"rgba(112,128,144,1)",
        "snow":"rgba(255,250,250,1)",
        "springgreen":"rgba(0,255,127,1)",
        "steelblue":"rgba(70,130,180,1)",
        "tan":"rgba(210,180,140,1)",
        "teal":"rgba(0,128,128,1)",
        "thistle":"rgba(216,191,216,1)",
        "tomato":"rgba(255,99,71,1)",
        "turquoise":"rgba(64,224,208,1)",
        "violet":"rgba(238,130,238,1)",
        "wheat":"rgba(245,222,179,1)",
        "white":"rgba(255,255,255,1)",
        "whitesmoke":"rgba(245,245,245,1)",
        "yellow":"rgba(255,255,0,1)",
        "yellowgreen":"rgba(154,205,50,1)"
    };

    // Overwrite css color names
    if (colorString in this.CSSColorTable) colorString = this.CSSColorTable[colorString];

    // Array of color definition objects
    // * RGBA, HSL, CMYK implemented
    var colorDefs = [
        {
            name: "RGB",
            regex: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ['rgb(0, 170, 222)', 'rgb(76, 175, 80)'],
            process: function (bytes){
                var rgb = {r:parseInt(bytes[1]), g:parseInt(bytes[2]), b:parseInt(bytes[3])},
                    hsl = _this._RGBtoHSL(rgb.r, rgb.g, rgb.b),
                    cmyk = _this._RGBtoCMYK(rgb.r, rgb.g, rgb.b),
                    alpha = parseFloat(1);

                return [
                    rgb,
                    hsl,
                    cmyk,
                    alpha
                ];
            }
        },
        {
            name: "RGBA",
            regex: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((\d)?(\.\d+)?)\)$/,
            example: ['rgba(0, 170, 222, 1)', 'rgba(76, 175, 80, .75)'],
            process: function (bytes){
                var rgb = {r:parseInt(bytes[1]), g:parseInt(bytes[2]), b:parseInt(bytes[3])},
                    hsl = _this._RGBtoHSL(rgb.r, rgb.g, rgb.b),
                    cmyk = _this._RGBtoCMYK(rgb.r, rgb.g, rgb.b),
                    alpha = parseFloat(bytes[4]);

                return [
                    rgb,
                    hsl,
                    cmyk,
                    alpha
                ];
            }
        },
        {
            name: "HSL",
            regex: /^(?:hsl)?\(?(\d{1,3}),\s*(\d{1,3}%),\s*(\d{1,3}%)\)?$/,
            example: ['hsl(58, 100%, 50%)', '195, 100%, 45%'],
            process: function (bytes){
                var hsl = {h:parseFloat(bytes[1]), s:parseFloat(bytes[2]), l:parseFloat(bytes[3])},
                    rgb = _this._HSLtoRGB(hsl.h, hsl.s, hsl.l),
                    cmyk = _this._RGBtoCMYK(rgb.r, rgb.g, rgb.b),
                    alpha = parseFloat(1);

                return [
                    rgb,
                    hsl,
                    cmyk,
                    alpha
                ];
            }
        },
        {
            name: "HSLA",
            regex: /^(?:hsla)?\(?(\d{1,3}),\s*(\d{1,3}%),\s*(\d{1,3}%),\s*((\d)?(\.\d+)?)\)?$/,
            example: ['hsla(58, 100%, 50%, 1)', '195, 100%, 45%, .5'],
            process: function (bytes){
                var hsl = {h:parseFloat(bytes[1]), s:parseFloat(bytes[2]), l:parseFloat(bytes[3])},
                    rgb = _this._HSLtoRGB(hsl.h, hsl.s, hsl.l),
                    cmyk = _this._RGBtoCMYK(rgb.r, rgb.g, rgb.b),
                    alpha = parseFloat(bytes[4]);

                return [
                    rgb,
                    hsl,
                    cmyk,
                    alpha
                ];
            }
        },
        {
            name: "CMYK",
            regex: /^(?:cmyk)?\(?(\d{1,3})%,\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(\d{1,3})%\)?$/,
            example: ['cmyk(100%, 0%, 0%, 0%)', '0%, 100%, 100%, 0%'],
            process: function (bytes){
                var cmyk = {c:parseInt(bytes[1]), m:parseInt(bytes[2]), y:parseInt(bytes[3]), k:parseInt(bytes[4])},
                    rgb = _this._CMYKtoRGB(cmyk.c, cmyk.m, cmyk.y, cmyk.k),
                    hsl = _this._RGBtoHSL(rgb.r, rgb.g, rgb.b),
                    alpha = parseFloat(1);

                return [
                    rgb,
                    hsl,
                    cmyk,
                    alpha
                ];
            }
        },
        {
            name: "HEX",
            regex: /^(\w{2})(\w{2})(\w{2})$/,
            example: ['#FFEB3B', 'FF9800'],
            process: function (bytes){
                var rgb = {r:parseInt(bytes[1], 16), g:parseInt(bytes[2], 16), b:parseInt(bytes[3], 16)},
                    hsl = _this._RGBtoHSL(rgb.r, rgb.g, rgb.b),
                    cmyk = _this._RGBtoCMYK(rgb.r, rgb.g, rgb.b),
                    alpha = parseFloat(1);

                return [
                    rgb,
                    hsl,
                    cmyk,
                    alpha
                ];
            }
        },
        {
            name: "HEX",
            regex: /^(\w)(\w)(\w)$/,
            example: ['#92B', '098'],
            process: function (bytes){
                var rgb = {r:parseInt(bytes[1] + bytes[1], 16), g:parseInt(bytes[2] + bytes[2], 16), b:parseInt(bytes[3] + bytes[3], 16)},
                    hsl = _this._RGBtoHSL(rgb.r, rgb.g, rgb.b),
                    cmyk = _this._RGBtoCMYK(rgb.r, rgb.g, rgb.b),
                    alpha = parseFloat(1);

                return [
                    rgb,
                    hsl,
                    cmyk,
                    alpha
                ];
            }
        }
    ];

    // Search through the definitions to find a match
    for (var i = 0; i < colorDefs.length; i++) {
        var regex = colorDefs[i].regex;
        var processor = colorDefs[i].process;
        var bytes = regex.exec(colorString);
        if (bytes) {
            var channels = processor(bytes),
                hsl      = channels[1],
                cmyk     = channels[2],
                alpha    = channels[3];

            this.rgb = channels[0];
            this.hsl = hsl;
            this.cmyk = cmyk;
            this.alpha = alpha;

            this.success = true;
        }
    }

    // Validate color values
    this.rgb.r = (this.rgb.r < 0 || isNaN(this.rgb.r)) ? 0 : ((this.rgb.r > 255) ? 255 : this.rgb.r);
    this.rgb.g = (this.rgb.g < 0 || isNaN(this.rgb.g)) ? 0 : ((this.rgb.g > 255) ? 255 : this.rgb.g);
    this.rgb.b = (this.rgb.b < 0 || isNaN(this.rgb.b)) ? 0 : ((this.rgb.b > 255) ? 255 : this.rgb.b);
    this.alpha = (this.alpha > 1 || isNaN(this.alpha)) ? 1 : ((this.alpha < 0) ? 0 : this.alpha);

    /**
     * Converts the color to a type defined in the string type ("HEX", "RGB", "RGBA", "HSL", "CMYK")
     * @param type
     */
    this.to = function (type) {
        switch (type.toLowerCase()) {
            case "hex":
                return this.toHex();
                break;
            case "rgb":
                return this.toRGB();
                break;
            case "rgba":
                return this.toRGBA();
                break;
            case "hsl":
                return this.toHSL();
                break;
            case "hsla":
                return this.toHSLA();
                break;
            case "cmyk":
                return this.toCMYK();
                break;
            default:
                return this.toRGBA();
                break;
        }
    };

    /**
     * Convert color to RGB
     * @example_return
     * @returns {string} eg: rgb(255, 255, 255)
     */
    this.toRGB = function () {
        return 'rgb(' + this.rgb.r + ', ' + this.rgb.g + ', ' + this.rgb.b + ')';
    };

    /**
     * Convert color to RGBA
     * @returns {string} eg: rgba(255, 255, 255, 1)
     */
    this.toRGBA = function () { // RGBA implementation
        return 'rgba(' + this.rgb.r + ', ' + this.rgb.g + ', ' + this.rgb.b + ', ' + this.alpha + ')';
    };

    /**
     * Convert color to HEX
     * @returns {string} eg: #FFFFFF
     */
    this.toHex = function () {
        var r = this.rgb.r.toString(16);
        var g = this.rgb.g.toString(16);
        var b = this.rgb.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
    };

    /**
     * Convert color to HSL
     * @returns {string} eg: hsl(100, 100%, 100%)
     */
    this.toHSL = function () {
        return "hsl(" + this.hsl.h + ", " + this.hsl.s + "%, " + this.hsl.l + "%)";
    };

    /**
     * Convert color to HSLA (HSL with transparency)
     * @returns {string}
     */
    this.toHSLA = function () {
        return "hsla(" + this.hsl.h + ", " + this.hsl.s + "%, " + this.hsl.l + "%, " + this.alpha + ")";
    };

    /**
     * Convert color to CMYK
     * @returns {string} eg: cmyk(0%, 0%, 0%, 0%)
     */
    this.toCMYK = function () {
        return "cmyk(" + this.cmyk.c + "%, " + this.cmyk.m + "%, " + this.cmyk.y + "%, " + this.cmyk.k + "%)";
    };

    /**
     * Convert color to an array with all color types
     * @returns {[Array,Array,Array,Number]} eg: [rgb, hsl, cmyk, 1]
     */
    this.toArray = function () {
        return [this.rgb, this.hsl, this.cmyk, this.alpha];
    }; // Return RGBA in array      eg: 0, 0, 0, 0

    /**
     * Return color type, eg: "HEX", "RGB", "RGBA", "HSL", "CMYK"
     * @returns {string}
     */
    this.colorType = function () {
        var type;

        for (var i = 0; i < colorDefs.length; i++) {
            var name = colorDefs[i].name;
            var regex = colorDefs[i].regex;
            var bytes = regex.exec(colorString);
            if (bytes) {
                type = name;
            }
        }

        return type;
    }
}


/**
 * Convert RGB (red, green, blue) values to a new EasyColorParser class
 * @param r
 * @param g
 * @param b
 * @returns {EasyColorParser} new constructor with converted colors
 */
EasyColorParser.fromRGB = function (r, g, b) {
    var params = {
        r:0,
        g:0,
        b:0
    };

    // Check params
    if(!!r && r.constructor === Object) {
        for(var key in params) {
            if (r.hasOwnProperty(key)) {
                params[key] = r[key];
            }
        }
    } else if(Array.isArray(r)) {
        for(var i = 0; i < r.length; i++) {
            params[Object.keys(params)[i]] = r[i];
        }
    } else {
        params.r = r || 0;
        params.g = g || 0;
        params.b = b || 0;
    }

    var ecp = new EasyColorParser("rgb(" + params.r + ", " + params.g + ", " + params.b + ")");
    this.success = ecp.success;
    return ecp;
};

/**
 * Convert RGBA (red, green, blue, alpha) values to a new EasyColorParser class
 * @param r
 * @param g
 * @param b
 * @param a
 * @returns {EasyColorParser} new constructor with converted colors
 */
EasyColorParser.fromRGBA = function (r, g, b, a) {
    var params = {
        r:0,
        g:0,
        b:0,
        a:1
    };

    // Check params
    if(!!r && r.constructor === Object) {
        for(var key in params) {
            if (r.hasOwnProperty(key)) {
                params[key] = r[key];
            }
        }
    } else if(Array.isArray(r)) {
        for(var i = 0; i < r.length; i++) {
            params[Object.keys(params)[i]] = r[i];
        }
    } else {
        params.r = r || 0;
        params.g = g || 0;
        params.b = b || 0;
        params.a = a || 1;
    }

    var ecp = new EasyColorParser("rgba(" + params.r + ", " + params.g + ", " + params.b + ", " + params.a + ")");
    this.success = ecp.success;
    return ecp;
};

/**
 * Convert HSL (hue, saturation, lightness) values to a new EasyColorParser class
 * @param h
 * @param s
 * @param l
 * @returns {EasyColorParser} new constructor with converted colors
 */
EasyColorParser.fromHSL = function (h, s, l) {
    var params = {
        h:0,
        s:0,
        l:0
    };

    // Check params
    if(!!h && h.constructor === Object) {
        for(var key in params) {
            if (h.hasOwnProperty(key)) {
                params[key] = h[key];
            }
        }
    } else if(Array.isArray(h)) {
        for(var i = 0; i < h.length; i++) {
            params[Object.keys(params)[i]] = h[i];
        }
    } else {
        params.h = h || 0;
        params.s = s || 0;
        params.l = l || 0;
    }

    var ecp = new EasyColorParser("hsl(" + params.h + ", " + params.s + "%, " + params.l + "%)");
    this.success = ecp.success;
    return ecp;
};

/**
 * Convert HSLA (hue, saturation, lightness, alpha) values to a new EasyColorParser class
 * @param h
 * @param s
 * @param l
 * @param a
 * @returns {EasyColorParser} new constructor with converted colors
 */
EasyColorParser.fromHSLA = function (h, s, l, a) {
    var params = {
        h:0,
        s:0,
        l:0,
        a:0
    };

    // Check params
    if(!!h && h.constructor === Object) {
        for(var key in params) {
            if (h.hasOwnProperty(key)) {
                params[key] = h[key];
            }
        }
    } else if(Array.isArray(h)) {
        for(var i = 0; i < h.length; i++) {
            params[Object.keys(params)[i]] = h[i];
        }
    } else {
        params.h = h || 0;
        params.s = s || 0;
        params.l = l || 0;
        params.a = a || 1;
    }

    var ecp = new EasyColorParser("hsla(" + params.h + ", " + params.s + "%, " + params.l + "%, " + params.a + ")");
    this.success = ecp.success;
    return ecp;
};

/**
 * Convert CMYK (cyan, magenta, yellow, key) values to a new EasyColorParser class
 * @param c
 * @param m
 * @param y
 * @param k
 * @returns {EasyColorParser} new constructor with converted colors
 */
EasyColorParser.fromCMYK = function (c, m, y, k) {
    var params = {
        c:0,
        m:0,
        y:0,
        k:0
    };

    // Check params
    if(!!c && c.constructor === Object) {
        for(var key in params) {
            if (c.hasOwnProperty(key)) {
                params[key] = c[key];
            }
        }
    } else if(Array.isArray(c)) {
        for(var i = 0; i < c.length; i++) {
            params[Object.keys(params)[i]] = c[i];
        }
    } else {
        params.c = c || 0;
        params.m = m || 0;
        params.y = y || 0;
        params.k = k || 0;
    }

    var ecp = new EasyColorParser("cmyk(" + params.c +"%, " + params.m + "%, " + params.y + "%, " + params.k + "%)");
    this.success = ecp.success;
    return ecp;
};
