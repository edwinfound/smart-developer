<template>
  <div id="app">

    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">加密</span>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">密码生成器</template>
            <PasswordGenerator/>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">编码解码</span>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">MD5加密</template>
            <Md5/>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">Base64编码</template>
            <Base64Encode/>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">Base64解码</template>
            <Base64Decode/>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">URL编码</template>
            <UrlEncode/>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">URL解码</template>
            <UrlDecode/>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">时间日期</span>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">时间戳转换</template>
            <Timestamp/>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">二维码</span>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">页面二维码</template>
            <QrcodePage/>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">生成二维码</template>
            <QrcodeGenerator/>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">代码美化</span>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">JSON格式化</template>
            <JsonFormatter/>
          </el-collapse-item>
          <!--<el-collapse-item>-->
            <!--<template slot="title">XML格式化</template>-->
            <!--<XmlFormatter/>-->
          <!--</el-collapse-item>-->
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">页面修改器</span>
        <PageChanger/>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">关于</span>
        <div>
          这个工具包是为开发者准备的常用工具集，如果您有更好的意见，欢迎提交给我们。
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import PasswordGenerator from './Components/PasswordGenerator'
  import Base64Encode from './Components/Base64Encode'
  import Base64Decode from './Components/Base64Decode'
  import Md5 from './Components/Md5'
  import UrlEncode from './Components/UrlEncode'
  import UrlDecode from './Components/UrlDecode'
  import Timestamp from './Components/Timestamp'
  import QrcodePage from './Components/QrcodePage'
  import QrcodeGenerator from './Components/QrcodeGenerator'
  import PageChanger from './Components/PageChanger'
  import JsonFormatter from './Components/JsonFormatter'
  // import XmlFormatter from './Components/XmlFormatter'

  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {
      PasswordGenerator,
      Base64Encode,
      Base64Decode,
      Md5,
      UrlEncode,
      UrlDecode,
      Timestamp,
      QrcodePage,
      QrcodeGenerator,
      PageChanger,
      // XmlFormatter,
      JsonFormatter
    }
  }
</script>

<style lang="scss">
  body {
    padding: 0;
    margin: 0;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    font-size: 12px;
    color:#666;
  }

  #app {
    width: 600px;
    margin: 0 auto;
  }

  .el-tabs__item, .el-collapse-item__header, .el-checkbox__label,
  .el-input__inner, .el-select-dropdown__item, .el-message__content, .el-form-item__label,
  .el-table th>.cell,.el-table td>.cell,.el-table__empty-text,.el-radio__label
  {
    font-size: 12px;
  }

  .el-table td>.cell .el-button{
    padding:5px 8px;
  }

  .el-checkbox + .el-checkbox {
    margin-left: 8px;
  }

  .el-collapse-item__content {
    padding-bottom: 10px;
  }

  .el-form-item {
    margin-bottom: 5px;
  }
  .page-header{
    border-bottom:1px solid #EEE;
    padding:0 0 10px 0;
    .more{
      float:right;
    }
  }
</style>
