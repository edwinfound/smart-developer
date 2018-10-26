<template>
  <div id="app">
    <el-tabs type="border-card" v-model="tab">
      <el-tab-pane name="0">
        <span slot="label">密码</span>
        <el-collapse accordion class="main-list" v-model="tabItemPool[0]" @change="handleChange">
          <el-collapse-item name="0-0">
            <template slot="title">密码生成器</template>
            <PasswordGenerator/>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane name="1">
        <span slot="label">编码解码</span>
        <el-collapse accordion v-model="tabItemPool[1]" @change="handleChange">
          <el-collapse-item name="1-0">
            <template slot="title">MD5编码</template>
            <Md5/>
          </el-collapse-item>
          <el-collapse-item name="1-1">
            <template slot="title">Base64编码</template>
            <Base64Encode/>
          </el-collapse-item>
          <el-collapse-item name="1-2">
            <template slot="title">Base64解码</template>
            <Base64Decode/>
          </el-collapse-item>
          <el-collapse-item name="1-3">
            <template slot="title">URL编码</template>
            <UrlEncode/>
          </el-collapse-item>
          <el-collapse-item name="1-4">
            <template slot="title">URL解码</template>
            <UrlDecode/>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label">日期时间</span>
        <el-collapse accordion v-model="tabItemPool[2]" @change="handleChange">
          <el-collapse-item name="2-0">
            <template slot="title">时间戳/日期时间 转换</template>
            <Timestamp/>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label">二维码</span>
        <el-collapse accordion v-model="tabItemPool[3]" @change="handleChange">
          <el-collapse-item name="3-0">
            <template slot="title">当前页面二维码</template>
            <QrcodePage/>
          </el-collapse-item>
          <el-collapse-item name="3-1">
            <template slot="title">二维码生成器</template>
            <QrcodeGenerator/>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane name="4">
        <span slot="label">代码美化</span>
        <el-collapse accordion v-model="tabItemPool[4]" @change="handleChange">
          <el-collapse-item name="4-0">
            <template slot="title">JSON美化</template>
            <JsonFormatter/>
          </el-collapse-item>
          <!--<el-collapse-item>-->
            <!--<template slot="title">XML格式化</template>-->
            <!--<XmlFormatter/>-->
          <!--</el-collapse-item>-->
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane name="5">
        <span slot="label">工具</span>
        <el-collapse accordion v-model="tabItemPool[5]" @change="handleChange">
          <el-collapse-item name="5-0">
            <template slot="title">页面修改器</template>
            <PageChanger/>
          </el-collapse-item>
          <el-collapse-item name="5-1">
            <template slot="title">URL拦截</template>
            <UrlBlocker/>
          </el-collapse-item>
          <el-collapse-item name="5-2">
            <template slot="title">页面发送请求</template>
            <Requester/>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import Storage from './lib/storage'
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
      return {
        defaultValue: '',
        tab: 0,
        tabItem: 0,
        tabItemPool:['','','','','',''],
      }
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
    },
    mounted(){
      Storage.get('SmartDeveloperDefault','',value => {
        if(!value){
          return
        }
        this.defaultValue = value
        const pcs = value.split('-')
        this.tab = pcs[0]
        this.tabItemPool[parseInt(this.tab)] = value
        this.tabItemPool = JSON.parse(JSON.stringify(this.tabItemPool))
      })
    },
    methods: {
      handleChange(val) {
        if(!val){
          return
        }
        Storage.set('SmartDeveloperDefault',val)
      }
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
