Page({
  data: {
    selectedRole: '', // 用户类型，"user" 或 "merchant"
    username: '', // 用户名
    password: '', // 密码
    confirmPassword: '' // 确认密码
  },

  // 选择用户角色为“用户”
  selectUser() {
    this.setData({
      selectedRole: 'user'
    });
  },

  // 选择用户角色为“商户”
  selectMerchant() {
    this.setData({
      selectedRole: 'merchant'
    });
  },

  // 输入处理函数
  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    });
  },

  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  onConfirmPasswordInput(e) {
    this.setData({
      confirmPassword: e.detail.value
    });
  },

  // 注册按钮点击事件
  onRegister() {
    const { selectedRole, username, password, confirmPassword } = this.data;

    if (!selectedRole) {
      wx.showToast({
        title: '请选择用户类型',
        icon: 'none'
      });
      return;
    }

    if (!username || !password || !confirmPassword) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none'
      });
      return;
    }

    // 选择不同的注册接口
    const url =
      selectedRole === 'user'
        ? 'http://localhost:8080/user/register' // 用户注册接口
        : 'http://localhost:8080/user/merchantregister'; // 商户注册接口

    // 发送请求到对应的接口
    wx.request({
      url,
      method: 'POST',
      data: {
        name: this.data.username,
        password: this.data.password
      },
      success(res) {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '注册成功',
            icon: 'success'
          });
          // 注册成功后跳转到登录页面
          wx.redirectTo({
            url: '/pages/login/login'
          });
        } else {
          wx.showToast({
            title: '注册失败',
            icon: 'none'
          });
        }
      },
      fail() {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        });
      }
    });
  }
});
