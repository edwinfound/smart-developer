<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <el-checkbox v-model="upperCharEnable">字母A-Z</el-checkbox>
      </el-col>
      <el-col :span="4">
        <el-checkbox v-model="lowerCharEnable">字母a-z</el-checkbox>
      </el-col>
      <el-col :span="4">
        <el-checkbox v-model="numberEnable">数字0-9</el-checkbox>
      </el-col>
      <el-col :span="4">
        <el-checkbox v-model="signEnable" size="mini">特殊字符</el-checkbox>
      </el-col>
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="4">
        <el-select v-model="length" placeholder="请选择" size="mini" style="width:100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:10px;">
      <el-col :span="16">
        <el-input v-model="password" size="mini" :readonly="true"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button size="mini" style="width:100%;" @click="doCalc()">换一个</el-button>
      </el-col>
      <el-col :span="4">
        <el-button size="mini" style="width:100%;" v-clipboard:copy="password" v-clipboard:success="onPasswordCopy">复制</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  module.exports = {
    data() {
      return {
        options: [{
          value: 8,
          label: '8位'
        }, {
          value: 16,
          label: '16位'
        }, {
          value: 32,
          label: '32位'
        }],
        length: 16,
        upperCharEnable: true,
        lowerCharEnable: true,
        numberEnable: true,
        signEnable: false,
        password: '',
      }
    },
    watch: {
      upperCharEnable() {
        this.doCalc()
      },
      lowerCharEnable() {
        this.doCalc()
      },
      numberEnable() {
        this.doCalc()
      },
      signEnable() {
        this.doCalc()
      },
      length() {
        this.doCalc()
      }
    },
    mounted() {
      this.doCalc()
    },
    methods: {
      doCalc() {
        var len = parseInt(this.length)
        var chars = []
        if (this.upperCharEnable) {
          chars.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
        }
        if (this.lowerCharEnable) {
          chars.push('abcdefghijklmnopqrstuvwxyz')
        }
        if (this.numberEnable) {
          chars.push('0123456789')
        }
        if (this.signEnable) {
          chars.push('!@#$%^&*()')
        }
        chars = chars.join('')
        var maxPos = chars.length
        var cs = []
        for (var i = 0; i < len; i++) {
          cs.push(chars.charAt(Math.floor(Math.random() * maxPos)))
        }
        this.password = cs.join('')
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
