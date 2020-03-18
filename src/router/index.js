import Vue from 'vue'
import VueRouter from 'vue-router'
import {
    request
} from "@/api/apiList"
//使用默认参数 get请求的时候
import GLOBAL from "@/utils/global"
//验证是否是正确的http地址
import {
    isURL
} from '@/utils/validate'


Vue.use(VueRouter)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
// 路由路径只写  views /  后面的
const _import = require('./import-' + process.env.NODE_ENV)


// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [{
        path: '/404',
        component: _import('common/404'),
        name: '404',
        meta: {
            title: '404未找到'
        }
    },
    {
        path: '/login',
        component: _import('common/login'),
        name: 'login',
        meta: {
            title: '登录'
        }
    }
]



// 主入口路由(需嵌套上左右整体布局)   内容页面从这里进去  main 中包含有 头部 和左侧菜单
const mainRoutes = {
    path: '/',
    component: _import('main'),
    name: 'main',
    redirect: {
        name: 'home'
    },
    meta: {
        title: '主入口整体布局'
    },
    children: [
        // 通过meta对象设置路由展示方式
        // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
        // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
        // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
        {
            path: '/home',
            component: _import('home'),
            name: 'home',
            meta: {
                title: '首页'
            }
        },
        {
            path: '/theme',
            component: _import('common/theme'),
            name: 'theme',
            meta: {
                title: '主题'
            }
        }

    ],

    //导航守卫 从登录页要跳转到首页的时候， 进入到这个路由的时候需要做的判断 没有 token  就返回到登录页
    beforeEnter(to, from, next) {
        let token = Vue.cookie.get('token')
        if (!token || !/\S/.test(token)) {
            // clearLoginInfo()   //清空本地储存的  登录信息
            next({
                name: 'login'
            })
        }
        next()
    }
}





const router = new VueRouter({
    mode: 'hash',
    scrollBehavior: () => ({
        y: 0 //设置页面组件切换时 回到顶部
    }),
    // routes
    isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
    routes: globalRoutes.concat(mainRoutes) // 全局路由.concat(主路由内容入口)  方法将两个数组连接起来
})


// 开始真正的算法-----------------------------------------------------------------------------------------

//拦截路由，请求路由数据   在路由跳转之前(即将进入的路由对象,即将离开的路由,执行完了的话导航的状态就是confirmed)
router.beforeEach((to, from, next) => {

    // 添加动态(菜单)路由
    // 1. 已经添加 or 全局路由, 直接访问
    // 2. 获取菜单列表, 添加并保存本地存储

    //如果动态路由添加成功 或者访问的目标是全局路由中的  就向下走  可以访问
    if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
        next()
        //如果不是全局路由 就开始请求 动态路由
    } else {
        //发送请求 
        //请求参数 adornParams（参数，是否开启默认参数）
        let parameter = GLOBAL.adornParams();
        //请求路有数据
        request.nav(parameter).then(data => {
            if (data && data.code === 200) {
                //执行添加动态路由的方法  把请求回来的数据传参进去
                fnAddDynamicMenuRoutes(data.data.menuList)
                router.options.isAddDynamicMenuRoutes = true
                sessionStorage.setItem('menuList', JSON.stringify(data.data.menuList || '[]'))
                sessionStorage.setItem('permissions', JSON.stringify(data.data.permissions || '[]'))
                //接着往下走 跳转路由
                next({
                    ...to,
                    replace: true
                })
            } else {
                sessionStorage.setItem('menuList', '[]')
                sessionStorage.setItem('permissions', '[]')
                next()
            }
        }).catch((e) => {
            console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
            router.push({
                name: 'login'
            })
        })
    }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType(route, globalRoutes = []) {
    var temp = []
    for (var i = 0; i < globalRoutes.length; i++) {
        //判断即将进入的路由对象 等于 全局路由无需嵌套里面的  就返回一个 'global'
        if (route.path === globalRoutes[i].path) {
            return 'global'
            //当globalRoutes 中的 当前这条路由中包含有子路由的话 就证明这个是main路由  就将这个 路由放进 temp 数组中
        } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
            temp = temp.concat(globalRoutes[i].children)
        }
    }
    //如果 mian 里面的子路由存在的话 就在此判断是不是全局路由 因为 面的子路由有些事固定的
    return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
    var temp = []
    // console.log(menuList)
    //循环传参进来的动态路由数据
    for (var i = 0; i < menuList.length; i++) {
        //判断是否有子路由的数据  list  有的话 就放在  temp  数组中
        if (menuList[i].list && menuList[i].list.length >= 1) {
            temp = temp.concat(menuList[i].list)
            //判断是否 有 url（路由地址） 并且 这个url  是以/开头的
        } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
            //将开头的 /  换为 空
            menuList[i].url = menuList[i].url.replace(/^\//, '')

            //设置路由参数
            var route = {
                //把 / 换为 -
                path: menuList[i].url.replace('/', '-'),
                component: null,
                //name  和 path 一致
                name: menuList[i].url.replace('/', '-'),
                //
                meta: {
                    menuId: menuList[i].menuId,
                    title: menuList[i].name,
                    isDynamic: true,
                    isTab: true,
                    iframeUrl: ''
                }
            }
            // url以http[s]://开头, 通过iframe展示
            if (isURL(menuList[i].url)) {
                route['path'] = `i-${menuList[i].menuId}`
                route['name'] = `i-${menuList[i].menuId}`
                route['meta']['iframeUrl'] = menuList[i].url
            } else {
                //设置 component  路径
                try {
                    route['component'] = _import(`modules/${menuList[i].url}`) || null
                } catch (e) {
                    // console.log(e)
                }
            }
            // 想路由实例中添加路由
            routes.push(route)
        }
    }
    //开始处理子路由 再走一次 这个系统没有三级路由
    if (temp.length >= 1) {
        //
        fnAddDynamicMenuRoutes(temp, routes)
        //等没有子路由了
    } else {
        // 设置主路由name
        mainRoutes.name = 'main-dynamic'
        //把子路由放进  主路由
        mainRoutes.children = routes
        //添加动态路由
        router.addRoutes([
            //整理好的所有路由
            mainRoutes,
            //不存在的
            {
                path: '*',
                redirect: {
                    name: '404'
                }
            }
        ])
        sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
        console.log('\n')
        console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
        console.log(mainRoutes.children)
        console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
    }
}




export default router
