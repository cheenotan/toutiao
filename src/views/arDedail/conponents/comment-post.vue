<template>
    <div class="container">
        <van-field border v-model="message" rows="2" autosize type="textarea" maxlength="50"
            placeholder="请输入评论内容" show-word-limit />
        <van-button @click="onAddComment" >发布</van-button>
    </div>
</template>

<script>
import {addComment} from '@/api/articleApi'
export default {
    name: 'comment-post',
    data() {
        return {
            message: ''
        }
    },
    props: {
        arId: {
            type: [String, Number],
            required: true
        }
        },
    methods:{
       async onAddComment() {
            if(this.message.length < 3) {
                this.$toast.fail('最少输入3个字符')
            } else {
                const res = await addComment({
                    target:this.arId,
                    content:this.message
                })
                // console.log(res);
                if (res.status === 201) {
                    this.$toast.success('发布成功')
                    this.$emit('add_comment',res.data.data.new_obj)
                    this.message = ''
                    
                } else {
                    this.$toast.fail('发布失败！请重试')
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    display: flex;
    align-items: center;
    margin-top: 10px !important;
    .van-cell {
        background-color: #EEEEEE;
    }
}
</style>