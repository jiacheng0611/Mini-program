Page({
  data: {
    orders: [],  // 存放订单列表数据
  },

  onLoad: function () {
    this.fetchOrders();
  },

  // 获取订单列表
  fetchOrders: function () {
    const orderId = 'kfc'; // 设置要查询的订单 ID
    wx.request({
      url: `http://localhost:8080/item/select?id=${orderId}`,  // API 地址，使用查询参数
      method: 'GET',  // 更改为 GET 方法
      success: (res) => {
        if (res.statusCode === 200 && res.data) {
          this.setData({ orders: res.data });  // 将订单数据存入页面数据
          console.log("订单数据:", res.data);
        } else {
          wx.showToast({ title: '获取订单失败', icon: 'error' });
        }
      },
      fail: (err) => {
        console.error("请求错误:", err);
        wx.showToast({ title: '请求失败', icon: 'error' });
      }
    });
  },
});
