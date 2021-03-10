//express，fsモジュールのロード．expressはインスタンス化も行う
var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var app = express();
var like;

// ビューエンジンにEJSを指定
app.set('view engine', 'ejs');
app.use(express.static('statics'));
//google api key
var ApiKey;
var GoogleMapCode;
//8000portでlisten()
var server = app.listen(8000, () => console.log('Node.js is listening to PORT -> '+server.address().port))
if( process.argv.length==3){
    ApiKey=process.argv[2];
    console.log('api key :'+process.argv[2]);
    GoogleMapCode="https://maps.googleapis.com/maps/api/js?key="+ApiKey+"&callback=initMap"
}

try{
    like = fs.readFileSync('./statics/data.txt','utf-8');
}catch(err){
    like = 0;
}

app.get('/',(req,res)=>{
    console.log('Request received.:top page:')
    var msg = 'トップページ';
    res.render('index.ejs',
        {
            title:'Index',
            content:msg,
            link:{href:'/map', text:'ルート検索に移動'}
        });
});

app.get('/map', (req, res)=>{
    console.log('Request received.:map page:');
    //res.sendFile(__dirname+'/statics/mapGoogleSample.html');
    res.render('./mapGoogleSample.ejs',{like:like});
});

app.post('/like',(req, res)=>{
    like++;
    fs.writeFileSync('./statics/data.txt',String(like));
    res.render('./main.ejs',{like:like});
})
app.post('/Do',(req, res)=>{
    res.sendFile(__dirname+'/statics/maptest.html');
    //res.render('./main.ejs',{like:like});
})
