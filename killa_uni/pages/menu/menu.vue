<template>
    <view class="container">
        <!-- 左侧目录 -->
        <scroll-view scroll-y class="side-menu">
            <view
                class="menu-category"
                @tap="scrollToSection"
                :data-section="item.id"
                :wx:class="activeCategoryId === item.id ? 'active' : ''"
                v-for="(item, index) in categories"
                :key="index"
            >
                {{ item.name }}
            </view>
        </scroll-view>

        <!-- 右侧菜品展示 -->
        <scroll-view scroll-y class="menu-content" :scroll-into-view="scrollToView">
            <view id="section-1">
                <text class="section-title">精选单品</text>
                <block v-for="(item, index) in menu" :key="index">
                    <view class="menu-item">
                        <image :src="item.img" class="menu-item-img" mode="aspectFit"></image>
                        <view class="menu-item-info">
                            <text class="item-name">{{ item.name }}</text>
                            <text class="item-price">￥{{ item.price }}</text>
                            <view class="quantity-control">
                                <button class="quantity-btn decrease-btn" @tap="decreaseQuantity" :data-id="item.id">-</button>
                                <text class="quantity-text">{{ item.quantity }}</text>
                                <button class="quantity-btn increase-btn" @tap="increaseQuantity" :data-id="item.id">+</button>
                            </view>
                            <button class="add-cart-btn" :data-id="item.id" @tap="addToCart">加入购物车</button>
                        </view>
                    </view>
                </block>
            </view>

            <view id="section-2">
                <text class="section-title">经典套餐</text>
                <block v-for="(item, index) in menu2" :key="index">
                    <view class="menu-item">
                        <image :src="item.img" class="menu-item-img" mode="aspectFit"></image>
                        <view class="menu-item-info">
                            <text class="item-name">{{ item.name }}</text>
                            <text class="item-price">￥{{ item.price }}</text>
                            <view class="quantity-control">
                                <button class="quantity-btn decrease-btn" @tap="decreaseQuantity" :data-id="item.id">-</button>
                                <text class="quantity-text">{{ item.quantity }}</text>
                                <button class="quantity-btn increase-btn" @tap="increaseQuantity" :data-id="item.id">+</button>
                            </view>
                            <button class="add-cart-btn" :data-id="item.id" @tap="addToCart">加入购物车</button>
                        </view>
                    </view>
                </block>
            </view>

            <view id="section-3">
                <text class="section-title">超绝汤品</text>
                <block v-for="(item, index) in menu3" :key="index">
                    <view class="menu-item">
                        <image :src="item.img" class="menu-item-img" mode="aspectFit"></image>
                        <view class="menu-item-info">
                            <text class="item-name">{{ item.name }}</text>
                            <text class="item-price">￥{{ item.price }}</text>
                            <view class="quantity-control">
                                <button class="quantity-btn decrease-btn" @tap="decreaseQuantity" :data-id="item.id">-</button>
                                <text class="quantity-text">{{ item.quantity }}</text>
                                <button class="quantity-btn increase-btn" @tap="increaseQuantity" :data-id="item.id">+</button>
                            </view>
                            <button class="add-cart-btn" :data-id="item.id" @tap="addToCart">加入购物车</button>
                        </view>
                    </view>
                </block>
            </view>

            <view id="section-4">
                <text class="section-title">主食&套餐</text>
                <block v-for="(item, index) in menu4" :key="index">
                    <view class="menu-item">
                        <image :src="item.img" class="menu-item-img" mode="aspectFit"></image>
                        <view class="menu-item-info">
                            <text class="item-name">{{ item.name }}</text>
                            <text class="item-price">￥{{ item.price }}</text>
                            <view class="quantity-control">
                                <button class="quantity-btn decrease-btn" @tap="decreaseQuantity" :data-id="item.id">-</button>
                                <text class="quantity-text">{{ item.quantity }}</text>
                                <button class="quantity-btn increase-btn" @tap="increaseQuantity" :data-id="item.id">+</button>
                            </view>
                            <button class="add-cart-btn" :data-id="item.id" @tap="addToCart">加入购物车</button>
                        </view>
                    </view>
                </block>
            </view>

            <view class="cart-footer" @tap="goToCart">前往购物车</view>
        </scroll-view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            categories: [
                {
                    id: '1',
                    name: '精选单品'
                },
                {
                    id: '2',
                    name: '经典套餐'
                },
                {
                    id: '3',
                    name: '超绝汤品'
                },
                {
                    id: '4',
                    name: '主食&套餐'
                }
            ],

            activeCategoryId: '1',

            // 当前激活的分类
            scrollToView: '',

            // 控制右侧滚动的目标id
            menu: [
                {
                    category: '1',
                    id: 101,
                    name: '薯条',
                    price: 9,
                    quantity: 0,
                    img: '/static/images/fries.jpg'
                },
                {
                    category: '1',
                    id: 102,
                    name: '经典汉堡',
                    price: 15,
                    quantity: 0,
                    img: '/static/images/burger.jpg'
                },
                {
                    category: '1',
                    id: 103,
                    name: '冰橙果汁',
                    price: 11,
                    quantity: 0,
                    img: '/static/images/juice.jpg'
                },
                {
                    category: '1',
                    id: 104,
                    name: '蛋挞',
                    price: 8,
                    quantity: 0,
                    img: '/static/images/danta.jpg'
                },
                {
                    category: '1',
                    id: 105,
                    name: '至尊牛肉堡',
                    price: 18,
                    quantity: 0,
                    img: '/static/images/niubao.jpg'
                },
                {
                    category: '1',
                    id: 106,
                    name: '元气鸡排',
                    price: 12,
                    quantity: 0,
                    img: '/static/images/jipai.jpg'
                },
                {
                    category: '1',
                    id: 107,
                    name: '黑椒鸡块',
                    price: 8,
                    quantity: 0,
                    img: '/static/images/jikuai.jpg'
                },
                {
                    category: '1',
                    id: 108,
                    name: '菠萝派',
                    price: 7,
                    quantity: 0,
                    img: '/static/images/pai.jpg'
                }
            ],

            menu2: [
                {
                    category: '2',
                    id: 201,
                    name: '情侣套餐',
                    price: 26,
                    quantity: 0,
                    img: '/static/images/qinglv.jpg'
                },
                {
                    category: '2',
                    id: 202,
                    name: '三人套餐',
                    price: 39,
                    quantity: 0,
                    img: '/static/images/sanren.jpg'
                },
                {
                    category: '2',
                    id: 203,
                    name: '双人成行套餐',
                    price: 29,
                    quantity: 0,
                    img: '/static/images/shuang.jpg'
                }
            ],

            menu3: [
                {
                    category: '3',
                    id: 301,
                    name: '黑松露鸡肉汤',
                    price: 21,
                    quantity: 0,
                    img: '/static/images/jirou.jpg'
                },
                {
                    category: '3',
                    id: 302,
                    name: '牛肉罗宋汤',
                    price: 24,
                    quantity: 0,
                    img: '/static/images/niu.jpg'
                }
            ],

            menu4: [
                {
                    category: '4',
                    id: 401,
                    name: '风情意大利面',
                    price: 19,
                    quantity: 0,
                    img: '/static/images/yi.jpg'
                },
                {
                    category: '4',
                    id: 402,
                    name: '牛腩焗饭',
                    price: 24,
                    quantity: 0,
                    img: '/static/images/niunan.jpg'
                }
            ],

            menuName: ''
        };
    },
    methods: {
        // 切换分类并滚动到对应位置
        scrollToSection: function (e) {
            const sectionId = e.currentTarget.dataset.section; // 获取分类ID
            this.setData({
                activeCategoryId: sectionId,
                scrollToView: `section-${sectionId}` // 设置 scroll-into-view 的目标 ID
            });
        },

        // 查找菜品的通用方法
        findMenuItemById: function (itemId) {
            const allMenus = [...this.menu, ...this.menu2, ...this.menu3, ...this.menu4];
            return allMenus.find((item) => item.id === itemId);
        },

        // 添加到购物车
        addToCart: function (e) {
            const itemId = e.currentTarget.dataset.id;
            let cart = uni.getStorageSync('cart') || [];
            const item = this.findMenuItemById(itemId);
            if (item && item.quantity > 0) {
                const existingItemIndex = cart.findIndex((i) => i.id === itemId);
                if (existingItemIndex > -1) {
                    cart[existingItemIndex].quantity += item.quantity;
                } else {
                    cart.push({
                        ...item
                    });
                }
                uni.setStorageSync('cart', cart);
                uni.showToast({
                    title: '已加入购物车',
                    icon: 'success'
                });

                // 重置数量
                this.resetQuantity(itemId);
            } else {
                uni.showToast({
                    title: '请选择数量',
                    icon: 'none'
                });
            }
        },

        // 重置特定菜品的数量
        resetQuantity: function (itemId) {
            const menus = ['menu', 'menu2', 'menu3', 'menu4'];
            menus.forEach((menuName) => {
                const updatedMenu = this[menuName].map((item) => {
                    if (item.id === itemId) {
                        item.quantity = 0;
                    }
                    return item;
                });
                this.setData({
                    [menuName]: updatedMenu
                });
            });
        },

        // 增加数量
        increaseQuantity: function (e) {
            const itemId = e.currentTarget.dataset.id;
            const menus = ['menu', 'menu2', 'menu3', 'menu4'];
            menus.forEach((menuName) => {
                const updatedMenu = this[menuName].map((item) => {
                    if (item.id === itemId) {
                        item.quantity += 1;
                    }
                    return item;
                });
                this.setData({
                    [menuName]: updatedMenu
                });
            });
        },

        // 减少数量
        decreaseQuantity: function (e) {
            const itemId = e.currentTarget.dataset.id;
            const menus = ['menu', 'menu2', 'menu3', 'menu4'];
            menus.forEach((menuName) => {
                const updatedMenu = this[menuName].map((item) => {
                    if (item.id === itemId && item.quantity > 0) {
                        item.quantity -= 1;
                    }
                    return item;
                });
                this.setData({
                    [menuName]: updatedMenu
                });
            });
        },

        // 跳转到购物车页面
        goToCart: function () {
            uni.navigateTo({
                url: '/pages/cart/cart'
            });
        }
    }
};
</script>
<style>
/* 容器布局 */
.container {
    display: flex;
    flex-direction: row;
    height: 100vh; /* 页面高度全屏 */
}

