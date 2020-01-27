app.service('regService',function ($http) {

    this.reg = function (entity) {
        return $http.post('./user/reg',entity)
    }

    this.login = function (entity) {
        return $http.post('./user/login',entity)
    }

    this.isLogin = function () {
        return $http.get('./user/islogin')
    }

    this.findNetWork = function (id) {
        return $http.get('./network/find?id='+id)
    }

})