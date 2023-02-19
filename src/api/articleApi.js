import instanse from'./index'

export const getArticelCate = () => {
    return instanse({
        url:'/v1_0/user/channels',
        method:'GET'
    })
}
// 添加频道
export const addChannel = (channels) => {
    return instanse({
        url:'/v1_0/user/channels',
        method:'PUT',
        data:{
            channels:[channels]
        }
    })
}
// 删除频道
export const removeChannel = (channelId) => {
    return instanse({
        url:`/v1_0/user/channels/${channelId}`,
        method:'DELETE'
    })
}

export const getAllArticelCate = () => {
    return instanse({
        url:'/v1_0/channels',
        method:'GET'
    })
}

export const getHomeList = ({channel_id,timestamp}) =>{
    return instanse({
        url:'/v1_0/articles',
        method:'GET',
        params:{
            channel_id,timestamp
        }
    })
}

export const getArdetails = (article_id) => {
    return instanse({
        url:`/v1_0/articles/${article_id}`,
        method:'GET'
    })
}

export const followwingApi = (auId) => {
    return instanse({
        url:'/v1_0/user/followings',
        method:'POST',
        data:{
            target:auId
        }
    })
}

export const unfollowwingApi = (auId) => {
    return instanse({
        url:`/v1_0/user/followings/${auId}`,
        method:'DELETE'
    })
}


export const getCommentsApi = (params) => {
    return instanse({
        url:'/v1_0/comments',
        method:'GET',
        params
    })
}

export const addComment = (data) => {
    return instanse({
        url:'/v1_0/comments',
        method:'POST',
        data
    })
}