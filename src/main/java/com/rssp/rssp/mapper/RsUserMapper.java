package com.rssp.rssp.mapper;

import com.rssp.rssp.pojo.RsUser;
import com.rssp.rssp.pojo.RsUserExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;
public interface RsUserMapper {
    int countByExample(RsUserExample example);

    int deleteByExample(RsUserExample example);

    int deleteByPrimaryKey(Long id);

    int insert(RsUser record);

    int insertSelective(RsUser record);

    List<RsUser> selectByExample(RsUserExample example);

    RsUser selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") RsUser record, @Param("example") RsUserExample example);

    int updateByExample(@Param("record") RsUser record, @Param("example") RsUserExample example);

    int updateByPrimaryKeySelective(RsUser record);

    int updateByPrimaryKey(RsUser record);
}