<template>
    <view>
        <view class="container">
            <view class="section">
                <text class="section-title">订单概览</text>
                <view class="info-item">
                    <text>订单编号：</text>
                    <text>{{ order.order_id }}</text>
                </view>
                <view class="info-item">
                    <text>订单状态：</text>
                    <text>{{ order.order_status }}</text>
                </view>
                <view class="info-item">
                    <text>下单时间：</text>
                    <text>{{ order.order_time }}</text>
                </view>
            </view>

            <view class="section">
                <text class="section-title">用户信息</text>
                <view class="info-item">
                    <text>顾客姓名：</text>
                    <text>{{ order.order_user }}</text>
                </view>
                <!-- <view class="info-item"><text>联系方式：</text><text>{{order.contact}}</text></view>
    <view class="info-item"><text>送达地址/桌号：</text><text>{{order.address}}</text></view> -->
                <view class="info-item">
                    <text>用户人数：</text>
                    <text>{{ order.order_people }}</text>
                </view>
            </view>

            <view class="section">
                <text class="section-title">订单详情</text>
                <block v-for="(item, index) in orderDetails" :key="index">
                    <view class="info-item">
                        <text>{{ item.name }} x{{ item.quantity }}</text>
                    </view>
                </block>
                <view class="info-item">
                    <text>总金额：</text>
                    <text>￥{{ order.order_amount }}</text>
                </view>
                <!-- <view class="info-item"><text>备注：</text><text>{{order.remarks}}</text></view> -->
            </view>

            <!-- <view class="section">
    <text class="section-title">付款信息</text>
    <view class="info-item"><text>支付方式：</text><text>{{order.paymentMethod}}</text></view>
    <view class="info-item"><text>支付状态：</text><text>{{order.paymentStatus}}</text></view>
  </view> -->

            <!-- <view class="section">
    <text class="section-title">配送信息</text>
    <view class="info-item"><text>配送方式：</text><text>{{order.deliveryMethod}}</text></view>
    <view class="info-item"><text>配送员：</text><text>{{order.deliveryPerson}}</text></view>
    <view class="info-item"><text>预计送达时间：</text><text>{{order.estimatedTime}}</text></view>
  </view> -->
        </view>
        <view class="container">
            <!-- 返回按钮 -->
            <button class="back-button" @tap="goBack">返回</button>

            <!-- 其他订单详情部分... -->
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            order: {
                id: '123456',
                status: '待确认',
                time: '2024-01-06 21:24:05',
                customerName: '张三',
                contact: '12345678901',
                address: '北京市朝阳区某街道',

                items: [
                    {
                        name: '宫保鸡丁',
                        quantity: 2,
                        price: 20
                    },
                    {
                        name: '红烧肉',
                        quantity: 1,
                        price: 35
                    }
                ],

                totalPrice: 75,
                remarks: '不要辣',
                paymentMethod: '微信支付',
                paymentStatus: '已支付',
                deliveryMethod: '外卖',
                deliveryPerson: '李四',
                estimatedTime: '2024-01-06 22:00:00',
                order_id: '',
                order_status: '',
                order_time: '',
                order_user: '',
                order_people: '',
                order_amount: ''
            },

            orderDetails: ''
        };
    },
    onLoad: function (options) {
        const orderId = options.order_id;
        const orderUser = options.order_user;
        const orderTime = options.order_time;
        const orderPeople = options.order_people;
        const orderAmount = options.order_amount;
        const orderStatus = options.order_status;
        console.log('订单金额:', orderAmount);
        this.setData({
            order: {
                order_id: orderId,
                order_user: orderUser,
                order_time: orderTime,
                order_people: orderPeople,
                order_amount: orderAmount,
                order_status: orderStatus
            }
        });
        this.fetchOrderDetails(orderId);
    },
    methods: {
        fetchOrderDetails: function (orderId) {
            uni.request({
                url: `http://10.21.190.230:8080/item/select?order_id=${orderId}`,
                method: 'GET',
                success: (res) => {
                    if (res.statusCode === 200 && res.data) {
                        this.setData({
                            orderDetails: res.data
                        });
                        console.log('订单详情数据:', this.orderDetails);
                    } else {
                        uni.showToast({
                            title: '获取详情失败',
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

        // 返回到上一个页面
        goBack() {
            uni.navigateBack({
                delta: 1
            });
        }
    }
};
</script>
<style>
.container {
    padding: 16px;
    background-color: #f7f7f7;
}

.section {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 12px;
    border-left: 4px solid #ff7f50;
    padding-left: 8px;
}

.info-item {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: #666666;
    padding: 8px 0;
    border-bottom: 1px solid #eeeeee;
}

.info-item:last-child {
    border-bottom: none;
}

.back-button {
    background-color: #ff7f50;
    color: white;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 16px;
    text-align: center;
    margin-top: 20px;
    width: 100%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.back-button:hover {
    background-color: #ff6347;
}
</style>
