package com.rssp.rssp.service.impl;

import ch.qos.logback.core.util.TimeUtil;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.IdUtil;
import com.github.pagehelper.util.StringUtil;
import com.rssp.rssp.mapper.RsUserMapper;
import com.rssp.rssp.pojo.RsUser;
import com.rssp.rssp.pojo.RsUserExample;
import com.rssp.rssp.response.Result;
import com.rssp.rssp.service.LoginService;
import com.rssp.rssp.utils.DateUtils;
import com.rssp.rssp.utils.IDUtils;
import com.rssp.rssp.utils.MD5Utils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;
@Service
public class LoginServiceImpl implements LoginService {
    private static final String DEFAULT_HEAD = "https://guolin.oss-cn-beijing.aliyuncs.com/system/2019-04-07/rssp_default_head.png";
    public static final String CURRENT_USER = "rssp_current_user";
    @Autowired
    private RsUserMapper rsUserMapper;

    @Override
    public Result login(RsUser rsUser, HttpSession session) {

        if (StringUtils.isEmpty(rsUser.getUsername()) || StringUtils.isEmpty(rsUser.getExtendOne())){
            return new Result(false,"请填写完整");
        }

        RsUserExample rsUserExample = new RsUserExample();
        RsUserExample.Criteria criteria = rsUserExample.createCriteria();
        criteria.andUsernameEqualTo(rsUser.getUsername());
        List<RsUser> rsUsers = rsUserMapper.selectByExample(rsUserExample);

        if (rsUsers.size()!=0){
            RsUser rsUser1 = rsUsers.get(0);
            if (MD5Utils.MD5(rsUser.getExtendOne() +  rsUser1.getSalt()) . equals(rsUser1.getExtendOne())){
                rsUser1.setExtendOne(null);
                session.setAttribute(CURRENT_USER,rsUser1);
                return new Result(true,"登录成功");
            }else {
                return new Result(false,"密码错误");
            }
        }else {
            return new Result(false,"未找到用户名");
        }
    }

    @Override
    public Result reg(RsUser rsUser, HttpSession session) {

        if (StringUtils.isEmpty(rsUser.getName()) || StringUtils.isEmpty(rsUser.getUsername())
                ||  StringUtils.isEmpty(rsUser.getExtendOne())){
            return new Result(false,"请填写信息完整",null);
        }

        String uuid = IdUtil.simpleUUID();
        rsUser.setSalt(uuid);
        long id = IDUtils.genItemId();
        rsUser.setId(id);
        rsUser.setExtendOne(MD5Utils.MD5(rsUser.getExtendOne() + uuid));
        rsUser.setHead(DEFAULT_HEAD);
        rsUser.setRole(0);
        rsUser.setTime(DateUtils.getTime());
        rsUserMapper.insert(rsUser);
        rsUser.setExtendOne(null);
        session.setAttribute(CURRENT_USER,rsUser);

        return new Result(true,"注册成功",null);

    }
}
