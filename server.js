//express,ejsモジュールのロード．expressはインスタンス化も行う
var express = require('express');
var app = express();
require('ejs');

// ビューエンジンにEJSを指定
app.set('view engine', 'ejs');
//8000portでlisten()
var server = app.listen(8000, () => console.log('Node.js is listening to PORT -> '+server.address().port))

app.get('/map', (req, res)=>{
    console.log('Request received :map page:');
    res.render('./map.ejs',{
        title:'ルート検索',
        initStart:'東京都江東区豊洲3-7-5',
        initGoal:'埼玉県さいたま市見沼区大字深作307番地'
    });
});

