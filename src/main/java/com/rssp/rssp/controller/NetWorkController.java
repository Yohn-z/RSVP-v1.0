package com.rssp.rssp.controller;

import com.rssp.rssp.entity.NetWorkEntity;
import com.rssp.rssp.oss.AliyunOSSUtil;
import com.rssp.rssp.pojo.RsNetwork;
import com.rssp.rssp.pojo.RsUser;
import com.rssp.rssp.response.Result;
import com.rssp.rssp.service.NetWorkService;
import com.rssp.rssp.service.impl.LoginServiceImpl;
import com.rssp.rssp.utils.BASEConvert;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.IOException;

@RestController
public class NetWorkController {

    @Autowired
    private NetWorkService netWorkService;
    @PostMapping("/network/save")
    public Result save(@RequestBody NetWorkEntity entity, HttpSession session) throws Exception {
        RsUser attribute = (RsUser) session.getAttribute(LoginServiceImpl.CURRENT_USER);
        if (attribute==null){
            return new Result(false,"用户信息已过期，请重新<a href='../login'>登录</a>");
        }
        if (entity.getId()==0){
            //新增
            MultipartFile file = BASEConvert.base64ToMultipart(entity.getPic());
            String url = AliyunOSSUtil.MultipartFileUpload(file);
            entity.setPic(url);
            RsNetwork rsNetwork = new RsNetwork();
            rsNetwork.setExtendOne(attribute.getId()+"");
            return netWorkService.saveNetWork(entity,rsNetwork);
        }else {
            //修改
            return netWorkService.modify(entity);
        }
    }

    @GetMapping("/network/init")
    public Result init(HttpSession session){
        RsUser attribute = (RsUser) session.getAttribute(LoginServiceImpl.CURRENT_USER);
        if (attribute==null){
            return new Result(false,"用户信息已过期，请重新<a href='../login'>登录</a>");
        }
        return netWorkService.getNetWorksById(attribute.getId()+"");
    }

    @GetMapping("/network/find")
    public Result find(long id){
        return netWorkService.find(id);
    }

    @GetMapping("/network/del")
    public Result del(long id){
        return netWorkService.del(id);
    }
    @GetMapping("/network/initBin")
    public Result initBin(HttpSession session){
        RsUser attribute = (RsUser) session.getAttribute(LoginServiceImpl.CURRENT_USER);
        if (attribute==null){
            return new Result(false,"用户信息已过期，请重新<a href='../login'>登录</a>");
        }
        return netWorkService.initBin(attribute.getId());
    }
    @GetMapping("/network/delFor")
    public Result delFor(long id,HttpSession session){
        RsUser attribute = (RsUser) session.getAttribute(LoginServiceImpl.CURRENT_USER);
        if (attribute==null){
            return new Result(false,"用户信息已过期，请重新<a href='../login'>登录</a>");
        }
        return netWorkService.delFor(id);
    }
    @GetMapping("/network/restore")
    public Result restore(long id,HttpSession session){
        RsUser attribute = (RsUser) session.getAttribute(LoginServiceImpl.CURRENT_USER);
        if (attribute==null){
            return new Result(false,"用户信息已过期，请重新<a href='../login'>登录</a>");
        }
        return netWorkService.restore(id);
    }

}
