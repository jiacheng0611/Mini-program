Page({
  data: {
    order: {
      id: "123456",
      status: "待确认",
      time: "2024-01-06 21:24:05",
      customerName: "张三",
      contact: "12345678901",
      address: "北京市朝阳区某街道",
      items: [
        { name: "宫保鸡丁", quantity: 2, price: 20.0 },
        { name: "红烧肉", quantity: 1, price: 35.0 }
      ],
      totalPrice: 75.0,
      remarks: "不要辣",
      paymentMethod: "微信支付",
      paymentStatus: "已支付",
      deliveryMethod: "外卖",
      deliveryPerson: "李四",
      estimatedTime: "2024-01-06 22:00:00"
    }
  },

  onLoad: function (options) {
    const orderId = options.order_id;
    const orderUser = options.order_user;
    const orderTime = options.order_time;
    const orderPeople = options.order_people;
    const orderAmount = options.order_amount;
    const orderStatus = options.order_status;
    console.log('订单金额:', orderAmount);
    this.setData({
      order: {
        order_id: orderId,
        order_user: orderUser,
        order_time: orderTime,
        order_people: orderPeople,
        order_amount: orderAmount,
        order_status: orderStatus
      }
    });
    this.fetchOrderDetails(orderId);
  },

  fetchOrderDetails: function (orderId) {
    wx.request({
      url: `http://localhost:8080/item/select?order_id=${orderId}`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && res.data) {
          this.setData({ orderDetails: res.data });
          console.log("订单详情数据:", this.data.orderDetails);
        } else {
          wx.showToast({ title: '获取详情失败', icon: 'error' });
        }
      },
      fail: (err) => {
        console.error("请求错误:", err);
        wx.showToast({ title: '请求失败', icon: 'error' });
      }
    });
  },

  // 返回到上一个页面
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});
