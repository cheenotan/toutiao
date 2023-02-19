<template>
    <div class="login">
        <van-nav-bar class="page-nav-bar" title="标题" />
        <van-form ref="formRef" @submit="onSubmit">
            <van-field type="number" :rules="formRules.mobile" v-model="user.mobile" name="手机号" label="手机号" />
            <van-field :rules="formRules.code" v-model="user.code" name="验证码" label="验证码">
                <template #button>
                    <van-count-down v-if="isCountDownShow" time="5000" format="ss 秒后重新发送"
                        @finish="isCountDownShow = false" />
                    <van-button native-type="button" v-else class="send-sms-btn" size="small" round type="default"
                        @click="sendSmsFn">发送验证码</van-button>
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { loginApi } from '@/api/loginAPI'

export default {
    data() {
        return {
            isCountDownShow: false,
            user: {
                mobile: '13911111111',
                code: '246810',
            },
            formRules: {
                mobile: [
                    { required: true, message: '手机号不能为空' },
                    { pattern: /^1[3|5|8]\d{9}$/, message: '手机号格式错误' }
                ],
                code: [
                    { required: true, message: '验证码不能为空' },
                    { pattern: /^\d{6}$/, message: '验证码格式错误' }
                ]
            }
        };
    },
    methods: {
        async onSubmit() {
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
            // console.log(1);
            try {
                const {data:res} = await loginApi(this.user)
                console.log(res);
                this.$store.commit('setUser',res.data)
                this.$toast('登录成功')
                this.$router.push('/home')
            } catch (err) {
                console.log(err);
            }
        },
        async sendSmsFn() {
            // try {
            //     await this.$refs.formRef.validate('mobile')
            // } catch(err){
            //     return console.log('验证失败',err);
            // }
            this.isCountDownShow = true
        }
    }
}
</script>

<style lang="less" scoped>
.send-sms-btn {
    background-color: rgba(236, 236, 236);
}
</style>