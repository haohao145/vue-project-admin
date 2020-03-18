//此文件定义全局常量
//-------------------------------------------------------------------------------------

//合并对象的插件  将两个对象合并成一个
import merge from 'lodash/merge'

var imgPathHead = '1'; //图片中的前缀 

//地址类型的需要在这判断环境变量
switch (process.env.NODE_ENV) {
    // 开发环境url
    case 'development':
        imgPathHead = '/proxyApi'
        break

        // // 生产环境url
    case 'production':
        imgPathHead = 'https//'
        break
}


/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
var adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
        't': new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
}


export default {
    imgPathHead, //图片src 前缀
    adornParams //get 请求默认参数
}
