'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})



////////////////////////////以下
var chokidar = require('chokidar');
var fs = require('fs');

var watcher = chokidar.watch(process.cwd() + "/src/common/model", {
    ignoreInitial: true,
    interval: 100
  }
);

function refreshModels_() {
  console.log("Refresh Models_...");
  //定义一个遍历函数
  function walk(dir) {
    var children = [];
    fs.readdirSync(dir).forEach(function(filename){
      var path = dir+"/"+filename;
      var stat = fs.statSync(path);
      if (stat && stat.isDirectory()) {
        children = children.concat(walk(path))
      }
      else {
        children.push(path)
      }
    });
    return children
  }
  //循环数组生成文件内容
  var list = walk(process.cwd() + "/src/common/model");

  var w_data_object = '\r\nlet models = {\r\n';
  var w_data_object_end = '};\r\n' + "export default models\r\n";
  var w_data = '/*\r\n';
  w_data += '该文件属于自动生成,请勿手动修改\r\n';
  w_data += ' */\r\n';
  for(var i = 1;i<list.length;i++ ) {
    var className = list[i].substring(list[i].lastIndexOf("/") + 1, list[i].lastIndexOf("."));
    if(className.endsWith("Type") || className.endsWith("Status") || className === 'Action') {
      //KeeperBusinessType 比较特殊！！
      if(className !== 'KeeperBusinessType') {
        continue;
      }
    }
    list[i] = ".." + list[i].substring(list[i].indexOf("/model"), list[i].lastIndexOf("."));
    w_data += "import " + className + " from \"" + list[i] + "\"" + "\r\n";

    if(i === list.length - 1) {
      w_data_object += "  " + className + ": " + className + "\r\n";
    } else {
      w_data_object += "  " + className + ": " + className + ",\r\n";
    }

  }

  fs.writeFile(process.cwd() + "/src/common/model_/models.js",
    w_data + w_data_object + w_data_object_end,
    function (err) {
      if(err) {
        console.error(err);
      }
      else {
        console.log('Refresh Success!');
      }
    });
}

watcher.on('unlink', function(event, path) {
  console.log(event + path);
  refreshModels_();
});
watcher.on('add', function(event, path) {
  console.log(event + path);
  refreshModels_();
});





//https://www.npmjs.com/package/chokidar
// Node.js fs.watch:
//   •不会再OSX上显示文件名
//   •当你在OSX用编辑器编辑文件的时候不会触发事件
//   •经常会连续触发两次事件
//   •没有提供一个好的接口去递归文件
//   •等等
// Node.js fs.watchFile:
//   •经常在处理事件的时候会挂掉
//   •没法递归文件
//   •过高的CPU占用率
////////////////////////////以上
