package com.example.demo.common;

public class Result {

    private static final boolean SUCCESS = true;
    private static final boolean ERROR= false;

    private boolean success;
    private String msg;
    private Object data;

    public static Result success() {
        Result result = new Result();
        result.setsuccess(SUCCESS);
        return result;
    }

    public static Result success(Object data) {
        Result result = new Result();
        result.setsuccess(SUCCESS);
        result.setData(data);
        return result;
    }

    public static Result error(String msg) {
        Result result = new Result();
        result.setsuccess(ERROR);
        result.setMsg(msg);
        return result;
    }   

    public boolean getsuccess() {
        return success;
    }
    public void setsuccess(boolean code) {
        this.success = code;
    }
    public String getMsg() {
        return msg;
    }
    public void setMsg(String msg) {
        this.msg = msg;
    }
    public Object getData() {
        return data;
    }
    public void setData(Object data) {
        this.data = data;
    }
}
