<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="输入需要md5加密的内容"
          size="mini"
          v-model="content">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:10px;">
      <el-col :span="24">
        <el-input
          :readonly="true"
          size="mini"
          v-model="result">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10" v-if="!!error" style="margin-top:10px;">
      <el-col :span="24">
        <el-alert :title="error" type="error"></el-alert>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:10px;">
      <el-col :span="4">
        <el-button size="mini" style="width:100%;" v-clipboard:copy="result" v-clipboard:success="onPasswordCopy">复制</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  const md5 = require('js-md5')

  module.exports = {
    data() {
      return {
        content: '',
        result: '',
        error:'',
      }
    },
    watch: {
      content() {
        this.doCalc();
      }
    },
    methods: {
      doCalc() {
        try {
          this.error = ''
          this.result = md5(this.content)
        } catch (e) {
          this.error = '解析错误'
        }
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
