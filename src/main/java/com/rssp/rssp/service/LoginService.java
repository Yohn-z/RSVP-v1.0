package com.rssp.rssp.service;

import com.rssp.rssp.pojo.RsUser;
import com.rssp.rssp.response.Result;

import javax.servlet.http.HttpSession;

public interface LoginService {

    Result login(RsUser rsUser, HttpSession session);

    Result reg(RsUser rsUser,HttpSession session);

}
