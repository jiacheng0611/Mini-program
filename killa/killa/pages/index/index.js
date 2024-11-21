Page({
  // data: {
  //   statuses: ["请选择", "待接单", "已接单"],
  //   statusIndex: 0,
  //   orders: [
  //     { id: "123456", time: "2024-01-06 21:24:05", table: "001", people: 3, amount: 17.00, status: "待接单" },
  //     { id: "789012", time: "2024-01-06 21:20:44", table: "001", people: 3, amount: 20.00, status: "待接单" },
  //     // 其他订单数据...
  //   ]
  // },
  data: {
    orders: [],  // 存放订单列表数据
  },

  onLoad: function () {
    this.fetchOrders();
  },

  // 获取订单列表
  fetchOrders: function () {
    wx.request({
      url: `http://localhost:8080/order/select`,  // API 地址，使用查询参数
      method: 'GET',  // 更改为 GET 方法
      success: (res) => {
        if (res.statusCode === 200 && res.data) {
          this.setData({ orders: res.data });  // 将订单数据存入页面数据
          console.log("订单数据:", this.data.orders);
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

  onStatusChange(e) {
    this.setData({
      statusIndex: e.detail.value
    });
  },

  onSearch() {
    console.log("搜索交易状态:", this.data.statuses[this.data.statusIndex]);
  },

  onPrevPage() {
    console.log("上一页");
  },

  onNextPage() {
    console.log("下一页");
  },
  viewOrderDetail: function (event) {
    const orderId = event.currentTarget.dataset.orderId;
    const orderUser = event.currentTarget.dataset.orderUser;
    const orderTime = event.currentTarget.dataset.orderTime;
    const orderPeople = event.currentTarget.dataset.orderPeople;
    const orderAmount = event.currentTarget.dataset.orderAmount;
    const orderStatus = event.currentTarget.dataset.orderStatus;

    console.log("状态：",orderStatus);

    if (orderId) {
      wx.navigateTo({
        url: `/pages/orderDetail/orderDetail?order_id=${orderId}&order_user=${orderUser}&order_time=${orderTime}&order_people=${orderPeople}&order_amount=${orderAmount}&order_status=${orderStatus}`
      });
    } else {
      wx.showToast({ title: '订单 ID 缺失', icon: 'error' });
    }
  },
// 接单功能
  acceptOrder(e) {
    const orderId = e.currentTarget.dataset.id;  // 获取订单 ID
    const currentStatus = e.currentTarget.dataset.status;  // 获取当前订单状态
    // 如果订单已接单，提示用户
    console.log("订单状态：",currentStatus);
    if (currentStatus === '已接单') {
      wx.showToast({
        title: '订单已接单',
        icon: 'none'
      });
      return;
    }

    // 添加点击动画
    this.setData({ isActive: orderId });
    setTimeout(() => {
      this.setData({ isActive: null }); // 恢复按钮样式
    }, 200); // 动画时长 200ms    

    // 调用后端接口接单
    wx.request({
      url: 'http://localhost:8080/order/accept',  // 替换为你的后端接单接口
      method: 'POST',
      data: { order_id: orderId },
      success: (res) => {
        if (res.statusCode === 200 ) {
          wx.showToast({
            title: '接单成功',
            icon: 'success'
          });

          // 更新订单状态到页面
          const updatedOrders = this.data.orders.map(order => {
            if (order.order_id === orderId) {
              order.status = 'accepted';
            }
            return order;
          });
          this.setData({ orders: updatedOrders });
          this.onLoad();
        } else {
          wx.showToast({
            title: '接单失败',
            icon: 'error'
          });
          console.error('接单失败:', res);
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '网络请求失败',
          icon: 'error'
        });
        console.error('接单请求失败:', err);
      }
    });
  },

  deleteOrder(e) {
    const orderId = e.currentTarget.dataset.id; // 获取订单 ID
    wx.request({
      url: 'http://localhost:8080/order/delete', // 后端删除接口
      method: 'POST',
      data: { order_id: orderId },
      success: (res) => {
        if (res.statusCode === 200) {
          wx.showToast({ title: '订单删除成功', icon: 'success' });
          this.fetchOrders(); // 删除成功后重新获取订单列表
        } else {
          wx.showToast({ title: '删除失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '请求失败', icon: 'none' });
      },
    });
  },
});
