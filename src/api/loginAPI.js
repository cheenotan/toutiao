import instanse from './index'

export const loginApi  = ({mobile,code}) => {
    return instanse({
        url:'/v1_0/authorizations',
        method:'POST',
        data:{
            mobile,code 
        }
    })
}