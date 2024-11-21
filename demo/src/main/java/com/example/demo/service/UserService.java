package com.example.demo.service;

import com.example.demo.common.Result;
import com.example.demo.dao.UserDao;
import com.example.demo.entity.User;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Resource
    private UserDao userDao;

    public List<User> getUser() {
        return userDao.getUser();
    }

    public User login(User user) {
        if(user.getName()==null||"".equals(user.getName())){
            return null;
        }
        if(user.getPassword()==0||"".equals(user.getPassword())){
            return null;
        }
        User user1 =userDao.findByNameAndPassword(user.getName(),user.getPassword());

        return user1;
    }

    public boolean registerUser(User user) {
        userDao.register(user);
        return true;
    }

    public User merchantlogin(User user) {
        if(user.getName()==null||"".equals(user.getName())){
            return null;
        }
        if(user.getPassword()==0||"".equals(user.getPassword())){
            return null;
        }
        User user1 =userDao.merchantfindByNameAndPassword(user.getName(),user.getPassword());
        return user1;
    }

    public boolean merchantregisterUser(User user) {
        userDao.merchantregister(user);
        return true;
    }
}
