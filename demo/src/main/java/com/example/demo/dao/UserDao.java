package com.example.demo.dao;

import com.example.demo.entity.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

@Repository
public interface UserDao extends Mapper<User> {

//    @Select("select * from user")
    List<User> getUser();

    @Select("select * from user where name = #{name} limit 1")
    User findByName(@Param("name")String name);

    @Select("select * from user where name = #{name} and password = #{password} limit 1")
    User findByNameAndPassword(@Param("name")String name, @Param("password")int password);


    void register(User user);


    User merchantfindByNameAndPassword(String name, int password);

    void merchantregister(User user);
}
