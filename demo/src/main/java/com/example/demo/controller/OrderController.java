package com.example.demo.controller;

import com.example.demo.common.Result;
import com.example.demo.entity.Item;
import com.example.demo.entity.Item_Order;
import com.example.demo.entity.Order;
import com.example.demo.service.ItemService;
import com.example.demo.service.OrderService;
import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Resource
    private OrderService orderService;

    @Resource
    private ItemService itemService;

    @PostMapping("/add")
    public Result add(@RequestBody Order order) {
        Date now = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
        String formattedDate = sdf.format(now);
        order.setOrder_time(formattedDate);
        List<Item> ItemList = order.getitemlist();
        int order_id = order.getOrder_id();
        itemService.createItem(ItemList,order_id);
        orderService.createOrder(order);
        return Result.success();
    }

    @GetMapping("/select")
    public ResponseEntity<List<Item_Order>> select() {
        List<Item_Order> order_list=orderService.select_order();
        System.out.println(order_list);
        if (order_list.isEmpty() ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        else {
            return  ResponseEntity.ok(order_list);
        }
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Map<String, Integer> requestData) {
        Integer order_id = requestData.get("order_id");
        System.out.println("删除的订单号为："+order_id);
        orderService.delete_order(order_id);
        return Result.success();
    }

    @PostMapping("/accept")
    public Result accept(@RequestBody Map<String, Integer> requestData) {
        Integer order_id = requestData.get("order_id");
        orderService.update_order_status(order_id);
        return Result.success();
    }

}
