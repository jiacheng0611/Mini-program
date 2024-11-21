package com.example.demo.service;

import com.example.demo.dao.BusinessDao;
import com.example.demo.entity.Business;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import javax.persistence.Column;
import java.util.List;

@Service
public class BusinessService {

    @Resource
    private BusinessDao businessDao;

    public List<Business> selectAll(Business business){
        return businessDao.selectAll(business);
    }

    public void add(Business business) {
        Business params = new Business();
        params.setName(business.getName());
        List<Business> list = this.selectAll(params);
        
        businessDao.insert(business);
    }
}
