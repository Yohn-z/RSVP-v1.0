//这里创建一个webworker就是开一个新的线程

console.log(editor.currentNode);

var worker=new Worker('js/Sthread.js');//创建子线程
//这里接收新的线程传来的data
worker.onmessage = function(event) {
    console.log(event.data);
};
//这个将会触发向子进程的请求
worker.postMessage(editor.currentNode);

//构造一个无限循环
setTimeout(function () {  }, 1000);该定时器不会阻塞线程的交互