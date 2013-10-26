var color = require('../color');

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}


console.log( rgbToHsl(255,0,0) )
console.log( rgbToHsl(0,255,0) )
console.log( rgbToHsl(0,0,255) )



function show(x){
  console.log(x,color(x))
}

// /[-10,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10].forEach(show)

