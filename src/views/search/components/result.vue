<template>
    <div class="search-result">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ListItem v-for="item in list" :key="item.id" :listItems="item"/>
        </van-list>
    </div>
</template>

<script>
import { searchResultApi } from '@/api/search'
import ListItem from '@/views/home/compoments/listItem.vue'

export default {
    name: 'result',
    props: {
        keywords: {
            type: String,
            requred: true
        }
    },
    components:{
        ListItem
    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
        };
    },
    methods: {
       async onLoad() {
            // 异步更新数据
            const res = await searchResultApi(this.keywords)
            console.log(res);
                 this.list = res.data.data.results
                this.loading = false
                this.finished = true
                // 加载状态结束
                // 数据全部加载完成
        },
    },

}
</script>

<style lang="less" scoped>

</style>