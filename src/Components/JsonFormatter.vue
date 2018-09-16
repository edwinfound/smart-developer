<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <el-input
          type="textarea"
          :rows="4"
          size="mini"
          placeholder="Please input json string"
          v-model="content">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10" v-if="!!error" style="margin-top:10px;">
      <el-col :span="24">
        <el-alert :title="error" type="error"></el-alert>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:10px;">
      <el-col :span="24">
        <el-radio v-model="contentResultType" label="object">Preview</el-radio>
        <el-radio v-model="contentResultType" label="raw">Raw</el-radio>
        <div v-show="contentResultType=='object'" style="border:1px solid #EEE;border-radius:3px;padding:10px;">
          <div id="JsonFormatter_Result"></div>
        </div>
        <div v-show="contentResultType=='raw'">
          <el-input
            type="textarea"
            :rows="4"
            size="mini"
            :readonly="true"
            v-model="contentResult">
          </el-input>
          <el-row :gutter="10" style="margin-top:10px;">
            <el-col :span="4">
              <el-button type="primary" plain size="mini" style="width:100%;" v-clipboard:copy="contentResult" v-clipboard:success="onPasswordCopy">Copy</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  var JSONFormatter = require('json-formatter-js').default
  var $ = require('jquery')
  module.exports = {
    data() {
      return {
        content: '',
        contentResult:'',
        contentResultType:'object',
        error: '',
      }
    },
    watch: {
      content() {
        this.doCalc();
      }
    },
    methods: {
      doCalc() {
        this.error = ''
        this.contentResult = ''
        $('#JsonFormatter_Result').html('')
        if (!this.content) {
          return
        }
        var json = null
        try {
          json = JSON.parse(this.content)
        } catch (e) {
          try {
            json = eval('(' + this.content + ')')
          } catch (e) {
            this.error = 'JSON解析错误'
          }
        }
        if (!json) {
          this.error = 'JSON解析错误'
          return
        }
        const formatter = new JSONFormatter(json)
        var render = formatter.render()
        $('#JsonFormatter_Result').html(render)
        this.contentResult = JSON.stringify(json,null,4)
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
