package com.example.demo.dao;

import java.util.List;

import com.example.demo.entity.Dish;
import com.example.demo.entity.Item;
import org.apache.ibatis.annotations.Param;

public interface ItemDao {

    void insert(@Param("item") Item item,@Param("order_id") int order_id);

    List<Dish> select_order(int id);

}
