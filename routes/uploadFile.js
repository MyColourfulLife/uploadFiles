var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
var formidable = require("formidable");

//提供路由接口 当访问这个路由的根目录时 会走这个处理函数
router.post("/", function(req, res, next) {
  console.log("开始文件上传....");
//   使用formidable form来解析收到的请求 可以直接将文件写入本地 
  var form = new formidable.IncomingForm();
  //设置编辑
  form.encoding = "utf-8";
  //设置文件存储路径 必须要写
  form.uploadDir = "./public/images/";
  //保留后缀
  form.keepExtensions = true;
  //设置单文件大小限制
  form.maxFieldsSize = 5 * 1024 * 1024;
  //form.maxFields = 1000;  设置所以文件的大小总和
// 使用form解析请求  fields 是文件之外的所有的字段 files包含文件信息
  form.parse(req, function(err, fields, files) {
    console.log(fields);
    //错误处理
    if (err) {
      res.json({
        code: 0,
        message: `${err.message}`
      });
      return;
    }

    // 文件为空处理
    if (!files | (Object.keys(files).length == 0)) {
      res.json({
        code: 0,
        message: `文件不能为空`
      });
      return;
    }

    // 修改文件名
    var dir = form.uploadDir;
    // 注意 files的file属性 是用户上传设置的参数名 如果设置的是fileName 那么就需要用files.FileName
    // 打印files会发现是个对象 file 对应一个File {} 这个格式我不是很了解 可能是说这是个文件吧 可以略过File直接使用files.file.属性 获取属性值

    var oldName = files.file.path;
    var newName = path.join(dir, files.file.name);
    //修改文件名以及后缀
    fs.rename(oldName, newName, () => {
      console.log(`renameed to ${newName}`);
    });

    res.json({
      code: 1
    });

  });
});

module.exports = router;
