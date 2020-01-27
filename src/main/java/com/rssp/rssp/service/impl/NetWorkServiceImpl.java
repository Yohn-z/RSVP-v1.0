package com.rssp.rssp.service.impl;

import cn.hutool.core.img.ImgUtil;
import com.rssp.rssp.entity.NetWorkEntity;
import com.rssp.rssp.mapper.RsNetWorkMapperCustom;
import com.rssp.rssp.mapper.RsNetworkMapper;
import com.rssp.rssp.oss.AliyunOSSUtil;
import com.rssp.rssp.pojo.RsNetwork;
import com.rssp.rssp.response.Result;
import com.rssp.rssp.service.NetWorkService;
import com.rssp.rssp.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class NetWorkServiceImpl implements NetWorkService {

    @Autowired
    private RsNetworkMapper rsNetworkMapper;
    @Autowired
    private RsNetWorkMapperCustom rsNetWorkMapperCustom;

    @Override
    public Result saveNetWork(NetWorkEntity entity, RsNetwork rsNetwork) {

        rsNetwork.setId(IDUtils.genItemId());
        rsNetwork.setKind(entity.getType());
        rsNetwork.setTitle(entity.getName());
        rsNetwork.setTopologyJson(entity.getTopologyJson());
        rsNetwork.setSnapshot(entity.getPic());

        rsNetwork.setLastTime(DateUtils.getTime());
        rsNetwork.setStatus(0);
        rsNetwork.setTime(DateUtils.getTime());

        rsNetworkMapper.insert(rsNetwork);
        return new Result(true,"保存成功",null);
    }

    @Override
    public Result getNetWorksById(String id) {
        List<RsNetwork> myNetWorks = rsNetWorkMapperCustom.getMyNetWorks(id);
        return new Result(true,"加载列表",myNetWorks);
    }

    @Override
    public Result find(long id) {
        RsNetwork rsNetwork = rsNetworkMapper.selectByPrimaryKey(id);
        return new Result(true,"success",rsNetwork);
    }

    @Override
    public Result modify(NetWorkEntity entity) throws Exception {
        long id = entity.getId();
        RsNetwork network = rsNetworkMapper.selectByPrimaryKey(id);
        //删除旧的快照
        if (network!=null){
            AliyunOSSUtil.removeOSSImg(network.getSnapshot());
            MultipartFile file = BASEConvert.base64ToMultipart(entity.getPic());
            network.setSnapshot(AliyunOSSUtil.MultipartFileUpload(file));
            network.setLastTime(DateUtils.getTime());
            network.setTitle(entity.getName());
            network.setTopologyJson(entity.getTopologyJson());
            rsNetworkMapper.updateByPrimaryKeySelective(network);
            return new Result(true,"修改成功",null);
        }else {
            return new Result(false,"目标不存在");
        }
    }

    @Override
    public Result del(long id) {
        RsNetwork rsNetwork = rsNetworkMapper.selectByPrimaryKey(id);
        if (rsNetwork!=null){
            rsNetwork.setStatus(1);
            rsNetworkMapper.updateByPrimaryKeySelective(rsNetwork);
            return new Result(true,"删除成功，文件暂时保存在回收站。");
        }
        return new Result(false,"目标文件不存在或已删除");
    }

    @Override
    public Result initBin(long id) {
        List<RsNetwork> myBins = rsNetWorkMapperCustom.getMyBins(id);
        return new Result(true,"success",myBins);
    }

    @Override
    public Result delFor(long id) {
        RsNetwork rsNetwork = rsNetworkMapper.selectByPrimaryKey(id);
        if (rsNetwork!=null){
            String snapshot = rsNetwork.getSnapshot();
            AliyunOSSUtil.removeOSSImg(snapshot);
            rsNetworkMapper.deleteByPrimaryKey(rsNetwork.getId());
            return new Result(true,"彻底删除成功");
        }
        return new Result(false,"目标文件不存在或已删除");
    }

    @Override
    public Result restore(long id) {
        RsNetwork rsNetwork = rsNetworkMapper.selectByPrimaryKey(id);
        if (rsNetwork!=null){
            rsNetwork.setStatus(0);
            rsNetworkMapper.updateByPrimaryKeySelective(rsNetwork);
            return new Result(true,"恢复成功");
        }
        return new Result(false,"目标文件不存在或已删除");
    }
}
