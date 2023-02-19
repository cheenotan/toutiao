<template>
    <div class="eidt-container">
        <van-nav-bar class="page-nav-bar" title="编辑资料" left-text="返回" left-arrow @click-left="$router.back()" />
        <van-cell center title="头像" is-link value="内容">
            <template>
                 <van-image @click="onfileChange" fit="cover" round width="1.5rem" height="1.5rem" :src="userinfo.photo" />
                 <input type="file" ref="userimgRef" v-show="false" accept="image/*" @change="fileChange" />
            </template>
        </van-cell>
        <van-cell title="名称" is-link :value="userinfo.name" />
        <van-cell title="生日" is-link :value="userinfo.birthday" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import {updateUserImg} from '@/api/userApi'

export default {
    name: 'eidt',
    data() {
        return {

        }
    },
    computed: {
        ...mapState(['userinfo'])
    },
    methods: {
        async fileChange(e) {
            // console.log(e);
            if (e.target.files.length === 0) return
            this.$toast.loading({
                duration: 0,
                message: '头像上传中...',
                forbidClick: true,
            });
            console.log(e.target.files[0]);
            const fd = new FormData
            fd.append('photo',e.target.files[0])
            const res = await updateUserImg(fd)
            // console.log(res);
            if(res.status === 200) this.$toast.success('头像更新成功！')
            else {
                this.$toast.fail('头像更新失败')
            }
        },
        onfileChange() {
            this.$refs.userimgRef.click()
        }
    }
}
</script>

<style lang="less" scoped>
.preview-cover {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
}
</style>