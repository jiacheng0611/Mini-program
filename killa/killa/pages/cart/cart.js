Page({
    data: {
      cart: [],
      totalPrice: 0,
      peopleCount: 1 ,
      orderId: 1,
      showDinersCount: true 
    },

    onLoad: function () {
      // 加载购物车数据
      const cart = wx.getStorageSync('cart') || [];
      this.setData({ cart });
      this.calculateTotalPrice(); 

      const savedOrderId = wx.getStorageSync('latestOrderId') || 1;
      this.setData({ orderId: savedOrderId });
    },

    calculateTotalPrice: function () {
      let total = 0;
      this.data.cart.forEach(item => {
        total += item.price * item.quantity;
      });
      this.setData({ totalPrice: total });
    },
    
    generateNewOrderId: function () {
      const newOrderId = this.data.orderId + 1;
      this.setData({ orderId: newOrderId });
      wx.setStorageSync('latestOrderId', newOrderId); // 更新本地缓存中的 order_id
      return newOrderId;
    },


    increaseQuantity: function (e) {
      const itemId = e.currentTarget.dataset.id;
      let cart = this.data.cart.map(item => {
        if (item.id === itemId) item.quantity += 1;
        return item;
      });
      this.setData({ cart });
      wx.setStorageSync('cart', cart);
    },
    
    decreaseQuantity: function (e) {
      const itemId = e.currentTarget.dataset.id;
      let cart = this.data.cart.map(item => {
        if (item.id === itemId && item.quantity > 1) item.quantity -= 1;
        return item;
      });
      this.setData({ cart });
      wx.setStorageSync('cart', cart);
    },

    increaseDinersCount: function () {
      this.setData({ peopleCount: this.data.peopleCount + 1 });
    },
  
    decreaseDinersCount: function () {
      if (this.data.peopleCount > 1) {
        this.setData({ peopleCount: this.data.peopleCount - 1 });
      }
    },

    // 移除商品
    removeFromCart: function (e) {
      const itemId = e.currentTarget.dataset.id;
      let cart = this.data.cart.filter(item => item.id !== itemId);
      this.setData({ cart });
      wx.setStorageSync('cart', cart);
    },
    onPeopleInput: function (e) {
      const peopleCount = e.detail.value;
      this.setData({ peopleCount });
    },

    // 提交订单
    submitOrder: function () {
      const orderItems = {
        order_id: this.generateNewOrderId(),
        order_user: 'kfc', // 示例用户名，你可以动态设置
        order_people: this.data.peopleCount,
        order_status: '未接单',
        order_amount:this.data.totalPrice,
        itemlist: this.data.cart.map(item => ({
          item_id: item.id,
          item_quantity: item.quantity,
          item_name: item.name
        }))
      };
      console.log("订单数据:", orderItems);
      // 发送请求到后端
      wx.request({
        url: 'http://localhost:8080/order/add', // 后端订单接口地址
        method: 'POST',
        data: orderItems,
        success: (res) => {
          if (res.statusCode === 200) {
            wx.showToast({
              title: '订单提交成功',
              icon: 'success'
            });
            // 清空购物车
            
            wx.removeStorageSync('cart');
            this.setData({ cart: [] });
          } else {
            wx.showToast({
              title: '订单提交失败',
              icon: 'error'
            });
            console.error("订单提交失败:", res);
          }
        },
        fail: (err) => {
          wx.showToast({
            title: '网络请求失败',
            icon: 'error'
          });
          console.error("请求失败:", err);
        }
      });
    }
  });
  