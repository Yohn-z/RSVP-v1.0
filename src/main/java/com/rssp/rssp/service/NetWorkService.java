package com.rssp.rssp.service;

import com.rssp.rssp.entity.NetWorkEntity;
import com.rssp.rssp.pojo.RsNetwork;
import com.rssp.rssp.response.Result;

import java.io.IOException;

public interface NetWorkService {

    Result saveNetWork(NetWorkEntity entity, RsNetwork rsNetwork);

    Result getNetWorksById(String id);

    Result find(long id);

    Result modify(NetWorkEntity entity) throws Exception;

    Result del(long id);

    Result initBin(long id);

    Result delFor(long id);

    Result restore(long id);
}
