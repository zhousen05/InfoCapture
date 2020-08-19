

const http = require("http");
const fs = require("fs");
const cheerio = require("cheerio");
const path = require('path');

function catListInfo(){
    //学习地址http://cw.hubwiz.com/card/c/5636b7a11bc20c980538e998/1/4/2/
    

    http.get("http://portal.godvoice.cn/portal.php?mod=list&catid=118", function(res) {//portal.godvoice.cn
        // 设置编码
             

             
    //         list:
    //         http://portal.godvoice.cn/portal.php?mod=list&catid=118
             
    //         http://portal.godvoice.cn/portal.php?mod=list&catid=118&page=2
    //    res.setEncoding("GBK");
        // 当接收到数据时，会触发 "data" 事件的执行
        var html = [];
        res.on("data", function(data){
               html.push(data);
        });
        // 数据接收完毕，会触发 "end" 事件的执行
        res.on("end", function(){
               
               var iconv = require('iconv-lite');

               html = iconv.decode(Buffer.concat(html), 'GBK');
            
            var fileData;// 待保存到文件中的字符串
            const $ = cheerio.load(html);
               
               var chapters = $('.xs2');//xs2  bbda

               chapters.map(function (node) {
                   var chapters = $(this);
                   var chapterTitle = chapters.find('a').text().trim();
                            /*
                            $.trim() 函数用于去除字符串两端的空白字符。
                            注意：$.trim()函数会移除字符串开始和末尾处的所有换行符，空格(包括连续的空格)和制表符。如果这些空白字符在字符串中间时，它们将被保留，不会被移除。
                             */
                            var link = chapters.find('a').attr('href');

                   
                   /*
                            if(link !=undefined)
                            {
                            console.log('link is ' + link);
                            catDetailInfo(link,chapterTitle);

                            }
                    */
                   if(link == 'http://portal.godvoice.cn/article-7432-1.html')
                   {
                   console.log('link is ' + link);
                   catDetailInfo(link,chapterTitle);

                   }
                   
                   


               });
        })
    });

}

function catDetailInfo(pageUrl,chapterTitle){
    console.log('catDetailInfo pageUrl is ' + pageUrl + ' chapterTitle ' + chapterTitle);
    
//    pageUrl = 'http://portal.godvoice.cn/article-7367-1.html';
    http.get(pageUrl, function(res) {//portal.godvoice.cn

        
        var html = [];
        res.on("data", function(data){
               html.push(data);
        });
        // 数据接收完毕，会触发 "end" 事件的执行
        res.on("end", function(){
               
               var iconv = require('iconv-lite');

               html = iconv.decode(Buffer.concat(html), 'GBK');
            
            var fileData;// 待保存到文件中的字符串
            
            
            console.log('html is ' + html);
            var $ = cheerio.load(html);
        console.log('$$$$ is ' + $);
//               var chapters = $('.p1');//xs2  bbda
            var chapters = $('.vwtb');//xs2  bbda
            

            
//            if (chapters == undefined){
//                chapters = $('.area');//xs2  bbda
//            }
            
            console.log('chapters is ' + chapters);
               chapters.map(function (node) {
                   var chapters = $(this);
                   var chapterInfo = chapters.text().trim();
                            console.log('------>');
                            console.log(chapterInfo);
                            console.log('<------');

                            var link = chapters.find('a').attr('href');
                            
                            if(link !=undefined)
                            {
                            downloadFile(link,chapterTitle);
                            console.log(link);

                            }
               });
        })
    });
}

function downloadFile(fileUrl,fileName){
    var client = require('ftp');

        var fs = require('fs');

        var c = new client();

    c.on('ready', function() {

    //和ftp服务器连接成功后，会进到这里来。接着可以上传下载文件或者做其它事情了。

             c.list(function(err, list) {//Get a directory listing of the current (remote) working directory:

                   if(err) throw err;

                   console.dir(list);

//                   c.end();

              });
//           c.get('remote file path', function(err, stream) {  //Download remote file  and save it to the local file system:
        
        let remotePath = getRemotePath(fileUrl);
        console.log('remotePath is ' + remotePath);
             c.get(remotePath, function(err, stream) {  //Download remote file  and save it to the local file system:
                  if(err) throwerr;

                  stream.once('close', function() {

                              console.log('download Finish');
                      c.end();

                   });

//              stream.pipe(fs.createWriteStream('local file path'));
                 stream.pipe(fs.createWriteStream('/Users/vstarcam/Desktop/文件123/' + getLocalFileName(fileUrl)));

           });

           });

    var connectionProperties = {
//ftp://ftp.godvoice.org:777/service/2020/20200816_mor.MP3
        host:'xxx',

        user:'xxx',

        password:'xxx',

        port:21  //默认是21，这个看自己要连接的端口

        };

       c.connect(connectionProperties);
}

function getRemotePath(fileUrl){
    var arr = fileUrl.split("777/");
    return arr[1];
}

function getLocalFileName(fileUrl){
    var arr = fileUrl.split("/");
    return arr.pop();//从集合中把最后一个元素删除，并返回这个元素的值。
    
}

function ZSCapturer(){
    this.catListInfo = catListInfo;
}
module.exports = ZSCapturer;



/*
 const http = require("http");
 const fs = require("fs");
 const cheerio = require("cheerio");

 http.get("http://tech.ifeng.com/", function(res) {
     // 设置编码
     res.setEncoding("utf8");
     // 当接收到数据时，会触发 "data" 事件的执行
     let html = "";
     res.on("data", function(data){
         html += data;
     });
     // 数据接收完毕，会触发 "end" 事件的执行
     res.on("end", function(){
         // 待保存到文件中的字符串
         let fileData = "";
         // 调用 cheerio.load() 方法，生成一个类似于 jQuery 的对象
         const $ = cheerio.load(html);
         // 接下来像使用 jQuery 一样来使用 cheerio
         $(".pictxt02").each(function(index, element) {
             const el = $(element);
             let link = el.find("h3 a").attr("href"),
                 title = el.find("h3 a").text(),
                 desc = el.children("p").text();

             fileData += `${link}\r\n${title}\r\n\t${desc}\r\n\r\n`;
         });

         // console.log("读取结束，内容：");
         // console.log(html);
         fs.writeFile("./dist/source.txt", fileData, function(err) {
             if (err)
                 return;
             console.log("成功")
         });
     })
 });
 */
