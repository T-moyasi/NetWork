function hello(){
    console.log("hello");
}
function calc(s1,s2){return s2*s1}
function callFunctionTest(){
    s1=prompt("数字A:","")*1
    s2=prompt("数字B:","")*1
    x1=calc(s1,s2)
    alert("(整数切り上げ)A*B="+Math.floor(x1))
}
