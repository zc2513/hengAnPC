
<template>
  <!-- 招生中/详情 -->
  <div class="recruitStudentInfo">
    <div class="content-box">
      <div class="flsb">
        <div class="bold">查询条件</div>
      </div>
      <el-form :inline="true" :model="searchstudent" size="small" class="demo-form-inline mt15">
        <el-form-item label="学员姓名">
          <el-input v-model="searchstudent.name" clearable placeholder="请输入学员姓名" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchstudent.phone" clearable placeholder="请输入学员手机号" />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="searchstudent.card" clearable placeholder="请输入学员身份证号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100px;" round @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mt20 content-box">
      <div class="flsb">
        <div class="bold">班级/学员列表</div>
        <div class="fontGay fle">
          <div v-if="$route.query.type !== 'finish'" class="cursor ml15" @click="btnsave($event)"> 添加学员 </div>
          <div v-if="$route.query.type !== 'finish'" class="cursor ml15" @click="btnsave($event)"> 模板下载 </div>
          <div v-if="$route.query.type !== 'finish'" class="cursor ml15" @click="btnsave($event)"> 导入学员 </div>
          <div class="cursor ml15" @click="btnsave($event)"> 导出学员 </div>
          <div v-if="$route.query.type !== 'recruitStudent'" class="cursor ml15" @click="btnsave($event)"> 批量打印课时 </div>
        </div>
      </div>
      <tablePug class="mt30" :btns="btn" :lists="lists" :titles="titles" @sendVal="getBtn" />
      <page :total="total" :page-size="pageSize" @pagesend="getPageData" />
    </div>
    <el-dialog :modal-append-to-body="false" title="详情" :visible.sync="dialogLook">
      <div class="lookTable">
        <div class="lookItem fl">
          <div>学员姓名</div>
          <div>滕三锋</div>
          <div>身份证号</div>
          <div>XXXXXXXXXXXXXXXXXX</div>
        </div>
        <div class="lookItem fl">
          <div>手机号码</div>
          <div>13898765432</div>
          <div>模考成绩</div>
          <div>92.00</div>
        </div>
        <div class="lookItem fl">
          <div>顺序联系进度</div>
          <div>309/640</div>
          <div>完成课时</div>
          <div>0/2</div>
        </div>
        <div class="lookItem fl">
          <div>模拟考试次数</div>
          <div>80</div>
          <div>最高分数</div>
          <div>97.00</div>
        </div>
        <!-- <div class="lookItem fl">
          <div>学习进度</div>
          <div class="progress">70%</div>
        </div> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import classMixin from './../class'
export default {
    name: 'RecruitStudentInfo',
    mixins: [classMixin],
    data() {
        return {
            titles: [
                { name: '序号', data: 'orderCode' },
                { name: '学员姓名', data: 'agentName' },
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
            },
            dialogLook: false,
            looks: {
                title: '',
                datas: {}
            },
            searchstudent: {
                name: '',
                phone: '',
                card: ''
            }
        }
    },
    created() {
        const pathType = this.$route.query.type
        if (pathType === 'recruitStudent') {
            this.titles = this.titles.filter(e => e.name !== '完成学时')
            this.$set(this.btn, 'btnlist', [
                { con: '查看', type: 'primary' },
                { con: '删除', type: 'warning' }
            ])
            this.$set(this.btn, 'width', 120)
        } else if (pathType === 'learning') {
            console.log('使用原始配置')
        } else if (pathType === 'finish') {
            this.$set(this.btn, 'width', 150)
            this.$set(this.btn, 'btnlist', [
                { con: '打印课时', type: 'warning' },
                { con: '查看', type: 'primary' }
            ])
        } else {
            this.$router.push('/404')
        }
    },
    methods: {
        btnsave(e) {
            this.$message(e.target.innerText)
        },
        getBtn(v) {
            if (v.type === '查看') {
                this.dialogLook = true
                return
            }
            if (v.type === '删除') {
                this.$confirm('是否在当前班级删除该学员?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message('删除---待处理逻辑')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
                return
            }
            if (v.type === '打印课时') {
                this.$message('打印课时---待处理')
            }
        },
        onSubmit() {
            console.log('查询', this.searchStudent)
        }
    }
}
</script>
<style lang="scss" scoped>
.recruitStudentInfo{
    .lookTable{
        border-top: 1px solid #ccc;
        border-right: 1px solid #ccc;
        .lookItem{
            >div{
                border-left: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                width: calc(100% / 4);
                padding: 0 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 50px;
                line-height: 20px;
                overflow: hidden;
                &:nth-child(odd){
                    // justify-content: flex-end;
                    font-weight: 600;
                }
            }
            .progress{
                width: 75%;
            }
        }
    }
}
</style>
