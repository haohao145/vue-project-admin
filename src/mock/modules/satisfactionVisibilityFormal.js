import Mock from 'mockjs'

// 请求第一行的数据
export function login () {
  return {
    // isOpen: false,
    url: '/statistics/getCmbDynamicAnalysis',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 200,
      'expire': Mock.Random.natural(60 * 60 * 1, 60 * 60 * 12),
      'token': Mock.Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 32)
    }
  }
}

