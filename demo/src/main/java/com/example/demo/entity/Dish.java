package com.example.demo.entity;

public class Dish {
    private int id;
    private int quantity;
    private String name;
    public void setId(int id) {
        this.id = id;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public int getId() {
        return id;
    }
    public int getQuantity() {
        return quantity;
    }

    @Override
    public String toString() {
        return "Dish [id=" + id + ", quantity=" + quantity + ", name=" + name + "]";
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
