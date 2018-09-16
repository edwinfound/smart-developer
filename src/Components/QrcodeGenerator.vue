<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <el-input
          placeholder="输入需要生成二维码的文字"
          type="textarea"
          size="mini"
          :rows="4"
          v-model="qrcode">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:10px;">
      <el-col :span="4">
        <el-button size="mini" style="width:100%;" @click="doGenerate()">生成</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10" v-if="!!qrcode">
      <el-col :span="24">
        <qrcode :value="qrcode" :options="{ size: 200 }"></qrcode>
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
    },
    methods: {
      doGenerate() {
        //this.qrcode = this.qrcode
      }
    }
  }
</script>
