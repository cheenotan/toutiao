<template>
    <div class="profilel-container">
        <div class="info-card">
            <!-- 已登录 -->
            <div class="card-container" v-if="user.token">
                <div class="user-info">
                    <div class="user-left">
                        <img class="user-img" :src="userinfo.photo" alt="">
                        <span class="user-name">{{userinfo.name}}</span>
                    </div>
                    <div class="user-right">
                        <span class="edit" @click="$router.push('/edit')">编辑资料</span>
                    </div>
                </div>
                <div class="info-list">
                    <div class="info-item">
                        <h3>8</h3>
                        <span>头条</span>
                    </div>
                    <div class="info-item">
                        <h3>8</h3>
                        <span>关注</span>
                    </div>
                    <div class="info-item">
                        <h3>8</h3>
                        <span>粉丝</span>
                    </div>
                    <div class="info-item">
                        <h3>8</h3>
                        <span>获赞</span>
                    </div>
                </div>
            </div>
            <!-- 未登录 -->
            <div @click="$router.push('/login')" class="unlogin" v-else>
                <div class="unlogin-img">
                    <img src="@/assets/58dcd73302a43_610.jpg" alt="">
                </div>
                <div class="unlogin-text">
                    <span>登录</span>
                    <span>注册</span>
                </div>
            </div>


        </div>
        <div class="mid-btn">
            <div class="mid-left btn">
                <van-icon name="star-o" color="#ee0a24" size="40" />
                <span>收 藏</span>
            </div>
            <div class="mid-right btn">
                <van-icon name="clock-o" color="#1989fa" size="40" />
                <span>历 史</span>
            </div>
        </div>
        <div class="footer-btn">
            <div class="nav-bar">
                <span>消息中心</span>
                <van-icon name="arrow" size="15" color="#999" />
            </div>
            <div class="nav-bar">
                <span>小智同学</span>
                <van-icon name="arrow" size="15" color="#999" />
            </div>
            <van-button @click="loginOut" v-if="user.token" type="default" size="large">退出登录</van-button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import {getUserInfo} from '@/api/userApi'

export default {
    name: 'profile',
    data() {
        return {
            isLogin: true
        }
    },
    created() {
        this.getUserinfos()
    },
    computed: {
        ...mapState(['user','userinfo'])
    },
    methods: {
        // 获取用户信息
        async getUserinfos() {
            const {data:res} = await getUserInfo()
            console.log(res);
            this.$store.commit('setInfo',res.data)
        },
        // 退出登录
        loginOut() {
            this.$dialog.confirm({
                title: '提示',
                message: '是否确认退出登录？'
            }).then(()=>{
                this.$store.commit('setUser',{})
                window.localStorage.removeItem('vuex')
            }).catch(()=>{

            })
        }
    }



}
</script>

<style lang="less" scoped>
.info-card {

    width: 100%;
    height: 6rem;
    // padding: 0 .3rem 0 .3rem;
    background-color: rgba(70, 162, 255);

    .card-container {
        padding: .3rem;

        .user-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.2rem 0 .4rem 0;

            .user-left {
                display: flex;
                align-items: center;

                .user-img {
                    height: 1.8rem;
                    width: 1.8rem;
                    border-radius: .9rem;
                    margin-right: .2rem;
                }

                .user-name {
                    color: #fff;
                    font-size: .4rem;
                }
            }

            .user-right {
                .edit {
                    color: #999;
                    font-size: .3rem;
                    padding: .12rem;
                    background-color: #fff;
                    border: 1px solid;
                    border-radius: .3rem;
                }


            }
        }

        .info-list {
            display: flex;
            justify-content: space-around;
            align-items: center;

            .info-item {
                text-align: center;
                font-size: .35rem;
                color: #fff;
            }
        }


    }

    .unlogin {
        width: 100%;
        height: 100%;
        // text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .unlogin-img {
            height: 1.8rem;
            width: 1.8rem;
            ;

            img {
                height: 100%;
                width: 100%;
                border-radius: .9rem
            }
        }

        .unlogin-text {
            font-size: .4rem;
            color: #fff;
            // display: flex;
            margin: .2rem;

            span {
                margin: 0 .3rem;
            }
        }
    }


}

.mid-btn {
    display: flex;
    justify-content: space-around;
    margin-top: .3rem;
    padding: .1rem 0;
    background-color: #fff;

    .btn {
        text-align: center;

        span {
            font-size: .4rem;
            display: block;
        }
    }
}

.footer-btn {
    padding: 0 .3rem;
    background-color: #fff;

    .nav-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: .2rem 0;
        padding: .2rem 0;
        font-size: .45rem;

    }

    .van-button {
        margin: .2rem 0;

        .van-button__text {
            color: #ee0a24;
        }
    }

}
</style>