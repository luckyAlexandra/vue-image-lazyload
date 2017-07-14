// Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器 , 第二个参数是一个可选的选项对象
// 通过全局方法 Vue.use() 使用插件

const Lazyload = module.exports = {}

Lazyload.install = function (Vue, options) {
  options  = options || {}
  options.threshold = options.threshold || 0
  options.clientHeight = options.clientHeight || 0
  let stack = {}
  let uid = 0
  let flag = true

  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  // 这里将会被 `bind` 和 `update` 调用
  Vue.directive('lazy', {
    // 只调用一次，指令第一次绑定到元素时调用
    bind (el, binding, vnode, oldVnode) {
      el._uid = uid++
      el._isImg = el.nodeName.toUpperCase() === 'IMG'
      if (el._isImg && options.placeholder && !el.src) {
        el.src = options.placeholder
      }
    },
    // 被绑定元素插入父节点时调用,（父节点存在即可调用，不必存在于 document 中）
    inserted (el, binding, vnode, oldVnode) {
      binding.def.update(el, binding)
    },
    // 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。
    update (el, binding, vnode, oldVnode) {
      let value = binding.value
      if(binding.modifiers.literal) {
        value = el.getAttribute('data-src')
        el.removeAttribute('data-src')
        console.log(value)
      } else if (binding.value === binding.oldValue) {
        return
      }

      if (el._isImg) {
        stack[el._uid] = {
          value: value,
          el: el
        }
        if (flag) {
          window.addEventListener('scroll', compute, false)
        }
        flag = false
        setTimeout(() => {
          internalCompute(el._uid)
        }, 0)
      }
    },
    // 只调用一次， 指令与元素解绑时调用。
    unbind (el, binding, vnode, oldVnode) {
      if (stack[el._uid]) {
        delete stack[el._uid]
      }
    }
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
    }
  })

  // 4. 添加实例方法
  Vue.prototype.$lazyload = function (options) {
    compute()
  }

  function compute () {
    for (let key in stack) {
      console.log(key)
      internalCompute(key)
    }
  }

  function internalCompute (key) {
    let item = stack[key]
    console.log(item)
    let clientHeight = options.clientHeight || document.documentElement.clientHeight || window.innerHeight
    if (item && item.value && item.el.getBoundingClientRect().top - clientHeight <= options.threshold) {
      item.el.src = item.value
      if (options.class) {
        item.el.classList.add(options.class)
      }
      delete stack[key]
    }
    if (Object.keys(stack).length === 0) {
      flag = true
      window.removeEventListener('scroll', compute, false)
    }
  }

  window.addEventListener('scroll', compute, false)
}