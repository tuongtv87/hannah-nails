/** 不同请求服务的环境配置 */
export const serviceConfig = {
  dev: {
    url: 'http://localhost:5000/api',
    prefix: '/api',
    timeout: 60 * 1000,
  },
  test: {
    url: 'http://localhost:5000/api',
    prefix: '/api',
    timeout: 60 * 1000,
  },
  prod: {
    url: 'http://localhost:5000/api',
    prefix: '/api',
    timeout: 60 * 1000,
  },
}
