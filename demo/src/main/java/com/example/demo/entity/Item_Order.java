package com.example.demo.entity;

public class Item_Order {
    private int order_id;
    private String order_user;
    private String order_time;
    private String order_status;
    private int order_amount;
    private int order_people;
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
    public String getOrder_time() {
        return order_time;
    }
    public void setOrder_time(String order_time) {
        this.order_time = order_time;
    }
    public String getOrder_status() {
        return order_status;
    }
    public void setOrder_status(String order_status) {
        this.order_status = order_status;
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
    @Override
    public String toString() {
        return "Item_Order [order_id=" + order_id + ", order_user=" + order_user
                + ", order_time=" + order_time + ", order_status=" + order_status
                + ", order_amount=" + order_amount + ", order_people=" + order_people;
    }
}
