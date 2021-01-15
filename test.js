function hello(){
    console.log("hello");
}
function calc(s1,s2){return s2*100/s1}
function engel(){
    s1=prompt("消費支出?","")*1
    s2=prompt("食糧費?","")*1
    x1=calc(s1,s2)
    alert("エンゲル係数は"+Math.floor(x1))
}
