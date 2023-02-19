
import {
    Button, NavBar, Form, Field, CountDown, Toast, Tabbar, TabbarItem, Icon, Dialog
    , Cell, CellGroup,Image as VanImage,Uploader,Tab, Tabs ,List ,PullRefresh ,Popup
    ,Grid, GridItem,Search,Tag ,Loading 
} from 'vant'

const vantArr = [Button, NavBar, Form, Field, CountDown, Toast, Tabbar, TabbarItem, Icon, Dialog
    , Cell,
    CellGroup,VanImage,Uploader ,Tab, Tabs,List ,PullRefresh ,Popup ,Grid, GridItem,Search ,Tag
    ,Loading 
]

export function parsevant(Vue) {
    vantArr.forEach(item => {
        return Vue.use(item)
    });
}