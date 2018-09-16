<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <el-input
          type="textarea"
          :rows="4"
          size="mini"
          placeholder="输入需要base64解码的内容"
          v-model="content">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:10px;">
      <el-col :span="24">
        <el-input
          type="textarea"
          :rows="4"
          size="mini"
          :readonly="true"
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
  const Base64 = require('js-base64').Base64

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
          this.result = Base64.decode(this.content)
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
