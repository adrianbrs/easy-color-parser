# JavaScript Easy Color Parser
### Classe em javascript para conversão de cores hex, rgb, rgba, hsl, hsla e cmyk.

---
Inspirado no projeto de [Stoyan Stefanov](http://www.phpied.com/rgb-color-parser-in-javascript/)

---

### Formatos de cores suportadas
* HEX
* SHORT HEX
* RGB
* RGBA
* HSL
* HSLA
* CMYK

---

### Simples e Fácil de usar
Crie uma instância do construtor colocando a cor que deseja converter <br />
Você pode colocar em qualquer formato suportado <br />
Exemplo:
```js
// Instancie
var parser = new EasyColorParser("#00AAFF"); // Pode botar também: #0af, rgb(0, 170, 255), hsl(..., etc...

// Converta
parser.toHEX();  // Converte para o format HEX   (Hexadecimal)
parser.toRGB();  // Converte para o formato RGB  (Red, Green, Blue)
parser.toRGBA(); // Converte para o formato RGBA (Red, Green, Blue, Alpha)
parser.toHSL();  // Converte para o formato HSL  (Hue, Saturation, Lightness)
parser.toHSLA(); // Converte para o formato HSLA (Hue, Saturation, Lightness, Alpha)
parser.toCMYK(); // Converte para o formato CMYK (Cyan, Magenta, Yellow, Key)
```
Para converter os valores de uma cor separadamente use:
```js
// RGB
var parser = new EasyColorParser().fromRGB(0, 170, 255); // Valores separados
var parser = new EasyColorParser().fromRGB([0, 170, 255]); // Array
var parser = new EasyColorParser().fromRGB({ r: 0, g: 170, b: 255 }); // Object

// RGBA
var parser = new EasyColorParser().fromRGBA(0, 170, 255, 1); // Valores separados
var parser = new EasyColorParser().fromRGBA([0, 170, 255, 1]); // Array
var parser = new EasyColorParser().fromRGBA({ r: 0, g: 170, b: 255, a: 1 }); // Object

// HSL
var parser = new EasyColorParser().fromHSL(200, 100, 50); // Valores separados
var parser = new EasyColorParser().fromHSL([200, 100, 50]); // Array
var parser = new EasyColorParser().fromHSL({ h: 200, s: 100, l: 50 }); // Object

// HSLA
var parser = new EasyColorParser().fromHSLA(200, 100, 50, 1); // Valores separados
var parser = new EasyColorParser().fromHSLA([200, 100, 50, 1]); // Array
var parser = new EasyColorParser().fromHSLA({ h: 200, s: 100, l: 50, a: 1 }); // Object

// CMYK
var parser = new EasyColorParser().fromCMYK(100, 33, 0, 0); // Valores separados
var parser = new EasyColorParser().fromCMYK([100, 33, 0, 0]); // Array
var parser = new EasyColorParser().fromCMYK({ c: 100, m: 33, y: 0, k: 0 }); // Object
```
--
Você também pode pegar o nome do formato da cor que você definiu para facilitar em alguns casos
```js
parser.colorType(); // Retorna o formato da cor definida
```
--
Assim você também pode converter uma cor para um formato a partir do nome do formato
```js
parser.to("RGBA") // Nesse caso ele ira retornar o valor da cor no formato RGBA, ex: rgba(0, 170, 255, 1)
```
--

### Tabela de Cores CSS
Você pode pegar a tabela de cores CSS usada para converter o nome da cor em HEX, ex: white -> #FFFFFF <br />
[Tabela de Cores CSS](http://www.w3schools.com/cssref/css_colors.asp) <br />
Para pegar a array dessa tabela use:
```js
var table = parser.CSSColorTable;
```
Com essa tabela você pode converter cores apenas pelo nome também <br />
Por exemplo:
```js
var parser = new EasyColorParser("aqua"); // Cria a instância a partir do nome da cor css
parser.toHex(); // #00FFFF
```
--
### Valores
Para pegar os valores separados de cada formato use:
```js
var rgb = parser.rgb,     // Retorna uma array com os valores RGB  ->  {r:Number, g:Number, b:Number}
    hsl = parser.hsl,     // Retorna uma array com os valores HSL  ->  {h:Number, s:Number, l:Number}
    cmyk = parser.cmyk,   // Retorna uma array com os valores CMYK ->  ...
    alpha = parser.alpha; // Retorna a transparência da cor        ->  1

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
---
