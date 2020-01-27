/*
* 对Jtopo的二次开发，采用ES6语法
* 作者：张禹鸿
* 时间：2018年1月
*
* */


class networkPanel{
    constructor(mainControlDiv){
        this.props = {
            "SW": [
                {"title": "介绍","text":"交换机（Switch）意为“开关”是一种用于电（光）信号转发的网络设备。它可以为接入交换机的任意两个网络节点提供独享的电信号通路。最常见的交换机是以太网交换机。其他常见的还有电话语音交换机、光纤交换机等。"},
                {"title": "端口状况"},
                {"title": "VLAN DataBase"},
                {"title": "交换机属性"}
            ],
            "FW": [
                {"title": "介绍","text":"防火墙介绍"},
                {"title": "端口状况"},
                {"title": "防火墙出入规则集"}
                ],
            "RT": [
                {"title": "介绍","text":"\n" +
                "路由器（Router），是连接因特网中各局域网、广域网的设备，它会根据信道的情况自动选择和设定路由，以最佳路径，按前后顺序发送信号。 路由器是互联网络的枢纽，\"交通警察\"。目前路由器已经广泛应用于各行各业，各种不同档次的产品已成为实现各种骨干网内部连接、骨干网间互联和骨干网与互联网互联互通业务的主力军。路由和交换机之间的主要区别就是交换机发生在OSI参考模型第二层（数据链路层），而路由发生在第三层，即网络层。这一区别决定了路由和交换机在移动信息的过程中需使用不同的控制信息，所以说两者实现各自功能的方式是不同的。\n" +
                "路由器（Router）又称网关设备（Gateway）是用于连接多个逻辑上分开的网络，所谓逻辑网络是代表一个单独的网络或者一个子网。当数据从一个子网传输到另一个子网时，可通过路由器的路由功能来完成。因此，路由器具有判断网络地址和选择IP路径的功能，它能在多网络互联环境中，建立灵活的连接，可用完全不同的数据分组和介质访问方法连接各种子网，路由器只接受源站或其他路由器的信息，属网络层的一种互联设备。\n"},
                {"title": "端口状况"},
                {"title": "路由表"},
                {"title": "VLAN DataBase"},
                {"title": "路由器属性"}
            ],
            "RTA": [
                {"title": "介绍","text":"路由器（Router），是连接因特网中各局域网、广域网的设备，它会根据信道的情况自动选择和设定路由，以最佳路径，按前后顺序发送信号。"},
                {"title": "端口状况"},
                {"title": "路由表"},
                {"title": "VLAN DataBase"},
                {"title": "路由器属性"}
            ],
            "VMH": [
                {"title": "介绍","text":"主机是指计算机除去输入输出设备以外的主要机体部分。也是用于放置主板及其他主要部件的控制箱体（容器Mainframe）。通常包括 CPU、内存、硬盘、光驱、电源、以及其他输入输出控制器和接口。"},
                {"title": "端口状况"},
                {"title": "虚拟机属性"}
            ]
        };
        this.control = $(mainControlDiv);
        //过渡窗口
        this.loadingWin = "";

        this.flag = {
            RF : 1,
            SF : 1,
            HF : 1
        }
    }
    initPanel(){
        let own = this;

        let color;
        let oColor=editor.panColor;
        oColor.onchange=function () {
            color=this.value;
        }
        $("#number1").onchange=function () {
            editor.panLineWidth = $("#number1").val();
        }




        layer.config({
            skin: 'demo-class'//自定义样式demo-class
        })

        $('#contextBody').panel({

            headerCls:'mybar',
            tools:[{
                iconCls:'icon-machlect',

                handler:function(){

                    if(this.style.backgroundColor == "darkgray"){
                        editor.scene.mode = "normal";
                        $(this).css("background-color","#eee");
                        $(this).css("border-radius","3px");
                        $(this).css("border","1px solid #eee");


                    }else{
                        $(this).css("background-color","darkgray");
                        $(this).css("border-radius","3px");
                        $(this).css("border","1px solid #000");
                        editor.scene.mode = "select";
                        $(".icon-edit").css("background-color","#eee");
                        $(".icon-edit").css("border-radius","3px");
                        $(".icon-edit").css("border","1px solid #eee");
                        $(".icon-pan").css("background-color","#eee");
                        $(".icon-pan").css("border-radius","3px");
                        $(".icon-pan").css("border","1px solid #eee");
                    }
                }
            }, //对操作面板的箭头图标的定义
                {
                    iconCls:'icon-edit',
                    handler:function(){

                        if(this.style.backgroundColor == "darkgray"){
                            editor.scene.mode = "normal";
                            $(this).css("background-color","#eee");
                            $(this).css("border-radius","3px");
                            $(this).css("border","1px solid #eee");

                        }else{
                            $(this).css("background-color","darkgray");
                            $(this).css("border-radius","3px");
                            $(this).css("border","1px solid #000");
                            editor.scene.mode = "edit";
                            $(".icon-machlect").css("background-color","#eee");
                            $(".icon-machlect").css("border-radius","3px");
                            $(".icon-machlect").css("border","1px solid #eee");
                            $(".icon-pan").css("background-color","#eee");
                            $(".icon-pan").css("border-radius","3px");
                            $(".icon-pan").css("border","1px solid #eee");
                        }
                    }
                },{
                    iconCls:'icon-pan',
                    handler:function(){

                        if(this.style.backgroundColor == "darkgray"){
                            editor.scene.mode = "normal";
                            editor.stage.wheelZoom = 0.95;
                            $(this).css("background-color","#eee");
                            $(this).css("border-radius","3px");
                            $(this).css("border","1px solid #eee");
                            editor.scene.background = null;
                            $("#contextBody").unbind('mousemove');
                            $("#contextBody").unbind('mouseup');
                            $("#contextBody").unbind('mousedown');


                        }else{
                            editor.scene.mode = "default";
                            editor.stage.wheelZoom = null;
                            console.log("+")

                            $(this).css("background-color","darkgray");
                            $(this).css("border-radius","3px");
                            $(this).css("border","1px solid #000");
                            $(".icon-machlect").css("background-color","#eee");
                            $(".icon-machlect").css("border-radius","3px");
                            $(".icon-machlect").css("border","1px solid #eee");
                            $(".icon-edit").css("background-color","#eee");
                            $(".icon-edit").css("border-radius","3px");
                            $(".icon-edit").css("border","1px solid #eee");

                            if(editor.scene.mode = "default"){
                                var offCanvas=document.createElement('canvas');
                                offCanvas.id = "canvasid";

                                var canvas = document.getElementById("drawCanvas");

                                var ctx = canvas.getContext("2d");
                                /*editor.scene.mode = "default"*/
                                /*  var  offCanvas = document.createElement("canvas");*/
                                offCanvas.width=canvas.width;
                                offCanvas.height=canvas.height;
                                /*console.log("("+offCanvas.width+","+offCanvas.height+")");*/

                                let gd=offCanvas.getContext('2d');  //图形上下文——绘图接口

                                let lastX,lastY;
                                $("#contextBody").on('mousedown',offCanvas,function(ev){
                                        /* console.log("("+ev.offsetX+","+ev.offsetY+")");*/
                                        lastX=ev.offsetX;
                                        lastY=ev.offsetY;
                                        $("#contextBody").on('mousemove',offCanvas, function(ev) {
                                            gd.beginPath();//清除之前所有的路径

                                            gd.moveTo(lastX,lastY);
                                            gd.lineTo(ev.offsetX,ev.offsetY);

                                            /*console.log("("+ev.offsetX+","+ev.offsetY+")");*/
                                            lastX=ev.offsetX;
                                            lastY=ev.offsetY;
                                            gd.lineWidth = editor.panLineWidth;
                                            gd.strokeStyle=color;//用获取到的颜色作为绘制颜色
                                            gd.stroke();

                                        });
                                        $("#contextBody").on('mouseup',offCanvas, function(ev) {
                                            /*offCanvas.onmousemove=null;
                                            oV.onmouseup=null;*/

                                            $(this).unbind('mousemove');
                                            $(this).unbind('mouseup');
                                            editor.scene.background = offCanvas;

                                        });

                                    }
                                );


                            }
                        }
                    }
                },{
                    iconCls:'icon-eye',
                    handler:function(){

                        if(this.style.backgroundColor == "darkgray"){
                            editor.config.eagleEyeVsibleDefault = false;
                            editor.stage.eagleEye.visible = false;
                            $(this).css("background-color","#eee");
                            $(this).css("border-radius","3px");
                            $(this).css("border","1px solid #eee");

                        }else{
                            $(this).css("background-color","darkgray");
                            $(this).css("border-radius","3px");
                            $(this).css("border","1px solid #000");
                            editor.scene.eagleEyeVsibleDefault = true;
                            editor.stage.eagleEye.visible = true;
                        }
                    }
                },//对操作面板的箭头图标的定义.icon-netline
                {
                    iconCls:'icon-arrow',
                    handler:function(){

                        if(this.style.backgroundColor == "darkgray"){
                            editor.config.arrowsRadius = null;
                            $(this).css("background-color","#eee");
                            $(this).css("border-radius","3px");
                            $(this).css("border","1px solid #eee");

                        }else{
                            $(this).css("background-color","darkgray");
                            $(this).css("border-radius","3px");
                            $(this).css("border","1px solid #000");
                            editor.config.arrowsRadius = 5;
                        }
                    }
                },//对操作面板的箭头图标的定义.icon-netline
                {
                    iconCls:'icon-netline',
                    handler:function(){

                        if(this.style.backgroundColor == "darkgray"){
                            $(".mapContext").addClass("mapContext1");
                            $(".mapContext").removeClass("mapContext");
                            $(this).css("background-color","#eee");
                            $(this).css("border-radius","3px");
                            $(this).css("border","1px solid #eee");

                        }else{
                            $(".mapContext1").addClass("mapContext");
                            $(".mapContext1").removeClass("mapContext1");
                            $(this).css("background-color","darkgray");
                            $(this).css("border-radius","3px");
                            $(this).css("border","1px solid #000");
                        }
                    }
                },{
                    iconCls:'icon-showe',
                    handler:function(){

                        if(this.style.backgroundColor == "darkgray"){
                            editor.utils.unshowethernet();
                            $(this).css("background-color","#eee");
                            $(this).css("border-radius","3px");
                            $(this).css("border","1px solid #eee");

                        }else{
                            editor.utils.showethernet();
                            $(this).css("background-color","darkgray");
                            $(this).css("border-radius","3px");
                            $(this).css("border","1px solid #000");
                        }
                    }
                }]
        });

        $(".icon-showe").attr("title","端口名");
        $(".icon-netline").attr("title","显示网格");
        $(".icon-arrow").attr("title","开启连线箭头");
        $(".icon-eye").attr("title","鹰眼");
        $(".icon-edit").attr("title","编辑模式");
        $(".icon-machlect").attr("title","框选模式");
        $(".icon-pan").attr("title","铅笔绘图");

        $('#rightBody').panel({
            headerCls:'mybar',
        });
        $('#leftContent').panel({
            /*title:'My Panel',*/
            headerCls:'mybar',
            /*tools:[{
                iconCls:'icon-save',
                handler:function(){alert('save')}
            }]*/
        });

        $(document).on("contextmenu",function(e){
            return false;
        });

        $("#simpleLine").click(function(){
            if(this.style.backgroundColor == "darkgray"){
                editor.lineType='';
                $(this).css("background-color","white");
            }else{
                $(this).css("background-color","darkgray");
                $("#crossLine").css("background-color","white");
                $("#DECLine").css("background-color","white");
                $("#lightline").css("background-color","white");
                $("#consoleLine").css("background-color","white");
                editor.lineType='line'
            }

        });
        $("#crossLine").click(function(){
            if(this.style.backgroundColor == "darkgray"){
                editor.lineType='';
                $(this).css("background-color","white");
            }else{
                $(this).css("background-color","darkgray");
                $("#DECLine").css("background-color","white");
                $("#simpleLine").css("background-color","white");
                $("#lightline").css("background-color","white");
                $("#consoleLine").css("background-color","white");
                editor.lineType='crossLine'
            }

        });
        $("#DECLine").click(function(){
            if(this.style.backgroundColor == "darkgray"){
                editor.lineType='';
                $(this).css("background-color","white");
            }else{
                $(this).css("background-color","darkgray");
                $("#crossLine").css("background-color","white");
                $("#simpleLine").css("background-color","white");
                $("#lightline").css("background-color","white");
                $("#consoleLine").css("background-color","white");
                editor.lineType='DECLine'
            }

        });

        $("#lightline").click(function(){
            if(this.style.backgroundColor == "darkgray"){
                editor.lineType='';
                $(this).css("background-color","white");
            }else{
                $(this).css("background-color","darkgray");
                $("#crossLine").css("background-color","white");
                $("#simpleLine").css("background-color","white");
                $("#DECLine").css("background-color","white");
                $("#consoleLine").css("background-color","white");
                editor.lineType='lightLine'
            }
        });
        $("#consoleLine").click(function(){
            if(this.style.backgroundColor == "darkgray"){
                editor.lineType='';
                $(this).css("background-color","white");
            }else{
                $(this).css("background-color","darkgray");
                $("#crossLine").css("background-color","white");
                $("#simpleLine").css("background-color","white");
                $("#DECLine").css("background-color","white");
                $("#lightline").css("background-color","white");
                editor.lineType='consoleLine'
            }
        });

        /* $("#foldLineH").click(function(){
             if(this.style.backgroundColor == "darkgray"){
                 editor.lineType='';
                 $(this).css("background-color","white");
             }else{
                 $(this).css("background-color","darkgray");
                 $("#simpleLine").css("background-color","white");
                 $("#foldLineV").css("background-color","white");
                 $("#flexLineH").css("background-color","white");
                 $("#flexLineV").css("background-color","white");
                 editor.lineType='foldLine';editor.config.direction='horizontal';
             }

         });
         $("#foldLineV").click(function(){
             if(this.style.backgroundColor == "darkgray"){
                 editor.lineType='';
                 $(this).css("background-color","white");
             }else{
                 $(this).css("background-color","darkgray");
                 $("#foldLineH").css("background-color","white");
                 $("#simpleLine").css("background-color","white");
                 $("#flexLineH").css("background-color","white");
                 $("#flexLineV").css("background-color","white");
                 editor.lineType='foldLine';editor.config.direction='vertical';
             }

         });
         $("#flexLineH").click(function(){
             if(this.style.backgroundColor == "darkgray"){
                 editor.lineType='';
                 $(this).css("background-color","white");
             }else{
                 $(this).css("background-color","darkgray");
                 $("#foldLineH").css("background-color","white");
                 $("#foldLineV").css("background-color","white");
                 $("#simpleLine").css("background-color","white");
                 $("#flexLineV").css("background-color","white");
                 editor.lineType='flexLine';editor.config.direction='horizontal';
             }

         });
         $("#flexLineV").click(function(){
             if(this.style.backgroundColor == "darkgray"){
                 editor.lineType='';
                 $(this).css("background-color","white");
             }else{
                 $(this).css("background-color","darkgray");
                 $("#foldLineH").css("background-color","white");
                 $("#foldLineV").css("background-color","white");
                 $("#flexLineH").css("background-color","white");
                 $("#simpleLine").css("background-color","white");
                 editor.lineType='flexLine';editor.config.direction='vertical';
             }

         });*/
        $("#inputtittle1").click(function () {
            $("#inputtittle2").val($(this).html());
            $("#inputtittle1").hide();
            $("#inputtittle2").show();
        })
        $("#inputtittle2").blur(function () {
            if($.trim($("#inputtittle2").val()) != ""){
                $("#inputtittle1").text($("#inputtittle2").val());
            }else{
                $("#inputtittle1").text("未命名文件");
            }

            $("#inputtittle2").hide();
            $("#inputtittle1").show();

        })


        var modes = jQuery("[divType='mode']");
        var modeLength = modes.length;

        for (var i = 0; i < modeLength; i++) {
            modes[i].gtype=modes[i].getAttribute("gtype");
            modes[i].datatype=modes[i].getAttribute("datatype");
            var text = $(modes[i]).find("span").eq(0).text();
            editor.drag(modes[i],document.getElementById('drawCanvas'),text);
        }

        //导入
        $("#import").click(function () {
            $("#importfile").click();
        })


        //下载
        $("#downfile").click(function () {
            var selected = $('#selectfile input:radio:checked').val();
            if(selected == 1){
                editor.utils.downPic();
            }else if(selected == 2){
                editor.utils.saveHandler();
            }else{
                alert("您还没有选择哦!");
            }

        })
    }
    showLoadingWindow(){
        this.loadingWin = layer.load(1, {
            shade: [0.1,'#fff'], //0.1透明度的白色背景
          /*  fixed: false,    //取消固定定位，因为固定定位是相对body的*/
            offset: ['400px', '750px']   //相对定位
        });
    };


