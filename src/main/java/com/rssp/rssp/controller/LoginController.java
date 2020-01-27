package com.rssp.rssp.controller;

import com.rssp.rssp.pojo.RsUser;
import com.rssp.rssp.response.Result;
import com.rssp.rssp.service.LoginService;
import com.rssp.rssp.service.impl.LoginServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
public class LoginController {


    @Autowired
    private LoginService loginService;


    @PostMapping("/user/reg")
    public Result reg(@RequestBody RsUser rsUser, HttpSession session) {
        return loginService.reg(rsUser, session);
    }

    @PostMapping("/user/login")
    public Result login(@RequestBody RsUser rsUser, HttpSession session) {
        return loginService.login(rsUser, session);
    }

    @GetMapping("/user/islogin")
    public Result isLogin(HttpSession session) {
        RsUser user = (RsUser) session.getAttribute(LoginServiceImpl.CURRENT_USER);
        if (user == null) {
            return new Result(false, "未登录");
        } else {
            return new Result(true, "已登录", user);
        }
    }
    @GetMapping("/user/logout")
    public Result logout(HttpSession session){
        session.invalidate();
        return new Result(true,"success");
    }
}
