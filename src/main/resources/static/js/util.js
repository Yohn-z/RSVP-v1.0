var Util = {};
Util.getRootPath = function() {
	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName, 7);
	var localhostPath = curWwwPath.substring(0, pos);
    var projectName = pathName
        .substring(0, pathName.substr(1).indexOf('/') + 2);
    return localhostPath + projectName;
};
//服务主路径
//十进制转换二进制
Util.tenToTwo=function(num,Bits){
    var resArry = [];
    var xresArry = [];
    i=0;
    for(;num>0;){
        resArry.push(num % 2);
        num=parseInt(num/2);
        i++;
    }
    for(j=i-1;j>=0;j--)
        xresArry.push(resArry[j]);
    if (Bits < xresArry.length) {
        console.log("位数小于二进制位数")
    }
    if (Bits) {
        for(var r = xresArry.length; r < Bits; r++) {
            xresArry.unshift(0);
        }
    }

    return xresArry.join().replace(/,/g, '');

},
//将十进制的ip地址转换为二进制
    Util.ipTo2=function(ip){
    var ips = ip.split(".");
    var ip_2 = "";
    for(let i=0;i<ips.length;i++){
        let two = Util.tenToTwo(ips[i],8);
        ip_2 += two;
    }
    return ip_2;
},
//判断指定两个ip地址是否处于一个网段
    Util.checkSameNet=function(ip1,ipm1,ip2,ipm2){
    let a1 = Util.ipTo2(ip1);
    let a2 = Util.ipTo2(ipm1);
    let b1 = Util.ipTo2(ip2);
    let b2 = Util.ipTo2(ipm2);
    let y1 = Util.yu(a1,a2);
    let y2 = Util.yu(b1,b2);
    if(y1 == y2){
        return true
    }
    return false;
},

//输入两串二进制ip,计算与
    Util.yu=function (ip1,ip2) {

    let ip1s = ip1.split('');
    let ip2s = ip2.split('');
    let yu =[];
    if(ip1s.length = ip2s.length){
        for(let i=0;i<ip1s.length;i++){
            let y = ip1s[i]&ip2s[i];
            yu.push(y);
        }
    }
    return yu.join().replace(/,/g, '');

}


Util.cNetByIpandMask = function(ip,mask){
    let ips = ip.split(".");
    let masks = mask.split(".");
    let nums = "";
    let ip2 = [];
    let mask2=[];
    let numi =0;
    let netip = "";
    for(let i=0;i<ips.length;i++){
        let two = Util.tenToTwo(ips[i],8);
        ip2.push(two);
    }
    for(let j=0;j<masks.length;j++){
        let two = Util.tenToTwo(masks[j],8);
        mask2.push(two);
        nums+=two;
    }
    for(let s=0;s<4;s++){
        let S = Util.yu(ip2[s],mask2[s]);
        let tenS = parseInt(S,2);
        if(netip == ""){
            netip += tenS;
        }else {
            netip = netip+"."+tenS;
        }

    }
    var num = nums.split('');
    for(let k=0;k<num.length;k++){
        if(num[k] == '1'){
            numi++;
        }

    }

    return {
        netip : netip,
        num : numi
    }


};
var context = Util.getRootPath();
console.log(context);