/* 左侧菜单栏 */
.side-menu {
    width: 20%; /* 左侧目录占25%宽度 */
    background-color: #f8f8f8; /* 目录背景色 */
    padding: 10px;
    border-right: 1px solid #eee; /* 右边加个分割线 */
}

/* 目录按钮样式 */
.menu-category {
    padding: 15px;
    margin-bottom: 10px;
    background-color: #fff;
    text-align: center;
    border-radius: 10px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
}

.menu-category.active {
    background-color: #ffcc00; /* 激活时的样式 */
}

/* 右侧菜品展示 */
.menu-content {
    width: 75%; /* 菜品展示部分占75%宽度 */
    padding: 5px;
    overflow-y: auto; /* 支持竖向滚动 */
}

/* 每个菜品项的布局 */
.menu-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

/* 菜品图片样式 */
.menu-item-img {
    width: 200px; /* 调整菜品图片大小 */
    height: 150px;
    margin-right: 15px;
    border-radius: 8px; /* 图片圆角 */
}

/* 菜品名称和价格的区域 */
.menu-item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* 菜品名称样式 */
.item-name {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
}

/* 菜品价格样式 */
.item-price {
    font-size: 16px;
    color: #ff6600;
}

/* 数量控制区域 */
.quantity-control {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

/* 加号减号按钮样式 */
.quantity-btn {
    background-color: #ffcc00;
    border: none;
    color: #fff;
    width: 30px; /* 进一步缩小按钮宽度 */
    height: 30px; /* 进一步缩小按钮高度，保持和宽度一致 */
    border-radius: 50%; /* 保持圆形 */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px; /* 缩小字体以适应小按钮 */
    cursor: pointer;
}

/* 数量显示样式 */
.quantity-text {
    margin: 0 3px;
    font-size: 16px;
    width: 20px;
    text-align: center;
}

/* 加入购物车按钮 */
.add-cart-btn {
    background-color: #ff6600;
    color: white;
    padding: 5px;
    margin-top: 5px;
    text-align: center;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
}

/* 分类标题样式 */
.section-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
}
/* 底部前往购物车按钮样式 */
.cart-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #ff6600; /* 橙色按钮 */
    color: white;
    text-align: center;
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 25px 25px 0 0; /* 圆角设计 */
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2); /* 阴影效果，增强立体感 */
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 底部前往购物车按钮样式 */
.cart-footer {
    position: fixed;
    bottom: 20px; /* 调整底部间距 */
    left: 50%;
    transform: translateX(-50%); /* 使按钮水平居中 */
    width: 70%; /* 控制按钮宽度，使其不占满整个屏幕 */
    max-width: 400px; /* 限制最大宽度，避免在大屏幕上过宽 */
    background-color: #ff6600; /* 橙色按钮 */
    color: white;
    text-align: center;
    padding: 10px 20px; /* 缩小内边距 */
    font-size: 16px; /* 调整字体大小 */
    font-weight: bold;
    cursor: pointer;
    border-radius: 25px; /* 全圆角设计 */
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2); /* 减小阴影增强立体感 */
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 商品数量显示 */
.cart-footer span {
    margin-left: 10px;
    font-size: 16px;
    background-color: white; /* 白色背景用于突出商品数量 */
    color: #ff6600; /* 数量文字颜色为橙色 */
    padding: 5px 10px;
    border-radius: 15px;
    font-weight: bold;
}
</style>
