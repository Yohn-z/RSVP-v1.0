

var netConfig = {};

/*netConfig.getMac = function () {
    let adrArray = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

}*/

netConfig.uuid =function() {
    /*var s = [];
    var hexDigits = "0123456789ABCDEF";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;*/
    return 'xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
netConfig.hostconfig = function () {
        this.portNum = 1,   //端口个数
        this.hostName = "host",
        /* fastethernet0 : ["Mac_Address","IP_Address","SubNet_Mask","Default_Gateway","DNS_Server"]*/
        this.moduleNum = 1,//模块数
        this.module0 = {
           fastethernet0 : {
            name: "fastethernet0",
            type: "f",
            Port_Status: "on",//on开启，false关闭
            Bandwidth: "",
            Duplex: "",
            Mac_Address: "", //硬件地址
            IP_Address: "N/A",   //ipv4地址
            SubNet_Mask: "N/A",   //子网掩码
            Default_Gateway: "N/A",   //默认网关
            DNS_Server: "",    //dns服务器
            connect: ""
        }
    }
}

netConfig.switchConfig = function () {


    this.hostName = "switch",//主机名
    this.portNum = 8,   //端口个数
    this.moduleNum = 1,//模块数
    this.module0 = {
        /*fastethernet0: {
            name : "fastethernet0/0",
            type : "f",
            Port_Status: "false",//on开启，false关闭
            Mac_Address: "", //硬件地址
            IP_Address: "N/A",   //ipv4地址
            SubNet_Mask: "N/A",   //子网掩码
            Bandwidth: "",
            Duplex: "",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            Tx_ring_limit: "",
            connect: ""
        },*/
        fastethernet1: {
            name : "fastethernet0/1",
            type : "f",
            Port_Status: "false",//on开启，false关闭
            Mac_Address: "", //硬件地址
            IP_Address: "N/A",   //ipv4地址
            SubNet_Mask: "N/A",   //子网掩码
            Bandwidth: "",
            Duplex: "",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            Tx_ring_limit: "",
            connect: ""
        },
        fastethernet2: {
            name : "fastethernet0/2",
            type : "f",
            Port_Status: "false",//on开启，false关闭
            Mac_Address: "", //硬件地址
            IP_Address: "N/A",   //ipv4地址
            SubNet_Mask: "N/A",   //子网掩码
            Bandwidth: "",
            Duplex: "",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            Tx_ring_limit: "",
            connect: ""
        },
        fastethernet3: {
            name : "fastethernet0/3",
            type : "f",
            Port_Status: "false",//on开启，false关闭
            Mac_Address: "", //硬件地址
            IP_Address: "N/A",   //ipv4地址
            SubNet_Mask: "N/A",   //子网掩码
            Bandwidth: "",
            Duplex: "",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            Tx_ring_limit: "",
            connect: ""
        },
        fastethernet4: {
            name : "fastethernet0/4",
            type : "f",
            Port_Status: "false",//on开启，false关闭
            Mac_Address: "", //硬件地址
            IP_Address: "N/A",   //ipv4地址
            SubNet_Mask: "N/A",   //子网掩码
            Bandwidth: "",
            Duplex: "",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            Tx_ring_limit: "",
            connect: ""
        },
        fastethernet5: {
            name : "fastethernet0/5",
            type : "f",
            Port_Status: "false",//on开启，false关闭
            Mac_Address: "", //硬件地址
            IP_Address: "N/A",   //ipv4地址
            SubNet_Mask: "N/A",   //子网掩码
            Bandwidth: "",
            Duplex: "",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            Tx_ring_limit: "",
            connect: ""
        },
        fastethernet6: {
            name : "fastethernet0/6",
            type : "f",
            Port_Status: "false",//on开启，false关闭
            Mac_Address: "", //硬件地址
            IP_Address: "N/A",   //ipv4地址
            SubNet_Mask: "N/A",   //子网掩码
            Bandwidth: "",
            Duplex: "",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            Tx_ring_limit: "",
            connect: ""
        },
        fastethernet7: {
            name : "fastethernet0/7",
            type : "f",
            Port_Status: "false",//on开启，false关闭
            Mac_Address: "", //硬件地址
            IP_Address: "N/A",   //ipv4地址
            SubNet_Mask: "N/A",   //子网掩码
            Bandwidth: "",
            Duplex: "",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            Tx_ring_limit: "",
            connect: ""
        },
        fastethernet8: {
            name : "fastethernet0/8",
            type : "f",
            Port_Status: "false",//on开启，false关闭
            Mac_Address: "", //硬件地址
            IP_Address: "N/A",   //ipv4地址
            SubNet_Mask: "N/A",   //子网掩码
            Bandwidth: "",
            Duplex: "",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            Tx_ring_limit: "",
            connect: ""
        },

        GigabitEthernet0: {
            name : "GigabitEthernet0/9",
            type : "g",
            Port_Status: "false",//on开启，false关闭
            Mac_Address: "", //硬件地址
            IP_Address: "N/A",   //ipv4地址
            SubNet_Mask: "N/A",   //子网掩码
            Bandwidth: "",
            Duplex: "",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            Tx_ring_limit: "",
            connect: ""
        }
    },
        this.vlanDatabse={
            vlan : [
                {
                    No : 1,
                    name : "default",
                    ip : "",
                    sub:""
                }
            ]
        },
        this.arp=[];

}

netConfig.routerConfig = function () {
    this.hostName ="router",//主机名
    this.portNum = 3,   //端口个数
    this.moduleNum = 1,//模块数
    this.module0 = {
        fastethernet0 :{
            name : "fastethernet0/0",
            type : "f",
            Port_Status:"false",//on开启，false关闭
            Bandwidth:"",
            Duplex:"",
            Mac_Address : "", //硬件地址
            IP_Address : "N/A",   //ipv4地址
            SubNet_Mask : "N/A",   //子网掩码
            Tx_ring_limit: "10",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            connect: ""
        },
        fastethernet1 :{
            name : "fastethernet0/1",
            type : "f",
            Port_Status:"false",//on开启，false关闭
            Bandwidth:"",
            Duplex:"",
            Mac_Address : "", //硬件地址
            IP_Address : "N/A",   //ipv4地址
            SubNet_Mask : "N/A",   //子网掩码
            Tx_ring_limit: "10",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            connect: ""
        },
        fastethernet2 :{
            name : "fastethernet0/2",
            type : "f",
            Port_Status:"false",//on开启，false关闭
            Bandwidth:"",
            Duplex:"",
            Mac_Address : "", //硬件地址
            IP_Address : "N/A",   //ipv4地址
            SubNet_Mask : "N/A",   //子网掩码
            Tx_ring_limit: "10",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            connect: ""
        },
        fastethernet3 :{
            name : "fastethernet0/3",
            type : "f",
            Port_Status:"false",//on开启，false关闭
            Bandwidth:"",
            Duplex:"",
            Mac_Address : "", //硬件地址
            IP_Address : "N/A",   //ipv4地址
            SubNet_Mask : "N/A",   //子网掩码
            Tx_ring_limit: "10",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            connect: ""
        },
        serial0:{
            name : "serial0/0",
            type : "s",
            Port_Status:"false",//on开启，false关闭
            Duplex:"",
            Clock_Rate :"",
            Mac_Address : "", //硬件地址
            IP_Address : "N/A",   //ipv4地址
            SubNet_Mask : "N/A",   //子网掩码
            Tx_ring_limit: "10",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            connect: ""
        },
        serial1:{
            name : "serial0/1",
            type : "s",
            Port_Status:"false",//on开启，false关闭
            Duplex:"",
            Clock_Rate :"",
            Mac_Address : "", //硬件地址
            IP_Address : "N/A",   //ipv4地址
            SubNet_Mask : "N/A",   //子网掩码
            Tx_ring_limit: "10",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            connect: ""
        },
        Console:{
            name : "Console",
            type : "c",
            Port_Status:"false",//on开启，false关闭
            Duplex:"",
            Clock_Rate :"",
            Mac_Address : "", //硬件地址
            IP_Address : "N/A",   //ipv4地址
            SubNet_Mask : "N/A",   //子网掩码
            Tx_ring_limit: "10",
            mode: "access",   //Access单选,Trunk多选
            vlan: "1",
            connect: ""
        }

    },
        this.vlanDatabse={
            vlan : [
                {
                    No : 1,
                    name : "default",
                    ip : ""
                }
            ]
        },
   this.Routing = {
            static :[],
            RIP : [],
            OSPF : ""
    }
}
/*

netConfig.routerconfig*/
netConfig.router1Config = function () {
    this.hostName ="router",//主机名
        this.portNum = 7,   //端口个数
        this.moduleNum = 2,//模块数
         this.module0 = {
            fastethernet0 :{
                name : "fastethernet0/0",
                type : "f",
                Port_Status:"false",//on开启，false关闭
                Bandwidth:"",
                Duplex:"",
                Mac_Address : "", //硬件地址
                IP_Address : "N/A",   //ipv4地址
                SubNet_Mask : "N/A",   //子网掩码
                Tx_ring_limit: "10",
                mode: "access",   //Access单选,Trunk多选
                vlan: "1",
                connect: ""
            },
            fastethernet1 :{
                name : "fastethernet0/1",
                type : "f",
                Port_Status:"false",//on开启，false关闭
                Bandwidth:"",
                Duplex:"",
                Mac_Address : "", //硬件地址
                IP_Address : "N/A",   //ipv4地址
                SubNet_Mask : "N/A",   //子网掩码
                Tx_ring_limit: "10",
                mode: "access",   //Access单选,Trunk多选
                vlan: "1",
                connect: ""
            },
            serial0:{
                name : "serial0/0",
                type : "s",
                Port_Status:"false",//on开启，false关闭
                Duplex:"",
                Clock_Rate :"",
                Mac_Address : "", //硬件地址
                IP_Address : "N/A",   //ipv4地址
                SubNet_Mask : "N/A",   //子网掩码
                Tx_ring_limit: "10",
                mode: "access",   //Access单选,Trunk多选
                vlan: "1",
                connect: ""
            },
            Console:{
                name : "Console",
                type : "c",
                Port_Status:"false",//on开启，false关闭
                Duplex:"",
                Clock_Rate :"",
                Mac_Address : "", //硬件地址
                IP_Address : "N/A",   //ipv4地址
                SubNet_Mask : "N/A",   //子网掩码
                Tx_ring_limit: "10",
                mode: "access",   //Access单选,Trunk多选
                vlan: "1",
                connect: ""
            }

        },
        this.module1 = {
            fastethernet0 :{
                name : "fastethernet1/0",
                type : "f",
                Port_Status:"false",//on开启，false关闭
                Bandwidth:"",
                Duplex:"",
                Mac_Address : "", //硬件地址
                IP_Address : "N/A",   //ipv4地址
                SubNet_Mask : "N/A",   //子网掩码
                Tx_ring_limit: "10",
                mode: "access",   //Access单选,Trunk多选
                vlan: "1",
                connect: ""
            },
            fastethernet1 :{
                name : "fastethernet1/1",
                type : "f",
                Port_Status:"false",//on开启，false关闭
                Bandwidth:"",
                Duplex:"",
                Mac_Address : "", //硬件地址
                IP_Address : "N/A",   //ipv4地址
                SubNet_Mask : "N/A",   //子网掩码
                Tx_ring_limit: "10",
                mode: "access",   //Access单选,Trunk多选
                vlan: "1",
                connect: ""
            },
            serial0:{
                name : "serial1/0",
                type : "s",
                Port_Status:"false",//on开启，false关闭
                Duplex:"",
                Clock_Rate :"",
                Mac_Address : "", //硬件地址
                IP_Address : "N/A",   //ipv4地址
                SubNet_Mask : "N/A",   //子网掩码
                Tx_ring_limit: "10",
                mode: "access",   //Access单选,Trunk多选
                vlan: "1",
                connect: ""
            }

        },
        this.vlanDatabse={
            vlan : [
                {
                    No : 1,
                    name : "default",
                    ip : ""
                }
            ]
        },
        this.Routing = {
            static :[],
            RIP : [],
            OSPF : ""
        }
}

netConfig.graphConfig = function () {
    this.hostName ="graph",//主机名
        this.portNum = 6,   //端口个数
        this.moduleNum = 1,//模块数
        this.module0 = [
            {
                name : "point0",
                type : "o",
                connect: ""
            },
            {
                name : "point1",
                type : "o",
                connect: ""
            },
            {
                name : "point2",
                type : "o",
                connect: ""
            },
            {
                name : "point3",
                type : "o",
                connect: ""
            },
            {
                name : "point4",
                type : "o",
                connect: ""
            },
            {
                name : "point5",
                type : "o",
                connect: ""
            }

        ]



}