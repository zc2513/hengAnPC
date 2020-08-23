
<template>
  <!-- 招生中/详情 -->
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
        <div class="fontGay fle">
          <div class="cursor" @click="btnsave($event)"> 添加学员 </div>
          <div class="cursor ml15" @click="btnsave($event)"> 模板下载 </div>
          <div class="cursor ml15" @click="btnsave($event)"> 导入学员 </div>
          <div class="cursor ml15" @click="btnsave($event)"> 导出学员 </div>
          <div class="cursor ml15" @click="btnsave($event)"> 批量打印课时 </div>
        </div>
      </div>
      <tablePug class="mt30" :btns="btn" :lists="lists" :titles="titles" @sendVal="getVal" />
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
            titles: [
                { name: '序号', data: 'orderCode' },
                { name: '学员姓名', data: 'xzqMc' },
                { name: '工种', data: 'total' },
                { name: '身份证号', data: 'orderCode' },
                { name: '手机号码', data: 'markCode' },
                { name: '培训日期', data: 'undertakeTime' },
                { name: '完成学时', data: 'total' }
            ],
            btn: {
                title: '操作',
                width: '220',
                btnlist: [
                    { con: '打印课时', type: 'warning' },
                    { con: '查看', type: 'primary' },
                    { con: '删除', type: 'warning' }
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
