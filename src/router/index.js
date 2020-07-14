import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Course from "../components/Course";
import CourseDetai from "../components/CourseDetai";
Vue.use(Router);

export default new Router({
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
    ]
})
