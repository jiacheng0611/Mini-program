<template>
    <view class="container">

        <view class="order-list">
            <block v-for="(item, index) in orders" :key="index">
                <view class="order-item">
                    <view class="order-info">
                        <text class="order-id">订单号：{{ item.order_id }}</text>
                        <text class="order-time">{{ item.order_time }}</text>
                        <text class="order-time">用户名: {{ item.order_user }}</text>
                        <text class="order-time">用餐人数: {{ item.order_people }}</text>
                        <text class="order-amount">金额: ￥{{ item.order_amount }}</text>
                    </view>

                    <view class="order-actions">
                        <button
                            class="details-button"
                            :data-order-id="item.order_id"
                            :data-order-user="item.order_user"
                            :data-order-time="item.order_time"
                            :data-order-people="item.order_people"
                            :data-order-amount="item.order_amount"
                            :data-order-status="item.order_status"
                            @tap="viewOrderDetail"
                        >
                            详细菜单
                        </button>

                        <button :class="'status-button ' + (isActive === item.order_id ? 'active' : '')" @tap="acceptOrder" :data-id="item.order_id">
                            {{ item.order_status }}
                        </button>

                        <!-- 删除按钮 -->
                        <button class="delete-button" :data-id="item.order_id" @tap="deleteOrder">删除</button>
                    </view>
                </view>
            </block>
        </view>

        <view class="pagination">
            <button class="page-button" @tap="onPrevPage">上一页</button>
            <button class="page-button" @tap="onNextPage">下一页</button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 存放订单列表数据
            orders: [],

            statusIndex: '',
            isActive: ''
        };
    },
    onLoad: function () {
        this.onLoadClone3389();
    },
    methods: {
        onLoadClone3389: function () {
            this.fetchOrders();
        },

        // 获取订单列表
        fetchOrders: function () {
            uni.request({
                url: `http://10.21.190.230:8080/order/select`,
                // API 地址，使用查询参数
                method: 'GET',
                // 更改为 GET 方法
                success: (res) => {
                    if (res.statusCode === 200 && res.data) {
                        this.setData({
                            orders: res.data
                        }); // 将订单数据存入页面数据
                        console.log('订单数据:', this.orders);
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

        onStatusChange(e) {
            this.setData({
                statusIndex: e.detail.value
            });
        },

        onSearch() {
            console.log('搜索交易状态:', this.statuses[this.statusIndex]);
        },

        onPrevPage() {
            console.log('上一页');
        },

        onNextPage() {
            console.log('下一页');
        },

        viewOrderDetail: function (event) {
            const orderId = event.currentTarget.dataset.orderId;
            const orderUser = event.currentTarget.dataset.orderUser;
            const orderTime = event.currentTarget.dataset.orderTime;
            const orderPeople = event.currentTarget.dataset.orderPeople;
            const orderAmount = event.currentTarget.dataset.orderAmount;
            const orderStatus = event.currentTarget.dataset.orderStatus;
            console.log('状态：', orderStatus);
            if (orderId) {
                uni.navigateTo({
                    url: `/pages/orderDetail/orderDetail?order_id=${orderId}&order_user=${orderUser}&order_time=${orderTime}&order_people=${orderPeople}&order_amount=${orderAmount}&order_status=${orderStatus}`
                });
            } else {
                uni.showToast({
                    title: '订单 ID 缺失',
                    icon: 'error'
                });
            }
        },

        // 接单功能
        acceptOrder(e) {
            const orderId = e.currentTarget.dataset.id; // 获取订单 ID
            const currentStatus = e.currentTarget.dataset.status; // 获取当前订单状态
            // 如果订单已接单，提示用户
            console.log('订单状态：', currentStatus);
            if (currentStatus === '已接单') {
                uni.showToast({
                    title: '订单已接单',
                    icon: 'none'
                });
                return;
            }

            // 添加点击动画
            this.setData({
                isActive: orderId
            });
            setTimeout(() => {
                this.setData({
                    isActive: null
                }); // 恢复按钮样式
            }, 200); // 动画时长 200ms

            // 调用后端接口接单
            uni.request({
                url: 'http://10.21.190.230:8080/order/accept',
                // 替换为你的后端接单接口
                method: 'POST',
                data: {
                    order_id: orderId
                },
                success: (res) => {
                    if (res.statusCode === 200) {
                        uni.showToast({
                            title: '接单成功',
                            icon: 'success'
                        });

                        // 更新订单状态到页面
                        const updatedOrders = this.orders.map((order) => {
                            if (order.order_id === orderId) {
                                order.status = 'accepted';
                            }
                            return order;
                        });
                        this.setData({
                            orders: updatedOrders
                        });
                        this.onLoadClone3389({});
                    } else {
                        uni.showToast({
                            title: '接单失败',
                            icon: 'error'
                        });
                        console.error('接单失败:', res);
                    }
                },
                fail: (err) => {
                    uni.showToast({
                        title: '网络请求失败',
                        icon: 'error'
                    });
                    console.error('接单请求失败:', err);
                }
            });
        },

        deleteOrder(e) {
            const orderId = e.currentTarget.dataset.id; // 获取订单 ID
            uni.request({
                url: 'http://10.21.190.230:8080/order/delete',
                // 后端删除接口
                method: 'POST',
                data: {
                    order_id: orderId
                },
                success: (res) => {
                    if (res.statusCode === 200) {
                        uni.showToast({
                            title: '订单删除成功',
                            icon: 'success'
                        });
                        this.fetchOrders(); // 删除成功后重新获取订单列表
                    } else {
                        uni.showToast({
                            title: '删除失败',
                            icon: 'none'
                        });
                    }
                },
                fail: () => {
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
    padding: 13px;
    background-color: #f9f9f9;
}

.picker {
    font-size: 16px;
    color: #333;
    padding: 8px;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.order-list {
    margin-top: 20px;
}

.order-item {
    background-color: rgb(237, 240, 234);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.order-info text {
    display: block;
    font-size: 15px;
    color: #555;
}

.order-id {
    font-weight: bold;
    color: #333;
}

.order-time,
.order-amount {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: #666666;
    padding: 8px 0;
    border-bottom: 1px solid #222121;
}

.order-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.pagination {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

/* 通用按钮基础样式 */
button {
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
}

/* 详情按钮样式 */
.details-button {
    background-color: #ff8c42; /* 橙色 */
    color: #fff;
    padding: 10px 16px;
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    font-weight: bold;
}

.details-button:hover {
    background-color: #ff7a29;
    box-shadow: 0px 4px 8px rgba(255, 138, 66, 0.3);
}

.details-button:active {
    transform: scale(0.95);
}

/* 接单按钮样式 */
.status-button {
    background-color: #42a5f5; /* 蓝色 */
    color: #fff;
    padding: 10px 16px;
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    font-weight: bold;
}

.status-button:hover {
    background-color: #2196f3;
    box-shadow: 0px 4px 8px rgba(66, 165, 245, 0.3);
}

.status-button:active {
    transform: scale(0.95);
}

/* 删除按钮样式 */
.delete-button {
    background-color: #f44336; /* 红色 */
    color: #fff;
    padding: 10px 16px;
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    font-weight: bold;
}

.delete-button:hover {
    background-color: #e53935;
    box-shadow: 0px 4px 8px rgba(244, 67, 54, 0.3);
}

.delete-button:active {
    transform: scale(0.95);
}
</style>
