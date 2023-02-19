<template>
    <div>
        <van-cell title="历史搜索" icon="clock-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
                <van-icon name="delete-o" class="delete" />
            </template>
        </van-cell>
    </div>
</template>

<script>
export default {
    name: 'history'
}
</script>

<style lang="less" scoped>

</style>