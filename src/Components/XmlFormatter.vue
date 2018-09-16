<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="输入需要美化的XML"
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
        <el-radio v-model="contentResultType" label="object">XML预览</el-radio>
        <el-radio v-model="contentResultType" label="raw">标准XML</el-radio>
        <div v-show="contentResultType=='object'" style="border:1px solid #EEE;border-radius:3px;padding:10px;">
          <div id="XmlFormatter_Result"></div>
        </div>
        <div v-show="contentResultType=='raw'">
          <el-input
            type="textarea"
            :rows="4"
            :readonly="true"
            v-model="contentResult">
          </el-input>
          <div>
            <el-button type="primary" plain size="mini" style="width:100%;" v-clipboard:copy="contentResult" v-clipboard:success="onPasswordCopy">Copy</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  var Viewer = require('xml-viewer')
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
        $('#XmlFormatter_Result').html('')
        if (!this.content) {
          return
        }
        console.log(this.content)
        var view = new Viewer(this.content)
        console.log(view)
        // $('#XmlFormatter_Result').html(view)
        return
        var xml = null
        try {
          xml = JSON.parse(this.content)
        } catch (e) {
          try {
            xml = eval('(' + this.content + ')')
          } catch (e) {
            this.error = 'JSON解析错误'
          }
        }
        if (!xml) {
          this.error = 'JSON解析错误'
          return
        }
        const formatter = new XmlFormatter(xml)
        var render = formatter.render()
        $('#XmlFormatter_Result').html(render)
        this.contentResult = JSON.stringify(xml,null,4)
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
