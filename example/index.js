const vueLazyload = require('../src')
const Vue = require('vue')

const list = [
  'http://cn.bing.com/az/hprichbg/rb/DerbyshireSheep_ZH-CN8057416029_1920x1080.jpg',
  'http://cn.bing.com/az/hprichbg/rb/DerbyshireSheep_ZH-CN8057416029_1920x1080.jpg',
  'http://cn.bing.com/az/hprichbg/rb/DerbyshireSheep_ZH-CN8057416029_1920x1080.jpg',
  'http://cn.bing.com/az/hprichbg/rb/DerbyshireSheep_ZH-CN8057416029_1920x1080.jpg',
  'http://cn.bing.com/az/hprichbg/rb/DerbyshireSheep_ZH-CN8057416029_1920x1080.jpg',
  'http://cn.bing.com/az/hprichbg/rb/DerbyshireSheep_ZH-CN8057416029_1920x1080.jpg',
  'http://cn.bing.com/az/hprichbg/rb/DerbyshireSheep_ZH-CN8057416029_1920x1080.jpg',
  'http://cn.bing.com/az/hprichbg/rb/DerbyshireSheep_ZH-CN8057416029_1920x1080.jpg',
  'http://cn.bing.com/az/hprichbg/rb/DerbyshireSheep_ZH-CN8057416029_1920x1080.jpg',
  'http://cn.bing.com/az/hprichbg/rb/DerbyshireSheep_ZH-CN8057416029_1920x1080.jpg',
  'http://cn.bing.com/az/hprichbg/rb/DerbyshireSheep_ZH-CN8057416029_1920x1080.jpg',
  'http://cn.bing.com/az/hprichbg/rb/DerbyshireSheep_ZH-CN8057416029_1920x1080.jpg'  
]

Vue.use(vueLazyload, {
  threshold: 0,
  clientHeight: 500,
  class: 'loaded',
  placeholder: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
})

window.vm = new Vue({
  el: '#example',
  data () {
    return {
      list: [],
      src: ''
    }
  },
  mounted () {
    setTimeout(() => {
      this.list = list
    }, 1000)
  }
})