<template>
  <div class="create-box">
    创建班级
    <div class="content-box">
      <div class="flsb">
        <div class="bold">完善您的班级信息</div>
      </div>
      <el-form
        ref="formName"
        :inline="true"
        :model="formData"
        label-width="80px"
        label-position="right"
        size="small"
        class="demo-form-inline mt15"
        :rules="rules"
      >
        <el-row>
          <el-col class="mb10" :span="12">
            <el-form-item label="班级名称" prop="className">
              <el-input v-model="formData.className" clearable placeholder="请输入班级名称建议：工种类型+取证/复审/换证+期号" />
            </el-form-item>
          </el-col>
          <el-col class="mb10" :span="12">
            <el-form-item label="代课老师" prop="teacher">
              <el-input v-model="formData.teacher" clearable placeholder="请输入老师姓名" />
            </el-form-item>
          </el-col>
          <el-col class="mb10" :span="12">
            <el-form-item label="授课方式" prop="applyType">
              <el-select v-model="formData.applyType" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mb10" :span="12">
            <el-form-item label="行业" prop="industry">
              <el-select v-model="formData.industry" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mb10" :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="formData.phone" maxlength="11" show-word-limit clearable placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
          <el-col class="mb10" :span="12">
            <el-form-item label="报名人数" prop="peopleNum">
              <el-input v-model="formData.peopleNum" maxlength="3" clearable placeholder="请输入报名人数" />
            </el-form-item>
          </el-col>
          <el-col class="mb10" :span="12">
            <el-form-item label="开学日期" prop="startTime">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col class="mb10" :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-input v-model="formData.endTime" clearable placeholder="请选择结束时间" />
            </el-form-item>
          </el-col> -->
        </el-row>
        <div class="mt20">
          <div class="bold">已选课时（24）</div>
          <div class="table-list">
            <el-table ref="refTable" :data="tableData" align="center">
              <el-table-column type="selection" width="50" />
              <el-table-column prop="address" width="50" type="expand">
                <template slot-scope="scope">
                  <el-table
                    :data="scope.row.children"
                    align="center"
                    :show-header="false"
                    class="child-table"
                  >
                    <el-table-column width="50" />
                    <el-table-column width="50">
                      <template slot-scope="{row}">
                        <el-button size="mini" type="text" @click="previewVideo(row)">预览</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="date" label="章节" />
                    <el-table-column prop="name" label="名称" />
                    <el-table-column prop="time" label="学时" />
                    <el-table-column prop="type" label="类型" />
                    <el-table-column prop="hz" label="初训/复审换证" />
                    <el-table-column prop="teacher" label="讲师" />
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="date" label="章节" />
              <el-table-column prop="name" label="名称" />
              <el-table-column prop="time" label="学时" />
              <el-table-column prop="type" label="类型" />
              <el-table-column prop="hz" label="初训/复审换证" />
              <el-table-column prop="teacher" label="讲师" />
            </el-table>

          </div>
        </div>
        <el-form-item class="t-c wfull mt20">
          <el-button type="primary" plain round @click="onSubmit">确认创建</el-button>
        </el-form-item>
      </el-form>
      <el-dialog :modal-append-to-body="false" :visible.sync="dialogTableVisible" :before-close="handleClose">
        <template #title>{{ video.name }} </template>
        <video autoplay controlsList="nodownload" controls :src="video.src" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { phoneValidate } from '@/utils/validate'
