<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="Please input content"
          size="mini"
          v-model="content">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:10px;">
      <el-col :span="24">
        <el-input
          size="mini"
          type="textarea"
          :rows="4"
          :readonly="true"
          v-model="result">
        </el-input>
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
      }
    },
    watch: {
      content() {
        this.doCalc();
      }
    },
    methods: {
      doCalc() {
        this.result = Base64.encode(this.content)
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
