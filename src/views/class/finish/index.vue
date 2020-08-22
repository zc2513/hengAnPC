<template>
  <div class="home">
    <div class="search">
      已结业
    </div>
    <div class="mt20 table-box">
      <div class="flsb">
        <div class="bold">班级列表</div>
      </div>
      <tablePug class="mt15" :btns="btn" :lists="lists" :titles="titles" @sendVal="getVal" />
    </div>
  </div>
</template>

<script>
import tablePug from '@/components/table'
import datas from '@/assets/json/data'
export default {
    name: 'Home',
    components: { tablePug },
    data() {
        return {
            lists: [],
            titles: [
                { name: '序号', data: 'orderCode' },
                { name: '班级名称', data: 'xzqMc' },
                { name: '开班时间', data: 'undertakeTime' },
                { name: '截止日期', data: 'scrapTime' },
                { name: '应修学时', data: 'total' },
                { name: '学员数量', data: 'consAddress' },
                { name: '班主任', data: 'remarks' },
                { name: '进度', data: 'consPhone' }
            ],
            btn: {
                title: '操作',
                width: '160',
                btnlist: [
                    { con: '详情', type: 'primary' },
                    { con: '打印课时', type: 'success', plain: true }
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
            this.lists = datas.slice((params - 1) * 8, params * 8)
        },
        getVal(v) {
            console.log(v)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
