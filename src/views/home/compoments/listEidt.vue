<template>
    <div class="list-eidt">
        <van-cell :border="false">
            <div slot="title">我的频道</div>
            <van-button @click="isEdit = !isEdit" round type="info" size="small">{{ isEdit ? '完 成' : '编 辑'
}}</van-button>
        </van-cell>
        <div class="myGrid">
            <van-grid :gutter="12" direction="horizontal">
                <van-grid-item @click="itemClick(item, index)"
                    :icon="isEdit && !fixedItem.includes(item.id) ? 'close' : ''" v-for="(item, index) in listItems"
                    :key="index">
                    <span :class="{ active: index === activeIndex }" class="text" slot="text">
                        {{ item.name }}
                    </span>
                </van-grid-item>
            </van-grid>
        </div>
        <!-- 分割 -->
        <van-cell :border="false">
            <div slot="title">推荐频道</div>
        </van-cell>
        <div class="newGrid">
            <van-grid :gutter="12" direction="horizontal">
                <van-grid-item @click="addItem(item.id)" :icon="isEdit ? 'plus' : ''"
                    v-for="(item, index) in newListItems" :key="index" :text="item.name" />
            </van-grid>
        </div>
    </div>
</template>

<script>
export default {
    name: 'listEdit',
    data() {
        return {
            isCloseShow: false,
            isEdit: false,
            fixedItem: [0, 11]
        }
    },
    props: {
        listItems: {
            type: Array,
            required: true
        },
        activeIndex: Number
        ,
        allListItems: Array
    },
    computed: {
        newListItems() {
            const newItems = []
            this.allListItems.forEach(items => {
                const newItem = this.listItems.find(listItem => {
                    return listItem.id == items.id
                })
                if (!newItem) {
                    newItems.push(items)
                }

            });

            return newItems
        }
    },
    methods: {
        itemClick(item, index) {
            // console.log(1);
            if (!this.isEdit) {
                this.$emit('updateActive', index, false)
                return
            } else {
                if (index <= this.activeIndex) {
                    this.$emit('updateActive', this.activeIndex - 1)
                }
                if (this.fixedItem.includes(item.id)) return
                this.$emit('removeITem',item, index)
            }


        },
        addItem(id) {
            if(!this.isEdit) return
            this.$emit('addItem', id)
        }

    }
}
</script>

<style lang="less" scoped>
.list-eidt {
    margin-top: 1rem;

    /deep/.myGrid {
        margin-top: .2rem;

        .van-grid-item {
            height: .9rem;

            .van-grid-item__content {
                background-color: #f4f5f6;

                .van-icon {
                    font-size: .3rem;
                    position: absolute;
                    top: -0.14rem;
                    right: -.14rem;
                    z-index: 2;
                }

            }

            .text {
                font-size: .3rem;
                white-space: nowrap;
                color: #999;
            }

            .active {
                color: #000;
                font-weight: 600;
            }

        }

    }

    /deep/.newGrid {
        margin-top: .3rem;

        .van-grid-item {
            height: .9rem;

            .van-grid-item__content {
                background-color: #f4f5f6;

                .van-icon {
                    font-size: .3rem;
                }

                .van-grid-item__text {
                    font-size: .2rem;
                    // white-space: nowrap;
                    max-width: 1rem;

                    overflow: hidden;

                    text-overflow: ellipsis;
                    white-space: nowrap
                }
            }
        }

    }

}
</style>