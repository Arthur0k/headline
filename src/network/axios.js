import originAxios from 'axios'

export default function axios(config) {
  const instance = originAxios.create({
    baseURL: 'http://192.168.144.123:3000',
    timeout: 5000
  })
  instance.interceptors.request.use(
    config => {
      console.log('success')
      return config
    },
    err => err
  )
  instance.interceptors.response.use(
    res => {
      return res
    },
    err => err
  )

  return instance
}