    showHelpWindow(){
        layer.open({
            type: 2,
            title: '查看帮助',
            shadeClose: true,
            shade: 0.8,
            area: ['800px', '600px'],
            content:'./help' //iframe的url
        });
    };
    showCmdWindow(){
        layer.open({
            type: 2,
            title: 'Console',
            shadeClose: true,
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: ['893px', '600px'],
            content: './cmd'
        });
    };


    closeLoadingWindow(){
        //显示过渡窗口
        layer.close(this.loadingWin);
    };
    /**
     * 删除指定数据类型设备的属性面板
     */
    clearOldPanels(b) {
        var c = this, a = c.props, d = a[b];
        if (c.control) {
            if (d) {
                var i;
                //删除面板
                for (i = 0; i < d.length; i++) {
                    try {
                        c.control.accordion('remove', d[i]["title"]);
                        --i;
                    } catch (e) {
                    }
                }
            }
        }
    };

    /**
     * 创建属性面板
     */
    createNewPanels(b, templateid, moduleId,node) {
        if (!templateid) templateid = "";
        var c = this, a = c.props, d = a[b];
        var text = "暂无"

        if (d) {

            var i = 0;
            for (i = 0; i < d.length; i++) {
                text = "暂无"
                if(d[i]["title"] == "介绍"){
                   text = d[0]["text"];
                }else if(d[i]["title"] == "端口状况"){
                    text ="";
                    var list = [];
                    var cnode = editor.currentNode;
                    var cnodeC = editor.currentNode.config;
                    var moduleNum = cnodeC.moduleNum;
                    var portNum = cnodeC.portNum;
                    let module = new Array(moduleNum);
                    if(moduleNum>0 && portNum>0) {
                        for (var i = 0; i < moduleNum; i++) {
                            var num = "module" + i;
                            module[i] = cnode.config[num];
                            let m = module[i];

                            for (let j in m) {
                                let pa = new Object();
                                pa.name = m[j].name;
                                pa.IP_Address = m[j].IP_Address;
                                pa.SubNet_Mask = m[j].SubNet_Mask;
                                pa.Port_Status = m[j].Port_Status;
                                pa.Mac_Address = m[j].Mac_Address;
                                pa.type = m[j].type;
                                list.push(pa);
                            }
                        }
                    }

                    for(let i =0;i<list.length-1;i++){
                        for(let j = i;j<list.length;j++){
                            if(list[j].type>list[i].type){
                                let temp = new Object();
                                temp = list[i];
                                list[i] = list[j];
                                list[j] = temp;
                            }
                        }
                    }
                    text="<tr style='font-size:15px;padding-right: 20px'><td style='font-size:15px;font-weight: bold'>Port&nbsp;&nbsp;</td><td style='font-size:15px;font-weight: bold'>IP&nbsp;&nbsp;</td><td style='font-size:15px;font-weight: bold;margin-right:10px'>Status&nbsp;</td><td style='font-size:15px;font-weight: bold'>Mac&nbsp;&nbsp;</td></tr>";
                    for(let i =0;i<list.length;i++){
                        let pText = ""
                        if(list[i].IP_Address!='N/A' && list[i].SubNet_Mask !="N/A"){
                            let p = Util.cNetByIpandMask(list[i].IP_Address,list[i].SubNet_Mask);
                            pText = "/"+p.num+"  ";
                        }

                        let temptext = "<tr style='font-size:15px;padding-right:20px'><td style='margin-right: 50px'>"+list[i].name+"&nbsp;&nbsp;</td><td style=' margin-right: 5px'>"+list[i].IP_Address+""+pText+"&nbsp;&nbsp;</td><td style=' margin-right: 5px'>"+list[i].Port_Status+"</td><td style=' margin-right: 5px'>"+list[i].Mac_Address+"</td></tr>";
                        text+=temptext;
                    }


                   /*text = "<p>fathenernet0/1 192.168.1.1 255.255.255.0 on</p>"*/
                }else if(d[i]["title"] == "路由表"){
                    text="<tr style='font-size:15px;padding-right: 100px'><td style=' font-size:15px;margin-right: 5px;font-weight: bold'>NetWork&nbsp;&nbsp;</td><td style=' font-size:15px;margin-right: 5px;font-weight: bold'>Mask&nbsp;&nbsp;</td><td style=' font-size:15px;margin-right: 5px;font-weight: bold'>NextHop&nbsp;&nbsp;</td><td style=' font-size:15px;margin-right: 5px;font-weight: bold'>type&nbsp;&nbsp;</td></tr>";
                    let cstatic = editor.currentNode.config.Routing.static;
                    for(let i=0;i<cstatic.length;i++){

                        let temptext = "<tr style='font-size:15px;padding-right: 10px'><td style=' margin-right: 5px'>"+cstatic[i].NetWork+"&nbsp;&nbsp;</td><td style=' margin-right: 5px'>"+cstatic[i].Mask+"&nbsp;&nbsp;</td><td style=' margin-right: 5px'>"+cstatic[i].NextHop+"&nbsp;&nbsp;</td><td style=' margin-right: 5px'>"+cstatic[i].type+"&nbsp;&nbsp;</td></tr>";
                        text+=temptext;

                    }
                }else if(d[i]["title"] == "VLAN DataBase"){
                    var cvlan = editor.currentNode.config.vlanDatabse.vlan;
                    for(let i=0;i<cvlan.length;i++){
                        text="<tr style='font-size:15px;padding-right: 100px'><td style=' font-size:15px;margin-right: 5px;font-weight: bold'>No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td style=' font-size:15px;margin-right: 5px;font-weight: bold'>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>";
                        let temptext = "<tr style='font-size:15px;padding-right: 10px'><td style=' margin-right: 5px'>"+cvlan[i].No+"&nbsp;&nbsp;</td><td style=' margin-right: 5px'>"+cvlan[i].name+"&nbsp;&nbsp;</td></tr>";
                        text+=temptext;

                    }
                }else {

                }
                c.control.accordion('add', {
                    title: d[i]["title"],
                    content: text,
                    selected: false,
                });

            }
  
            c.control.accordion("select", 0);
        }
    };

    /*
    * 替换对应的拓扑图JSON数据结构
    * */
    replaceStage(url,templateId) {
        var own = this;
        let data = {
            "templateId":templateId
        }
        var content = JSON.stringify(data);
        $.ajax({
            url: url,
            async: true,
            type: "POST",
            dataType: "json",
            data: content,
            error: function () {
                own.closeLoadingWindow();
                alert("服务器异常，请稍后重试..");
            },
            success: function (response) {
                alert("success");
            }
        });

    };


