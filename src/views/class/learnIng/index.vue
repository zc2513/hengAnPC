<template>
  <div class="home">
    <div class="content-box">
      <div class="flsb">
        <div class="bold">查询条件</div>
      </div>
      <search @search="search" />
    </div>
    <div class="mt20 content-box">
      <div class="flsb">
        <div class="bold">班级列表</div>
      </div>
      <tablePug class="mt15" :btns="btn" :lists="lists" :titles="titles" @sendVal="getVal" />
      <page :total="total" :page-size="pageSize" @pagesend="getPageData" />
    </div>
  </div>
</template>

<script>
import classMixin from './../class'
export default {
    name: 'Home',
    mixins: [classMixin],
    data() {
        return {
            btn: {
                title: '操作',
                width: '270',
                btnlist: [
                    { con: '结业', type: 'success' },
                    { con: '详情', type: 'primary' },
                    { con: '解散', type: 'warning' },
                    { con: '二维码', type: 'primary', plain: true }
                ]
            }
        }
    },
    methods: {
        btnsave(e) {
            this.$message(e.target.innerText)
        }
    }
}
</script>
