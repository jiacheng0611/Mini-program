package com.example.demo.controller;

import com.example.demo.common.Result;
import com.example.demo.entity.Business;
import com.example.demo.service.BusinessService;
import jakarta.annotation.Resource;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/business")
public class BusinessController {

    @Resource
    private BusinessService businessService;

    @PostMapping("/add")
    public Result add(@RequestBody Business business) {
        businessService.add(business);
        return Result.success();
    }

    @GetMapping("/selectAll")
    public Result selectAll(Business business){
        List<Business> businesses = businessService.selectAll(business);
        return Result.success(businesses);
    }
}