    /**
     * 加载对应的拓扑图JSON数据结构
     */
    loadTopology(url,templateId) {
        var self = this;
        if(!url){
            url = './topology.json'
        }
        if (!templateId) {
            templateId = editor.templateId;
        }
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            data: {
                "id":templateId,
            },
            error: function () {
                self.closeLoadingWindow();
            },
            success: function (response) {
                console.log(response)
                /*response = JSON.parse(response);*/
                var err = response.errorInfo;
                // 错误处理
                if (err && err != "ok") {

                    if(err == "no"){
                        editor.init(templateId,"-1",response.name);
                    }
                } else {
                    var topologyJson = response.topologyJson;
                    editor.init(templateId,topologyJson,response.name);
                }
            }
        });
    };

    /**
     * 清空所有节点
     */
    deleteAllNodes(){
        var self = this;
        //询问框
        var msgcon = layer.msg('确定要清空当前拓扑图吗?', {
            time: 0 //不自动关闭
            ,btn: ['确认', '取消']
            ,yes: function(index){
                layer.close(msgcon);
                editor.stage.childs.forEach(function(s){
                    s.clear();
                });
                //连线重置
                editor.beginNode = null;
                editor.link = null;
    
            }
        });

    }

};

/**
 * 编辑器对象，原型继承属性面板对象,提供编辑器的主要功能
 */
class networkEditor extends networkPanel{
    constructor(mainControlDiv){
        super(mainControlDiv);
        //绘图参数
        this.config = {
            stageFrames : 500,
            //新建节点默认尺寸
            defaultWidth : 54,
            defaultHeight : 54,
            //滚轮缩放比例
            defaultScal : 0.95,
            ////是否显示鹰眼对象
            eagleEyeVsibleDefault : false,
            //连线颜色
            strokeColor : "black",
            //连线宽度
            lineWidth : 1,
            //二次折线尾端长度
            offsetGap : 40,
            //线条箭头半径
            arrowsRadius : null,
            //折线的方向
            direction : "horizontal",
            //节点文字颜色
            nodeFontColor : "black",
            //连线文字颜色
            lineFontColor : "black",
            //是否显示连线阴影
            showLineShadow : false,
            //节点旋转幅度
            rotateValue : 0.5,
            //节点缩放幅度
            nodeScale : 0.2,
            alpha : 1,
            containerAlpha : 0.4,
            nodeStrokeColor : "22,124,255",
            lineStrokeColor : "black",
            fillColor :"22,124,255",
            containerFillColor : "10,80,80",
            shadow : false,
            shadowColor : "rgba(0,0,0,0.5)",
            font : "12px Consolas",
            fontColor:"black",
            lineJoin : "lineJoin",
            borderColor:"10,10,100",
            borderRadius : 30,
            shadowOffsetX : 3,
            shadowOffsetY : 6
        };
        //布局参数
        this.layout = {
        };
        //记录当前鼠标位置
        this.tempX = 0;
        this.tempY = 0;

        //纪录节点最后一次移动的幅度
        this.lastMovedX = 0;
        this.lastMovedY = 0;
        // 当前模式
        this.stageMode = 'normal'
        //绘图区属性
        this.stage = null;
        this.scene = null;

        //连线类型
        this.lineType = "";
        //存储起始节点选择的端口名
        this.beginText = "";

        //业务数据
        this.currDeviceId = null;
        this.currDataType = null;
        this.modeIdIndex = 1;
        this.templateId = null;
        this.templateName = $("#inputtittle1");

        //当前选择的节点对象
        this.currentNode = null;

        this.beginNode = null;
        this.endNode = null;

        //节点邮件菜单DOM对象
        this.nodeMainMenu = $("#nodeMainMenu");
        //连线邮件菜单DOM
        this.lineMenu = $("#lineMenu");
        //全局菜单
        this.mainMenu = $("#mainMenu");
        //节点文字修改菜单
        this.nodeTextMenu = $("#nodeTextMenu");
        //布局管理菜单
        this.layoutMenu = $("#layoutMenu");
        //节点文字方向
        this.nodeTextPosMenu = $("#nodeTextPosMenu");
        // 设备节点文字编辑框
        this.deviceEditText = $("#deviceText");
        //节点分组菜单
        this.groupMangeMenu = $("#groupMangeMenu");
        //节点对齐菜单
        this.groupAlignMenu = $("#groupAlignMenu");
        this.alignGroup = $("#alignGroup");
        //容器管理菜单
        this.containerMangeMenu = $("#containerMangeMenu");
        this.ethernetMenu = $("#ethernet");
        //画笔颜色
        this.panColor = document.getElementById('color1');
        //画笔大小粗细；
        this.panLineWidth = 2;
        //是否显示参考线
        this.showRuleLine = true;
        //标尺线数组
        this.ruleLines = [];
        //控制起始节点端口
        this.linkbutton1 = false;
    }

