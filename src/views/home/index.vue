<template>
    <div class="home-container">
        <van-nav-bar class="page-nav-bar" fixed>
            <van-button to="/search" class="searchBtn" round slot="title" type="default" size="small" icon="search">搜索</van-button>

        </van-nav-bar>
        <!-- 标签页 -->
        <van-tabs class="home-tabs" color="rgba(40,146,255)" v-model="active" animated>
            <van-tab v-for="item in channels" :title="item.name">
                <homeList :articleList="item"></homeList>
            </van-tab>
            <div class="pleaseHolder" slot="nav-right"></div>
            <div @click="isPopupShow = true" class="editTabs" slot="nav-right">
                <van-icon size=".8rem" name="wap-nav" />
            </div>
        </van-tabs>
        <!-- 弹出层 -->
        <van-popup closeable v-model="isPopupShow" position="bottom" :style="{ height: '100%' }">
            <listEdit @removeITem="removeITem" @addItem="addItem" @updateActive="updateActive" :activeIndex="active"
                :listItems="channels" :allListItems="allChannels" />
        </van-popup>
    </div>
</template>

<script>
import { getArticelCate, getAllArticelCate, addChannel, removeChannel } from '@/api/articleApi'
import { mapState } from 'vuex'
import homeList from './compoments/homelist.vue'
import listEdit from './compoments/listEidt.vue'
export default {
    name: 'home',
    data() {
        return {
            active: 0,
            channels: [],
            allChannels: [],
            isPopupShow: false
        }
    },
    computed: {
        ...mapState(['user'])
    },
    components: {
        homeList, listEdit
    },
    created() {
        this.getArticleCates()
    },
    methods: {
        async getArticleCates() {
            let channels = []
            if (this.user.token) {
                // 已登录
                console.log(1);
                const res = await getArticelCate()
                // console.log(res);
                channels = res.data.data.channels
                this.channels = channels
            } else {
                console.log(2);
                // 未登录
                const localChannels = JSON.parse(window.localStorage.getItem('CHANNELS'))
                if (localChannels) {
                    console.log('local');
                    this.channels = localChannels
                } else {
                    console.log('net');
                    const res = await getArticelCate()
                    // console.log(res);
                    this.channels = res.data.data.channels
                }
            }

            const res2 = await getAllArticelCate()
            console.log(res2);
            if (res2.status === 200) {
                this.allChannels = res2.data.data.channels
            } else {
                this.$toast.fail('获取文章分类失败')
            }
        },
        // 删除频道
        async removeITem(item, index) {
            // console.log(item);
            this.channels.splice(index, 1)

            if (this.user.token) {
                // 已登录
                const res = await removeChannel(item.id)
                console.log(res);
            } else {
                console.log(2);
                // 未登录
                window.localStorage.setItem('CHANNELS', JSON.stringify(this.channels))
            }

        },
        updateActive(index, isPopupShow = true) {

            this.active = index
            this.isPopupShow = isPopupShow
        },
        // 添加频道
        async addItem(id) {
            this.channels.push(this.allChannels.find(items => {
                return items.id === id
            }))

            if (this.user.token) {
                console.log(1);
                // 已登录
                const res = await addChannel({
                    id: id,
                    seq: this.channels.length
                })
                console.log(res);

            } else {
                console.log(2);
                // 未登录
                window.localStorage.setItem('CHANNELS', JSON.stringify(this.channels))
            }
        }
    }
}
</script>

<style lang="less" scoped>
.home-container {
    margin-bottom: 1rem;
    padding-top: 2.2rem;

    .van-button {
        padding: 0 1.7rem;
        background-color: rgba(84, 167, 255);
        color: #fff;
        border: none;

        .van-icon-search {
            color: #fff;
        }
    }

    /deep/.home-tabs {
        .van-tabs__wrap {
            position: fixed;
            top: 1.2rem;
            z-index: 1;

            .van-tab--active {
                font-weight: 600;
            }

            .pleaseHolder {
                height: .6rem;
                width: .6rem;
                // background-color: #fff;
                flex-shrink: 0;
                // opacity: 0.9;
            }

            .editTabs {
                position: fixed;
                right: .2rem;
                // top: 10px;
                margin-top: .15rem;
                background-color: #fff;
                opacity: 0.8;

            }
        }
    }

}
</style>