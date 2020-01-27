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
Util.loadProperties = function (lang){
    jQuery.i18n.properties({
        name: 'js',
        path: context + 'js/i18n/',
        mode: 'map',
        language: lang,
        callback: function () {
            // 加载成功后设置显示内容
        }
    });

}
var context = Util.getRootPath();
console.log(context);
