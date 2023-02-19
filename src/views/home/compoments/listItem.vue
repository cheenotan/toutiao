<template>
    <div @click="arID">
        <van-cell-group>
            <van-cell :title="listItems.title" class="van-multi-ellipsis--l2">
                <div slot="label">
                    <div class="img-cover" v-if="listItems.cover.type === 3" >
                        <van-image v-for="(imgs, index) in listItems.cover.images" :key="index" class="imgss" fit="cover" :src="imgs" />
                    </div>
                </div>
                <div slot="label">
                    <div class="infos">
                        <span>{{ listItems.aut_name }}</span>
                        <span>{{ listItems.comm_count }}评论</span>
                        <span>{{ timeFormat(listItems.pubdate) }}</span>
                    </div>
                </div>
                <div slot="default" class="right-cover" v-if="listItems.cover.type === 1">
                    <van-image width="4rem" height="2rem" fit="cover" :src="listItems.cover.images[0]" />
                </div>

            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
import { timeFormat } from '@/utils/timeFormat'

export default {
    name: 'listItem',
    props: {
        listItems: Object
       
    },
    methods: {
        timeFormat,
        arID() {
            console.log(this.listItems.art_id);
            this.$router.push({
                name:`arDetail`,
                query:{
                    article_id:this.listItems.art_id
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.van-cell-group {
    // height: 3rem;

    .van-cell {
        justify-content: space-between;

        .van-cell__title {
            // flex: unset;

            // display: flex;
            // flex-direction: column;
            // justify-content: space-between;
            .img-cover {
                display: flex;
                justify-content: space-evenly;
                margin: 30px 0;
                .imgss {
                    width: 2.5rem;
                    height: 1.8rem;
                }
            }

            .infos span {
                margin-right: .2rem;
            }

        }


        .van-cell__value {
            flex: unset;

            .right-cover {
                width: 3.5rem;
                height: 2rem;
            }

        }


    }


}
</style>