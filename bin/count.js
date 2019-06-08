#! /usr/bin/env node

var program = require('commander');
var countFile = require('./countFile');

program
  .version('0.1.0')
  .option('-a, --all', '统计包括子文件夹文件')
  .option('ext, --type [type]', '最后一个参数，请输入文件扩展名，如 js , css,只接受一个参数','js')
  .action(function (env) {
  })
  .parse(process.argv);

if (program.all) {
  countFile.count('all')
} else {
  countFile.count()
}