    /**
     * 菜单初始化
     */
    initMenus(){
        var own = this;
        own.lineMenu.blur(function(){
            if(own.currentNode)
                own.currentNode.text = own.deviceEditText.hide().val();
            else
                own.deviceEditText.hide();
        });

        //右键菜单事件处理
        own.nodeMainMenu.on("click",function(e){
            //菜单文字
            var text = $.trim($(e.target).text());
            if(text == "删除节点Delete"){
                editor.utils.deleteSelectedNodes();
            }else if(text == "复制节点Shift+C"){
                own.utils.cloneSelectedNodes();
            }else if(text == "撤销Shift+Z"){
                own.utils.cancleNodeAction();
            }else if(text == "重做Shift+R"){
                own.utils.reMakeNodeAction();
            }else if("修改节点文字" == text){
                editor.utils.saveNodeInitState();
                //隐藏菜单显示文字输入框
                own.nodeTextMenu.hide();
                own.nodeMainMenu.hide();
                own.deviceEditText.css({
                    top: own.yInCanvas,
                    left: own.xInCanvas
                }).show();
                own.deviceEditText.val(own.currentNode.text);
                own.deviceEditText.focus();
                own.deviceEditText.select();
            }else{
                editor.utils.saveNodeInitState();
            }

            switch (text){
                case "放大Shift+":
                    own.utils.scalingBig();
                    own.utils.saveNodeNewState();
                    break;
                case "缩小Shift-":
                    own.utils.scalingSmall();
                    own.utils.saveNodeNewState();
                    break;
                case "顺时针旋转Shift+U":
                    own.utils.rotateAdd();
                    own.utils.saveNodeNewState();
                    break;
                case "逆时针旋转Shift+I":
                    own.utils.rotateSub();
                    own.utils.saveNodeNewState();
                    break;
                case "节点文字":
                    return;
                default :

            }

            //关闭菜单
            $(this).hide();
        });

        own.nodeMainMenu.on("mouseover",function(e){
            //隐藏第三级菜单
            own.nodeTextPosMenu.hide();
            //菜单文字
            var text = $.trim($(e.target).text());
            var menuX =  parseInt(this.style.left) + $(document.getElementById('changeNodeText')).width();
            //边界判断
            if(menuX + own.nodeTextMenu.width() * 2 >= own.stage.width){
                menuX -= (own.nodeTextMenu.width() + own.nodeMainMenu.width());
            }
            if("节点文字" == text){
                own.layoutMenu.hide();
                own.nodeTextMenu.css({
                    top: parseInt(this.style.top)+ $(document.getElementById('changeNodeText')).height(),
                    left: menuX
                }).show();
            }else if("应用布局" == text){
                own.nodeTextMenu.hide();
                own.layoutMenu.css({
                    top: parseInt(this.style.top),
                    left: menuX
                }).show();
            }else{
                own.nodeTextMenu.hide();
                own.layoutMenu.hide();
            }
        });

        own.nodeTextMenu.on("click", function (e) {
            //菜单文字
            var text = $.trim($(e.target).text());
            if("修改节点文字" == text){

                editor.utils.saveNodeInitState();
                //隐藏菜单显示文字输入框
                own.nodeTextMenu.hide();
                own.nodeMainMenu.hide();
                own.deviceEditText.css({
                    top: own.yInCanvas,
                    left: own.xInCanvas
                }).show();
                own.deviceEditText.val(own.currentNode.text);
                own.deviceEditText.focus();
                own.deviceEditText.select();
            }
        });


        //节点右键二级菜单
        own.nodeTextMenu.on("mouseover", function (e) {
            //菜单文字
            var text = $.trim($(e.target).text());
            if("调整节点文字位置" == text){
                //处于边界时三级菜单位置调整
                var menuX = parseInt(this.style.left) + $(document.getElementById('justfyNodeText')).width();
                if(parseInt(this.style.left) < parseInt(document.getElementById('nodeMainMenu').style.left)){
                    menuX = parseInt(this.style.left) - $(document.getElementById('justfyNodeText')).width();
                }
                own.nodeTextPosMenu.css({
                    top: parseInt(this.style.top) + $(document.getElementById('justfyNodeText')).height(),
                    left: menuX
                }).show();
            }else{
                own.nodeTextPosMenu.hide();
            }
        });

        //修改节点文字位置菜单
        own.nodeTextPosMenu.on("click", function (e) {
            //菜单文字
            var text = $.trim($(e.target).text());
            if(own.currentNode && own.currentNode instanceof JTopo.Node){
                own.utils.saveNodeInitState();
                switch (text){
                    case "顶部居左":
                        own.currentNode.textPosition = "Top_Left";
                        own.utils.saveNodeNewState();
                        break;
                    case "顶部居中":
                        own.currentNode.textPosition = "Top_Center";
                        own.utils.saveNodeNewState();
                        break;
                    case "顶部居右":
                        own.currentNode.textPosition = "Top_Right";
                        own.utils.saveNodeNewState();
                        break;
                    case "中间居左":
                        own.currentNode.textPosition = "Middle_Left";
                        own.utils.saveNodeNewState();
                        break;
                    case "居中":
                        own.currentNode.textPosition = "Middle_Center";
                        own.utils.saveNodeNewState();
                        break;
                    case "中间居右":
                        own.currentNode.textPosition = "Middle_Right";
                        own.utils.saveNodeNewState();
                        break;
                    case "底部居左":
                        own.currentNode.textPosition = "Bottom_Left";
                        own.utils.saveNodeNewState();
                        break;
                    case "底部居中":
                        own.currentNode.textPosition = "Bottom_Center";
                        own.utils.saveNodeNewState();
                        break;
                    case "底部居右":
                        own.currentNode.textPosition = "Bottom_Right";
                        own.utils.saveNodeNewState();
                        break;
                    default :
                }
                $("div[id$='Menu']").hide();
            }
        });
        //连线菜单
        own.lineMenu.on("click",function(e){
            //关闭菜单
            $(this).hide();
            var text = $.trim($(e.target).text());
            switch (text){
                case "添加描述":
                    editor.utils.addNodeText(this.style.left,this.style.top);
                    break;
                case "删除连线":
                    editor.utils.deleteLine()
                    break;
                default :
            }
        });

        //系统设置菜单
        own.mainMenu.on("click", function (e) {
            //关闭菜单
            $(this).hide();
            var text = $.trim($(e.target).text());
            if (text.indexOf("参考线") != -1) {
                if (editor.showRuleLine) {
                    editor.showRuleLine = false;
                    $("#ruleLineSpan").text("显示参考线");
                }
                else {
                    editor.showRuleLine = true;
                    $("#ruleLineSpan").text("隐藏参考线");
                }
            }
        });

        //节点分组菜单
        own.groupMangeMenu.on("click", function (e) {
            $(this).hide();
            var text = $.trim($(e.target).text());
            if(text == "新建分组"){
                own.utils.toMerge();
                editor.stage.paint();
            }
        });
        //对齐
        own.groupAlignMenu.on("click", function (e) {
            var currNode = own.currentNode;
            var selectedNodes =  own.utils.getSelectedNodes();
            if(!currNode || !selectedNodes || selectedNodes.length == 0) return;
            $(this).hide();
            var text = $.trim($(e.target).text());
            selectedNodes.forEach(function (n) {
                if(n.deviceId == currNode.deviceId) return true;
                if(text == "水平对齐"){
                    n.y = currNode.y;
                }else if(text == "垂直对齐"){
                    n.x = currNode.x;
                }else{

                }
            });
        });
        own.groupMangeMenu.on("mouseover", function (e) {
            var text = $.trim($(e.target).text());
            if(text == "对齐方式"){
                //节点对齐
                var menuX = parseInt(this.style.left) + $(document.getElementById('alignGroup')).width();
                if(menuX + own.alignGroup.width() * 2 >= own.stage.width){
                    menuX -= (own.alignGroup.width() + own.groupMangeMenu.width());
                }
                own.groupAlignMenu.css({
                    top: parseInt(this.style.top) + $(document.getElementById('alignGroup')).height(),
                    left: menuX
                }).show();
            }else{
                own.groupAlignMenu.hide();
            }
        });
        //容器管理菜单
        own.containerMangeMenu.on("click", function (e) {
            var cNode = editor.currentNode;
            if(!cNode instanceof JTopo.Container) return;
            $(this).hide();
            var text = $.trim($(e.target).text());
            if(text == "拆分"){
                own.utils.toSplit();
                own.utils.deleteNode(cNode);
            }
        });
        //端口菜单事件
        own.ethernetMenu.on("click", function (e) {
            //菜单文字
            var text = $.trim($(e.target).text());
            //当前节点
            var cNodeConfig = own.currentNode.config;
            //当前场景
            var Scene = own.scene;

            if(own.beginNode!=null && own.endNode != null && own.linkbutton1){
                var endNode = own.endNode;
                //判断两个节点是否有循环引用
                for(var el = 0; el < endNode.outLinks.length ; el++){
                    //存在循环引用，线条变红
                    if(endNode.outLinks[el].nodeZ == own.beginNode){
                        if(own.link)
                            Scene.remove(own.link);
                        own.beginNode = null;
                        own.linkbutton1 = false;
                        return;
                    }
                }

                //节点间是否有重复连线,即起点到终点有两条以上连线
               /* for(var el2 = 0; el2 < own.beginNode.outLinks.length ; el2++){
                    //起始节点已经有一条线指向目标节点
                    if(own.beginNode.outLinks[el2].nodeZ == endNode){
                        if(own.link)
                            Scene.remove(own.link);
                        own.beginNode = null;
                        own.linkbutton1 = false;
                        return;
                    }
                }


                //防火墙只能连接一个路由器
                if(own.beginNode.dataType == "FW"){
                    if(endNode && endNode.dataType != "VR"){
                        if(own.link)
                            Scene.remove(own.link);
                        own.beginNode = null;
                        own.linkbutton1 = false;
                        return;
                    }else{//只能连接一个VR
                        if(own.beginNode.outLinks.length > 0){
                            if(own.link)
                                Scene.remove(own.link);
                            own.beginNode = null;
                            own.linkbutton1 = false;
                            return;
                        }
                    }
                }
         */
                var l;
                if(own.lineType == "line"){
                    l = new JTopo.Link(own.beginNode, endNode);
                    l.lineType = "line";
                }else if(own.lineType == "crossLine"){
                    l = new JTopo.Link(own.beginNode, endNode);
                    l.dashedPattern = 5;
                    l.lineType = "crossLine";
                }else if(own.lineType == "DECLine"){
                    l = new JTopo.DECLink(own.beginNode, endNode);

                    l.lineType = "DECLine";
                }else if(own.lineType == "foldLine"){
                    l = new JTopo.FoldLink(own.beginNode, endNode);
                    l.direction = own.config.direction;
                    l.bundleOffset = own.config.offsetGap;//折线拐角处的长度
                    l.lineType = "foldLine";
                }else if(own.lineType == "flexLine"){
                    l = new JTopo.FlexionalLink(own.beginNode, endNode);
                    l.direction = own.config.direction;
                    l.lineType = "flexLine";
                    l.offsetGap = own.config.offsetGap;
                }else if(own.lineType == "curveLine"){
                    l = new JTopo.CurveLink(own.beginNode, endNode);
                    l.lineType = "curveLine";
                }else if(own.lineType == "lightLine"){
                    l = new JTopo.Link(own.beginNode, endNode);
                    l.lineType = "lightLine";
                }else if(own.lineType == "consoleLine"){
                    l = new JTopo.CurveLink(own.beginNode, endNode, "");
                    l.lineWidth = 3; // 线宽
                    l.lineType = "consoleLine";
                }

                if(own.beginNode.elementType !="Node"){
                    l.addbeginnode(editor.scene);
                }
                if(own.endNode.elementType !="Node"){
                    l.addendnode(editor.scene);
                }


            /*    l.cnode.alarm = own.beginText;
                l.cnode.alarmColor = '0,255,0';
                l.cnode.alarmAlpha = 0.9;
                l.enode.alarm = text;
                l.enode.alarmColor = '0,255,0';
                l.enode.alarmAlpha = 0.9;
*/
                l.strokeColor = own.config.strokeColor;

                /*l.text = own.beginText+"->"+text;*/

                //连线所处拓扑层级
                l.topoLevel = "1";
                l.parentLevel = $("#parentLevel").val();
                l.fontColor = own.config.lineFontColor;
                /*//保存线条所连接的两个节点ID
                l.deviceA = own.beginNode.deviceId;
                l.deviceZ = endNode.deviceId;*/  //修改见下行开始，存贮
                l.deviceA = own.beginNode.deviceId+";"+own.beginText;
                l.deviceZ = endNode.deviceId+";"+text;

                //设置箭头的
     /*           if(own.lineType != "curveLine")
                    l.arrowsRadius = own.config.arrowsRadius;*/

                    l.arrowsRadius = own.config.arrowsRadius;
                l.lineWidth = own.config.lineWidth;

                if(own.lineType == "lightLine"){
                    l.strokeColor = "240,90,40";
                    l.lineWidth = 2;
                }
                if(own.lineType == "consoleLine"){
                    l.strokeColor = "0,237,255";
                    l.lineWidth = 3; // 线宽
                }
                if(own.lineType=="DECLine"){
                    l.strokeColor = "255,0,0";
                }

                Scene.add(l);

                //设置结束连线节点的状态
                editor.utils.setConnectutil(own.currentNode,own.beginNode.deviceId+";"+own.beginText+";"+text,text,"");//对方节点设备id;对方节点端口；我方节点端口
                /*own.beginNode.deviceId+";"+own.beginText+";"+text  对方节点设备id;对方节点端口；我方节点端口  */
                //设置开始节点状态
                editor.utils.setConnectutil(own.beginNode,own.endNode.deviceId+";"+text+";"+own.beginText,own.beginText,"");//对方节点设备id;对方节点端口；我方节点端口

                own.beginNode = null;   //连线开始节点置空
                own.endNode = null;     //连线结束节点置空
                own.beginText ="";
                own.linkbutton1 = false;    //连线控制回复初始
                Scene.remove(own.link);    //场景移除虚拟连线
                own.link = null;        //虚拟连线置空
            }

            //起始节点判断连接
            if(own.endNode == null && !own.linkbutton1 && editor.beginNode != null) {

                if (cNodeConfig.moduleNum > 0 && cNodeConfig.portNum > 0) {
                    let module = new Array(cNodeConfig.moduleNum);
                    for (var i = 0; i < cNodeConfig.moduleNum; i++) {
                        var num = "module" + i;
                        module[i] = cNodeConfig[num];
                        let m = module[i];
                        for (let j in m) {
                            if (m[j].name == text && m[j].connect == "") {
                              /*  m[j].connect = "ok";*/
                                /*own.beginNode = e.target;*/
                                if(own.lineType == "line"){
                                    own.link = new JTopo.Link(own.tempNodeA, own.tempNodeZ);
                                    own.link.lineType = "line";
                                }else if(own.lineType == "crossLine"){
                                    own.link = new JTopo.Link(own.tempNodeA, own.tempNodeZ);
                                    own.link.dashedPattern = 5;
                                    own.link.lineType = "crossLine";
                                }else if(own.lineType == "DECLine"){
                                    own.link = new JTopo.DECLink(own.tempNodeA, own.tempNodeZ);
                                    own.link.lineType = "DECLine";
                                }else if(own.lineType == "foldLine"){
                                    own.link = new JTopo.FoldLink(own.tempNodeA, own.tempNodeZ);
                                    own.link.lineType = "foldLine";
                                    own.link.direction =  own.config.direction;
                                }else if(own.lineType == "flexLine"){
                                    own.link = new JTopo.FlexionalLink(own.tempNodeA, own.tempNodeZ);
                                    own.link.direction =  own.config.direction;
                                    own.link.lineType = "flexLine";
                                }else if(own.lineType == "curveLine"){
                                    own.link = new JTopo.CurveLink(own.tempNodeA, own.tempNodeZ);
                                    own.link.lineType = "curveLine";
                                }else if(own.lineType == "lightLine"){
                                    own.link = new JTopo.Link(own.tempNodeA, own.tempNodeZ);
                                    own.link.lineType = "lightLine";
                                }else if(own.lineType == "consoleLine"){
                                    own.link = new JTopo.Link(own.tempNodeA, own.tempNodeZ);
                                    own.link.lineType = "consoleLine";
                                }
                                own.link.dashedPattern = 4;
                                own.link.lineWidth = own.config.lineWidth;
                                own.link.shadow = own.config.showLineShadow;
                                own.link.strokeColor =  JTopo.util.randomColor();
                                Scene.add(own.link);

                                /*if(own.beginText == ""){
                                    this.remove(own.link);
                                }*/

                                own.tempNodeA.setLocation(own.tempX, own.tempY);
                                own.tempNodeZ.setLocation(own.tempX, own.tempY);




                                own.beginText = text;
                                own.linkbutton1 = true;
                            }
                        }
                        /*console.log(own.ethernetMenu.html());*/
                    }
                } else if (cNodeConfig.portNum > 0) {
                    for (let j in cNodeConfig) {
                        if (cNodeConfig[j].type) {
                           /* cNodeConfig[j].connect = "ok";*/
                            own.linkbutton1 = true;
                        }
                    }
                }else{
                    own.linkbutton1 = false;
                }
            }
            own.ethernetMenu.hide();
            own.ethernetMenu.empty();


        });

        //容器管理菜单
        own.layoutMenu.on("click", function (e) {
            editor.currentNode.layout = {};
            $("div[id$='Menu']").hide();
            var text = $.trim($(e.target).text());
            if(text == "取消布局"){
                editor.currentNode.layout.on = false;
            }else if(text == "分组布局"){
                editor.currentNode.layout.on = true;
                editor.currentNode.layout.type = "auto";
            }else if(text == "树形布局"){
                editor.currentNode.layout.on = true;
                editor.currentNode.layout.type = "tree";
                editor.currentNode.layout.direction = "bottom";
                editor.currentNode.layout.width = 80;
                editor.currentNode.layout.height = 100;
                JTopo.layout.layoutNode(own.scene, own.currentNode, true);
            }else if(text == "圆形布局"){
                editor.currentNode.layout.on = true;
                editor.currentNode.layout.type = "circle";
                editor.currentNode.layout.radius = 200;
                JTopo.layout.layoutNode(own.scene, own.currentNode, true);
            }
        });


    };



