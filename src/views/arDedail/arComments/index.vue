<template>
    <div class="comment-contaiter">
        <div class="lisit-title">
            <h3>评论列表</h3>
        </div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="list-item" v-for="(item, index) in list" :key="index">
                <!-- 使用 title 插槽来自定义标题 -->
                <div class="user-info">
                    <div class="left">
                        <div class="img">
                            <img :src="item.aut_photo" alt="">
                        </div>
                        <span class="name">{{ item.aut_name }}</span>
                    </div>
                    <div class="right">
                        <van-icon class="right-icon" name="good-job-o" />
                    </div>

                </div>
                <div class="content">
                    {{ item.content }}
                </div>
                <div class="bottom">
                    <div class="com-time">
                        {{ timeFormat(item.pubdate) }}
                    </div>
                    <div>
                        回复0
                    </div>
                </div>

            </div>
        </van-list>
    </div>
</template>

<script>
import { getCommentsApi } from '@/api/articleApi'
import { timeFormat } from '@/utils/timeFormat'

export default {
    name: 'ar-comments',
    data() {
        return {
            loading: false,
            finished: false,
            offset: null,
            limit: 10
        };
    },
    props: {
        arId: {
            type: [String, Number],
            required: true
        },
        list:{
            type: Array,
            default:() => []
        }
    },
    methods: {
        timeFormat,
        async onLoad() {
            // // 异步更新数据
            // // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            const res = await getCommentsApi({
                type: 'a',
                source: this.arId,
                offset: this.offset,
                limit: this.limit
            })
            console.log(res);
            this.list.push(...res.data.data.results) 
            this.loading = false
            // console.log(res);
            if (!res.data.data.result) {
                this.finished = true
            }



        },
    }
}
</script>

<style lang="less" scoped>
.comment-contaiter {
    .list-item {
        margin: 20px 0;

        .user-info {
            display: flex;
            justify-content: space-between;

            .left {
                display: flex;
                align-items: center;

                .img {
                    width: 1rem;
                    height: 1rem;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }

                .name {
                    font-size: 15px;
                    margin-left: 5px;
                }
            }

            .right {
                .right-icon {
                    font-size: 15px;
                }
            }
        }

        .content {
            padding: 10px 20px;
        }

        .bottom {
            font-size: 12px;
            
            display: flex;

            .com-time {
                margin-right: 30px;
            }
        }

        .content {}

    }

}
</style>