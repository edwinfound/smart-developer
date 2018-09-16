<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <el-checkbox v-model="upperCharEnable">A-Z</el-checkbox>
      </el-col>
      <el-col :span="4">
        <el-checkbox v-model="lowerCharEnable">a-z</el-checkbox>
      </el-col>
      <el-col :span="4">
        <el-checkbox v-model="numberEnable">0-9</el-checkbox>
      </el-col>
      <el-col :span="4">
        <el-checkbox v-model="signEnable" size="mini">Special Chars</el-checkbox>
      </el-col>
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="4">
        <el-select v-model="length" placeholder="Please Select" size="mini" style="width:100%">
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
        <el-button size="mini" style="width:100%;" @click="doCalc()">Refresh</el-button>
      </el-col>
      <el-col :span="4">
        <el-button size="mini" style="width:100%;" v-clipboard:copy="password" v-clipboard:success="onPasswordCopy">Copy</el-button>
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
          label: '8'
        }, {
          value: 16,
          label: '16'
        }, {
          value: 32,
          label: '32'
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
          message: 'Copy Success',
          type: 'success',
          showClose: true,
        })
      }
    }
  }
</script>
