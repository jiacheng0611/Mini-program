package com.example.demo.entity;

import javax.persistence.*;

@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private int password;

    public int getId(){
        return id;
    }
    public void setId(int Id){
        this.id=Id;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name=name;
    }
    public int getPassword(){
        return password;
    }
    public void setPassword(int password){
        this.password=password;
    }
    @Override
    public String toString() {
        return "User [id=" + id + ", name=" + name + ", password=" + password + "]";
    }

}
