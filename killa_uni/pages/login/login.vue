<template>
    <view class="container">
        <!-- 标题 -->
        <view class="title">账号密码登录</view>

        <!-- 账号输入框 -->
        <view class="input-box">
            <input class="input" placeholder="请输入账号" @input="onUsernameInput" />
        </view>

        <!-- 密码输入框 -->
        <view class="input-box">
            <input class="input" :password="true" placeholder="请输入密码" @input="onPasswordInput" />
        </view>

        <!-- 登录按钮 -->
        <button class="login-button" @tap="onLogin">登录</button>

        <!-- 注册和忘记密码 -->
        <view class="secondary-buttons">
            <button class="register-button" @tap="navigateToRegister">注册</button>
        </view>

        <!-- 商户和用户选项 -->
        <radio-group class="role-options" @change="onRoleChange">
            <label class="role-option">
                <radio value="merchant" :checked="selectedRole === 'merchant'" />
                我是商户
            </label>
            <label class="role-option">
                <radio value="user" :checked="selectedRole === 'user'" />
                我是用户
            </label>
        </radio-group>
    </view>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            // 存储账号
            password: '',
            // 存储密码
            selectedRole: 'user' // 默认选择用户角色
        };
    },
    methods: {
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
            uni.showToast({
                title: `选择了${e.detail.value === 'merchant' ? '商户' : '用户'}`,
                icon: 'none'
            });
        },

        // 登录处理函数
        onLogin() {
            const { username, password, selectedRole } = this;
            if (!username || !password) {
                uni.showToast({
                    title: '请输入账号和密码',
                    icon: 'none'
                });
                return;
            }

            // 设置请求URL，根据不同角色发送不同接口请求
            const url = selectedRole === 'merchant' ? 'http://10.21.190.230:8080/user/merchantlogin' : 'http://10.21.190.230:8080/user/login';
            uni.request({
                url: url,
                method: 'POST',
                data: {
                    name: this.username,
                    password: this.password
                },
                success(res) {
                    if (res.statusCode === 200 && res.data.success) {
                        uni.showToast({
                            title: '登录成功',
                            icon: 'success'
                        });
                        // 登录成功后可以根据角色跳转到相应的页面
                        if (selectedRole === 'merchant') {
                            uni.navigateTo({
                                url: '/pages/business/business'
                            });
                        } else {
                            uni.navigateTo({
                                url: '/pages/menu/menu'
                            });
                        }
                    } else {
                        uni.showToast({
                            title: '登录失败，请检查账号或密码',
                            icon: 'none'
                        });
                    }
                },
                fail() {
                    uni.showToast({
                        title: '网络错误，请稍后重试',
                        icon: 'none'
                    });
                }
            });
        },

        // 导航到注册页面
        navigateToRegister() {
            uni.navigateTo({
                url: '/pages/register/register'
            });
        }
    }
};
</script>
<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 20px;
}

.input-box {
    width: 100%;
    margin-bottom: 15px;
}

.input {
    width: 100%;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding-left: 10px;
}

.login-button {
    width: 100%;
    height: 40px;
    background-color: #ff5722;
    color: #fff;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 15px;
}

.secondary-buttons {
    width: 100%;
    height: 40px;
    background-color: #d8d4d2;
    color: rgb(5, 0, 0);
    border-radius: 5px;
    font-size: 16px;
    margin-top: 15px;
}

.register-button,
.forgot-password-button {
    width: 100%;
    height: 40px;
    background-color: #ddd;
    color: #333;
    border-radius: 5px;
    font-size: 14px;
}

.role-options {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    justify-content: space-between; /* 增加间距 */
    width: 100%; /* 占满容器宽度 */
    padding: 0 10px; /* 给左右边缘留出空白 */
}

.role-option {
    flex: 1;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
