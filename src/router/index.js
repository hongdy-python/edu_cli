import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Course from "../components/Course";
import CourseDetai from "../components/CourseDetai";
import Cart from "../components/Cart";
import Order from "../components/Order";
import OrderSuccess from "../components/OrderSuccess";
import OrderList from "../components/OrderList";
Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            name: "home",
            component: Home
        },
        {
            path: '/home',
            name: "home",
            component: Home
        },
        {
            path: '/home/login',
            name: "login",
            component: Login
        },
        {
            path: '/home/register',
            name: "register",
            component: Register
        },
        {
            path: '/python',
            name: "course",
            component: Course
        },
        {
            path: '/course/detail/:id',
            name:"Detail",
            component: CourseDetai
        },
        {
            path: '/cart',
            name:"Cart",
            component: Cart
        },
        {
            path: '/order',
            name:"Order",
            component: Order
        },
        {
            path: '/python/order',
            name:"Order",
            component: Order
        },
        {
            path: '/ordersuccess',
            name:"OrderSuccess",
            component: OrderSuccess
        },
        {
            path: '/python/orderlist',
            name:"OrderList",
            component: OrderList
        },
        {
            path: '/orderlist',
            name:"OrderList",
            component: OrderList
        },
    ]
})
