import { initData } from '@/api/data'

export default {
  data() {
    return {
      loading: true, data: [], page: 1, size: 10, total: 0, url: '', params: {}, query: {}, time: 170
    }
  },
  methods: {
    async init() {
      if (!await this.beforeInit()) {
        return
      }
      return new Promise((resolve, reject) => {
        this.loading = true
        initData(this.url, this.params).then(res => {
          this.total = res.count
          this.data = res.results
          setTimeout(() => {
            this.loading = false
          }, this.time)
          resolve(res)
        }).catch(err => {
          this.loading = false
          reject(err)
        })
      })
    },
    beforeInit() {
      return true
    },
    // pageChange(e) {
    //   this.show = false
    //   this.$refs.tables.setCurrentRow()
    //   this.page = e
    //   this.init()
    // },
    // sizeChange(e) {
    //   this.show = false
    //   this.$refs.tables.setCurrentRow()
    //   this.page = 1
    //   this.size = e
    //   //this.init()
    // }
    pageChange(e) {
      //this.$refs.tables.setCurrentRow()
      const __this=this
      console.log(e)
      __this.page = e
      // if(!__this.$refs.header){
      //   __this.cancel()
      //   __this.init()
      // }else{
      //   __this.init().then(function () {
      //     __this.initSelection()
      //   })
      // }
      if(__this.$refs.transfer){
        console.log('1')
        __this.cancel()
        __this.init()
      }else if (__this.$refs.r_table){
        console.log('2')
        __this.init().then(function () {
          __this.initSelection()
        })
      }
      else {
        console.log('3')
        console.log(__this.page)
        __this.init()
      }

    },
    sizeChange(e) {
      //this.$refs.tables.setCurrentRow()
      // this.cancel()
      // console.log(this)
      const __this=this
      __this.page = 1
      __this.size = e
      if(__this.$refs.transfer){
        console.log('1')
        __this.cancel()
        __this.init()
      }else if (__this.$refs.r_table){
        console.log('2')
        __this.init().then(function () {
          __this.initSelection()
        })
      }
      else {
        console.log('3')
        __this.init()
      }
    }
  }
}
