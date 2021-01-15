var express = require("express");

var app = express();


// ejsをビューに使う為の設定
app.set("view engine", "ejs");


// http://localhost:8080/にアクセスしたときの処理
app.get('/', function(req, res){
// HTMLに埋め込むメッセージ
res.render("main", {hello:"hello world"});
});


app.listen(8080, () => console.log('asscess -> http://localhost:8080/'))