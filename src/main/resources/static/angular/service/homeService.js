app.service('homeService',function ($http) {

    
    this.init = function () {
        return $http.get('./network/init')
    }

    this.del = function (id) {
        return $http.get('./network/del?id='+id)
    }

    this.initBin = function () {
        return $http.get('./network/initBin')
    }

    this.delForever = function (id) {
        return $http.get('./network/delFor?id='+id)
    }

    this.restore = function (id) {
        return $http.get('./network/restore?id='+id)
    }

    this.logout = function () {
        return $http.get('./user/logout')
    }
})