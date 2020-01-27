/*
* 编辑器对象
* */
function GraphEditor(){
    //绘图参数
    this.config = {
        stageFrames : 500,
        //新建节点默认尺寸
        defaultWidth : 64,
        defaultHeight : 64,
        //滚轮缩放比例
        defaultScal : 0.95,
        ////是否显示鹰眼对象
        eagleEyeVsibleDefault : true,
        //连线颜色
        strokeColor : "black",
        //连线宽度
        lineWidth : 1,
        //二次折线尾端长度
        offsetGap : 40,
        //线条箭头半径
        arrowsRadius : 0,
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
        containerAlpha : 0.5,
        nodeStrokeColor : "22,124,255",
        lineStrokeColor : "black",
        fillColor :"22,124,255",
        containerFillColor : "10,100,80",
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

    //过渡窗口
    this.loadingWin = null;
    //帮助窗口
    this.helpWin = null;

    //布局参数
    this.layout = {
    };
    //纪录节点最后一次移动的幅度
    this.lastMovedX = 0;
    this.lastMovedY = 0;
    //绘图区属性
    this.stage = null;
    this.scene = null;

    //连线类型
    this.lineType = "";

    //业务数据
    this.currDeviceId = null;
    this.currDataType = null;
    this.modeIdIndex = 1;
    this.templateId = null;
    this.templateName = $("#inputtittle1");
    //当前选择的节点对象
    this.currentNode = null;
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
    //拓扑层次导航
    this.selectLevel;
    //是否显示参考线
    this.showRuleLine = true;
    //标尺线数组
    this.ruleLines = [];
}

//显示过渡窗口
GraphEditor.prototype.showLoadingWindow = function(){
    //显示过渡窗口
    this.loadingWin = layer.load(1, {
        shade: [0.1,'#fff'], //0.1透明度的白色背景
        /*  fixed: false,    //取消固定定位，因为固定定位是相对body的*/
        offset: ['400px', '800px']   //相对定位
    });
};

/*显示帮助窗口*/
GraphEditor.prototype.showHelpWindow = function(){
    //显示帮助窗口
    layer.open({
        type: 2,
        title: 'layer mobile页',
        shadeClose: true,
        shade: 0.8,
        area: ['800px', '600px'],
        content:'help.html' //iframe的url
    });
};

/*关闭过渡窗口*/
GraphEditor.prototype.closeLoadingWindow = function(){
    layer.close(this.loadingWin);
};

/*面板样式初始化*/
GraphEditor.prototype.initPanel = function(){

    var self = this;

    //layer弹窗自定义样式
    layer.config({
        skin: 'demo-class'//自定义样式demo-class
    });

    //easyui面板自定义样式
    $('#rightBody').panel({
        headerCls:'mybar',
    });
    $('#leftContent').panel({
        headerCls:'mybar',
    });
    $('#contextBody').panel({
        //对操作面板的框选图标的定义
        headerCls:'mybar',
        tools:[{
            iconCls:'icon-machlect',
            handler:function(){

                if(this.style.backgroundColor == "darkgray"){
                    self.scene.mode = "edit";
                    $(this).css("background-color","#eee");
                    $(this).css("border-radius","3px");
                    $(this).css("border","1px solid #eee");

                }else{
                    $(this).css("background-color","darkgray");
                    $(this).css("border-radius","3px");
                    $(this).css("border","1px solid #000");
                    self.scene.mode = "select";
                }
            }
        }, //对操作面板的箭头图标的定义
            {
                iconCls:'icon-arrow',
                handler:function(){

                    if(this.style.backgroundColor == "darkgray"){
                        self.config.arrowsRadius = 0;
                        $(this).css("background-color","#eee");
                        $(this).css("border-radius","3px");
                        $(this).css("border","1px solid #eee");

                    }else{
                        $(this).css("background-color","darkgray");
                        $(this).css("border-radius","3px");
                        $(this).css("border","1px solid #000");
                        self.config.arrowsRadius = 5;
                    }
                }
            }]
    });
}

/*右键菜单初始化*/
GraphEditor.prototype.initMenus = function () {
    var self = this;
    self.lineMenu.blur(function(){
        if(self.currentNode)
            self.currentNode.text = self.deviceEditText.hide().val();
        else
            self.deviceEditText.hide();
    });

    //右键菜单事件处理
    self.nodeMainMenu.on("click",function(e){
        //菜单文字
        var text = $.trim($(e.target).text());
        if(text == "删除节点(Delete)"){
            editor.utils.deleteSelectedNodes();
        }else if(text == "复制节点(Shift+C)"){
            self.utils.cloneSelectedNodes();
        }else if(text == "撤销(Shift+Z)"){
            self.utils.cancleNodeAction();
        }else if(text == "重做(Shift+R)"){
            self.utils.reMakeNodeAction();
        }else{
            editor.utils.saveNodeInitState();
        }

        switch (text){
            case "放大(Shift+)":
                self.utils.scalingBig();
                self.utils.saveNodeNewState();
                break;
            case "缩小(Shift-)":
                self.utils.scalingSmall();
                self.utils.saveNodeNewState();
                break;
            case "顺时针旋转(Shift+U)":
                self.utils.rotateAdd();
                self.utils.saveNodeNewState();
                break;
            case "逆时针旋转(Shift+I)":
                self.utils.rotateSub();
                self.utils.saveNodeNewState();
                break;
            case "节点文字":
                return;
            default :

        }

        //关闭菜单
        $(this).hide();
    });

    self.nodeMainMenu.on("mouseover",function(e){
        //隐藏第三级菜单
        self.nodeTextPosMenu.hide();
        //菜单文字
        var text = $.trim($(e.target).text());
        var menuX =  parseInt(this.style.left) + $(document.getElementById('changeNodeText')).width();
        //边界判断
        if(menuX + self.nodeTextMenu.width() * 2 >= self.stage.width){
            menuX -= (self.nodeTextMenu.width() + self.nodeMainMenu.width());
        }
        if("节点文字" == text){
            self.layoutMenu.hide();
            self.nodeTextMenu.css({
                top: parseInt(this.style.top)+ $(document.getElementById('changeNodeText')).height(),
                left: menuX
            }).show();
        }else if("应用布局" == text){
            self.nodeTextMenu.hide();
            self.layoutMenu.css({
                top: parseInt(this.style.top),
                left: menuX
            }).show();
        } else{
            self.nodeTextMenu.hide();
        }
    });

    self.nodeTextMenu.on("click", function (e) {
        //菜单文字
        var text = $.trim($(e.target).text());
        if("修改节点文字" == text){
            editor.utils.saveNodeInitState();
            //隐藏菜单显示文字输入框
            self.nodeTextMenu.hide();
            self.nodeMainMenu.hide();
            self.deviceEditText.css({
                top: self.yInCanvas,
                left: self.xInCanvas
            }).show();
            self.deviceEditText.attr('value', self.currentNode.text);
            self.deviceEditText.focus();
            self.deviceEditText.select();
        }
    });

    //节点右键二级菜单
    self.nodeTextMenu.on("mouseover", function (e) {
        //菜单文字
        var text = $.trim($(e.target).text());
        if("调整节点文字位置" == text){
            //处于边界时三级菜单位置调整
            var menuX = parseInt(this.style.left) + $(document.getElementById('justfyNodeText')).width();
            if(parseInt(this.style.left) < parseInt(document.getElementById('nodeMainMenu').style.left)){
                menuX = parseInt(this.style.left) - $(document.getElementById('justfyNodeText')).width();
            }
            self.nodeTextPosMenu.css({
                top: parseInt(this.style.top) + $(document.getElementById('justfyNodeText')).height(),
                left: menuX
            }).show();
        }else{
            self.nodeTextPosMenu.hide();
        }
    });

    //修改节点文字位置菜单
    self.nodeTextPosMenu.on("click", function (e) {
        //菜单文字
        var text = $.trim($(e.target).text());
        if(self.currentNode && self.currentNode instanceof JTopo.Node){
            self.utils.saveNodeInitState();
            switch (text){
                case "顶部居左":
                    self.currentNode.textPosition = "Top_Left";
                    self.utils.saveNodeNewState();
                    break;
                case "顶部居中":
                    self.currentNode.textPosition = "Top_Center";
                    self.utils.saveNodeNewState();
                    break;
                case "顶部居右":
                    self.currentNode.textPosition = "Top_Right";
                    self.utils.saveNodeNewState();
                    break;
                case "中间居左":
                    self.currentNode.textPosition = "Middle_Left";
                    self.utils.saveNodeNewState();
                    break;
                case "居中":
                    self.currentNode.textPosition = "Middle_Center";
                    self.utils.saveNodeNewState();
                    break;
                case "中间居右":
                    self.currentNode.textPosition = "Middle_Right";
                    self.utils.saveNodeNewState();
                    break;
                case "底部居左":
                    self.currentNode.textPosition = "Bottom_Left";
                    self.utils.saveNodeNewState();
                    break;
                case "底部居中":
                    self.currentNode.textPosition = "Bottom_Center";
                    self.utils.saveNodeNewState();
                    break;
                case "底部居右":
                    self.currentNode.textPosition = "Bottom_Right";
                    self.utils.saveNodeNewState();
                    break;
                default :
            }
            $("div[id$='Menu']").hide();
        }
    });
    //连线菜单
    self.lineMenu.on("click",function(e){
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
    self.mainMenu.on("click", function (e) {
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
    self.groupMangeMenu.on("click", function (e) {
        $(this).hide();
        var text = $.trim($(e.target).text());
        if(text == "新建分组"){
            self.utils.toMerge();
        }
    });
    //对齐
    self.groupAlignMenu.on("click", function (e) {
        var currNode = self.currentNode;
        var selectedNodes =  self.utils.getSelectedNodes();
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
    self.groupMangeMenu.on("mouseover", function (e) {
        var text = $.trim($(e.target).text());
        if(text == "对齐方式"){
            //节点对齐
            var menuX = parseInt(this.style.left) + $(document.getElementById('alignGroup')).width();
            if(menuX + self.alignGroup.width() * 2 >= self.stage.width){
                menuX -= (self.alignGroup.width() + self.groupMangeMenu.width());
            }
            self.groupAlignMenu.css({
                top: parseInt(this.style.top) + $(document.getElementById('alignGroup')).height(),
                left: menuX
            }).show();
        }else{
            self.groupAlignMenu.hide();
        }
    });
    //容器管理菜单
    self.containerMangeMenu.on("click", function (e) {
        var cNode = editor.currentNode;
        if(!cNode instanceof JTopo.Container) return;
        $(this).hide();
        var text = $.trim($(e.target).text());
        if(text == "拆分"){
            self.utils.toSplit();
            self.utils.deleteNode(cNode)
        }
    });

    //容器管理菜单
    self.layoutMenu.on("click", function (e) {
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
            JTopo.layout.layoutNode(self.scene, self.currentNode, true);
        }else if(text == "圆形布局"){
            editor.currentNode.layout.on = true;
            editor.currentNode.layout.type = "circle";
            editor.currentNode.layout.radius = 200;
            JTopo.layout.layoutNode(self.scene, self.currentNode, true);
        }
    });
};

/*图元拖放功能实现*/
GraphEditor.prototype.dragNode = function (modeDiv, drawArea, text) {
    if (!text) text = "";
    var self = this;
    //拖拽开始,携带必要的参数
    modeDiv.ondragstart = function (e) {
        e = e || window.event;
        var dragSrc = this;
        var backImg = $(dragSrc).find("img").eq(0).attr("src");
        backImg = backImg.substring(backImg.lastIndexOf('/') + 1);
        var datatype = $(this).attr("datatype");
        try {
            e.dataTransfer.setData('text', backImg + ";" + text + ";" + datatype);
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
        var img, text,datatype;
        if (data) {
            var datas = data.split(";");
            if (datas && datas.length == 3) {
                img = datas[0];
                text = datas[1];
                datatype = datas[2];
                var node;
                if(datatype == "TX"){
                    node = new JTopo.TextNode("请输入文字");
                }else{
                    node = new JTopo.Node();
                }

                node.fontColor = self.config.nodeFontColor;
                node.setBound((e.layerX ? e.layerX : e.offsetX) - self.scene.translateX - self.config.defaultWidth / 2, (e.layerY ? e.layerY : e.offsetY) - self.scene.translateY - self.config.defaultHeight / 2,self.config.defaultWidth,self.config.defaultHeight);
                //片
                node.setImage('./icon/' + img);
                //var cuurId = "device" + (++self.modeIdIndex);
                var cuurId = "" + new Date().getTime() * Math.random();
                node.deviceId = cuurId;
                node.dataType = datatype;
                node.nodeImage = img;
                ++self.modeIdIndex;
                node.text = text;
                node.textPosition = "Middle_Center";
                node.layout = self.layout;
                //节点所属层次
                node.topoLevel = 1;
                //节点所属父层次
                node.parentLevel = $("#parentLevel").val();
                //子网连接点的下一个层,默认为0
                node.nextLevel = "0";
                self.scene.add(node);
                self.currentNode = node;
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

/*图元初始化事件*/
GraphEditor.prototype.onDragNode = function () {
    //为拖拽图形加事件
    var modes = jQuery("[divType='mode']");
    var modeLength = modes.length;
    for (var i = 0; i < modeLength; i++) {
        modes[i].gtype=modes[i].getAttribute("gtype");
        modes[i].datatype=modes[i].getAttribute("datatype");
        var text = $(modes[i]).find("span").eq(0).text();
        editor.dragNode(modes[i],document.getElementById('drawCanvas'),text);
    }
}

/*清空所有节点*/
GraphEditor.prototype.deleteAllNodes = function(templateId){
    if (!templateId) {
        return;
    }
    var self = this;
    //询问框
    var msgcon = layer.msg('确定要清空当前绘图吗?', {
        time: 0 //不自动关闭
        ,btn: ['确认', '取消']
        ,yes: function(index){
            layer.close(msgcon);
            self.stage.childs.forEach(function(s){
                s.clear();
            });
            //连线重置
            self.beginNode = null;
            self.link = null;
        }
    });


}

/*初始化编辑器*/
GraphEditor.prototype.init = function (templateId,stageJson,templateName) {
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
    }else{
        this.stage = JTopo.createStageFromJson(stageJson, canvas);
        this.scene = this.stage.childs[0];
    }
    $("#parentLevel").val(this.stage.parentLevel);
    //滚轮缩放
    this.stage.frames = this.config.stageFrames;
    this.stage.wheelZoom = null /*this.config.defaultScal;*/
    this.stage.eagleEye.visible = this.config.eagleEyeVsibleDefault;

    this.scene.mode = "edit";
    //背景由样式指定
    //this.scene.background = backImg;

    //用来连线的两个节点
    this.tempNodeA = new JTopo.Node('tempA');
    this.tempNodeA.setSize(1, 1);
    this.tempNodeZ = new JTopo.Node('tempZ');
    this.tempNodeZ.setSize(1, 1);
    this.beginNode = null;
    this.link = null;
    var self = this;

    //初始化面板
    self.initPanel();
    //初始化菜单
    this.initMenus();
    //初始化图元拖放事件
    this.onDragNode();

    //双击编辑文字
    this.scene.dbclick(function(e){
        if(e.target)
            self.currentNode = e.target;
        else
            return;
        if(e.target != null && e.target instanceof JTopo.Node){
            var nType = e.target.dataType;

            if(nType == "GH" || nType == "TX"){
                self.deviceEditText.css({
                    top: self.yInCanvas,
                    left: self.xInCanvas
                   /* top:e.x,
                    left:e.y*/
                }).show();
                self.deviceEditText.val(self.currentNode.text);
                self.deviceEditText.focus();
                self.deviceEditText.select();
            }

            //按下左键加载属性面板
            var deviceTemplateId = e.target.templateId;

            //更新当前选中状态的模型
            self.currDeviceId = e.target.deviceId;
            self.currDataType = e.target.dataType;
        }
    });
    //数去焦点,设置节点文字
    self.deviceEditText.blur(function(){
        if(self.currentNode){
            self.currentNode.text = self.deviceEditText.hide().val();
            self.utils.saveNodeNewState();
        } else
            self.deviceEditText.hide();
    });

    //清除起始节点不完整的拖放线
    this.scene.mousedown(function(e){
        if (self.link && !self.isSelectedMode && (e.target == null || e.target === self.beginNode || e.target === self.link)) {
            this.remove(self.link);
        }
    });

    //处理右键菜单，左键连线
    this.scene.mouseup(function(e){
        if(e.target)
            self.currentNode = e.target;
        if(e.target && e.target instanceof  JTopo.Node && e.target.layout && e.target.layout.on && e.target.layout.type && e.target.layout.type !="auto")
            JTopo.layout.layoutNode(this, e.target,true,e);
        var menuY =  e.layerY ? e.layerY : e.offsetY;
        var menuX =  e.layerX ? e.layerX : e.offsetX;
        self.xInCanvas = menuX;
        self.yInCanvas = menuY;
        if (e.button == 2 ) {//右键菜单
            $("div[id$='Menu']").hide();
            var menuY =  e.layerY ? e.layerY : e.offsetY;
            var menuX =  e.layerX ? e.layerX : e.offsetX;
            //记录鼠标触发位置在canvas中的相对位置
            self.xInCanvas = menuX;
            self.yInCanvas = menuY;
            if(e.target){

                // if(e.target.elementType == "TextNode"){
                //     return;
                // }


                //处理节点右键菜单事件
                if(e.target instanceof JTopo.Node){
                    var selectedNodes = self.utils.getSelectedNodes();
                    //如果是节点多选状态弹出分组菜单
                    if(selectedNodes && selectedNodes.length > 1){
                        //判断边界出是否能完整显示弹出菜单
                        if(menuX + self.groupMangeMenu.width() >= self.stage.width){
                            menuX -= self.groupMangeMenu.width();
                        }
                        if(menuY + self.groupMangeMenu.height() >= self.stage.height){
                            menuY -= self.groupMangeMenu.height();
                        }
                        self.groupMangeMenu.css({
                            top: menuY,
                            left: menuX
                        }).show();
                    }else{
                        //判断边界出是否能完整显示弹出菜单
                        if(menuX + self.nodeMainMenu.width() >= self.stage.width){
                            menuX -= self.nodeMainMenu.width();
                        }
                        if(menuY + self.nodeMainMenu.height() >= self.stage.height){
                            menuY -= self.nodeMainMenu.height();
                        }
                        self.nodeMainMenu.css({
                            top: menuY,
                            left: menuX
                        }).show();
                    }
                }else if(e.target instanceof JTopo.Link){//连线右键菜单
                    if(e.target.lineType == "rule"){
                        editor.utils.hideRuleLines();//删除标尺线
                    }else{
                        self.lineMenu.css({
                            top: e.layerY ? e.layerY : e.offsetY,
                            left: e.layerX ? e.layerX : e.offsetX
                        }).show();
                    }
                }else if(e.target instanceof JTopo.Container){//容器右键菜单
                    self.containerMangeMenu.css({
                        top: e.layerY ? e.layerY : e.offsetY,
                        left: e.layerX ? e.layerX : e.offsetX
                    }).show();
                }
            }else{
                //判断边界出是否能完整显示弹出菜单
                if(menuX + self.mainMenu.width() >= self.stage.width){
                    menuX -= self.mainMenu.width();
                }
                if(menuY + self.mainMenu.height() >= self.stage.height){
                    menuY -= self.mainMenu.height();
                }
                self.mainMenu.css({
                    top: menuY,
                    left: menuX
                }).show();
            }

        } else if (e.button == 1) {//中键

        } else if (e.button == 0) {//左键
            if(e.target != null && e.target instanceof JTopo.Node && !self.isSelectedMode && e.target.elementType != "TextNode" && self.lineType!=""){
                if(self.beginNode == null){
                    self.beginNode = e.target;
                    self.tempNodeA.setLocation(e.x, e.y);
                    self.tempNodeZ.setLocation(e.x, e.y);
                    if(self.lineType == "line"){
                        self.link = new JTopo.Link(self.tempNodeA, self.tempNodeZ);
                        self.link.lineType = "line";
                    }else if(self.lineType == "foldLine"){
                        self.link = new JTopo.FoldLink(self.tempNodeA, self.tempNodeZ);
                        self.link.lineType = "foldLine";
                        self.link.direction =  self.config.direction;
                    }else if(self.lineType == "flexLine"){
                        self.link = new JTopo.FlexionalLink(self.tempNodeA, self.tempNodeZ);
                        self.link.direction =  self.config.direction;
                        self.link.lineType = "flexLine";
                    }else if(self.lineType == "curveLine"){
                        self.link = new JTopo.CurveLink(self.tempNodeA, self.tempNodeZ);
                        self.link.lineType = "curveLine";
                    }
                    self.link.dashedPattern = 2;
                    self.link.lineWidth = self.config.lineWidth;
                    self.link.shadow = self.config.showLineShadow;
                    self.link.strokeColor =  JTopo.util.randomColor();
                    //保存线条所连接的两个节点ID
                    this.add(self.link);

                }else if(e.target && e.target instanceof JTopo.Node && self.beginNode !== e.target){//结束连线
                    var endNode = e.target;
                    //判断两个节点是否有循环引用
                    for(var el = 0; el < endNode.outLinks.length ; el++){
                        //存在循环引用，线条变红
                        if(endNode.outLinks[el].nodeZ == self.beginNode){
                            if(self.link)
                                this.remove(self.link);
                            self.beginNode = null;
                            return;
                        }
                    }


                   /* //节点间是否有重复连线,即起点到终点有两条以上连线
                    for(var el2 = 0; el2 < self.beginNode.outLinks.length ; el2++){
                        //起始节点已经有一条线指向目标节点
                        if(self.beginNode.outLinks[el2].nodeZ == endNode){
                            if(self.link)
                                this.remove(self.link);
                            self.beginNode = null;
                            return;
                        }
                    }*/
                    var l;
                    if(self.lineType == "line"){
                        l = new JTopo.Link(self.beginNode, endNode);
                        l.lineType = "line";
                    }else if(self.lineType == "foldLine"){
                        l = new JTopo.FoldLink(self.beginNode, endNode);
                        l.direction = self.config.direction;
                        l.bundleOffset = self.config.offsetGap;//折线拐角处的长度
                        l.lineType = "foldLine";
                    }else if(self.lineType == "flexLine"){
                        l = new JTopo.FlexionalLink(self.beginNode, endNode);
                        l.direction = self.config.direction;
                        l.lineType = "flexLine";
                        l.offsetGap = self.config.offsetGap;
                    }else if(self.lineType == "curveLine"){
                        l = new JTopo.CurveLink(self.beginNode, endNode);
                        l.lineType = "curveLine";
                    }
                    //连线所处拓扑层级
                    l.topoLevel = 1;
                    l.parentLevel = $("#parentLevel").val();
                    l.fontColor = self.config.lineFontColor;
                    //保存线条所连接的两个节点ID
                    l.deviceA = self.beginNode.deviceId;
                    l.deviceZ = endNode.deviceId;
                    if(self.lineType != "curveLine" &self.config.arrowsRadius !=0)
                        l.arrowsRadius = self.config.arrowsRadius;
                    l.strokeColor = self.config.strokeColor;
                    l.lineWidth = self.config.lineWidth;

                    this.add(l);
                    self.beginNode = null;
                    this.remove(self.link);
                    self.link = null;
                }else{
                    self.beginNode = null;
                }
            }else{
                if(self.link)
                    this.remove(self.link);
                self.beginNode = null;
            }
        }
    });

    //动态更新连线坐标
    this.scene.mousemove(function(e){
        if(!self.isSelectedMode && self.beginNode)
            self.tempNodeZ.setLocation(e.x, e.y);
    });

    this.scene.mousedrag(function(e){
        if(!self.isSelectedMode && self.beginNode)
            self.tempNodeZ.setLocation(e.x, e.y);
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
        if (self.link && !self.isSelectedMode && (e.target == null || e.target === self.beginNode || e.target === self.link)) {
            self.scene.remove(self.link);
        }
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
                    editor.saveToplogy(true);
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
                    jAlert("ctrl + w 另存为");
                    //return false;
                    break;
                case  89:
                    //ctrl+y
                    editor.utils.clear();
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
            self.isSelectedMode = true;
            //return false;
        }
    });
    $(document).keyup(function (e) {
        if(e.which == 17){
            self.isSelectedMode = false;
            return false;
        }
    });
    //第一次进入拓扑编辑器,生成stage和scene对象
    if(stageJson == "-1"){
        this.saveToplogy(false);
    }
    //编辑器初始化完毕关闭loading窗口
    this.closeLoadingWindow();
}



//编辑器实例
var editor = new GraphEditor();

//工具方法
editor.utils = {
    //获取所有选择的节点实例
    getSelectedNodes : function(){
        var selectedNodes = [];
        var nodes = editor.scene.selectedElements;
        return nodes.forEach(function(n){
            if(n.elementType === "node")
                selectedNodes.push(n);
        }),selectedNodes;
    },
    //获取标尺线对象
    getRuleLines : function(){
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
    clearRuleLines : function(){
        for(var i=0 ; i < editor.ruleLines.length ; i++){
            editor.scene.remove(editor.ruleLines[i]);
        }
        editor.ruleLines = [];
        return this;
    },
    //重新创建标尺线对象
    reCreateRuleLines : function(){
        if(  editor.ruleLines && editor.ruleLines.length == 2) {
            editor.scene.add(editor.ruleLines[0]);
            editor.scene.add(editor.ruleLines[1]);
        }
        return this;
    },
    //显示标尺线
    showRuleLines : function (x,y) {
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
    hideRuleLines : function () {
        if( editor.ruleLines &&  editor.ruleLines.length == 2){
            editor.ruleLines[0].visible = false;
            editor.ruleLines[1].visible = false;
        }
        return this;
    },
    //节点分组合并
    toMerge : function(){
        var selectedNodes = this.getSelectedNodes();
        // 不指定布局的时候，容器的布局为自动(容器边界随元素变化）
        var container = new JTopo.Container();
        container.textPosition = 'Top_Center';
        container.fontColor = editor.config.fontColor;
        container.borderColor = editor.config.borderColor;
        container.borderRadius = editor.config.borderRadius;
        //节点所属层次
        container.topoLevel = editor.stage.topoLevel;
        container.parentLevel = $("#parentLevel").val();
        editor.scene.add(container);
        selectedNodes.forEach(function(n){
            container.add(n);
        });
    },
    //分组拆除
    toSplit : function(){
        if(editor.currentNode instanceof  JTopo.Container){
            editor.currentNode.removeAll();
            editor.scene.remove(editor.currentNode);
        }
    },
    //删除连线
    deleteLine : function(){
        if(editor.currentNode instanceof  JTopo.Link){
            editor.scene.remove(editor.currentNode);
            if(editor.currentNode.id)
                editor.deleteNodeById(editor.currentNode.id,"link");
            editor.currentNode = null;
            editor.lineMenu.hide();
        }
    },
    //删除节点
    deleteNode : function(n){
        editor.scene.remove(n);
       /* if (n.id)
            editor.deleteNodeById(n.id, n.elementType, n.dataType);*/
        editor.currentNode = null;
        //连线重置
        editor.beginNode = null;
        if (editor.link)
            editor.scene.remove(editor.link);
        editor.link = null;
    },
    //删除选择的节点
    deleteSelectedNodes : function(){
        var self = this;
        var nodes = editor.scene.selectedElements;
        if(nodes && nodes.length > 0){
            var delconfirm = layer.confirm("确定要移除该图形吗?", {
                btn: ['确认','取消'] //按钮
            }, function(){
                layer.close(delconfirm);
                /*editor.showLoadingWindow();*/
                editor.showLoadingWindow();
                for(var i=0 ; i < nodes.length ; i++){
                    self.deleteNode(nodes[i]);
                }
                editor.closeLoadingWindow();
            }, function(){
                editor.currentNode = null;
            });


        }
    },
    //放大
    scalingBig : function(){
        if(editor.currentNode instanceof  JTopo.Node){
            editor.currentNode.scaleX += editor.config.nodeScale;
            editor.currentNode.scaleY += editor.config.nodeScale;
        }else{
            editor.stage.zoomOut(editor.stage.wheelZoom);
        }
    },
    //缩小
    scalingSmall : function(){
        if(editor.currentNode instanceof  JTopo.Node){
            editor.currentNode.scaleX -= editor.config.nodeScale;
            editor.currentNode.scaleY -= editor.config.nodeScale;
        }else{
            editor.stage.zoomIn(editor.stage.wheelZoom);
        }
    },
    //顺时针旋转
    rotateAdd : function(){
        if(editor.currentNode instanceof  JTopo.Node) {
            editor.currentNode.rotate += editor.config.rotateValue;
        }
    },
    //逆时针旋转
    rotateSub : function(){
        if(editor.currentNode instanceof  JTopo.Node) {
            editor.currentNode.rotate -= editor.config.rotateValue;
        }
    },
    //清空编辑器
    clear : function(){
        //删除节点表对应的节点记录
        editor.deleteAllNodes(editor.templateId);
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
        a.download = '未命名.png'; console.log(a);
        a.click();
    },
    //复制节点
    cloneNode: function (n) {
        if(n instanceof  JTopo.Node) {
            var newNode = new JTopo.Node();
            n.serializedProperties.forEach(function (i) {
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
    cloneSelectedNodes : function(){
        var self = this;
        var nodes = editor.scene.selectedElements;
        console.log(nodes);
        nodes.forEach(function(n){
            if(n.elementType === "Node")
                self.cloneNode(n);
        })
    },
    //全屏显示
    showInFullScreen: function (element, method) {
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
    showInCenter : function(){
        editor.stage.centerAndZoom();
    },
    //添加节点描述文字
    addNodeText : function(x,y){
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
    undoReDo : function(){
        if(editor.currentNode instanceof  JTopo.Node)
            editor.currentNode.restore();
    },

    //创建标尺线
    createRuleLines : function(x,y){
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
                linkH.strokeColor = "255,100,0";
                linkV.strokeColor = "255,100,0";
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
    getContainers : function(){
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
    getNodeByKey : function(key,value){
        var node = null;
        editor.stage.childs.forEach(function(s){
            s.childs.forEach(function(n){
                if(n.elementType === "node" && n[key] == value){
                    node = n;
                    return node;
                }
            });
        });
        return node;
    },
    //撤销对节点的操作
    cancleNodeAction : function(){
        if(editor.currentNode.currStep <= 0)
            return;
        --editor.currentNode.currStep;
        for(var p in editor.currentNode){
            if(p != "currStep")
                editor.currentNode[p] = (editor.currentNode.historyStack[editor.currentNode.currStep])[p];
        }
    },
    //重做节点操作
    reMakeNodeAction : function(){
        if(editor.currentNode.currStep >= editor.currentNode.maxHistoryStep ||
            editor.currentNode.currStep >= editor.currentNode.historyStack.length -1)
            return;
        editor.currentNode.currStep++;
        for(var q in editor.currentNode){
            if(q != "currStep")
                editor.currentNode[q] = (editor.currentNode.historyStack[editor.currentNode.currStep])[q];
        }
    },
    reMakeAllNode : function () {
        editor.stage.childs.forEach(function(s){
            s.childs.forEach(function(n){
                if(n instanceof  JTopo.Node){
                    if(n.currStep >= n.maxHistoryStep ||
                        n.currStep >= n.historyStack.length -1)
                        return;
                    n.currStep++;
                    for(var q in n){
                        if(q != "currStep")
                            n[q] = (n.historyStack[n.currStep])[q];
                    }
                }

            });
        });
    },
    //保存节点新的状态
    saveNodeNewState : function(){
        //如果历史栈超过最大可记录历史长度，丢弃第一个元素
        if(editor.currentNode.historyStack.length >= editor.currentNode.maxHistoryStep + 1){
            editor.currentNode.historyStack.shift();
        }
        editor.currentNode.historyStack.push(JTopo.util.clone(editor.currentNode));
        editor.currentNode.currStep = editor.currentNode.historyStack.length - 1;
    },
    //保存节点初始状态,便于回退
    saveNodeInitState: function () {
        if(!editor.currentNode.hasInitStateSaved){
            editor.currentNode.historyStack.push(JTopo.util.clone(editor.currentNode));
            editor.currentNode.hasInitStateSaved = true;
        }
    },
    //查找节点,便居中闪动显示
    findNodeAndFlash : function (text) {
        if(!text) return;
        var self = this;
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
                    //self.unSelectAllNodeExcept(node);
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
            jAlert("没有找到该节点,请输入完整的节点名称!")
        }
    },
    hasUnSavedNode : function () {
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
    unSelectAllNodeExcept : function (node) {
        editor.stage.childs.forEach(function(s){
            s.childs.forEach(function(n){
                if(n.deviceId != node.deviceId){
                    n.selected = false;
                }
            });
        });
    },
    //下载json文件
    saveHandler:function(){
        var jsonS = editor.stage.toJson();
        var json = JSON.parse(jsonS);

        let data = {
            "errorInfo": "ok",
            "templateId" : editor.templateId,
            "templateName" : editor.templateName.html(),
            "graphJson":json
        }
        var content = JSON.stringify(data);
        var blob = new Blob([content], {type: "application/json"});
        saveAs(blob, "topology.json");
        /* text/plain application/json*/
    },
    /*加载json文件*/
    loadGraph:function (url,templateId) {

    if(!url){
        url = "./graph.json"
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
            "templateId":templateId,
        },
        error: function () {
        },
        success: function (response) {
            /* response = JSON.parse(response);*/
            var err = response.errorInfo;
            var name = response.templateName;
            var id = response.templateId
            // 错误处理
            if (err && err != "ok") {
                editor.init(id,"",name);
            } else {
                var gJson = response.graphJson;
                editor.init(id,gJson,name);
            }
        }
    });
}
};
