Page({
  data: {
    username: '',  // 存储账号
    password: '',  // 存储密码
    selectedRole: 'user'  // 默认选择用户角色
  },

  // 监听账号输入
  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    });
  },

  // 监听密码输入
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  // 角色选择处理
  onRoleChange(e) {
    this.setData({
      selectedRole: e.detail.value
    });
    wx.showToast({
      title: `选择了${e.detail.value === 'merchant' ? '商户' : '用户'}`,
      icon: 'none'
    });
  },

  // 登录处理函数
  onLogin() {
    const { username, password, selectedRole } = this.data;

    if (!username || !password) {
      wx.showToast({
        title: '请输入账号和密码',
        icon: 'none'
      });
      return;
    }

    // 设置请求URL，根据不同角色发送不同接口请求
    const url = selectedRole === 'merchant' ? 
    'http://localhost:8080/user/merchantlogin' : 
    'http://localhost:8080/user/login';

    wx.request({
      url: url,
      method: 'POST',
      data: {
        name: this.data.username,
        password: this.data.password
      },
      success(res) {
        if (res.statusCode === 200 && res.data.success ) {
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });
          // 登录成功后可以根据角色跳转到相应的页面
          if (selectedRole === 'merchant') {
            wx.navigateTo({
              url: '/pages/business/business'
            });
          } else {
            wx.navigateTo({
              url: '/pages/menu/menu'
            });
          }
        } else {
          wx.showToast({
            title: '登录失败，请检查账号或密码',
            icon: 'none'
          });
        }
      },
      fail() {
        wx.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none'
        });
      }
    });
  },

  // 导航到注册页面
  navigateToRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  }
});
