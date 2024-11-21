Page({
    data: {
      categories: [
        { id: '1', name: '精选单品' },
        { id: '2', name: '经典套餐' },
        { id: '3', name: '超绝汤品' },
        { id: '4', name: '主食&套餐' }
      ],
      activeCategoryId: '1', // 当前激活的分类
      scrollToView: '', // 控制右侧滚动的目标id
      menu: [ 
        { category: '1', id: 101, name: '薯条', price: 9, quantity: 0, img: '/images/fries.jpg' },
        { category: '1', id: 102, name: '经典汉堡', price: 15, quantity: 0, img: '/images/burger.jpg' },
        { category: '1', id: 103, name: '冰橙果汁', price: 11, quantity: 0, img: '/images/juice.jpg' },
        { category: '1', id: 104, name: '蛋挞', price: 8, quantity: 0, img: '/images/danta.jpg' },
        { category: '1', id: 105, name: '至尊牛肉堡', price: 18, quantity: 0, img: '/images/niubao.jpg' },
        { category: '1', id: 106, name: '元气鸡排', price: 12, quantity: 0, img: '/images/jipai.jpg' },
        { category: '1', id: 107, name: '黑椒鸡块', price: 8, quantity: 0, img: '/images/jikuai.jpg' },
        { category: '1', id: 108, name: '菠萝派', price: 7, quantity: 0, img: '/images/pai.jpg' },
      ],
      menu2: [
        { category: '2', id: 201, name: '情侣套餐', price: 26, quantity: 0, img: '/images/qinglv.jpg' },
        { category: '2', id: 202, name: '三人套餐', price: 39, quantity: 0, img: '/images/sanren.jpg' },
        { category: '2', id: 203, name: '双人成行套餐', price: 29, quantity: 0, img: '/images/shuang.jpg' }
      ],
      menu3: [
        { category: '3', id: 301, name: '黑松露鸡肉汤', price: 21, quantity: 0, img: '/images/jirou.jpg' },
        { category: '3', id: 302, name: '牛肉罗宋汤', price: 24, quantity: 0, img: '/images/niu.jpg' }
      ],
      menu4: [
        { category: '4', id: 401, name: '风情意大利面', price: 19, quantity: 0, img: '/images/yi.jpg' },
        { category: '4', id: 402, name: '牛腩焗饭', price: 24, quantity: 0, img: '/images/niunan.jpg' }
      ],
    },
    // 切换分类并滚动到对应位置
    scrollToSection: function(e) {
      const sectionId = e.currentTarget.dataset.section; // 获取分类ID
      this.setData({
        activeCategoryId: sectionId,
        scrollToView: `section-${sectionId}` // 设置 scroll-into-view 的目标 ID
      });
    },

    // 查找菜品的通用方法
    findMenuItemById: function (itemId) {
      const allMenus = [...this.data.menu, ...this.data.menu2, ...this.data.menu3, ...this.data.menu4];
      return allMenus.find(item => item.id === itemId);
    },

    // 添加到购物车
    addToCart: function (e) {
      const itemId = e.currentTarget.dataset.id;
      let cart = wx.getStorageSync('cart') || [];
      const item = this.findMenuItemById(itemId);
  
      if (item && item.quantity > 0) {
        const existingItemIndex = cart.findIndex(i => i.id === itemId);
        if (existingItemIndex > -1) {
          cart[existingItemIndex].quantity += item.quantity;
        } else {
          cart.push({ ...item });
        }
        wx.setStorageSync('cart', cart);
        wx.showToast({
          title: '已加入购物车',
          icon: 'success'
        });
  
        // 重置数量
        this.resetQuantity(itemId);
      } else {
        wx.showToast({
          title: '请选择数量',
          icon: 'none'
        });
      }
    },
  
    // 重置特定菜品的数量
    resetQuantity: function (itemId) {
      const menus = ['menu', 'menu2', 'menu3', 'menu4'];
      menus.forEach(menuName => {
        const updatedMenu = this.data[menuName].map(item => {
          if (item.id === itemId) item.quantity = 0;
          return item;
        });
        this.setData({ [menuName]: updatedMenu });
      });
    },
  
    // 增加数量
    increaseQuantity: function (e) {
      const itemId = e.currentTarget.dataset.id;
      const menus = ['menu', 'menu2', 'menu3', 'menu4'];
      menus.forEach(menuName => {
        const updatedMenu = this.data[menuName].map(item => {
          if (item.id === itemId) item.quantity += 1;
          return item;
        });
        this.setData({ [menuName]: updatedMenu });
      });
    },
  
    // 减少数量
    decreaseQuantity: function (e) {
      const itemId = e.currentTarget.dataset.id;
      const menus = ['menu', 'menu2', 'menu3', 'menu4'];
      menus.forEach(menuName => {
        const updatedMenu = this.data[menuName].map(item => {
          if (item.id === itemId && item.quantity > 0) item.quantity -= 1;
          return item;
        });
        this.setData({ [menuName]: updatedMenu });
      });
    },

    // 跳转到购物车页面
    goToCart: function () {
      wx.navigateTo({
        url: '/pages/cart/cart'
      });
    },


  });

  
  