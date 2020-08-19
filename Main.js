
console.log('hello');

var ZSCapturer =require('./ZSCapturer');

capture = new ZSCapturer();
capture.catListInfo();
return;


const http = require("http");
const fs = require("fs");
const cheerio = require("cheerio");



http.get('http://portal.godvoice.cn/article-7367-1.html', function(res) {//portal.godvoice.cn
//http.get('http://portal.godvoice.cn/article-7432-1.html', function(res) {//portal.godvoice.cn

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
               
               var chapters = $('.p1');//xs2  bbda
            
            console.log('chapters is ' + chapters);
               chapters.map(function (node) {
                   var chapters = $(this);
                   var chapterInfo = chapters.text().trim();
                            console.log('------>');
                            console.log(chapterInfo);
                            console.log('<------');
//                            console.log(chapterTitle);
                            /*
                            $.trim() 函数用于去除字符串两端的空白字符。
                            注意：$.trim()函数会移除字符串开始和末尾处的所有换行符，空格(包括连续的空格)和制表符。如果这些空白字符在字符串中间时，它们将被保留，不会被移除。
                             */
                            var link = chapters.find('a').attr('href');
                            
                            if(link !=undefined)
                            {
                            console.log(link);

                            }


               });
        })
    });





return;
//学习地址   http://cw.hubwiz.com/card/c/5636b7a11bc20c980538e998/1/4/2/


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

                        if(link !=undefined)
                        {
                        console.log(link);

                        }


           });
    })
});
