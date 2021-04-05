var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});

//大小重整
function resize_operation(data){
  gm(data[0])
  .resize(data[1], data[2])
  .noProfile()
  .write("result.jpg", function (err) {
    if (err) console.log('fetal err!'+err);
  });
}


//摸摸头动图生成
function prprhead(data){
  //赋予图像压缩调整参数
  para=["80x80!+32+32","70x90!+42+22","75x85!+37+27","85x75!+27+37","90x70!+22+42"];
  //循环制图写出
  for(var i=0;i<=4;i++){
    gm("./temp/prprhead/sprite-" + i + ".png")
    .command("composite")
    .in("-compose","dstover") 
    .in("-geometry",para[i])
    .in(data[0])
    .write("./temp/prprhead/page-" + i + ".png", function (err) {
      if (err) console.log('fetal err!'+err);
    });
  }
  //动图拼接
  gm()
  .in("-loop","0")
  .in("-delay","8")
  .in("-dispose","Background")
  .in("temp/prprhead/page-*.png")
  .write("result.gif", function (err) {
    if (err) console.log('fetal err!'+err);
  });
}

var arguments = process.argv.splice(2);
var type = arguments[0];
//后续参数提取
data = arguments.slice(1);
console.log(data);
//类型判别
switch(type){
  case "resize":
    resize_operation(data);
    break;
  case "prprhead":
    prprhead(data);
    break;
  default:
    console.log('None Operation Done! Plz check your para first.')
}

