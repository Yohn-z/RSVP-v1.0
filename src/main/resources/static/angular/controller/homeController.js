app.controller('homeController', function ($scope, homeService) {

    $scope.list = []

    $scope.init = function () {
        showLoadingWindow()
        homeService.init().success(
            function (response) {
                closeLoadingWindow()
                if (response.success) {
                    $scope.list = response.object
                } else {
                    infoMessage(response.message)
                }
            }
        )

    }

    $scope.edit = function (id) {
        showLoadingWindow()
        window.location.href = './network?id=' + id
    }

    $scope.delete = function (entity, $event) {
        $event.stopPropagation();
        layer.confirm('您确定要删除' + entity.title + '吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            showLoadingWindow()
            homeService.del(entity.id).success(
                function (response) {
                    closeLoadingWindow()
                    if (response.success) {
                        $scope.init()
                        successMessage(response.message)
                    } else {
                        infoMessage(response.message)
                    }
                }
            )
        })
    }

    $scope.initBin = function () {
        showLoadingWindow()
        homeService.initBin().success(
            function (response) {
                closeLoadingWindow()
                if (response.success) {
                    $scope.list = response.object
                } else {
                    infoMessage(response.message)
                }
            }
        )
    }

    $scope.delForever = function (entity) {
        layer.confirm('您确定要永久删除' + entity.title + '吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            showLoadingWindow()
            homeService.delForever(entity.id).success(
                function (response) {
                    closeLoadingWindow()
                    if (response.success) {
                        $scope.initBin()
                        successMessage(response.message)
                    } else {
                        infoMessage(response.message)
                    }
                }
            )
        })
    }

    $scope.showMenu = function (id,$event) {
        $event.stopPropagation();
        var show = $('#' + id + '').css('display')
        if (show == 'none') {
            $('#' + id + '').css('display', 'block');
        } else {
            $('#' + id + '').css('display', 'none');
        }
    }

    $scope.restore = function(entity){
        layer.confirm('您确定恢复' + entity.title + '吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            showLoadingWindow()
            homeService.restore(entity.id).success(
                function (response) {
                    closeLoadingWindow()
                    if (response.success) {
                        $scope.initBin()
                        successMessage(response.message)
                    } else {
                        infoMessage(response.message)
                    }
                }
            )
        })
    }

    $scope.closeMenu = function () {
        $('.menu').css('display', 'none');
    }

    $scope.showHeadMenu = function ($event) {
        $event.stopPropagation();
        var show = $('#head_menu').css('display')
        if (show == 'none') {
            $('#head_menu').css('display', 'block');
        } else {
            $('#head_menu').css('display', 'none');
        }
    }

    $scope.logout = function () {
        layer.confirm('您要退出当前账号吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            showLoadingWindow()
            homeService.logout().success(
                function (response) {
                    window.location.href = './'
                }
            )
        })
    }
})