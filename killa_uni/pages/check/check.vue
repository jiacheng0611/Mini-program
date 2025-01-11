<template>
    <view class="container">
        <text class="section-title">订单列表</text>

        <block v-for="(item, index) in orders" :key="index">
            <view class="order-item" @tap="viewOrderDetails" :data-id="item.orderId">
                <text>订单编号: {{ item.name }}</text>
                <text>顾客姓名: {{ item.id }}</text>
                <text>下单时间: {{ item.quantity }}</text>

                <button class="view-details-btn" @tap="viewOrderDetails" :data-id="item.orderId">查看详情</button>
                <!-- 添加查看详情按钮 -->

                <view class="divider"></view>
                <!-- 分隔线 -->
            </view>
        </block>

        <view class="no-orders" v-if="orders.length === 0">
            <text>暂无订单</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            orders: [] // 存放订单列表数据
        };
    },
    onLoad: function () {
        this.fetchOrders();
    },
    methods: {
        // 获取订单列表
        fetchOrders: function () {
            const orderId = 'kfc'; // 设置要查询的订单 ID
            uni.request({
                url: `http://10.21.190.230:8080/item/select?id=${orderId}`,
                // API 地址，使用查询参数
                method: 'GET',
                // 更改为 GET 方法
                success: (res) => {
                    if (res.statusCode === 200 && res.data) {
                        this.setData({
                            orders: res.data
                        }); // 将订单数据存入页面数据
                        console.log('订单数据:', res.data);
                    } else {
                        uni.showToast({
                            title: '获取订单失败',
                            icon: 'error'
                        });
                    }
                },
                fail: (err) => {
                    console.error('请求错误:', err);
                    uni.showToast({
                        title: '请求失败',
                        icon: 'error'
                    });
                }
            });
        },

        viewOrderDetails() {
            console.log('占位：函数 viewOrderDetails 未声明');
        }
    }
};
</script>
<style>
/* pages/check.wxss */
.order-list {
    padding: 16px;
}

.order-item {
    padding: 12px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    border-radius: 6px;
}
.view-details-btn {
    background-color: #007aff; /* 蓝色背景 */
    color: white; /* 白色文字 */
    padding: 5px 10px; /* 上下左右内边距 */
    border: none; /* 无边框 */
    border-radius: 5px; /* 圆角 */
    margin-top: 10px; /* 上边距 */
    cursor: pointer; /* 鼠标指针为手型 */
}

.view-details-btn:hover {
    background-color: #0056b3; /* 悬停时的背景色 */
}
</style>
