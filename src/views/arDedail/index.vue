<template>
    <div class="ar-detail">
        <van-nav-bar class="page-nav-bar top-bar" title="文章详情" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-loading v-if="!detailList.title" size="24px" vertical>加载中...</van-loading>
        <div v-else class="container">
            <h2 class="title">{{ detailList.title }}</h2>
            <div class="au-info">
                <div class="left">
                    <div class="left-img">
                        <img :src="detailList.aut_photo" alt="">
                    </div>
                    <div class="left-name">
                        <div class="name">{{ detailList.aut_name }}</div>
                        <div class="time">{{ timeFormat(detailList.pubdate) }}</div>
                    </div>
                </div>
                <UserFollow @updateStatus="detailList.is_followed = $event" :isFollow="detailList.is_followed"
                    :userId="detailList.aut_id" />
            </div>
            <div ref="contentRef" class="content markdown-body" v-html="detailList.content">
            </div>
            <ArComments :arId="detailList.art_id" :list="commentList"/>
        </div>
        <van-tabbar>
            <van-cell-group>
                <van-button @click="popShow" class="comment-buttom" size="normal" type="default">发布评论</van-button>
            </van-cell-group>
            <van-tabbar-item icon="search">标签</van-tabbar-item>
            <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        </van-tabbar>
        <van-popup v-model="isPopShow" position="bottom" :style="{ height: '15%' }">
           <CommentPost :arId="detailList.art_id" @add_comment="onAddComment"/>
        </van-popup>
    </div>
</template>

<script>
import { getArdetails } from '@/api/articleApi'
import { ImagePreview } from 'vant';
import { timeFormat } from '@/utils/timeFormat'
import UserFollow from '@/components/user-follow'
import ArComments from './arComments'
import CommentPost from './conponents/comment-post.vue'

export default {
    name: 'arDetail',
    data() {
        return {
            detailList: {},
            commentList:[],
            // isLoading:true，
            value: '',
            isPopShow: false
        }
    },
    components: {
        [ImagePreview.Component.name]: ImagePreview.Component, UserFollow, ArComments,CommentPost
    },
    created() {
        this.getArdeail()
    },
    methods: {
        timeFormat,
        async getArdeail() {
            const res = await getArdetails(this.$route.query.article_id)
            console.log(res);
            this.detailList = res.data.data
            setTimeout(() => {
                this.getImage()
            }, 0)

        },
        getImage() {
            const imgs = this.$refs.contentRef
            const Images = imgs.querySelectorAll('img')
            const contentImgs = []
            Images.forEach((img, index) => {
                contentImgs.push(img.src)
                img.onclick = () => {
                    ImagePreview({
                        images: contentImgs,
                        startPosition: index
                    })
                }
            })
        },
        onClickLeft() {
            this.$router.back()
        },
        popShow() {
            console.log(1);
            this.isPopShow = true
        },
        onAddComment(new_Obj) {
            this.commentList.unshift(new_Obj)
            this.isPopShow = false
        }
    }
}

</script>

<style lang="less" scoped>
@import "./github-markdown.css";

.top-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}

.container {
    padding: 0 .3rem;
    margin-top: 70px;
    margin-bottom: 70px;

    .au-info {
        display: flex;
        justify-content: space-between;
        padding: 20px 0 30px 0;
        border-bottom: .3px solid #EEEEEE;

        .left {
            display: flex;
            justify-content: space-between;

            .left-img {
                width: 1.7rem;
                height: 1.7rem;
                // border-radius: 50%;

                img {
                    height: 100%;
                    width: 100%;
                    border-radius: 50%;
                }
            }

            .left-name {
                margin-top: 6px;
                margin-left: 12px;

                .name {
                    font-size: 16px;
                }

                .time {
                    margin-top: 8px;
                    font-size: 13px;
                    color: gray;
                }
            }
        }

        .right {
            display: flex;
            align-items: center;
        }
    }

    .content {
        margin-top: 30px;
    }



}

.van-tabbar {
    align-items: center;

    .comment-buttom {
        width: 250px;
        height: 1rem;
    }
}
</style>