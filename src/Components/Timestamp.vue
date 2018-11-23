<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-input
          placeholder="时间戳：秒/毫秒"
          size="mini"
          v-model="timestamp">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" plain size="mini" style="width:100%;" @click="doCalcTimestamp()">转换</el-button>
      </el-col>
      <el-col :span="8">
        <el-input
          size="mini"
          v-model="timestampResult"
          :readonly="true">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" plain size="mini" style="width:100%;" v-clipboard:copy="timestampResult" v-clipboard:success="onPasswordCopy">复制</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:10px;">
      <el-col :span="8">
        <el-input
          placeholder="日期"
          size="mini"
          v-model="datetime">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" plain size="mini" style="width:100%;" @click="doCalcTimestamp()">转换</el-button>
      </el-col>
      <el-col :span="8">
        <el-input
          size="mini"
          v-model="datetimeResult"
          :readonly="true">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" plain size="mini" style="width:100%;" v-clipboard:copy="datetimeResult" v-clipboard:success="onPasswordCopy">复制</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  const d3 = require('d3-time-format')
  const datetimeFormat = d3.timeFormat('%Y-%m-%d %H:%M:%S')
  const datetimeParse = d3.timeParse("%Y-%m-%d %H:%M:%S");
  module.exports = {
    data() {
      return {
        timestamp: '',
        timestampResult: '',
        datetime: '',
        datetimeResult: '',
      }
    },
    watch: {
      timestamp() {
        this.doCalcTimestamp()
      },
      datetime() {
        this.doCalcDatetime()
      },
    },
    mounted() {
      const date = new Date()
      this.timestamp = parseInt(date.getTime()/1000)
      this.datetime = datetimeFormat(date)
    },
    methods: {
      doCalcTimestamp() {
        if(this.timestamp>0xFFFFFFFF){
          this.timestampResult = datetimeFormat(this.timestamp)
        }else{
          this.timestampResult = datetimeFormat(this.timestamp*1000)
        }
      },
      doCalcDatetime() {
        this.datetimeResult = parseInt(datetimeParse(this.datetime).getTime()/1000)
      },
      onPasswordCopy() {
        this.$message({
          message: '复制成功',
          type: 'success',
          showClose: true,
        })
      }
    }
  }
</script>
