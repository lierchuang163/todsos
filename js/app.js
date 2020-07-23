//实例化vue和绑定模板定义数据
const vm = new Vue({
  el: '.todoapp',
  data: {
    list: JSON.parse(localStorage.getItem('todos')) || [],
    // list: [
    //   { id: 1, content: '今天很努力', done: true },
    //   { id: 2, content: '明天也要很努力', done: false },
    //   { id: 3, content: '大家都要很努力', done: false }
    // ],
    content: '',
    idd: '',
    contented: '',
    // isShow: true
  },
  methods: {
    //添加数据
    add() {


      // console.log(1);
      let obj = {
        id: this.list.length + 1,
        content: this.content,
        done: false
      }
      if (!this.content.trim()) {
        return
      }
      this.list.unshift(obj)
      this.content = ''

    },
    //删除数据
    del(id) {
      this.list = this.list.filter(item => item.id != id)
    },
    //双击content显示输入框
    show(id, content) {
      this.idd = id
      this.contented = content
    },
    //回车隐藏输入框
    hide() {
      this.idd = ''
    },
    //取消修改(esc),内容恢复成原本模样
    cancel(item) {
      item.content = this.contented
      // cancel(id) {
      //   this.list.find(item => item.id === id).content = this.contented
      this.idd = ''
    },
    //删除所有完成状态
    clear() {
      this.list = this.list.filter(item => item.done == false)
    }
    // clear() {
    //   this.list = []
    //   this.isShow = false
    // }
  },
  computed: {
    listCount() {
      return this.list.filter(item => !item.done).length
    },
    isShow() {
      return this.list.some(item => item.done === true)
    },
    showAll: {
      get() {
        //设置遍历的每一项都是true才会高亮,并且数组的长度不为0,如果长度为零或者有一个没被点亮,就会返回false,&&有一个假就是假
        return this.list.every(item => item.done) && this.list.length
      },
      set(value) {
        this.list.forEach(item => item.done = value)
      }
    }
  },
  //监视数据变化
  watch: {
    list: {
      deep: true,
      //监视者,监视数据的变化value
      handler(value) {
        localStorage.setItem('tudos', JSON.stringify(value))
      }
    }
  },
})