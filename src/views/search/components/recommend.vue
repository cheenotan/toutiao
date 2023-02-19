<template>
    <div class="reco">
        <div class="reco-item" @click="$emit('search',item)" v-for="(item, index) in recoList" :key="index">
            <van-icon name="search" />
            <span>{{ item }}</span>
        </div>
    </div>
</template>

<script>
import { recommendApi } from '@/api/search'
import { debounce } from 'lodash'
export default {
    name: 'recommend',
    data() {
        return {
            recoList: []
        }
    },
    props: {
        keyWords: {
            type: String,
            requered: true
        }
    },
    watch: {
        keyWords: {
            // handler(value) {
            //    this.getRecommendList(value)
            // },
            handler: debounce(function (value) {
                this.getRecommendList(value)
            }, 500),
            immediate: true
        }
    },
    methods: {
        async getRecommendList(q) {
            const { data: res } = await recommendApi(q)
            console.log(res);
            this.recoList = res.data.options
        }
    }

}
</script>

<style lang="less" scoped>
.reco {
    margin-left: 22px;

    .reco-item {
        // border-bottom: .5px solid;
        font-size: 18px;
        font-weight: 500;
        margin-top: 20px;

        span {
            margin-left: 5px;
        }
    }
}
</style>