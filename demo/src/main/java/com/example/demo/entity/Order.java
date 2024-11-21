package com.example.demo.entity;

import java.util.Date;
import javax.persistence.*;
import java.util.List;

public class Order {
    private int order_id;
    private String order_user;

    private String order_time;

    private List<Item> itemlist;
    private int order_amount;
    private int order_people;
    private String order_status;
    public int getOrder_id() {
        return order_id;
    }
    public void setOrder_id(int order_id) {
        this.order_id = order_id;
    }
    public String getOrder_user() {
        return order_user;
    }
    public void setOrder_user(String order_user) {
        this.order_user = order_user;
    }
    public List<Item> getitemlist() {
        return itemlist;
    }
    public void setitemlist(List<Item> itemlist) {
        this.itemlist = itemlist;
    }

    public String getOrder_time() {
        return order_time;
    }

    public void setOrder_time(String order_time) {
        this.order_time = order_time;
    }
    @Override
    public String toString() {
        return "Order [order_id=" + order_id + ", order_user=" + order_user + ", order_time="
                + order_time + ", itemlist=" + itemlist + ", order_amount=" + order_amount
                + ", order_people=" + order_people + "]";
    }

    public int getOrder_amount() {
        return order_amount;
    }

    public void setOrder_amount(int order_amount) {
        this.order_amount = order_amount;
    }

    public int getOrder_people() {
        return order_people;
    }

    public void setOrder_people(int order_people) {
        this.order_people = order_people;
    }

    public String getOrder_status() {
        return order_status;
    }

    public void setOrder_status(String order_status) {
        this.order_status = order_status;
    }
}
