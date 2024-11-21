package com.example.demo.entity;

public class OrderRequest {
    private String orderId;
    public String getOrderId() {
        return orderId;
    }
    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    @Override
    public String toString() {
        return "OrderRequest{" +
                "name='" + orderId + '\'' +
                '}';
    }
}
