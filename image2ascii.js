var getPixels = require("get-pixels")
var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});

function getGray(r, g, b) {  
    return 0.299 * r + 0.578 * g + 0.114 * b;  
}

function toText(g) {
    if (g <= 30) {
        return "8";
    } else if (g > 30 && g <= 60) {
        return "&";
    } else if (g > 60 && g <= 120) {
        return "$";
    }  else if (g > 120 && g <= 150) {
        return "*";
    } else if (g > 150 && g <= 180) {
        return "o";
    } else if (g > 180 && g <= 210) {
        return "!";
    } else if (g > 210 && g <= 240) {
        return ";";
    }  else {
        return ".";
    }
}
var arr="";

getPixels("test.jpg", function(err, pixels) {
    if(!err) {
        let gray_degree;
        let pic_width = pixels.shape[0];
        let pic_height = pixels.shape[1];
        for(let h=0;h<pic_height;h+=12){
            for(let w=0;w<pic_width;w+=6){
                gray_degree = getGray(pixels.get(w,h,0),pixels.get(w,h,1),pixels.get(w,h,2));
                arr = arr + toText(gray_degree);
            }
            arr = arr +"\n"
        }
    }
    fs.writeFile("result.txt", arr, error => {
        if (error) return console.log(error.message);
        console.log("写入成功");
      });
})
