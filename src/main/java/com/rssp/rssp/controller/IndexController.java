package com.rssp.rssp.controller;

import com.rssp.rssp.service.LoginService;
import com.rssp.rssp.service.impl.LoginServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpSession;

@Controller
public class IndexController {


    @GetMapping("/network")
    public String network(HttpSession session) {
        Object attribute = session.getAttribute(LoginServiceImpl.CURRENT_USER);
        if (attribute == null) {
            return "redirect:login";
        }
        return "networkEditor";
    }

    @GetMapping("/home")
    public String home(HttpSession session) {
        Object attribute = session.getAttribute(LoginServiceImpl.CURRENT_USER);
        if (attribute == null) {
            return "redirect:login";
        }
        return "home";
    }

    @GetMapping("/graphEditor")
    public String graph() {
        return "graphEditor";
    }

    @GetMapping("/cmd")
    public String cmd() {
        return "cmd";
    }

    @GetMapping("/help")
    public String help() {
        return "help";
    }

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/reg")
    public String reg() {
        return "signup";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/bin")
    public String bin(HttpSession session) {
        Object attribute = session.getAttribute(LoginServiceImpl.CURRENT_USER);
        if (attribute == null) {
            return "redirect:login";
        }
        return "bin";
    }

}
