package com.example.demo.service;

import com.example.demo.dao.OrderDao;
import com.example.demo.entity.Item_Order;
import com.example.demo.entity.Order;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Resource
    private OrderDao orderDao;


    public void createOrder(Order order) {
        orderDao.insert(order);
    }

    public List<Item_Order> select_order() {
        return orderDao.select_order();
    }

    public void delete_order(int order_id) {
        orderDao.delete_order(order_id);
    }

    public void update_order_status(int order_id) {
        orderDao.update_order_status(order_id);
    }
}
