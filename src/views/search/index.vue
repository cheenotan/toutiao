<template>
    <div class="search">
        <form action="/">
            <van-search shape="round" 
            background="rgba(84, 167, 255)" 
            v-model="value" 
            show-action 
            placeholder="请输入搜索关键词" 
            @search="onSearch"
            @cancel="onCancel"
            @focus="isResultShow = false"
             />
        </form>
        <Result :keywords="value" v-if="isResultShow" />
        <Recommend @search="onSearch" :keyWords="value" v-else-if="value" />
        <History v-else />
        
    </div>
</template>

<script>
import History from './components/history.vue';
import Recommend from './components/recommend.vue';
import Result from './components/result.vue';
export default {
    data() {
        return {
            value: '',
            isResultShow:false
        }
    },
    name: "search",
    components: { Recommend, Result, History },
    methods: {
        onSearch(val) {
            this.value = val
            this.isResultShow = true
        },
        // onFocus() {
        //     // this.isResultShow = false
        // },
        onCancel() {
            this.$router.back();
        },
    }
}
</script>

<style lang="less" scoped>

</style>