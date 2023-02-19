<template>
    <div class="home-list">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功" 
        success-duration="1500"
        >
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                 <listItem v-for="item in list" :key="item.id" :listItems="item"/>
            </van-list>
        </van-pull-refresh>

    </div>
</template>

<script>
import { getHomeList } from '@/api/articleApi'
import listItem from './listItem.vue'
export default {
    name: 'homeList',
    props: {
        articleList: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            list: [],
            refreshing: false,
            loading: false,
            finished: false,
            theTime: null
        };
    },
    components:{
        listItem
    }, methods: {
        async onLoad() {
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            try {
                const res = await getHomeList({
                    channel_id: this.articleList.id,
                    timestamp: this.theTime || new Date().getTime()
                })
                console.log(res);
                const results = res.data.data.results
                this.list.push(...results)
                this.loading = false
                if(results.length) {
                    this.theTime = res.data.data.pre_timestamp
                }
            } catch (err) {
                console.log('请求失败', err);
                this.loading = false
            }
        },
        async onRefresh() {
            // 清空列表数据
            try {
                const res = await getHomeList({
                    channel_id: this.articleList.id,
                    timestamp:new Date().getTime()
                })
                const results = res.data.data.results
                this.list.unshift(...results)
                this.refreshing = false
            } catch (err) {
                console.log('请求失败', err);
            }
        }
    },
}
</script>

<style lang="less" scoped>
.home-list{
    // margin-top: 1.02rem;
    height: 85vh;
    overflow-y: auto;

}
</style>