    /**
     * 编辑器初始化方法,根据请求返回结果加载空白的或者指定结构的拓扑编辑器
     */
    init(templateId,stageJson,templateName) {
        console.log(stageJson);
        if(!stageJson){
            alert("加载拓扑编辑器失败!");
            return;
        }
        this.templateId = templateId;
        this.templateName.html(templateName);
        //创建JTOP舞台屏幕对象
        var canvas = document.getElementById('drawCanvas');
        canvas.width = $("#contextBody").width();
        canvas.height = $("#contextBody").height();
        //加载空白的编辑器
        if(stageJson == "-1"){
            this.stage = new JTopo.Stage(canvas);
            this.stage.topoLevel = 1;
            this.stage.parentLevel = 0;

            this.modeIdIndex = 1;
            this.scene=  new JTopo.Scene(this.stage);
            this.scene.totalLevel = 1;
            this.scene.topoLevel = 1;
            this.scene.parentLevel = 0;
        }else{
            this.stage = JTopo.createStageFromJson(stageJson, canvas);
            this.scene = this.stage.childs[0];
        }
        //滚轮缩放
        this.stage.frames = this.config.stageFrames;
        this.stage.wheelZoom = this.config.defaultScal;
        this.stage.eagleEye.visible = this.config.eagleEyeVsibleDefault;

        /*舞台模式，不同模式下有不同的表现:
            设置舞台模式，例如：stage.mode = "drag";
            normal[默认]：可以点击选中单个节点（按住Ctrl可以选中多个），点中空白处可以拖拽整个画面
            drag: 该模式下不可以选择节点，只能拖拽整个画面
            select: 可以框选多个节点、可以点击单个节点
            edit: 在默认基础上增加了：选中节点时可以通过6个控制点来调整节点的宽、高*/
        this.scene.mode = "normal";
        //背景由样式指定
        /*this.scene.background = backImg;*/

        //用来连线的两个节点
        this.tempNodeA = new JTopo.Node('tempA');
        this.tempNodeA.setSize(1, 1);
        this.tempNodeZ = new JTopo.Node('tempZ');
        this.tempNodeZ.setSize(1, 1);
        /*this.beginNode = null;*/  /*移动到上面*/
        /*beginNode = null;*/
        this.link = null;
        var own = this;
        //初始化面板
        this.initPanel();
        //初始化菜单
        this.initMenus();

        //双击编辑文字
        this.scene.dbclick(function(e){
            if(e.target)
                own.currentNode = e.target;
            else
                return;
            if(e.target != null && e.target instanceof JTopo.Node){
                var nType = e.target.dataType;
                //非设备节点双击不刷新面板
                if(nType == "CL" || nType == "HO"){
                    return;
                }
                //按下左键加载属性面板
                var deviceTemplateId = e.target.templateId;
                if(e.target.dataType == "FW"){
                    var fwLinks = e.target.outLinks.concat(e.target.inLinks);
                    fwLinks.forEach(function (l) {
                        if(l.nodeA.dataType == "VR"){
                            deviceTemplateId = l.nodeA.templateId;
                        }
                        if(l.nodeZ.dataType == "VR"){
                            deviceTemplateId = l.nodeZ.templateId;
                        }
                        return false;
                    });
                }
                if (own.currDeviceId) {
                    if (e.target.deviceId == own.currDeviceId && e.target.dataType== "TX") {
                        own.deviceEditText.css({
                            top: own.yInCanvas,
                            left: own.xInCanvas
                        }).show();
                        own.deviceEditText.attr('value', own.currentNode.text);
                        own.deviceEditText.focus();
                        own.deviceEditText.select();
                    } else {
                        own.clearOldPanels(own.currDataType);
                        own.createNewPanels(e.target.dataType, deviceTemplateId, e.target.deviceId, e.target);
                    }
                } else {
                    own.clearOldPanels(own.currDataType);
                    own.createNewPanels(e.target.dataType, deviceTemplateId, e.target.deviceId, e.target);
                }
                //更新当前选中状态的模型
                own.currDeviceId = e.target.deviceId;
                own.currDataType = e.target.dataType;
                //双击设置隐藏域的值
                $("#nodeModuleIdHidden").val(e.target.deviceId);
                $("#nodeEnvTemplateIdHidden").val(editor.templateId);
            }
        });
        //数去焦点,设置节点文字
        own.deviceEditText.blur(function(){
            if(own.currentNode){
                own.currentNode.text = own.deviceEditText.hide().val();
                own.utils.saveNodeNewState();
            } else
                own.deviceEditText.hide();
        });

        //清除起始节点不完整的拖放线
        this.scene.mousedown(function(e){
            if (own.link && !own.isSelectedMode && (e.target == null || e.target === own.beginNode || e.target === own.link)) {
                this.remove(own.link);
            }
        });

        //处理右键菜单，左键连线
        this.scene.mouseup(function(e){
            if(e.target)
                own.currentNode = e.target;
            if(e.target && e.target instanceof  JTopo.Node && e.target.layout && e.target.layout.on && e.target.layout.type && e.target.layout.type !="auto")
                JTopo.layout.layoutNode(this, e.target,true,e);


            var menuY =  e.layerY ? e.layerY : e.offsetY;
            var menuX =  e.layerX ? e.layerX : e.offsetX;
            //记录鼠标触发位置在canvas中的相对位置
            own.xInCanvas = menuX;
            own.yInCanvas = menuY;
            if (e.button == 2 ) {//右键菜单
                $("div[id$='Menu']").hide();
                own.ethernetMenu.hide();
                own.ethernetMenu.empty();
                if(e.target){
                    //处理节点右键菜单事件
                    if(e.target instanceof JTopo.Node){

                        if(e.target.elementType == "TextNode" || e.target.elementType == "EthernetNode"){
                            return;
                        }

                        var selectedNodes = own.utils.getSelectedNodes();
                        //如果是节点多选状态弹出分组菜单
                        if(selectedNodes && selectedNodes.length > 1){
                            //判断边界出是否能完整显示弹出菜单
                            if(menuX + own.groupMangeMenu.width() >= own.stage.width){
                                menuX -= own.groupMangeMenu.width();
                            }
                            if(menuY + own.groupMangeMenu.height() >= own.stage.height){
                                menuY -= own.groupMangeMenu.height();
                            }
                            own.groupMangeMenu.css({
                                top: menuY,
                                left: menuX
                            }).show();
                        }else{
                            //判断边界出是否能完整显示弹出菜单
                            if(menuX + own.nodeMainMenu.width() >= own.stage.width){
                                menuX -= own.nodeMainMenu.width();
                            }
                            if(menuY + own.nodeMainMenu.height() >= own.stage.height){
                                menuY -= own.nodeMainMenu.height();
                            }
                            own.nodeMainMenu.css({
                                top: menuY,
                                left: menuX
                            }).show();
                            if(e.target.elementType == "SwitchNode" || e.target.elementType == "RouterNode" ||e.target.elementType == "HostNode" ){
                                $("#cmd").show();
                            }else{
                                $("#cmd").hide();
                            }

                        }
                    }else if(e.target instanceof JTopo.Link){//连线右键菜单
                        if(e.target.lineType == "rule"){
                            editor.utils.hideRuleLines();//删除标尺线
                        }else{
                            own.lineMenu.css({
                                top: e.layerY ? e.layerY : e.offsetY,
                                left: e.layerX ? e.layerX : e.offsetX
                            }).show();
                        }
                    }else if(e.target instanceof JTopo.Container){//容器右键菜单
                        own.containerMangeMenu.css({
                            top: e.layerY ? e.layerY : e.offsetY,
                            left: e.layerX ? e.layerX : e.offsetX
                        }).show();
                    }
                }else{
                    //判断边界出是否能完整显示弹出菜单
                    if(menuX + own.mainMenu.width() >= own.stage.width){
                        menuX -= own.mainMenu.width();
                    }
                    if(menuY + own.mainMenu.height() >= own.stage.height){
                        menuY -= own.mainMenu.height();
                    }
                    own.mainMenu.css({
                        top: menuY,
                        left: menuX
                    }).show();
                }

            } else if (e.button == 1) {//中键

            } else if (e.button == 0) {//左键
                $("#ethernet").hide();
                own.ethernetMenu.empty();
                if(e.target != null && e.target instanceof JTopo.Node && !own.isSelectedMode){

                    if(own.lineType != ""){
                        /*--------------------------------------------------------------------------------------------------------*/
                        var moduleNum = e.target.config.moduleNum; //模块数
                        var portNum = e.target.config.portNum; //端口数
                        var module  = new Array(moduleNum); //存储网络设备模块数组
                        var c1 = "'#c5e7f6'";  //鼠标放在端口span上的颜色
                        var c2 = "''";
                        let modecss = "modeEthernet";//端口图片样式
                        own.ethernetMenu.empty();
                        if(moduleNum>0 && portNum>0){
                            for(var i = 0;i<moduleNum;i++){
                                var num = "module"+i;
                                module[i] = e.target.config[num];
                                let m = module[i];

                                for(let j in m){
                                    if(m[j].type == "f"){     //判断端口样式
                                        modecss = "modeEthernet";
                                    }else if(m[j].type == "c"){
                                        modecss = "modeConsole";
                                    }else if(m[j].type == "g"){
                                        modecss = "modeGEthernet";
                                    }else if(m[j].type == "s"){
                                        modecss = "modeSerial";
                                    }else if(m[j].type == "o"){
                                        modecss = "oPoint";
                                    }else{
                                        modecss = "";
                                    }
                                    if(m[j].connect == ""){
                                        own.ethernetMenu.append(   //添加子端口元素
                                            '<div class='+modecss+' onMouseMove="this.style.backgroundColor='+c1+'" onMouseOut="this.style.backgroundColor='+c2+'"><span class="menuSpan">'+m[j].name+'</span></div>'
                                        )
                                    }
                                }

                            }
                        }else if(portNum>0){
                            var ethernet = e.target.config;
                            for(let j in ethernet){
                                if(ethernet[j].type){
                                    if(ethernet[j].connect == ""){
                                        own.ethernetMenu.append(   //添加子端口元素
                                            '<div class='+modecss+' onMouseMove="this.style.backgroundColor='+c1+'" onMouseOut="this.style.backgroundColor='+c2+'"><span class="menuSpan">'+ethernet[j].name+'</span></div>'
                                        )
                                    }
                                }
                            }
                        }
                        /*--------------------------------------------------------------------------------------------------------*/
                    }

                    if(own.beginNode == null){
                      /*  if(!own.linkbutton1){*/
                            if(e.target instanceof JTopo.Node){
                                // var selectedNodes = own.utils.getSelectedNodes();
                                // //如果是节点多选状态弹出分组菜单
                                // if(selectedNodes && selectedNodes.length == 1){
                                    //判断边界出是否能完整显示弹出菜单
                                if(own.ethernetMenu.children().length>0){
                                    if(menuX + own.ethernetMenu.width() >= own.stage.width){
                                        menuX -= own.ethernetMenu.width();
                                    }
                                    if(menuY + own.ethernetMenu.height() >= own.stage.height){
                                        menuY -= own.ethernetMenu.height();
                                    }
                                    own.ethernetMenu.css({
                                        top: menuY,
                                        left: menuX
                                    }).show();
                                }

                            }
                        own.beginNode = e.target;
                         own.tempX = e.x;
                         own.tempY = e.y;

                    }else if(e.target && e.target instanceof JTopo.Node && own.beginNode !== e.target){//结束连线
                        if(own.linkbutton1){
                            if(e.target instanceof JTopo.Node){
                                // var selectedNodes = own.utils.getSelectedNodes();
                                // //如果是节点多选状态弹出分组菜单
                                // if(selectedNodes && selectedNodes.length == 1){
                                //判断边界出是否能完整显示弹出菜单
                                if(own.ethernetMenu.children().length>0){
                                    if(menuX + own.ethernetMenu.width() >= own.stage.width){
                                        menuX -= own.ethernetMenu.width();
                                    }
                                    if(menuY + own.ethernetMenu.height() >= own.stage.height){
                                        menuY -= own.ethernetMenu.height();
                                    }
                                    own.ethernetMenu.css({
                                        top: menuY,
                                        left: menuX
                                    }).show();
                                }

                            }
                      /*  }else{*/
                            own.endNode = e.target;


                        }
                    }else{
                        own.beginNode = null;
                        own.endNode = null;
                        own.linkbutton1 = false;
                    }
                }else{
                    if(own.link)
                        this.remove(own.link);
                    own.beginNode = null;
                    own.endNode = null;
                    own.linkbutton1 = false;
                }
            }
        });

        //动态更新连线坐标
        this.scene.mousemove(function(e){
            if(!own.isSelectedMode && own.beginNode)
                own.tempNodeZ.setLocation(e.x, e.y);
        });

        this.scene.mousedrag(function(e){
            if(!own.isSelectedMode && own.beginNode)
                own.tempNodeZ.setLocation(e.x, e.y);
        });

        //单击编辑器隐藏菜单
        this.stage.click(function(event){
            editor.utils.hideRuleLines();
            if(event.button == 0){
                // 关闭弹出菜单（div）
                $("div[id$='Menu']").hide();
            }
        });

        this.stage.mouseout(function(e){
            //清空标尺线
            editor.utils.hideRuleLines();
            //删掉节点带出来的连线
            /* if (own.link && !own.isSelectedMode && (e.target == null || e.target === own.beginNode || e.target === own.link)) {
                 own.scene.remove(own.link);
             }*/
        });

        //画布尺寸自适应
        this.stage.mouseover(function(e){
            if(editor.stage){
                var w = $("#contextBody").width(),wc = editor.stage.canvas.width,
                    h = $("#contextBody").height(),hc = editor.stage.canvas.height;
                if(w > wc){
                    editor.stage.canvas.width = $("#contextBody").width();
                }
                if(h > hc){
                    editor.stage.canvas.height = $("#contextBody").height();
                }
                editor.stage.paint();
            }
        });

        //按下ctrl进入多选模式，此时选择节点不能画线
        $(document).keydown(function (e) {
            if(e.shiftKey){//组合键模式
                switch (e.which){
                    //放大 ctrl+=
                    case  187:
                    case  61:
                        //单个节点可以撤销操作
                        if(editor.currentNode instanceof JTopo.Node){
                            //保存初始状态
                            editor.utils.saveNodeInitState();
                            editor.utils.scalingBig();
                            editor.utils.saveNodeNewState();
                        }else{
                            editor.utils.scalingBig();
                        }
                        //return false;
                        break;
                    //缩小 ctrl+-
                    case 189:
                    case  173:
                        if(editor.currentNode instanceof JTopo.Node){
                            //保存初始状态
                            editor.utils.saveNodeInitState();
                            editor.utils.scalingSmall();
                            editor.utils.saveNodeNewState();
                        }else{
                            editor.utils.scalingSmall();
                        }
                        //return false;
                        break;
                    case  70:
                        //ctrl+f 全屏显示
                        editor.utils.showInFullScreen(editor.stage.canvas,'RequestFullScreen');
                        //return false;
                        break;
                    case  72:
                        //h 帮助
                        editor.showHelpWindow();
                        //return false;
                        break;
                    case  71:
                        //ctrl+g 居中显示
                        editor.utils.showInCenter();
                        //return false;
                        break;
                    case  73:
                        //shif+I 逆时针旋转
                        if(editor.currentNode instanceof JTopo.Node){
                            editor.utils.saveNodeInitState();
                            editor.utils.rotateSub();
                            editor.utils.saveNodeNewState();
                        }
                        //return false;
                        break;
                    case  76:
                        //shift+L 参考线
                        editor.showRuleLine = !editor.showRuleLine;
                        //return false;
                        break;
                    case  67:
                        editor.utils.cloneSelectedNodes();
                        //return false;
                        break;
                    case  80:
                        //ctrl + p
                        editor.utils.showPic();
                        //return false;
                        break;
                    case  82:
                        //单个节点重做
                        if(editor.currentNode instanceof JTopo.Node){
                            editor.utils.reMakeNodeAction();
                        }
                        //return false;
                        break;
                    case  83:
                        //ctrl+s 保存
                        editor.utils.savetopo();
                        //return false;
                        break;
                    case  85:
                        //shif+U 顺时针旋转
                        if(editor.currentNode instanceof JTopo.Node){
                            editor.utils.saveNodeInitState();
                            editor.utils.rotateAdd();
                            editor.utils.saveNodeNewState();
                        }
                        //return false;
                        break;
                    case  87:
                        //return false;
                        break;
                    case  89:
                        //ctrl+y
                        editor.utils.clearAll();
                        //return false;
                        break;
                    case  90:
                        //单个节点撤销
                        if(editor.currentNode instanceof JTopo.Node){
                            editor.utils.cancleNodeAction();
                        }
                        //return false;
                        break;
                }
            }else if(e.which == 46){//单独按下delete
                editor.utils.deleteSelectedNodes();
                //return false;
            }else if(e.which == 17){//单独按下ctrl
                own.isSelectedMode = true;
                //return false;
            }
        });
        $(document).keyup(function (e) {
            if(e.which == 17){
                own.isSelectedMode = false;
                return false;
            }
        });
        //第一次进入拓扑编辑器,生成stage和scene对象
/*        if(stageJson == "-1"){
            editor.utils.saveTopo(false);
        }*/
        //编辑器初始化完毕关闭loading窗口
        this.closeLoadingWindow();
    }

