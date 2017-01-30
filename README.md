# JavaScript Easy Color Parser
### Converts colors between formats hex, rgb, rgba, hsl, hsla e cmyk.

---
Inspired by the project of [Stoyan Stefanov](http://www.phpied.com/rgb-color-parser-in-javascript/)

---

### Supported color formats
* HEX
* SHORT HEX
* RGB
* RGBA
* HSL
* HSLA
* CMYK

---

### Simple and East to use
Create an instance of the constructor by placing the color you want to convert <br />
You can put in any supported format <br />
Example:
```js
// Instance
var parser = new EasyColorParser("#00AAFF"); // You can also add: # 0af, rgb (0, 170, 255), hsl (..., etc ...

// Converta
parser.toHEX();  // Converts to HEX format   (Hexadecimal)
parser.toRGB();  // Converts to RGB format  (Red, Green, Blue)
parser.toRGBA(); // Converts to RGBA format (Red, Green, Blue, Alpha)
parser.toHSL();  // Converts to HSL format  (Hue, Saturation, Lightness)
parser.toHSLA(); // Converts to HSLA format (Hue, Saturation, Lightness, Alpha)
parser.toCMYK(); // Converts to CMYK format (Cyan, Magenta, Yellow, Key)
```
To convert the values of a color separately use:
```js
// RGB
var parser = new EasyColorParser().fromRGB(0, 170, 255); // Values
var parser = new EasyColorParser().fromRGB([0, 170, 255]); // Array of values
var parser = new EasyColorParser().fromRGB({ r: 0, g: 170, b: 255 }); // Object of values

// RGBA
var parser = new EasyColorParser().fromRGBA(0, 170, 255, 1); // Values
var parser = new EasyColorParser().fromRGBA([0, 170, 255, 1]); // Array of values
var parser = new EasyColorParser().fromRGBA({ r: 0, g: 170, b: 255, a: 1 }); // Object of values

// HSL
var parser = new EasyColorParser().fromHSL(200, 100, 50); // Values
var parser = new EasyColorParser().fromHSL([200, 100, 50]); // Array of values
var parser = new EasyColorParser().fromHSL({ h: 200, s: 100, l: 50 }); // Object of values

// HSLA
var parser = new EasyColorParser().fromHSLA(200, 100, 50, 1); // Values
var parser = new EasyColorParser().fromHSLA([200, 100, 50, 1]); // Array of values
var parser = new EasyColorParser().fromHSLA({ h: 200, s: 100, l: 50, a: 1 }); // Object of values

// CMYK
var parser = new EasyColorParser().fromCMYK(100, 33, 0, 0); // Values
var parser = new EasyColorParser().fromCMYK([100, 33, 0, 0]); // Array of values
var parser = new EasyColorParser().fromCMYK({ c: 100, m: 33, y: 0, k: 0 }); // Object of values
```
--
You can also get the name of the color format that you have set to make it easier in some cases
```js
parser.colorType(); // Returns the color format defined
```
--
So you can also convert a color to a format from the format name
```js
parser.to("RGBA") // In this case it will return the color value in RGBA format, eg rgba (0, 170, 255, 1)
```
--

### CSS Color Table
You can pick up the CSS color table used to convert the color name to HEX, eg: white -> #FFFFFF <br />
Read about [CSS Color Table](http://www.w3schools.com/cssref/css_colors.asp) <br />
To get the array of this table use:
```js
var table = parser.CSSColorTable;
```
With this table you can convert colors just by name too <br />
For example:
```js
var parser = new EasyColorParser("aqua"); // Creates the instance from the css color name
parser.toHex(); // #00FFFF
```
--
### Values
To get the separate values for each format use:
```js
var rgb = parser.rgb,     // Returns an array with the RGB values  ->  {r:Number, g:Number, b:Number}
    hsl = parser.hsl,     // Returns an array with the HSL valuesL ->  {h:Number, s:Number, l:Number}
    cmyk = parser.cmyk,   // Returns an array with the CMYK values ->  ...
    alpha = parser.alpha; // Returns color transparency            ->  1

// RGB
var red = rgb.r;
var green = rgb.g;
var blue = rgb.b;

// HSL
var hue = hsl.h;
var saturation = hsl.s;
var lightness = hsl.l;

// CMYK
var cyan = cmyk.c;
var magenta = cmyk.m;
var yellow = cmyk.y;
var key = cmyk.k;
```
