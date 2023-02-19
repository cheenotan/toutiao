<template>
    <div class="right">
        <van-tag v-if="!isFollow" @click="follow" plain type="primary">+ 关注</van-tag>
        <van-tag v-else @click="follow" plain type="primary">已关注</van-tag>
    </div>
</template>

<script>

import { followwingApi, unfollowwingApi } from '@/api/articleApi'

export default {

    name: 'follow-user',
    props: {
        isFollow: {
            type: Boolean,
            required: true
        },
        userId: {
            type: String,
            required: true
        }

    },
    methods: {
        async follow(value) {
            console.log(value);
            if (!this.isFollow) {
                console.log('去关注');
                const res = await followwingApi(this.userId)
                console.log(res);
                this.$toast.success('已关注')
                // this.$emit('updateStatus', !this.isFollow)




            } else if (this.isFollow) {
                console.log('取消');
                const res2 = await unfollowwingApi(this.userId)
                console.log(res2);
                this.$toast.success('取消关注')
                // this.$emit('updateStatus', !this.isFollow)
            } else {
                console.log('关注失败');
            }
            this.$emit('updateStatus', !this.isFollow)

        },
    }
}
</script>

<style lang="less" scoped>

</style>