export default {
    data() {
        return {
            dialogTableVisible: false,
            video: {
                name: '',
                src: ''
            },
            formData: {
                className: '',
                teacher: '',
                applyType: '网授',
                industry: '',
                phone: '',
                peopleNum: '',
                startTime: '',
                endTime: ''
            },
            rules: {
                className: [
                    { required: true, message: '请输入班级名称', trigger: 'blur' }
                ],
                teacher: [
                    { required: true, message: '请输入代课老师名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '姓名长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                applyType: [
                    { required: true, message: '请选择报名方式', trigger: ['blur', 'change'] }
                ],
                industry: [
                    { required: true, message: '请输选择行业类别', trigger: ['blur', 'change'] }
                ],
                phone: [
                    { required: true, message: '联系电话不能为空', trigger: 'blur' },
                    { min: 11, max: 11, message: '电话长度应为11个字符', trigger: 'blur' },
                    { validator: phoneValidate, trigger: 'blur' }
                ],
                peopleNum: [
                    { required: true, message: '请输入报名人数', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                startTime: [
                    { required: true, message: '请选择开始时间', trigger: 'blur' }
                ],
                endTime: [
                    { required: true, message: '选择结束时间', trigger: 'blur' }
                ]
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            tableData: [
                {
                    id: 1,
                    date: '章1',
                    name: '关于高级线路对接',
                    address: '上海市普陀区金沙江路 1518 弄',
                    time: 203,
                    type: '电弧焊',
                    hz: '初训/复审'
                }, {
                    id: 2,
                    date: '章2',
                    name: '关于高级线路对接',
                    address: '上海市普陀区金沙江路 1517 弄',
                    time: 203,
                    type: '电弧焊',
                    hz: '初训/复审'
                }, {
                    id: 3,
                    date: '章3',
                    name: '关于高级线路对接',
                    address: '上海市普陀区金沙江路 1519 弄',
                    time: 203,
                    type: '电弧焊',
                    hz: '初训/复审',
                    children: [
                        {
                            id: 31,
                            date: '节3.1',
                            name: '视频测试',
                            address: '上海市普陀区金沙江路 1519 弄',
                            time: 203,
                            type: '电弧焊',
                            hz: '初训/复审',
                            teacher: '张三',
                            video: require('@/assets/mda-kgsziujvmhk8ak2h.mp4')
                        },
                        {
                            id: 32,
                            date: '节3.2',
                            name: '写真',
                            address: '上海市普陀区金沙江路 1519 弄',
                            time: 203,
                            type: '电弧焊',
                            hz: '初训/复审',
                            teacher: '李四',
                            video: require('@/assets/mda-kg8j3tuk9k2ba6ma.mp4')
                        },
                        {
                            id: 32,
                            date: '节3.3',
                            name: '一休小和尚',
                            address: '上海市普陀区金沙江路 1519 弄',
                            time: 203,
                            type: '电弧焊',
                            hz: '初训/复审',
                            teacher: '王麻子',
                            video: require('@/assets/mda-kdcnbux7did3cqti.mp4')
                        }
                    ]
                }, {
                    id: 4,
                    date: '章4',
                    name: '关于高级线路对接',
                    address: '上海市普陀区金沙江路 1516 弄',
                    time: 203,
                    type: '电弧焊',
                    hz: '初训/复审'
                }]
        }
    },
    methods: {
        onSubmit() {
            this.$refs.formName.validate((valid) => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
            this.$emit('search', this.formData)
        },
        toogleExpandTable(e) {
            const { row } = e
            console.log(e)
            this.$refs.refTable.toggleRowExpansion(row)
        },
        previewVideo(row) {
            console.log('视频预览', row)
            if (!row.video) return this.$message('缺少视频路径')
            this.video = {
                name: row.date + '/' + row.name,
                src: row.video
            }
            this.dialogTableVisible = true
        },
        handleClose(done) {
            this.video.src = ''
            done()
        }
    }
}
</script>

<style lang="scss" scoped>
.create-box{
    /deep/.el-row{
        .el-form-item{
            display: flex;
            .el-form-item__content{
                width: 60%;
                max-width: 360px;
            }
            label{
                color: rgba(153,153,153,1);
            }
        }
        >div:nth-child(odd){
            .el-form-item{
                justify-content: flex-end;
                margin-right: 40px;
            }
        }
        >div:nth-child(even){
            .el-form-item{
                margin-left: 40px;
            }
        }
        .el-select{
            width: 100%;
        }
    }
    /deep/.el-date-editor{
        width: 100%;
    }
    /deep/.el-table__expanded-cell[class*=cell]{
        padding: 0;
    }
    /deep/.el-dialog__body{
        padding: 0 !important;
    }
    video{
        width: 100%;
        max-height: 400px;
    }
}

</style>
