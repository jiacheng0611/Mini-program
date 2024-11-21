package com.example.demo.controller;

import com.example.demo.common.Result;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    @GetMapping("/start")
    public Result start(){
        return Result.success("欢迎进入首页");
    }

    @GetMapping("/getUser")
    public Result getUser(){
        List<User> list = userService.getUser();
        return Result.success(list);
    }

    @PostMapping("/login")
    public Result login(@RequestBody User user){
        User loginuser = userService.login(user);
        System.out.println("userlogin:"+loginuser);
        if(loginuser == null){
           return Result.error("sorry");
        }
        else {
            return Result.success();
        }
    }

    // 注册接口
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (userService.registerUser(user)) {
            return "Registration successful!";
        } else {
            return "Username already exists!";
        }
    }

    @PostMapping("/merchantlogin")
    public Result merchantlogin(@RequestBody User user) {
        User loginuser = userService.merchantlogin(user);
        System.out.println(loginuser);
        if(loginuser == null){
            return Result.error("sorry");
        }
        else {
            return Result.success();
        }
    }

    @PostMapping("/merchantregister")
    public Result merchantregister(@RequestBody User user) {
        if (userService.merchantregisterUser(user)) {
            return Result.success();
        }
        return Result.error("sorry");
    }
}
