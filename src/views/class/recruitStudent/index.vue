<template>
  <!-- 招收中 -->
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
        <div class="fontGay cursor" @click="$router.push('/class/createClass')">创建班级</div>
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
                width: '200',
                btnlist: [
                    { con: '详情', type: 'primary' },
                    { con: '解散', type: 'warning' },
                    { con: '二维码', type: 'primary', plain: true }
                ]
            }
        }
    },
    methods: {

    }
}
</script>
