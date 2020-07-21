<template>
    <div class="cart">
        <Header></Header>
        <div class="cart_info">
            <div class="cart_title">
                <span class="text">我的购物车</span>
                <span class="total">共{{this.$store.state.cart_length}}门课程</span>
            </div>
            <div class="cart_table">
                <div class="cart_head_row">
                    <span class="doing_row"></span>
                    <span class="course_row">课程</span>
                    <span class="expire_row">有效期</span>
                    <span class="price_row">单价</span>
                    <span class="do_more">操作</span>
                </div>
                <div class="cart_course_list">
                    <CartItem v-for="(course,index) in cart_list" :key="index" :course="course"
                              @delete_course="del_cart(index)" @change_select="cart_total_price"></CartItem>
                </div>
                <div class="cart_footer_row">
                    <span class="cart_select" @click="change_all"><label> <el-checkbox v-model="all"
                    ></el-checkbox ><span >&nbsp&nbsp&nbsp全选</span></label></span>
                    <span class="cart_delete"><i class="el-icon-delete"></i> <span>删除</span></span>
                    <router-link to="/order" > <span class="goto_pay">去结算</span></router-link>

                    <span class="cart_total">总计：¥{{total_price}}</span>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import CartItem from "./common/CartItem";
    import Header from "./common/Header";
    import Footer from "./common/Footer";

    export default {
        name: "Cart",
        created() {
            this.get_cart();

        },
        data() {
            return {
                cart_list: '',
                total_price:0.00,  //购物车已经勾选的商品的总价格
                all:'',
            }
        },
        methods: {
            //检查用户是否已登录
            check_user_login() {
                let token = localStorage.user_token || sessionStorage.user_token;
                if (!token) {
                    let self = this;
                    this.$confirm("对不起请登录再添加购物车", {
                        callback() {
                            self.$router.push("/home/login/")
                        }
                    });
                    return false
                }else{
                     return token

                }


            },
            get_cart() {
                let token = this.check_user_login();
                this.$axios.get(`${this.$settings.HOST}cart/option/`, {
                    headers: {
                        //提交token必须在请求头声明token ，jwt必须有空格
                        "Authorization": "jwt " + token,
                    }
                }).then(response => {
                    this.cart_list = response.data;

                    //向状态车提交动作重新修改购物车长度
                    this.$store.commit("add_cart", this.cart_list.length);
                    //在购物车获取成功后，计算商品总价
                    this.cart_total_price();


                }).catch(error => {
                    console.log(error.response);
                })
            },

        //    全选与反选
            change_all(){
               if(this.all){
                   let token = this.check_user_login();
                   this.$axios.get(`${this.$settings.HOST}cart/option/`, {
                       headers: {
                           //提交token必须在请求头声明token ，jwt必须有空格
                           "Authorization": "jwt " + token,
                       }
                   }).then(response => {
                       this.cart_list = response.data;
                       this.cart_list.forEach((course, key) => {
                           course.selected = 0
                       });
                       //向状态车提交动作重新修改购物车长度
                       this.$store.commit("add_cart", this.cart_list.length);
                       //在购物车获取成功后，计算商品总价
                       this.cart_total_price();


                   }).catch(error => {
                       console.log(error.response);
                   })
               }else{
                   let token = this.check_user_login();
                   this.$axios.get(`${this.$settings.HOST}cart/option/`, {
                       headers: {
                           //提交token必须在请求头声明token ，jwt必须有空格
                           "Authorization": "jwt " + token,
                       }
                   }).then(response => {
                       this.cart_list = response.data;
                       this.cart_list.forEach((course, key) => {
                           course.selected = true
                       });
                       //向状态车提交动作重新修改购物车长度
                       this.$store.commit("add_cart", this.cart_list.length);
                       //在购物车获取成功后，计算商品总价
                       this.cart_total_price();
                   }).catch(error => {
                       console.log(error.response);
                   })
               }

            },

            del_cart(key){
                this.cart_list.splice(key,1);
                //删除后重新更新购物车课程数量
                this.$store.commit('add_cart',this.cart_list.length);
                //更新购物车价格
                this.cart_total_price();
            },
            //计算购物车商品总价
            cart_total_price(){
                let total = 0;
                let count = 0;
                let length = this.cart_list.length;
                this.cart_list.forEach((course,key)=>{
                    //判断商品是否被选中，选中则计入总价
                    if(course.selected){
                        total += parseFloat(course.real_price);
                        count++
                    }
                    this.total_price = total;
                });
                if (length === count) {
                    this.all = true;
                } else {
                    this.all = false;
                }
            },
        },
        components: {
            CartItem, Header, Footer
        },

    }
</script>

<style scoped>
    .cart_info {
        width: 1200px;
        margin: 0 auto 200px;
    }

    .cart_title {
        margin: 25px 0;
    }

    .cart_title .text {
        font-size: 18px;
        color: #666;
    }

    .cart_title .total {
        font-size: 12px;
        color: #d0d0d0;
    }

    .cart_table {
        width: 1170px;
    }

    .cart_table .cart_head_row {
        background: #F7F7F7;
        width: 100%;
        height: 80px;
        line-height: 80px;
        padding-right: 30px;
    }

    .cart_table .cart_head_row::after {
        content: "";
        display: block;
        clear: both;
    }

    .cart_table .cart_head_row .doing_row,
    .cart_table .cart_head_row .course_row,
    .cart_table .cart_head_row .expire_row,
    .cart_table .cart_head_row .price_row,
    .cart_table .cart_head_row .do_more {
        padding-left: 10px;
        height: 80px;
        float: left;
    }

    .cart_table .cart_head_row .doing_row {
        width: 78px;
    }

    .cart_table .cart_head_row .course_row {
        width: 530px;
    }

    .cart_table .cart_head_row .expire_row {
        width: 188px;
    }

    .cart_table .cart_head_row .price_row {
        width: 162px;
    }

    .cart_table .cart_head_row .do_more {
        width: 162px;
    }

    .cart_footer_row {
        padding-left: 30px;
        background: #F7F7F7;
        width: 100%;
        height: 80px;
        line-height: 80px;
    }

    .cart_footer_row .cart_select span {
        margin-left: -7px;
        font-size: 18px;
        color: #666;
    }

    .cart_footer_row .cart_delete {
        margin-left: 58px;
    }

    .cart_delete .el-icon-delete {
        font-size: 18px;
    }

    .cart_delete span {
        margin-left: 15px;
        cursor: pointer;
        font-size: 18px;
        color: #666;
    }

    .cart_total {
        float: right;
        margin-right: 62px;
        font-size: 18px;
        color: #666;
    }

    .goto_pay {
        float: right;
        width: 159px;
        height: 80px;
        outline: none;
        border: none;
        background: #ffc210;
        font-size: 18px;
        color: #fff;
        text-align: center;
        cursor: pointer;
    }
</style>
