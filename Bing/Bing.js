
var fs = require('fs');
var readline = require('readline');
var path = require('path')
 
function readFileToArr(fReadName, callback) {
    var arr = [];
    var readObj = readline.createInterface({
        input: fs.createReadStream(fReadName)
    });
 
    readObj.on('line', function (line) {
        arr.push(line);
    });
    readObj.on('close', function () {
        console.log('readLine close....');
        callback(arr);
    });
}
 
// var urlsFile = path.resolve(__dirname, 'links.txt').replace(/\\/g, '/');  // For Windows
var urlsFile = path.resolve(__dirname, '..', 'Bing', 'links.txt'); /* 兼容 Windows/Linux, 这里nodejs为上级文件夹名 */
 
readFileToArr(urlsFile, function (arr) {
    var request = require('request');
    var myJson = {
        "siteUrl": "http://www.zer02.fun",
        "urlList": arr
    };
    
    request({
        url: 'https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=' + 'afd15a5727aa4c4f98ab1caa4ec8d715',
        method: "POST",
        json: true,   // <--Very important!!!
        body: myJson
    }, function (error, response, body) {
        console.log(body);
    });
});

var fs = require('fs');
var request = require('request');
const cheerio = require('cheerio');
 
request('https://www.zer02.fun/Bing/sitemap.xml', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html, {
            xmlMode: true
        });
 
        textFile = 'myLink.txt';
        fs.open(textFile, 'wx', (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.error('myfile already exists');
                    
                    fs.unlinkSync(textFile);  // Remove file
                }
            }
 
        });
 
        const nodes = $('loc');
        var arr = [];
        
        for (i = 0; i < nodes.length; i++) {
            arr[i] = nodes[i].firstChild.data;
 
            fs.appendFile(textFile, arr[i] + '\r\n', function (err) {
                if (err) {
                    console.error('One line converted failed.'); // append failed
                } else {
                    // console.error('One line converted done!');
                }                
            })
        }
 
        console.error('Converted done!');
    }
});