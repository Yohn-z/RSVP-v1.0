//这里占有一个新线程，向主线程发送消息
postMessage('hello');


//实现之前的一个实例，看是否阻塞
setInterval(function () {
    /*if(editor.currentNode !=null){
        console.log(editor.currentNode);
    }*/
console.log("111");
}, 2000);
/*setInterval(function () { console.log('end 1'); }, 2000);*/
onmessage = function(event) {
    console.log(event.data);
};
console.log('end');