import instanse from './index'

export const getUserInfo = () => {
    return instanse({
        url: '/v1_0/user/profile',
        method:'GET'
    })
}

export const updateUserImg = (fd) => {
    return instanse({
        url:'/v1_0/user/photo',
        method:'PATCH',
        data:fd
    }) 
}