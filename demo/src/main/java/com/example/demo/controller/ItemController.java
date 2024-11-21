package com.example.demo.controller;

import com.example.demo.common.Result;
import com.example.demo.entity.Dish;
import com.example.demo.entity.Item;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderRequest;
import com.example.demo.service.ItemService;
import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Resource
    private ItemService itemService;

//    @PostMapping("/add")
//    public Result add(@RequestBody List<Item> item) {
//        System.out.println("接收到的订单项数据: \n" + item);
//        itemService.createItem(item);
//        Order order = new Order();
//        order.setOrder_id(item.get(0).getId());
//        return Result.success();
//    }

    @GetMapping("/select")
    public ResponseEntity<List<Dish>> select_order_id (@RequestParam int order_id) {
//        System.out.println("接收到的订单项数据: \n" + orderRequest);
//        String id = orderRequest.getOrderId();
        System.out.println("接收到的订单项数据: \n" + order_id);
        List<Dish> new_order = itemService.select_order(order_id);
        System.out.println("接收到的订单项数据: \n" + new_order);
        System.out.println("new_order:"+new_order.isEmpty()+"\n");
        if (new_order.isEmpty() ) {
            System.out.println("222222222\n");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        else {
            System.out.println("11111\n");
            return  ResponseEntity.ok(new_order);
        }
    }
}
