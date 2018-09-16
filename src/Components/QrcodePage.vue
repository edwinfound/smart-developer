<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <qrcode :value="qrcode" :options="{ size: 200 }"></qrcode>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:10px;">
      <el-col :span="20">
        <el-input
          placeholder=""
          :readonly="true"
          size="mini"
          v-model="qrcode">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" plain size="mini" style="width:100%;" v-clipboard:copy="qrcode" v-clipboard:success="onPasswordCopy">Copy</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  module.exports = {
    data() {
      return {
        qrcode: '',
      }
    },
    mounted() {
      var me = this
      if(chrome && chrome.tabs){
        chrome.tabs.getSelected(null, function (tab) {
          me.qrcode = tab.url
        })
      }else{
        me.qrcode = window.location.href
      }
    },
    methods: {
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
