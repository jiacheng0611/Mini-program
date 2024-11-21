package com.example.demo.service;

import com.example.demo.dao.BusinessDao;
import com.example.demo.dao.ItemDao;
import com.example.demo.entity.Dish;
import com.example.demo.entity.Item;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
public class ItemService {

    @Resource
    private ItemDao itemDao;



    public void createItem(List<Item> item,int order_id) {

        for (Item itemRequest : item) {
            Item newItem = new Item();
            newItem.setId(itemRequest.getId());
            newItem.setQuantity(itemRequest.getQuantity());
            newItem.setItem_name(itemRequest.getItem_name());
            // 打印接收到的订单项数据
            System.out.println("接收到的订单项数据: " + newItem);

            // 插入数据库
            itemDao.insert(newItem,order_id);
        }
    }

    public List<Dish> select_order(int id){
        System.out.println("接受到数据为："+ id);
        return itemDao.select_order(id);
    }
}
