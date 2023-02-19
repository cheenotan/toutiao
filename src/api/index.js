import axios from 'axios'
import store from '@/store'

const instanse = axios.create({
    baseURL:'http://geek.itheima.net'
})

const instanseB = axios.create({
    baseURL:'https://toutiao.itheima.net'
})

instanse.interceptors.request.use(config=>{
    if(store.state.user.token) {
        config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config
}),function(error) {
    return Promise.reject(error)
}

export {instanseB}
export default instanse