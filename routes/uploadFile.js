var express = require('express');
var router = express.Router();
var fs = require('fs');
var path= require("path");
var formidable = require('formidable');


router.post('/', function(req, res, next) {
    console.log('开始文件上传....');
     var form = new formidable.IncomingForm();
      //设置编辑
      form.encoding = 'utf-8';
      //设置文件存储路径
      form.uploadDir = "./public/images/";
      //保留后缀
      form.keepExtensions = true;
      //设置单文件大小限制    
      form.maxFieldsSize = 5 * 1024 * 1024;
      //form.maxFields = 1000;  设置所以文件的大小总和

      form.parse(req, function(err, fields, files) {
          console.log(fields);

        if (files){
            console.log(files);
            var dir = form.uploadDir;
            var oldName = files.file.path;
            var newName = path.join(dir,files.file.name)
            console.log(newName);
            //修改文件名以及后缀
            fs.rename(oldName,newName,()=>{
                console.log(`renameed to ${newName}`);
            })
        }
        res.json({
            code:1
        });

      });
  
     
  
  });

module.exports = router;