<template>
    <view class="container">
        <button class="menu-button" @tap="goToOrderList">订单详情</button>
        <button class="menu-button" @tap="navigateToService">售后服务</button>
        <button class="menu-button" @tap="navigateToAccount">账户资金管理</button>
        <button class="menu-button" @tap="navigateToChat">员工聊天</button>
        <button class="menu-button" @tap="navigateToProduct">商品管理</button>
        <button class="menu-button" @tap="navigateToEvents">店铺活动</button>
        <button class="menu-button" @tap="navigateToTeam">我们的团队</button>
    </view>

    <!-- 添加跳转到订单列表的按钮 -->
</template>

<script>
// pages/business/business.js
export default {
    data() {
        return {};
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
    methods: {
        // 跳转到订单列表页面
        goToOrderList: function () {
            uni.navigateTo({
                url: '/pages/index/index' // 跳转到订单列表页面
            });
        },

        navigateToService() {
            console.log('占位：函数 navigateToService 未声明');
        },

        navigateToAccount() {
            console.log('占位：函数 navigateToAccount 未声明');
        },

        navigateToChat() {
            console.log('占位：函数 navigateToChat 未声明');
        },

        navigateToProduct() {
            console.log('占位：函数 navigateToProduct 未声明');
        },

        navigateToEvents() {
            console.log('占位：函数 navigateToEvents 未声明');
        },

        navigateToTeam() {
            console.log('占位：函数 navigateToTeam 未声明');
        }
    }
};
</script>
<style>
/* pages/business/business.wxss */
.menu-button {
    background-color: #ff7f50; /* 按钮背景色 */
    color: #fff; /* 文字颜色 */
    padding: 12px 20px; /* 内边距 */
    text-align: center; /* 文字居中 */
    border-radius: 8px; /* 圆角 */
    font-size: 16px; /* 字体大小 */
    font-weight: bold; /* 粗体 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影效果 */
    margin: 20px auto; /* 上下边距 */
    width: 90%; /* 宽度适中 */
}

.menu-button:hover {
    background-color: #ff6347; /* 悬停背景色变化 */
    cursor: pointer; /* 鼠标悬停变成指针 */
}
</style>
