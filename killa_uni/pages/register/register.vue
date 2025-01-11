<template>
    <view class="container">
        <!-- 标题 -->
        <view class="title">注册</view>

        <!-- 用户类型切换 -->
        <view class="role-selection">
            <text :class="selectedRole === 'user' ? 'selected' : ''" @tap="selectUser">我是用户</text>
            <text :class="selectedRole === 'merchant' ? 'selected' : ''" @tap="selectMerchant">我是商户</text>
        </view>

        <!-- 用户名输入框 -->
        <view class="input-box">
            <input class="input" placeholder="请输入账号" @input="onUsernameInput" />
        </view>

        <!-- 密码输入框 -->
        <view class="input-box">
            <input class="input" :password="true" placeholder="请输入密码" @input="onPasswordInput" />
        </view>

        <!-- 确认密码输入框 -->
        <view class="input-box">
            <input class="input" :password="true" placeholder="请再次输入密码" @input="onConfirmPasswordInput" />
        </view>

        <!-- 注册按钮 -->
        <button class="next-button" @tap="onRegister">注册</button>
    </view>
</template>

<script>
export default {
    data() {
        return {
            selectedRole: '',
            // 用户类型，"user" 或 "merchant"
            username: '',
            // 用户名
            password: '',
            // 密码
            confirmPassword: '' // 确认密码
        };
    },
    methods: {
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
            const { selectedRole, username, password, confirmPassword } = this;
            if (!selectedRole) {
                uni.showToast({
                    title: '请选择用户类型',
                    icon: 'none'
                });
                return;
            }
            if (!username || !password || !confirmPassword) {
                uni.showToast({
                    title: '请填写完整信息',
                    icon: 'none'
                });
                return;
            }
            if (password !== confirmPassword) {
                uni.showToast({
                    title: '两次密码不一致',
                    icon: 'none'
                });
                return;
            }

            // 选择不同的注册接口
            const url =
                selectedRole === 'user'
                    ? 'http://10.21.190.230:8080/user/register' // 用户注册接口
                    : 'http://10.21.190.230:8080/user/merchantregister'; // 商户注册接口

            // 发送请求到对应的接口
            uni.request({
                url,
                method: 'POST',
                data: {
                    name: this.username,
                    password: this.password
                },
                success(res) {
                    if (res.statusCode === 200) {
                        uni.showToast({
                            title: '注册成功',
                            icon: 'success'
                        });
                        // 注册成功后跳转到登录页面
                        uni.redirectTo({
                            url: '/pages/login/login'
                        });
                    } else {
                        uni.showToast({
                            title: '注册失败',
                            icon: 'none'
                        });
                    }
                },
                fail() {
                    uni.showToast({
                        title: '请求失败',
                        icon: 'none'
                    });
                }
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

.role-switch {
    display: flex;
    justify-content: center;
    width: 100%;
    border-bottom: 1px solid #ddd;
}

.role-option {
    flex: 1;
    text-align: center;
    padding: 10px;
    font-size: 16px;
    color: #666;
}

.active {
    color: #ff5722;
    border-bottom: 2px solid #ff5722;
}

.input-box {
    width: 100%;
    margin-bottom: 15px;
    position: relative;
}

.input {
    width: 100%;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding-left: 10px;
}

.get-code {
    position: absolute;
    right: 10px;
    top: 5px;
    background-color: #ff5722;
    color: #fff;
    border-radius: 5px;
    padding: 5px 10px;
}

.register-button {
    width: 100%;
    height: 40px;
    background-color: #ff5722;
    color: #fff;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 15px;
}

.agreement {
    margin-top: 15px;
    font-size: 14px;
    color: #666;
}

.link {
    color: #007aff;
}
.role-selection {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 20px;
}

.role-selection text {
    font-size: 18px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 45%;
    text-align: center;
    cursor: pointer;
}

.role-selection .selected {
    color: white;
    background-color: #ff5722;
    border-color: #ff5722;
}

.input-section input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.next-button {
    width: 100%;
    padding: 10px;
    background-color: #ff5722;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
