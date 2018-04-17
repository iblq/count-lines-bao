let fs = require('fs')

let countFile = {

  count: function (type) {
    let filesList = [];
    let lines = 0
    let ext

    let arg = process.argv
    if (arg.length > 2) {
      if (arg[arg.length - 1].split('')[0] !== '-') {
        ext = arg[arg.length - 1]
      }
    }


    function geFileList(path) {
      readFile(path, filesList);
      return filesList;
    }

    function readFile(path, filesList) {
      files = fs.readdirSync(path); //同步读取
      files.forEach(myRead);

      function myRead(file) {
        if(file == 'node_modules') return

        let info = fs.statSync(path + '/' + file);

        if (info.isDirectory()) { // 文件夹递归查询
          type === 'all' && readFile(path + '/' + file, filesList)
        } else { // 文件信息处理

          let filec = file.split('.')
          let fileType = filec[filec.length - 1]
        
          if (ext) {
            if (fileType === ext) {
              addCount()
            }
          } else {
            addCount()
          }

          function addCount() {
            let ctx = fs.readFileSync(path + '/' + file, "utf8")

            String.prototype.deleteExtraLines=function(){
              return this.replace(/(^\s*)|(\s*$)/g,'');
            }

            let exg = /\n(\n)*( )*(\n)*\n/g  // 去掉空行
            ctx = ctx.replace(exg, '\n')
            let n = ctx.match(/\n/g) ? ctx.match(/\n/g).length : 0

            let obj = {
              name: file,
              path: path + '/' + file,
              size: info.size,
              lines: Number(n) + 1
            }
            lines += obj.lines

            console.log(`文件名：${file}    |    大小：${(info.size /1024).toFixed(2)}KB     | 行数：${obj.lines} `)
            filesList.push(obj)
          }

        }
      }
    }
    let allFile = geFileList(process.env.PWD)
    console.log('总行数:' + lines)
  }
}

module.exports = countFile