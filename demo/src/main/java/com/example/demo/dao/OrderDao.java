package com.example.demo.dao;

import com.example.demo.entity.Item_Order;
import com.example.demo.entity.Order;

import java.util.List;

public interface OrderDao {

    void insert(Order order) ;

    List<Item_Order> select_order();

    void delete_order(int order_id);

    void update_order_status(int order_id);
}