    /**
     * 图元拖放功能实现
     */
    drag(modeDiv, drawArea, text) {
        if (!text) text = "";
        var own = this;
        //拖拽开始,携带必要的参数
        modeDiv.ondragstart = function (e) {
            e = e || window.event;
            var dragSrc = this;
            var backImg = $(dragSrc).find("img").eq(0).attr("src");
            backImg = backImg.substring(backImg.lastIndexOf('/') + 1);
            var datatype = $(this).attr("datatype");
            var type = $(this).attr("id");
            try {
                //IE只允许KEY为text和URL
                e.dataTransfer.setData('text', backImg + ";" + text + ";" + datatype+";"+type);
            } catch (ex) {
                console.log(ex);
            }
        };
        //阻止默认事件
        drawArea.ondragover = function (e) {
            e.preventDefault();
            return false;
        };
        //创建节点
        drawArea.ondrop = function (e) {
            e = e || window.event;
            var data = e.dataTransfer.getData("text");
            var type = e.dataTransfer.getData("type");
            /*console.log(type);*/
            var img, text,datatype,type;
            if (data) {
                var datas = data.split(";");
                if (datas && datas.length == 4) {
                    img = datas[0];
                    text = datas[1];
                    datatype = datas[2];
                    type = datas[3];
                    var node;
                    //根据类生成不同的节点
                    if(datatype == "RT"){
                        node = new JTopo.RouterNode();
                        node.config.hostName = "R"+own.flag.RF;
                        own.flag.RF++;
                    }
                    else if(datatype == "RTA"){
                        node = new JTopo.RouterNode();
                        node.config = new netConfig.router1Config();
                        node.config.hostName = "S"+own.flag.SF;
                        own.flag.SF++
                    }
                    else if(datatype == "SW"){
                        node = new JTopo.SwitchNode();
                        node.config.hostName = "S"+own.flag.SF;
                        own.flag.SF++
                    }
                    else if(datatype == "VMH"){
                        node = new JTopo.HostNode();
                        node.config.hostName = "H"+own.flag.HF;
                        own.flag.HF++;
                    }
                    else if(datatype == "TX"){
                        node = new JTopo.TextNode("请输入文字");
                    }
                    else{
                        node = new JTopo.Node();
                        if(datatype == "GH"){
                            node.textPosition = "Middle_Center";
                        }
                        node.config = new netConfig.graphConfig();
                    }

                    if(node.elementType == "HostNode" || node.elementType == "RouterNode" || node.elementType == "SwitchNode"){
                        let tNodeConfig = node.config;
                        if (tNodeConfig.moduleNum > 0 && tNodeConfig.portNum > 0) {
                            let module = new Array(tNodeConfig.moduleNum);
                            for (let k = 0; k < tNodeConfig.moduleNum; k++) {
                                let num = "module" + k;
                                module[k] = tNodeConfig[num];
                                let m = module[k];
                                for (let jk in m) {

                                    m[jk].Mac_Address = netConfig.uuid();
                                }
                            }
                        }
                    }



                    node.fontColor = own.config.nodeFontColor;
                    node.setBound((e.layerX ? e.layerX : e.offsetX) - own.scene.translateX - own.config.defaultWidth / 2, (e.layerY ? e.layerY : e.offsetY) - own.scene.translateY - own.config.defaultHeight / 2,own.config.defaultWidth,own.config.defaultHeight);
                    //设备图片
                    node.setImage('./icon/' + img);
                    /*node.setImage(img);*/
                    //var cuurId = "device" + (++own.modeIdIndex);
                    var cuurId = "" + new Date().getTime() * Math.random();
                    node.deviceId = cuurId;
                    node.dataType = datatype;
                    node.nodeImage = img;
                    ++own.modeIdIndex;
                    node.text = text;
                    node.layout = own.layout;
                    //节点所属层次
                    node.topoLevel = "1"/*parseInt($("#selectLevel").find("option:selected").val());*/
                    //节点所属父层次
                    node.parentLevel = $("#parentLevel").val();
                    //子网连接点的下一个层,默认为0
                    node.nextLevel = "0";
                    own.scene.add(node);

                    //加载属性面板
                     /*if(own.currDataType)*/
                     own.clearOldPanels(own.currDataType)
                     own.currDeviceId = cuurId;
                    own.currentNode = node;
                    own.currDataType = datatype;
                     own.createNewPanels(datatype,own.templateId,own.currentModeId);


                }
            }
            if (e.preventDefault()) {
                e.preventDefault();
            }
            if (e.stopPropagation()) {
                e.stopPropagation();
            }
        }
    }


}
//编辑器实例
var editor = new networkEditor('#mainControl');

setInterval(function () {
    editor.utils.refrashRip();

}, 10000);

