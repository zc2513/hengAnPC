<template>
  <!-- 课程管理 -->
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
        <div class="fontGay cursor">
          <span @click="btnsave($event)">新增课件</span>
          <span class="ml10" style="color:#409EFF;" @click="btnsave($event)">批量上传</span>
        </div>
      </div>
      <tablePug class="mt15" :btns="btn" :lists="lists" :titles="titles" @sendVal="getVal" />
      <page :total="total" :page-size="pageSize" @pagesend="getPageData" />
    </div>
  </div>
</template>

<script>
import tablePug from '@/components/table'
import search from './search'
import page from '@/components/table/page'
import datas from '@/assets/json/data'
export default {
    name: 'Home',
    components: { tablePug, page, search },
    data() {
        return {
            pageSize: 8,
            total: 0,
            lists: [],
            titles: [
                { name: '序号', data: 'orderCode' },
                { name: '课件名称', data: 'xzqMc' },
                { name: '课时数量', data: 'total' },
                { name: '课件ID', data: 'orderCode' },
                { name: '课件时长', data: 'total' },
                { name: '讲师姓名', data: 'remarks' },
                { name: '证书编号', data: 'orderCode' },
                { name: '课件状态', data: 'state' }
            ],
            btn: {
                title: '操作',
                width: '250',
                btnlist: [
                    { con: '编辑', type: 'info' },
                    { con: '视频', type: 'primary' },
                    { con: '习题', type: 'primary' },
                    { con: '删除', type: 'warning' }
                ]
            }

        }
    },
    created() {
        this.getPageData(1)
    },
    methods: {
        btnsave(e) {
            this.$message(e.target.innerText)
        },
        getPageData(params) {
            this.total = datas.length
            this.lists = datas.slice((params - 1) * 8, params * 8)
        },
        getVal(v) {
            console.log(v)
            this.$message(v.type)
        },
        search(e) {
            console.log('搜索', e)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
