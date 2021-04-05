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
  return;
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
      if(err){
        console.log('fetal err!'+err)
        return;
      }
      else{
        //动图拼接
        if(i==4){
          gm()
          .in("-loop","0")
          .in("-delay","8")
          .in("-dispose","Background")
          .in("temp/prprhead/page-*.png")
          .write("result.gif", function (err) {
            if(err){
              console.log('fetal err!'+err)
              return;
            }
          });
        }
      }
    });
  }
  return;
}

//男同，关注了你
function focus_on_you(data){
  //文字接入
  gm("./temp/focus_on_you/focus_on_you.png")
  .font("./temp/focus_on_you/DroidSansFallback.ttf")
  .fontSize(30)
  .drawText(160,75,data[1])
  .fill('#919191')
  .fontSize(28)
  .drawText(160,120,data[2])
  .write("./temp/focus_on_you/temp.png", function (err) {
    if(err){
      console.log('fetal err!'+err)
      return;
    }
    else{
      //图片叠加
      gm("./temp/focus_on_you/temp.png")
      .command("composite")
      .in("-compose","dstover") 
      .in("-geometry","125x125!+15+20")
      .in(data[0])
      .write("result.png", function (err) {
        if(err){
          console.log('fetal err!'+err)
          return;
        }
      });
    }
  });
}

function keep_me_do(data){
  //文字接入
  gm("./temp/keep_me_do/keep_me_do.png")
  .draw("image Over 0,0 250,250 "+data[0])
  .draw("image Over 142,252 40,40 "+data[0])
  .write("result.png", function (err) {
    if(err){
      console.log('fetal err!'+err)
      return;
    }
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
  case "focus_on_you":
    focus_on_you(data);
    break;
  case "keep_me_do":
    keep_me_do(data);
    break;
  default:
    console.log('None Operation Done! Plz check your para first.')
}

