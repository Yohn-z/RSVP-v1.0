package com.rssp.rssp.mapper;

import com.rssp.rssp.pojo.RsNetwork;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface RsNetWorkMapperCustom {

    @Select("SELECT\n" +
            "\trsn.id id,\n" +
            "  rsn.title title,\n" +
            "\trsn.`snapshot` `snapshot`\n" +
            "FROM\n" +
            "\trs_network rsn\n" +
            "WHERE\n" +
            "\trsn.extend_one = '${id}'" +
            "AND\n" +
            "\trsn.status = 0")
    List<RsNetwork> getMyNetWorks(@Param("id")String id);

    @Select("SELECT\n" +
            "\trsn.id id,\n" +
            "  rsn.title title,\n" +
            "\trsn.`snapshot` `snapshot`\n" +
            "FROM\n" +
            "\trs_network rsn\n" +
            "WHERE\n" +
            "\trsn.extend_one = '${id}'" +
            "AND\n" +
            "\trsn.status = 1")
    List<RsNetwork> getMyBins(@Param("id") long id);
}
