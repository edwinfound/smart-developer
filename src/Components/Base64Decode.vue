<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <el-input
          type="textarea"
          :rows="4"
          size="mini"
          placeholder="Please input base64 encoded content"
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
        <el-button type="primary" plain size="mini" style="width:100%;" v-clipboard:copy="result" v-clipboard:success="onPasswordCopy">Copy</el-button>
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
          message: 'Copy Success',
          type: 'success',
          showClose: true,
        })
      }
    }
  }
</script>
