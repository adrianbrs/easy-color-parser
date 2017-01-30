"use strict";

let assert = require('assert'),
    Color  = require('../');

describe('Converting Colors', function() {
    let black = {
        hex : "#000000",
        rgb : "rgb(0, 0, 0)",
        rgba: "rgba(0, 0, 0, 1)",
        hsl : "hsl(0, 0%, 0%)",
        hsla: "hsla(0, 0%, 0%, 1)",
        cmyk: "cmyk(0%, 0%, 0%, 100%)",
    };

    let blue = {
        hex : "#1b78f8",
        rgb : "rgb(27, 120, 248)",
        rgba: "rgba(27, 120, 248, 1)",
        hsl : "hsl(215, 94%, 54%)",
        hsla: "hsla(215, 94%, 54%, 1)",
        cmyk: "cmyk(89%, 52%, 0%, 3%)",
    };

    let white = {
        hex : "#ffffff",
        rgb : "rgb(255, 255, 255)",
        rgba: "rgba(255, 255, 255, 1)",
        hsl : "hsl(0, 0%, 100%)",
        hsla: "hsla(0, 0%, 100%, 1)",
        cmyk: "cmyk(0%, 0%, 0%, 0%)",
    };

    let its = [
        {
            description: "# HEX to RGB",
            method     : "toRGB",
            tests      :  [
                {   // Black
                    input : black.hex,
                    output: black.rgb
                },
                {   // Blue
                    input : blue.hex,
                    output: blue.rgb
                },
                {   // White
                    input : white.hex,
                    output: white.rgb
                }
            ]
        },
        {
            description: "# HEX to RGBA",
            method     : "toRGBA",
            tests      :  [
                {   // Black
                    input : black.hex,
                    output: black.rgba
                },
                {   // Blue
                    input : blue.hex,
                    output: blue.rgba
                },
                {   // White
                    input : white.hex,
                    output: white.rgba
                }
            ]
        },
        {
            description: "# HEX to HSL",
            method     : "toHSL",
            tests      :  [
                {   // Black
                    input : black.hex,
                    output: black.hsl
                },
                {   // Blue
                    input : blue.hex,
                    output: blue.hsl
                },
                {   // White
                    input : white.hex,
                    output: white.hsl
                }
            ]
        },
        {
            description: "# HEX to HSLA",
            method     : "toHSLA",
            tests      :  [
                {   // Black
                    input : black.hex,
                    output: black.hsla
                },
                {   // Blue
                    input : blue.hex,
                    output: blue.hsla
                },
                {   // White
                    input : white.hex,
                    output: white.hsla
                }
            ]
        },
        {
            description: "# HEX to CMYK",
            method     : "toCMYK",
            tests      :  [
                {   // Black
                    input : black.hex,
                    output: "cmyk(0%, 0%, 0%, 100%)"
                },
                {   // Blue
                    input : blue.hex,
                    output: blue.cmyk
                },
                {   // White
                    input : white.hex,
                    output: white.cmyk
                }
            ]
        },










        {
            description: "# RGB to HEX",
            method     : "toHex",
            tests      :  [
                {   // Black
                    input : black.rgb,
                    output: black.hex
                },
                {   // Blue
                    input : blue.rgb,
                    output: blue.hex
                },
                {   // White
                    input : white.rgb,
                    output: white.hex
                }
            ]
        },
        {
            description: "# RGB to RGBA",
            method     : "toRGBA",
            tests      :  [
                {   // Black
                    input : black.rgb,
                    output: black.rgba
                },
                {   // Blue
                    input : blue.rgb,
                    output: blue.rgba
                },
                {   // White
                    input : white.rgb,
                    output: white.rgba
                }
            ]
        },
        {
            description: "# RGB to HSL",
            method     : "toHSL",
            tests      :  [
                {   // Black
                    input : black.rgb,
                    output: black.hsl
                },
                {   // Blue
                    input : blue.rgb,
                    output: blue.hsl
                },
                {   // White
                    input : white.rgb,
                    output: white.hsl
                }
            ]
        },
        {
            description: "# RGB to HSLA",
            method     : "toHSLA",
            tests      :  [
                {   // Black
                    input : black.rgb,
                    output: black.hsla
                },
                {   // Blue
                    input : blue.rgb,
                    output: blue.hsla
                },
                {   // White
                    input : white.rgb,
                    output: white.hsla
                }
            ]
        },
        {
            description: "# RGB to CMYK",
            method     : "toCMYK",
            tests      :  [
                {   // Black
                    input : black.rgb,
                    output: black.cmyk
                },
                {   // Blue
                    input : blue.rgb,
                    output: blue.cmyk
                },
                {   // White
                    input : white.rgb,
                    output: white.cmyk
                }
            ]
        },









        {
            description: "# RGBA to HEX",
            method     : "toHex",
            tests      :  [
                {   // Black
                    input : black.rgba,
                    output: black.hex
                },
                {   // Blue
                    input : blue.rgba,
                    output: blue.hex
                },
                {   // White
                    input : white.rgba,
                    output: white.hex
                }
            ]
        },
        {
            description: "# RGBA to RGB",
            method     : "toRGB",
            tests      :  [
                {   // Black
                    input : black.rgba,
                    output: black.rgb
                },
                {   // Blue
                    input : blue.rgba,
                    output: blue.rgb
                },
                {   // White
                    input : white.rgba,
                    output: white.rgb
                }
            ]
        },
        {
            description: "# RGBA to HSL",
            method     : "toHSL",
            tests      :  [
                {   // Black
                    input : black.rgba,
                    output: black.hsl
                },
                {   // Blue
                    input : blue.rgba,
                    output: blue.hsl
                },
                {   // White
                    input : white.rgba,
                    output: white.hsl
                }
            ]
        },
        {
            description: "# RGBA to HSLA",
            method     : "toHSLA",
            tests      :  [
                {   // Black
                    input : black.rgba,
                    output: black.hsla
                },
                {   // Blue
                    input : blue.rgba,
                    output: blue.hsla
                },
                {   // White
                    input : white.rgba,
                    output: white.hsla
                }
            ]
        },
        {
            description: "# RGBA to CMYK",
            method     : "toCMYK",
            tests      :  [
                {   // Black
                    input : black.rgba,
                    output: black.cmyk
                },
                {   // Blue
                    input : blue.rgba,
                    output: blue.cmyk
                },
                {   // White
                    input : white.rgba,
                    output: white.cmyk
                }
            ]
        },








        {
            description: "# HSL to HEX",
            method     : "toHex",
            tests      :  [
                {   // Black
                    input : black.hsl,
                    output: "#000000"
                },
                {   // Blue
                    input : blue.hsl,
                    output: "#1b77f8"
                },
                {   // White
                    input : white.hsl,
                    output: white.hex
                }
            ]
        },
        {
            description: "# HSL to RGB",
            method     : "toRGB",
            tests      :  [
                {   // Black
                    input : black.hsl,
                    output: black.rgb
                },
                {   // Blue
                    input : blue.hsl,
                    output: "rgb(27, 119, 248)"
                },
                {   // White
                    input : white.hsl,
                    output: white.rgb
                }
            ]
        },
        {
            description: "# HSL to RGBA",
            method     : "toRGBA",
            tests      :  [
                {   // Black
                    input : black.hsl,
                    output: black.rgba
                },
                {   // Blue
                    input : blue.hsl,
                    output: "rgba(27, 119, 248, 1)"
                },
                {   // White
                    input : white.hsl,
                    output: white.rgba
                }
            ]
        },
        {
            description: "# HSL to HSLA",
            method     : "toHSLA",
            tests      :  [
                {   // Black
                    input : black.hsl,
                    output: black.hsla
                },
                {   // Blue
                    input : blue.hsl,
                    output: blue.hsla
                },
                {   // White
                    input : white.hsl,
                    output: white.hsla
                }
            ]
        },
        {
            description: "# HSL to CMYK",
            method     : "toCMYK",
            tests      :  [
                {   // Black
                    input : black.hsl,
                    output: black.cmyk
                },
                {   // Blue
                    input : blue.hsl,
                    output: blue.cmyk
                },
                {   // White
                    input : white.hsl,
                    output: white.cmyk
                }
            ]
        },







        {
            description: "# HSLA to HEX",
            method     : "toHex",
            tests      :  [
                {   // Black
                    input : black.hsla,
                    output: "#000000"
                },
                {   // Blue
                    input : blue.hsla,
                    output: "#1b77f8"
                },
                {   // White
                    input : white.hsla,
                    output: white.hex
                }
            ]
        },
        {
            description: "# HSLA to RGB",
            method     : "toRGB",
            tests      :  [
                {   // Black
                    input : black.hsla,
                    output: black.rgb
                },
                {   // Blue
                    input : blue.hsla,
                    output: "rgb(27, 119, 248)"
                },
                {   // White
                    input : white.hsla,
                    output: white.rgb
                }
            ]
        },
        {
            description: "# HSLA to RGBA",
            method     : "toRGBA",
            tests      :  [
                {   // Black
                    input : black.hsla,
                    output: black.rgba
                },
                {   // Blue
                    input : blue.hsla,
                    output: "rgba(27, 119, 248, 1)"
                },
                {   // White
                    input : white.hsla,
                    output: white.rgba
                }
            ]
        },
        {
            description: "# HSLA to HSL",
            method     : "toHSL",
            tests      :  [
                {   // Black
                    input : black.hsla,
                    output: black.hsl
                },
                {   // Blue
                    input : blue.hsla,
                    output: blue.hsl
                },
                {   // White
                    input : white.hsla,
                    output: white.hsl
                }
            ]
        },
        {
            description: "# HSLA to CMYK",
            method     : "toCMYK",
            tests      :  [
                {   // Black
                    input : black.hsla,
                    output: black.cmyk
                },
                {   // Blue
                    input : blue.hsla,
                    output: blue.cmyk
                },
                {   // White
                    input : white.hsla,
                    output: white.cmyk
                }
            ]
        },






        {
            description: "# CMYK to HEX",
            method     : "toHex",
            tests      :  [
                {   // Black
                    input : black.cmyk,
                    output: "#000000"
                },
                {   // Blue
                    input : blue.cmyk,
                    output: "#1b77f7"
                },
                {   // White
                    input : white.cmyk,
                    output: white.hex
                }
            ]
        },
        {
            description: "# CMYK to RGB",
            method     : "toRGB",
            tests      :  [
                {   // Black
                    input : black.cmyk,
                    output: black.rgb
                },
                {   // Blue
                    input : blue.cmyk,
                    output: "rgb(27, 119, 247)"
                },
                {   // White
                    input : white.cmyk,
                    output: white.rgb
                }
            ]
        },
        {
            description: "# CMYK to RGBA",
            method     : "toRGBA",
            tests      :  [
                {   // Black
                    input : black.cmyk,
                    output: black.rgba
                },
                {   // Blue
                    input : blue.cmyk,
                    output: "rgba(27, 119, 247, 1)"
                },
                {   // White
                    input : white.cmyk,
                    output: white.rgba
                }
            ]
        },
        {
            description: "# CMYK to HSL",
            method     : "toHSL",
            tests      :  [
                {   // Black
                    input : black.cmyk,
                    output: black.hsl
                },
                {   // Blue
                    input : blue.cmyk,
                    output: "hsl(215, 93%, 54%)"
                },
                {   // White
                    input : white.cmyk,
                    output: white.hsl
                }
            ]
        },
        {
            description: "# CMYK to HSLA",
            method     : "toHSLA",
            tests      :  [
                {   // Black
                    input : black.cmyk,
                    output: black.hsla
                },
                {   // Blue
                    input : blue.cmyk,
                    output: "hsla(215, 93%, 54%, 1)"
                },
                {   // White
                    input : white.cmyk,
                    output: white.hsla
                }
            ]
        },

    ];

    its.forEach(function(test){
        describe(test.description, function(){
            test.tests.forEach(function(sub_test){
                it(`Should Convert ${sub_test.input} to ${sub_test.output}`, function(){
                    let my_color = new Color(sub_test.input);
                    let output   = my_color[test.method]();

                    assert.equal(output, sub_test.output)
                });
            });
        });
    });
});