//构造一个无限循环
//setTimeout(function () { while (true) { } }, 1000);该定时器不会阻塞线程的交互
//工具方法
editor.utils = {
    //展示端口
    showethernet(){
        editor.stage.childs.forEach(function(s){
            s.childs.forEach(function(n){
                if(n.elementType=="link"){
                    if(n.cnode){
                        n.cnode.alarm = n.deviceA.split(";")[1];
                        n.cnode.alarmColor = '255,125,0';
                        n.cnode.alarmAlpha = 0.9;
                    }
                    if(n.enode){
                        n.enode.alarm = n.deviceZ.split(";")[1];
                        n.enode.alarmColor = '255,125,0';
                        n.enode.alarmAlpha = 0.9;
                    }
                }
            });
        });
    },
    //不展示端口
    unshowethernet(){
        editor.stage.childs.forEach(function(s){
            s.childs.forEach(function(n){
                if(n.elementType=="link"){
                    if(n.cnode){
                        n.cnode.alarm = null;
                    }
                    if(n.enode){
                        n.enode.alarm = null;
                    }
                }
            });
        });
    },
    //ping测试闪烁路径
    refrash(linkstack1){
        for (let i=0;i<linkstack1.length;i++){
            linkstack1[i].strokeColor = '0,255,0'
            linkstack1[i].lineWidth = 2;

        }
        setTimeout(function () {
            for (let i=0;i<linkstack1.length;i++){
                linkstack1[i].strokeColor = '0,0,0'
                linkstack1[i].lineWidth = 1;
                if(linkstack1[i].lineType =="DECLine"){
                    linkstack1[i].strokeColor = '255,0,0'
                }

            }

        },1000);
        var interval2 = setInterval(function () {
            for (let i=0;i<linkstack1.length;i++){
                linkstack1[i].strokeColor = '0,255,0'
                linkstack1[i].lineWidth = 2;

            }
            setTimeout(function () {
                for (let i=0;i<linkstack1.length;i++){
                    linkstack1[i].strokeColor = '0,0,0'
                    linkstack1[i].lineWidth = 1;
                    if(linkstack1[i].lineType =="DECLine"){
                        linkstack1[i].strokeColor = '255,0,0'
                    }

                }

            },1000);

        },2000);

        setTimeout(function() {window.clearInterval(interval2);},10000);
    },

    //刷新rip
    refrashRip(){
        //获取所有路由器节点对象
            var rnodes = [];
            editor.stage.childs.forEach(function(s){
                s.childs.forEach(function(n){
                    if( n.elementType == "RouterNode" ){
                        if(n.config.Routing.RIP != []){
                            rnodes.push(n);
                        }

                    }
                });
            });
            for(let i=0;i<rnodes.length;i++){
                let cnode =  rnodes[i];
                let nodeConfig = cnode.config;
                let sta = nodeConfig.Routing.static;
                let rip = nodeConfig.Routing.RIP;
                //rip路由缓存记录
                let ripRouter = nodeConfig.Routing.static;
                //获取当前路由节点的动态和直连路由，并加入rip路由中
                /*for(let i=0;i<sta.length;i++){
                    if(sta[i].type == "R" || sta[i].type == "direct"){
                        ripRouter.push(sta[i]);
                    }
                }*/
                for(let i =0;i<sta.length;i++){
                    if(sta[i].type=="direct"){
                        for(let j = 0;j<rip.length;j++){
                            //循环周围路由器

                            if(sta[i].NetWork == rip[j].network_address){
                                let infos = sta[i].connect.split(";");
                                let tNode = editor.utils.getNodeByKey("deviceId",infos[0]);//下一个节点
                                if(tNode!=null && tNode.elementType == "RouterNode"){
                                    let tEthernet;
                                    let tConfig = tNode.config;
                                    /*获取下一跳地址*/
                                    let NextHop;
                                    if (tConfig.moduleNum > 0 && tConfig.portNum > 0) {
                                        let module = new Array(tConfig.moduleNum);
                                        for (let p = 0; p < tConfig.moduleNum; p++) {
                                            let num = "module" + p;
                                            module[p] = tConfig[num];
                                            let m = module[p];
                                            for (let v in m) {

                                                if (m[v].Port_Status =="on" & m[v].connect !=""& m[v].name == infos[1] ) {
                                                    NextHop = m[v].IP_Address;

                                                }
                                            }

                                        }
                                    }
                                    /*获取下一跳地址路由表*/
                                    let trip = tConfig.Routing.static;
                                    for(let a=0;a<trip.length;a++){
                                        if(trip[a].NetWork != sta[i].NetWork ){
                                            if(trip[a].type == "R" || trip[a].type == "direct"){
                                                let ripRouterj = {
                                                    NetWork : trip[a].NetWork,
                                                    Mask : sta[i].Mask,
                                                    NextHop : NextHop,
                                                    type : "R",
                                                    connect : sta[i].connect,
                                                    interface : sta[i].interface,
                                                    pre : "120",
                                                    dis : trip[a].dis+1
                                                }
                                                let flag = 0;
                                                for(let b=0;b<ripRouter.length;b++){
                                                   /* alert(ripRouter.length);*/
                                                    if(ripRouterj.NetWork == ripRouter[b].NetWork){
                                                        if(ripRouterj.dis<ripRouter[b].dis){
                                                            ripRouter.splice(b,1);
                                                            console.log(ripRouter[b].NetWork+"--R");
                                                            ripRouter.push(ripRouterj);

                                                        }

                                                        flag =1;
                                                    }
                                                }
                                                if(flag ==0){
                                                    ripRouter.push(ripRouterj);
                                                    console.log(ripRouterj.NetWork+"--R");
                                                }

                                            }


                                        }

                                    }



                                }

                            }
                        }
                    }

                }

            }

    },

    //获取所有选择的节点实例
    getSelectedNodes(){
        var selectedNodes = [];
        var nodes = editor.scene.selectedElements;
        return nodes.forEach(function(n){
            if(/Node/.test(n.elementType))
                selectedNodes.push(n);
        }),selectedNodes;
    },
    //获取标尺线对象
    getRuleLines(){
        var ruleLines = [];
        editor.stage.childs.forEach(function(s){
            s.childs.forEach(function(n){
                if(n.elementType === "link" && n.lineType == "rule")
                    ruleLines.push(n);
            });
        });
        return ruleLines;
    },
    //删除标尺线
    clearRuleLines(){
        for(var i=0 ; i < editor.ruleLines.length ; i++){
            editor.scene.remove(editor.ruleLines[i]);
        }
        editor.ruleLines = [];
        return this;
    },
    //重新创建标尺线对象
    reCreateRuleLines(){
        if(  editor.ruleLines && editor.ruleLines.length == 2) {
            editor.scene.add(editor.ruleLines[0]);
            editor.scene.add(editor.ruleLines[1]);
        }
        return this;
    },
    //显示标尺线
    showRuleLines(x,y) {
        if(  editor.ruleLines && editor.ruleLines.length == 2) {
            editor.ruleLines[0].visible = true;
            editor.ruleLines[1].visible = true;

            editor.ruleLines[0].nodeA.y = y;
            editor.ruleLines[0].nodeZ.y = y;
            editor.ruleLines[1].nodeA.x = x;
            editor.ruleLines[1].nodeZ.x = x;
        }
        return this;
    },
    //隐藏标尺线
    hideRuleLines() {
        if( editor.ruleLines &&  editor.ruleLines.length == 2){
            editor.ruleLines[0].visible = false;
            editor.ruleLines[1].visible = false;
        }
        return this;
    },
    //节点分组合并
    toMerge(){
        var selectedNodes = this.getSelectedNodes();
        // 不指定布局的时候，容器的布局为自动(容器边界随元素变化）
        var container = new JTopo.Container();
        container.textPosition = 'Top_Center';
        container.fontColor = editor.config.fontColor;
        container.borderColor = editor.config.borderColor;
        container.borderRadius = editor.config.borderRadius;
       /* //节点所属层次
        container.topoLevel = editor.stage.topoLevel;
        container.parentLevel = $("#parentLevel").val();*/
        editor.scene.add(container);
        selectedNodes.forEach(function(n){
            container.add(n);
        });
        console.log("container+1");

    },
    //分组拆除
    toSplit(){
        if(editor.currentNode instanceof  JTopo.Container){
            editor.currentNode.removeAll();
            editor.scene.remove(editor.currentNode);
        }
    },
    //删除连线
    deleteLine(){
        if(editor.currentNode instanceof  JTopo.Link){
            editor.scene.remove(editor.currentNode);
            let thisLinkNode = editor.currentNode;
            if(thisLinkNode.cnode){
                editor.scene.remove(thisLinkNode.cnode);
            }
            if(thisLinkNode.enode){
                editor.scene.remove(thisLinkNode.enode);
            }


            var AInfos = editor.currentNode.deviceA.split(";");
            var ZInfos = editor.currentNode.deviceZ.split(";");
            if(AInfos && ZInfos && AInfos.length == 2 && ZInfos.length == 2){
                var NodeA = editor.utils.getNodeByKey("deviceId",AInfos[0]);
                var NodeZ = editor.utils.getNodeByKey("deviceId",ZInfos[0]);
                editor.utils.setConnectutil(NodeA,"",AInfos[1],ZInfos[0]+";"+ZInfos[1]+";"+AInfos[1]);
                editor.utils.setConnectutil(NodeZ,"",ZInfos[1],AInfos[0]+";"+AInfos[1]+";"+ZInfos[1]);

                /*if(editor.currentNode.id)
                    editor.deleteNodeById(editor.currentNode.id,"link");*/
                editor.currentNode = null;
                editor.lineMenu.hide();
            }



        }
    },
    findLinkNode(lnode,etheName){

        var node = null;

        editor.stage.childs.forEach(function(s){
            s.childs.forEach(function(n){
                if(n.elementType=="link"){


                    if(n.deviceA!="" && n.deviceA!=null && n.deviceA!=undefined){
                        var FA = n.deviceA.split(";");

                        if(FA.length==2){
                            if(FA[0] == lnode.deviceId){


                                node = n;
                                type="A"
                            }
                        }
                    }

                    if(n.deviceZ!="" && n.deviceZ!=null && n.deviceA!=undefined){
                        var FZ = n.deviceZ.split(";");

                        if(FZ.length==2){

                            if(FZ[0] == lnode.deviceId){

                                node = n;
                                type="Z"
                            }
                        }
                    }



                }
            });
        });
        return node;

    },
    findLink(lnode,etheName){
        var nodes = editor.scene.getAllNodes();

        var node = null;
        var type = "";

        editor.stage.childs.forEach(function(s){
            s.childs.forEach(function(n){
                if(n.elementType=="link"){

                    if(n.deviceA!="" && n.deviceA!=null && n.deviceA!=undefined){
                        var FA = n.deviceA.split(";");

                        if(FA.length==2){
                            if(FA[0] == lnode.deviceId && FA[1] == etheName){


                                node = n;
                                type="A"
                            }
                        }
                    }

                    if(n.deviceZ!="" && n.deviceZ!=null && n.deviceA!=undefined){
                        var FZ = n.deviceZ.split(";");
                        if(FZ.length==2){

                            if(FZ[0] == lnode.deviceId && FZ[1] == etheName){


                                node = n;
                                type="Z"
                            }
                        }
                    }



                }
            });
        });
        return {
            type : type,
            link : node
        }

    },
    /*
    * param1 : 节点对象
    * param2 : 更改的连接信息
    * param3 ：端口名
    * param4 :当前连接信息
    *
    * 修改设备端口相应连接信息
    * */
    setConnectutil(Node,info,ethernetName,connectinfo){
        var cNodeConfig = Node.config;
        //设置结束连线节点的状态
        if(cNodeConfig.moduleNum>0 && cNodeConfig.portNum>0){
            let module = new Array(cNodeConfig.moduleNum);
            for(var i = 0;i<cNodeConfig.moduleNum;i++){
                var num = "module"+i;
                module[i] = cNodeConfig[num];
                let m = module[i];
                for(let j in m){
                    if(m[j].name == ethernetName && m[j].connect == connectinfo){
                        m[j].connect = info;

                    }
                }

            }
        }else if(cNodeConfig.portNum>0){
            for(let j in cNodeConfig){
                if(cNodeConfig[j].type){
                    cNodeConfig[j].connect = info;
                }
            }
        }else{

        }
    },
    //删除节点
    deleteNode(n){

        if(/Node/.test(n.elementType)){
            var nConfig = n.config;
            if(nConfig.moduleNum>0 && nConfig.portNum>0){
                let module = new Array(nConfig.moduleNum);
                for(var i = 0;i<nConfig.moduleNum;i++){
                    var num = "module"+i;
                    module[i] = nConfig[num];
                    let m = module[i];
                    for(let j in m){
                        if(m[j].connect && m[j].connect != ""){
                            let infos = m[j].connect.split(";");//infos[0] 目标设备id；infos[1] 目标设备端口；infos[2] 我方设备端口
                            let linknode = editor.utils.getNodeByKey("deviceId",infos[0]);
                            editor.utils.setConnectutil(linknode,"",infos[1],n.deviceId+";"+infos[2]+";"+infos[1]);

                                let linkNode = editor.utils.findLink(n,infos[2]);
                                if(linkNode){
                                    if(linkNode.link.cnode){
                                        editor.scene.remove(linkNode.link.cnode);
                                    }
                                    if(linkNode.link.enode){
                                        editor.scene.remove(linkNode.link.enode);
                                    }
                                }








                        }
                    }

                }
                editor.utils.hideRuleLines();
            }
        }
        if(n.elementType!="EthernetNode"){
            editor.scene.remove(n);
        }


        editor.currentNode = null;
        //连线重置
        editor.beginNode = null;

        if (editor.link){
            editor.scene.remove(editor.link);
            /*editor.scene.remove(editor.link.cnode);
            editor.scene.remove(editor.link.enode);*/
        }


        editor.link = null;
        editor.ethernetMenu.hide();
        editor.ethernetMenu.empty();

    },
    //删除选择的节点
    deleteSelectedNodes(){
        var own = this;
        var nodes = editor.scene.selectedElements;
        if(nodes && nodes.length > 0){

            var delconfirm = layer.confirm("确定要移除该设备吗?", {
                btn: ['确认','取消'] //按钮
            }, function(){
                layer.close(delconfirm);
                /*editor.showLoadingWindow();*/
                for(var i=0 ; i < nodes.length ; i++){
                    if(/Node/.test(nodes[i].elementType)){

                    }else if(/link/.test(nodes[i].elementType)){
                        if(nodes[i].cnode){
                            editor.scene.remove(nodes[i].cnode);
                        }
                        if(nodes[i].enode){
                            editor.scene.remove(nodes[i].enode);
                        }


                        var AInfos = nodes[i].deviceA.split(";");
                        var ZInfos = nodes[i].deviceZ.split(";");
                        if(AInfos && ZInfos && AInfos.length == 2 && ZInfos.length == 2){
                            var NodeA = editor.utils.getNodeByKey("deviceId",AInfos[0]);
                            var NodeZ = editor.utils.getNodeByKey("deviceId",ZInfos[0]);
                            editor.utils.setConnectutil(NodeA,"",AInfos[1],ZInfos[0]+";"+ZInfos[1]+";"+AInfos[1]);
                            editor.utils.setConnectutil(NodeZ,"",ZInfos[1],AInfos[0]+";"+AInfos[1]+";"+ZInfos[1]);
                        }


                    }else{

                    }
                    own.deleteNode(nodes[i]);
                    this.ruleLines = null;
                }
            }, function(){
         /*       layer.msg('也可以这样', {
                    time: 20000, //20s后自动关闭
                    btn: ['明白了', '知道了']
                });*/
              /*  alert("123");
                editor.currentNode = null;*/
            });

        }
    },
    //放大
    scalingBig(){
        if(editor.currentNode instanceof  JTopo.Node){
            editor.currentNode.scaleX += editor.config.nodeScale;
            editor.currentNode.scaleY += editor.config.nodeScale;
        }else{
            editor.stage.zoomOut(editor.stage.wheelZoom);
        }
    },
    //缩小
    scalingSmall(){
        if(editor.currentNode instanceof  JTopo.Node){
            editor.currentNode.scaleX -= editor.config.nodeScale;
            editor.currentNode.scaleY -= editor.config.nodeScale;
        }else{
            editor.stage.zoomIn(editor.stage.wheelZoom);
        }
    },
    //顺时针旋转
    rotateAdd(){
        if(editor.currentNode instanceof  JTopo.Node) {
            editor.currentNode.rotate += editor.config.rotateValue;
        }
    },
    //逆时针旋转
    rotateSub(){
        if(editor.currentNode instanceof  JTopo.Node) {
            editor.currentNode.rotate -= editor.config.rotateValue;
        }
    },
    //清空编辑器
    clearAll(){
        //删除节点表对应的节点记录
        editor.deleteAllNodes();
    },
    //拓扑图预览
    showPic : function () {
        if(editor.ruleLines && editor.ruleLines.length > 0){
            this.clearRuleLines();
        }
        editor.stage.saveImageInfo();
    },
    //获取图片
    getPic : function () {
        if(editor.ruleLines && editor.ruleLines.length > 0){
            this.clearRuleLines();
        }
        return editor.stage.getImage();
    },
    //下载图片
    downPic :function () {
        var a = document.createElement('a');
        a.href = editor.stage.getImage(); //下载图片
        a.download = '未命名.png';
        a.click();
    },
    //下载json文件
    saveHandler:function(){
        var jsonS = editor.stage.toJson();
        var json = JSON.parse(jsonS);

        let data = {
            "errorInfo": "ok",
            "id" : editor.templateId,
            "name" : editor.templateName.html(),
            "topologyJson":json
        }
        var content = JSON.stringify(data);
        var blob = new Blob([content], {type: "application/json"});
        saveAs(blob, "topology.json");
        /* text/plain application/json*/
    },
    //复制节点
    cloneNode(n) {
        if(n instanceof  JTopo.Node) {
            var newNode = new JTopo.Node();
            n.serializedProperties.forEach(function (i) {
                //只复制虚拟机的模板属性
                if (i == "templateId" && n.dataType != "VM") return true;
                newNode[i] = n[i];
            });
            newNode.id = "";
            newNode.alpha = editor.config.alpha;
            newNode.strokeColor = editor.config.nodeStrokeColor;
            newNode.fillColor = editor.config.fillColor;
            newNode.shadow = editor.config.shadow;
            newNode.shadowColor = editor.config.shadowColor;
            newNode.font = editor.config.font;
            newNode.fontColor = editor.config.nodeFontColor;
            newNode.borderRadius = null;
            newNode.shadowOffsetX = editor.config.shadowOffsetX;
            newNode.shadowOffsetY = editor.config.shadowOffsetY;
            newNode.layout = n.layout;
            newNode.selected = false;
            //var deviceNum = ++editor.modeIdIndex;
            //newNode.deviceId = "device" + deviceNum;
            newNode.deviceId = "" + new Date().getTime() * Math.random();;
            newNode.setLocation(n.x + n.width, n.y + n.height);
            newNode.text = n.text;
            newNode.setImage(n.image);
            editor.scene.add(newNode);
        }
    },
    //复制选择的节点
    cloneSelectedNodes(){
        var own = this;
        var nodes = editor.scene.selectedElements;
        nodes.forEach(function(n){
            if(/Node/.test(n.elementType))
                own.cloneNode(n);
        })
    },
    //全屏显示
    showInFullScreen(element, method) {
        var usablePrefixMethod;
        ["webkit", "moz", "ms", "o", ""].forEach(function (prefix) {
                if (usablePrefixMethod) return;
                if (prefix === "") {
                    // 无前缀，方法首字母小写
                    method = method.slice(0, 1).toLowerCase() + method.slice(1);
                }
                var typePrefixMethod = typeof element[prefix + method];
                if (typePrefixMethod + "" !== "undefined") {
                    if (typePrefixMethod === "function") {
                        usablePrefixMethod = element[prefix + method]();
                    } else {
                        usablePrefixMethod = element[prefix + method];
                    }
                }
            }
        );
        return usablePrefixMethod;
    },
    //居中显示
    showInCenter(){
        editor.stage.centerAndZoom();
    },
    //添加节点描述文字
    addNodeText(x,y){
        var a = editor.currentNode.nodeA,z = editor.currentNode.nodeZ;
        editor.deviceEditText.css({
            top: y,
            left : x,
            display : "block"
        });
        editor.deviceEditText.attr('value', editor.currentNode.text);
        editor.deviceEditText.focus();
        editor.deviceEditText.select();
        editor.currentNode.text = "";
    },
    //重做与撤销
    undoReDo(){
        if(editor.currentNode instanceof  JTopo.Node)
            editor.currentNode.restore();
    },
    //创建标尺线
    createRuleLines(x,y){
        if(editor.showRuleLine){
            //新建两条定点连线
            if(editor.ruleLines.length == 0){
                var nodeHA = new JTopo.Node(),nodeHZ = new JTopo.Node();
                /* nodeHA.setLocation(0 - editor.scene.translateX, y );
                 nodeHZ.setLocation(JTopo.stage.width - editor.scene.translateX,y);*/
                nodeHA.setLocation(JTopo.stage.width * -2, y );
                nodeHZ.setLocation(JTopo.stage.width * 2,y);
                nodeHA.setSize(1,1);
                nodeHZ.setSize(1,1);
                var nodeVA = new JTopo.Node(),nodeVZ = new JTopo.Node();
                /*  nodeVA.setLocation(x,0 - editor.scene.translateY);
                  nodeVZ.setLocation(x,JTopo.stage.height - editor.scene.translateY); */
                nodeVA.setLocation(x,JTopo.stage.height * -2);
                nodeVZ.setLocation(x,JTopo.stage.width * 2);
                nodeVA.setSize(1,1);
                nodeVZ.setSize(1,1);
                var linkH = new JTopo.Link(nodeHA,nodeHZ);
                var linkV = new JTopo.Link(nodeVA,nodeVZ);
                linkH.lineType = "rule";
                linkV.lineType = "rule";
                linkH.lineWidth = 1; // 线宽
                linkH.dashedPattern = 2; // 虚线
                linkV.lineWidth = 1; // 线宽
                linkV.dashedPattern = 2; // 虚线
                linkH.strokeColor = "255,255,0";
                linkV.strokeColor = "255,255,0";
                //保存标尺线
                editor.ruleLines.push(linkH);
                editor.ruleLines.push(linkV);
                editor.scene.add(linkH);
                editor.scene.add(linkV);
            }else{
                editor.utils.showRuleLines(x,y);
            }
        }
    },
    //获取所有的容器对象
    getContainers(){
        var containers = [];
        editor.stage.childs.forEach(function(s){
            s.childs.forEach(function(n){
                if(n.elementType === "container")
                    containers.push(n);
            });
        });
        return containers;
    },
    //根据指定的key返回节点实例
    getNodeByKey(key,value){
        var node = null;
        editor.stage.childs.forEach(function(s){
            s.childs.forEach(function(n){
                if( /Node/.test(n.elementType) && n[key] == value){
                    node = n;
                    return node;
                }
            });
        });
        return node;
    },
    //撤销对节点的操作
    cancleNodeAction(){
        if(editor.currentNode.currStep <= 0)
            return;
        --editor.currentNode.currStep;
        for(var p in editor.currentNode){
            if(p != "currStep")
                editor.currentNode[p] = (editor.currentNode.historyStack[editor.currentNode.currStep])[p];
        }
    },
    //重做节点操作
    reMakeNodeAction(){
        if(editor.currentNode.currStep >= editor.currentNode.maxHistoryStep ||
            editor.currentNode.currStep >= editor.currentNode.historyStack.length -1)
            return;
        editor.currentNode.currStep++;
        for(var q in editor.currentNode){
            if(q != "currStep")
                editor.currentNode[q] = (editor.currentNode.historyStack[editor.currentNode.currStep])[q];
        }
    },
    //保存节点新的状态
    saveNodeNewState(){
        //如果历史栈超过最大可记录历史长度，丢弃第一个元素
        if(editor.currentNode.historyStack.length >= editor.currentNode.maxHistoryStep + 1){
            editor.currentNode.historyStack.shift();
        }
        editor.currentNode.historyStack.push(JTopo.util.clone(editor.currentNode));
        editor.currentNode.currStep = editor.currentNode.historyStack.length - 1;
    },
    //保存节点初始状态,便于回退
    saveNodeInitState() {
        if(!editor.currentNode.hasInitStateSaved){
            editor.currentNode.historyStack.push(JTopo.util.clone(editor.currentNode));
            editor.currentNode.hasInitStateSaved = true;
        }
    },
    //查找节点,便居中闪动显示
    findNodeAndFlash(text) {
        if(!text) return;
        var own = this;
        var text = text.trim();
        var nodes =  editor.stage.find('node[text="'+text+'"]');
        if(nodes.length > 0){
            var node = nodes[0];
            this.unSelectAllNodeExcept(node);
            node.selected = true;
            var location = node.getCenterLocation();
            // 查询到的节点居中显示
            editor.stage.setCenter(location.x, location.y);
            function nodeFlash(node, n){
                if(n == 0) {
                    //own.unSelectAllNodeExcept(node);
                    return;
                };
                node.selected = !node.selected;
                setTimeout(function(){
                    nodeFlash(node, n-1);
                }, 300);
            }
            // 闪烁几下
            nodeFlash(node, 6);
        }else{
            alert("没有找到该节点,请输入完整的节点名称!")
        }
    },
    hasUnSavedNode() {
        var saved = true;
        editor.stage.childs.forEach(function(s){
            if(!saved) return false;
            s.childs.forEach(function(n){
                //id属性无有效值，说明该节点没有保存到数据库,排除参考线
                if(!n.id){
                    if(n.elementType == "link"){
                        if(n.lineType != "rule"){
                            saved = false;
                            return false;
                        }
                    }else{
                        saved = false;
                        return false;
                    }
                }
            });
        });
        return saved;
    },
    //取消出参数节点外所有节点的选中状态
    unSelectAllNodeExcept(node) {
        editor.stage.childs.forEach(function(s){
            s.childs.forEach(function(n){
                //id属性无有效值，说明该节点没有保存到数据库
                if(n.deviceId != node.deviceId){
                    n.selected = false;
                }
            });
        });
    },
    savetopo(){
        showLoadingWindow();
        var jsonS = editor.stage.toJson().replace(/\"/g,"'");
        /* var json = JSON.parse(jsonS);*/
        var name = $("#inputtittle1").html();
        let pic = editor.utils.getPic();
        let data = {
            "id":editor.templateId,
            "name":name,
            "pic" : pic,
            "topologyJson":jsonS,
            "type": 1
        }

        var content = JSON.stringify(data);

        $.ajax({
            url: './network/save',
            async: false,
            type: "POST",
            dataType: "json",
            contentType:"application/json;charset=UTF-8",
            data: content,
            complete: function () {
                closeLoadingWindow();
            },
            success: function (response) {
                saveSuccess();
            },
            error:function () {
                infoMessage('异常');
            }
        });
    },

};
