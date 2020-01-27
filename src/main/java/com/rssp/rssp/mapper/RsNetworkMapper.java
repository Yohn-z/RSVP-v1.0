package com.rssp.rssp.mapper;

import com.rssp.rssp.pojo.RsNetwork;
import com.rssp.rssp.pojo.RsNetworkExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RsNetworkMapper {
    int countByExample(RsNetworkExample example);

    int deleteByExample(RsNetworkExample example);

    int deleteByPrimaryKey(Long id);

    int insert(RsNetwork record);

    int insertSelective(RsNetwork record);

    List<RsNetwork> selectByExampleWithBLOBs(RsNetworkExample example);

    List<RsNetwork> selectByExample(RsNetworkExample example);

    RsNetwork selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") RsNetwork record, @Param("example") RsNetworkExample example);

    int updateByExampleWithBLOBs(@Param("record") RsNetwork record, @Param("example") RsNetworkExample example);

    int updateByExample(@Param("record") RsNetwork record, @Param("example") RsNetworkExample example);

    int updateByPrimaryKeySelective(RsNetwork record);

    int updateByPrimaryKeyWithBLOBs(RsNetwork record);

    int updateByPrimaryKey(RsNetwork record);
}