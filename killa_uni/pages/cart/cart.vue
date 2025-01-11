<template>
    <view class="cart-container">
        <block v-for="(item, index) in cart" :key="index">
            <view class="cart-item">
                <view class="item-info">
                    <text class="item-name">{{ item.name }}</text>
                    <text class="item-price">单价：¥{{ item.price }}</text>
                    <text class="item-total">总价：¥{{ item.price * item.quantity }}</text>
                </view>
                <view class="quantity-control">
                    <button class="quantity-btn" @tap="decreaseQuantity" :data-id="item.id">-</button>
                    <text class="quantity">{{ item.quantity }}</text>
                    <button class="quantity-btn" @tap="increaseQuantity" :data-id="item.id">+</button>
                </view>
                <button class="remove-btn" @tap="removeFromCart" :data-id="item.id">移除</button>
            </view>
        </block>

        <!-- Conditionally render diners count -->
        <view v-if="showDinersCount" class="diners-count-container">
            <text>就餐人数：</text>
            <button class="quantity-btn" @tap="decreaseDinersCount">-</button>
            <text class="diners-count">{{ peopleCount }}</text>
            <button class="quantity-btn" @tap="increaseDinersCount">+</button>
        </view>

        <!-- Submit Order Button -->
        <button class="submit-order-btn" @tap="submitOrder">提交订单</button>
    </view>
</template>

<script>
export default {
    data() {
        return {
            cart: [],
            totalPrice: 0,
            peopleCount: 1,
            orderId: 1,
            showDinersCount: true
        };
    },
    onLoad: function () {
        // 加载购物车数据
        const cart = uni.getStorageSync('cart') || [];
        this.setData({
            cart
        });
        this.calculateTotalPrice();
        const savedOrderId = uni.getStorageSync('latestOrderId') || 1;
        this.setData({
            orderId: savedOrderId
        });
    },
    methods: {
        calculateTotalPrice: function () {
            let total = 0;
            this.cart.forEach((item) => {
                total += item.price * item.quantity;
            });
            this.setData({
                totalPrice: total
            });
        },

        generateNewOrderId: function () {
            const newOrderId = this.orderId + 1;
            this.setData({
                orderId: newOrderId
            });
            uni.setStorageSync('latestOrderId', newOrderId); // 更新本地缓存中的 order_id
            return newOrderId;
        },

        increaseQuantity: function (e) {
            const itemId = e.currentTarget.dataset.id;
            let cart = this.cart.map((item) => {
                if (item.id === itemId) {
                    item.quantity += 1;
                }
                return item;
            });
            this.setData({
                cart
            });
            uni.setStorageSync('cart', cart);
        },

        decreaseQuantity: function (e) {
            const itemId = e.currentTarget.dataset.id;
            let cart = this.cart.map((item) => {
                if (item.id === itemId && item.quantity > 1) {
                    item.quantity -= 1;
                }
                return item;
            });
            this.setData({
                cart
            });
            uni.setStorageSync('cart', cart);
        },

        increaseDinersCount: function () {
            this.setData({
                peopleCount: this.peopleCount + 1
            });
        },

        decreaseDinersCount: function () {
            if (this.peopleCount > 1) {
                this.setData({
                    peopleCount: this.peopleCount - 1
                });
            }
        },

        // 移除商品
        removeFromCart: function (e) {
            const itemId = e.currentTarget.dataset.id;
            let cart = this.cart.filter((item) => item.id !== itemId);
            this.setData({
                cart
            });
            uni.setStorageSync('cart', cart);
        },

        onPeopleInput: function (e) {
            const peopleCount = e.detail.value;
            this.setData({
                peopleCount
            });
        },

        // 提交订单
        submitOrder: function () {
            const orderItems = {
                order_id: this.generateNewOrderId(),
                order_user: 'kfc',
                // 示例用户名，你可以动态设置
                order_people: this.peopleCount,
                order_status: '未接单',
                order_amount: this.totalPrice,
                itemlist: this.cart.map((item) => ({
                    item_id: item.id,
                    item_quantity: item.quantity,
                    item_name: item.name
                }))
            };
            console.log('订单数据:', orderItems);
            // 发送请求到后端
            uni.request({
                url: 'http://10.21.190.230:8080/order/add',
                // 后端订单接口地址
                method: 'POST',
                data: orderItems,
                success: (res) => {
                    if (res.statusCode === 200) {
                        uni.showToast({
                            title: '订单提交成功',
                            icon: 'success'
                        });
                        // 清空购物车

                        uni.removeStorageSync('cart');
                        this.setData({
                            cart: []
                        });
                    } else {
                        uni.showToast({
                            title: '订单提交失败',
                            icon: 'error'
                        });
                        console.error('订单提交失败:', res);
                    }
                },
                fail: (err) => {
                    uni.showToast({
                        title: '网络请求失败',
                        icon: 'error'
                    });
                    console.error('请求失败:', err);
                }
            });
        }
    }
};
</script>
<style>
.cart-container {
    padding: 20px;
}

.cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.item-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
}

.item-price {
    font-size: 14px;
    color: #666;
    margin-top: 5px; /* Adjust the spacing here if needed */
}

.item-total {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
}

.quantity-control {
    display: flex;
    align-items: center;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    background-color: #ffcc00;
    color: #fff;
    border: none;
    border-radius: 50%;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
}

.quantity {
    font-size: 16px;
    width: 24px;
    text-align: center;
}

.remove-btn {
    background-color: #ff4d4d;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
}

.diners-count-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
}

.diners-count {
    margin: 0 10px;
    font-size: 18px;
    font-weight: bold;
}

.submit-order-btn {
    width: 100%;
    padding: 15px;
    background-color: #1e90ff;
    color: #fff;
    font-size: 18px;
    text-align: center;
    border-radius: 5px;
    margin-top: 20px;
}
</style>
