app.controller('regController',function ($scope,regService) {



    $scope.user = {};


    $scope.rssp_current_user = {}

    $scope.reg = function () {
        showLoadingWindow()
        regService.reg($scope.user).success(
            function (response) {
                closeLoadingWindow()
                if (response.success){
                    window.location.href = './home'
                }else{
                    infoMessage(response.message)
                }
            }
        )
    }

    $scope.login = function () {
        showLoadingWindow()
        regService.login($scope.user).success(
            function (response) {
                closeLoadingWindow()
                if (response.success){
                    window.location.href = './home'
                } else {
                    infoMessage(response.message)
                }
            }
        )
    }

    $scope.isLogin = function () {
        regService.isLogin().success(
            function (response) {
                if (response.success){
                    $scope.rssp_current_user = response.object
                } else {
                    window.location.href = './login'
                }
            }
        )
        if (id!=null){
            editor.templateId = id
            showLoadingWindow()
            regService.findNetWork(id).success(
                function (response) {
                    var obj = response.object;
                    editor.templateName.html(obj.title);
                    obj = obj.topologyJson
                    obj = obj.replace(/'/g, '"');
                    console.log('------------------------------')
                    console.log(obj)
                    obj = JSON.parse(obj)
                    editor.init(id,obj,response.object.title);
                    closeLoadingWindow()
                }
            );
        }else{
            editor.init(id,"-1",'未命名文件');
        }
    }
})