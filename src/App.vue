<template>
  <div id="app">

    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">Password</span>
        <el-collapse accordion class="main-list">
          <el-collapse-item>
            <template slot="title">Password Generator</template>
            <PasswordGenerator/>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">Encode/Decode</span>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">MD5 Encode</template>
            <Md5/>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">Base64 Encode</template>
            <Base64Encode/>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">Base64 Decode</template>
            <Base64Decode/>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">URL Encode</template>
            <UrlEncode/>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">URL Decode</template>
            <UrlDecode/>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">Datetime</span>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">Timestamp Convert</template>
            <Timestamp/>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">Qrcode</span>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">Qrcode of current page</template>
            <QrcodePage/>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">Qrcode Generator</template>
            <QrcodeGenerator/>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">CodeFormat</span>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">JSON Formatter</template>
            <JsonFormatter/>
          </el-collapse-item>
          <!--<el-collapse-item>-->
            <!--<template slot="title">XML格式化</template>-->
            <!--<XmlFormatter/>-->
          <!--</el-collapse-item>-->
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">Util</span>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">Page Changer</template>
            <PageChanger/>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">Url Blocker</template>
            <UrlBlocker/>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">Requester</template>
            <Requester/>
          </el-collapse-item>
        </el-collapse>
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
  import UrlBlocker from './Components/UrlBlocker'
  import Requester from './Components/Requester'
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
      JsonFormatter,
      UrlBlocker,
      Requester
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

  .main-list{
    .el-collapse-item__header{
      /*color:#409eff;*/
      /*background: #ecf5ff;*/
      /*border-color: #b3d8ff;*/
    }
  }

  #app {
    width: 600px;
    margin: 0 auto;
  }

  .el-tabs__content{
    height:500px;
    overflow:auto;
  }

  .module-link{
    color:#666;
    text-align:center;
    display:block;
    height:100px;
    line-height:100px;
    text-decoration: none;
    background:#EEE;
    border-radius:3px;
  }

  .el-tabs__item, .el-collapse-item__header, .el-checkbox__label,
  .el-input__inner, .el-select-dropdown__item, .el-message__content, .el-form-item__label,
  .el-table th>.cell,.el-table td>.cell,.el-table__empty-text,.el-radio__label
  {
    font-size: 12px;
  }

  .el-collapse{
    border:none;
  }
  .el-collapse-item__header{
    background: #F8F8F8;
    padding:0 10px;
    border-radius:3px;
    border:1px solid #EEE;
  }
  .el-collapse-item__content{
    padding:10px;
    border:1px solid #EEE;
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

  .el-tabs__item{
    padding:0 10px;
  }

  .el-tabs--bottom .el-tabs--left .el-tabs__item:nth-child(2), .el-tabs--bottom .el-tabs--right .el-tabs__item:nth-child(2), .el-tabs--bottom.el-tabs--border-card .el-tabs__item:nth-child(2), .el-tabs--bottom.el-tabs--card .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs--left .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs--right .el-tabs__item:nth-child(2), .el-tabs--top.el-tabs--border-card .el-tabs__item:nth-child(2), .el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2){
    padding-left:10px;
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
  [data-text-type=danger]{
    color:#F56C6C;
  }
  [data-text-type=success]{
    color:#67C23A;
  }
</style>
