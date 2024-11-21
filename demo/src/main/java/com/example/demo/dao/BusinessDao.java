package com.example.demo.dao;

import com.example.demo.entity.Business;

import java.util.List;

public interface BusinessDao {

    List<Business> selectAll(Business business);

    int insert(Business business);
}
