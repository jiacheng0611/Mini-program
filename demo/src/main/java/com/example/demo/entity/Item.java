package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Item {

    @JsonProperty("item_id")
    private int item_id;
    @JsonProperty("item_quantity")
    private int item_quantity;
    @JsonProperty("item_name")
    private String item_name;

    public int getId() {
        return item_id;
    }
    public void setId(int id) {
        this.item_id = id;
    }
    public int getQuantity() {
        return item_quantity;
    }
    public void setQuantity(int quantity) {
        this.item_quantity = quantity;
    }
    @Override
    public String toString() {
        return "Item{" +
                "item_id=" + item_id +
                ", item_quantity=" + item_quantity +
                ", item_name='" + item_name +
                '}';
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }
}
