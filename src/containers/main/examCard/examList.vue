<template>
  <div>
    <el-card>
      <div>
        <!--表格区域 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="examName"
            label="考试名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="考试开始时间"
            :formatter="formatDate">
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="考试结束时间"
            :formatter="formatDate">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="startExam(scope.$index, tableData)"
                         :disabled="checkFinish(scope.$index, tableData)"
                         v-text="getExamInfo(scope.$index, tableData)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
<!--        <div class="block">-->
<!--          <el-pagination-->
<!--            background-->
<!--            layout="prev, pager, next"-->
<!--            :total="50">-->
<!--          </el-pagination>-->
<!--        </div>-->
      </div>
    </el-card>
  </div>
</template>

<script>
import httpServer from "../../../components/httpServer/httpServer";

export default {
  data(){
    return{
      // 表格数据源
      tableData: this.$route.params.index1
    }
  },
  methods:{
    startExam(index, rows){
      //this.$router.push(`/main/exam/${rows[index].examId}/0`);
      this.$router.push({
        name:'homepage',
        params:{
          examId:rows[index].examId
        }
      })
    },
    formatDate (row, column) {
      let data = row[column.property]
      if (data == null) {
        return null
      }
      let dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes()
    },
    checkFinish(index, rows) {
      return new Date() < new Date(rows[index].startTime) || new Date() >= new Date(rows[index].endTime) || rows[index].join === 1;
    },
    getExamInfo(index, rows) {
      if (new Date() >= new Date(rows[index].endTime)) {
        return '已结束'
      } else if (rows[index].join === 1) {
        return '已交卷'
      } else if (new Date() < new Date(rows[index].startTime)) {
        return '考试未开始'
      } else{
        return '开始考试'
      }
    }
  }
}
</script>

<style lang="css" scoped>
.t1{
  float: right;
  margin: 10px 10px;
}
.t2{
  float: right;
  margin: 10px 10px;
  width: 150px;
}
.block{
  margin: 10px 10px;
  float: right;
}
</style>
