<template>
    <div class="layout-container">
        <router-view />
        <van-tabbar route  @change="changeItem">
            <van-tabbar-item :class="[activeindex === 0? 'active' : 'inactive']" icon="home-o" to="home">首页</van-tabbar-item>
            <van-tabbar-item :class="[activeindex === 1? 'active' : 'inactive']" icon="search" to="qa">问答</van-tabbar-item>
            <van-tabbar-item :class="[activeindex === 2? 'active' : 'inactive']" icon="play-circle-o" to="videos">视频</van-tabbar-item>
            <van-tabbar-item :class="[activeindex === 3? 'active' : 'inactive']" icon="smile-o" to="profile">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeindex: 0,
        }
    },
    methods:{
        changeItem(index) {
           this.activeindex = index
        }
    }
}
</script>

<style lang="less" scoped>
.active {
    color: #ee0a24 !important;
}
.inactive {
    color: #000;
}
// .van-tabbar-item {
//     color: pink !important;
// }
</style>