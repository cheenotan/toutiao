import instanse from './index'

export const recommendApi = (q) => {
    return instanse({
        url:'/v1_0/suggestion',
        method:'GET',
        params:{
            q
        }
    })
}

export const searchResultApi = (q) => {
    return instanse({
        url:'/v1_0/search',
        method:'GET',
        params:{
            page:1,
            per_page:10,
            q:q
        }
    })
}