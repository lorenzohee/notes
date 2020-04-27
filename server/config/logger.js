const logger = require('morgan');
const path = require('path');
var fs = require('fs');//文件模块
var FileStreamRotator = require('file-stream-rotator');

//设置日志文件目录
var logDirectory = path.join(__dirname, '../logs');
//确保日志文件目录存在 没有则创建
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
//创建一个写路由
var accessLogStream = FileStreamRotator.getStream({
  filename: logDirectory + '/notes-%DATE%.log',
  frequency: 'daily',
  verbose: false
})

// 自定义token
logger.token('from', function (req, res) {
  return req.query.from || '-';
});
// 自定义format，其中包含自定义的token
logger.format('joke', '[logger] :method :url :status :from');

module.exports = function setLogger(app, format='joke', error="error msg"){
  if(format=='combined'){
    app.use(logger('combined', { stream: accessLogStream, skip: function (req, res) { return res.statusCode < 400 } }));//写入日志文件
  }
  if(format=='joke'){
    app.use(logger('joke'));
  }
  if(format=='error'){
    logger.format('error', '[error] :url :from ['+error+']')
    app.use(logger('error'))
  }

}