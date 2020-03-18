//引入封装好的请求方法
import {
    get,
    post
} from '../index'

//引入接口文件
//引入默认的请求地址 头  如 http:192.168.11:8080/api 接口地址  
import baseUrl from '../baseUrl'

//罗列请求方法  和接口
export default {
    //请求路由表     
    nav: (parameter) => get(baseUrl + '/sys/menu/nav', parameter),
    //登录
    login: (parameter) => post(baseUrl + '/sys/login', parameter),

    //请求菜单列表
    menuList: (parameter) => get(baseUrl + '/sys/menu/list', parameter),

}
