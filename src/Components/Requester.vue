<template>
  <div>

    <div>
      <el-form label-width="70px">
        <el-form-item label="Url：">
          <el-input placeholder="输入请求路径" v-model="request.url" size="mini" :disabled="requestLoading">
            <template slot="prepend">{{currentPageUrl}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Method：">
          <el-radio v-model="request.method" label="get" :disabled="requestLoading">GET</el-radio>
          <el-radio v-model="request.method" label="post" :disabled="requestLoading">POST</el-radio>
        </el-form-item>
        <el-form-item label="Header：">
          <el-row :gutter="0" v-for="(header,headerIndex) in request.headers">
            <el-col :span="10">
              <el-input v-model="request.headers[headerIndex].name" size="mini" placeholder="Name" :disabled="requestLoading"></el-input>
            </el-col>
            <el-col :span="1">
              &nbsp;
            </el-col>
            <el-col :span="11">
              <el-input v-model="request.headers[headerIndex].value" size="mini" placeholder="Value" :disabled="requestLoading"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button plain size="mini" @click="request.headers.splice(headerIndex,1)" :disabled="requestLoading"><i class="el-icon-delete"></i></el-button>
            </el-col>
          </el-row>
          <div>
            <el-button plain size="mini" @click="request.headers.push({name:'',value:''})" :disabled="requestLoading"><i class="el-icon-plus"></i>
              Add
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="Params：">
          <el-row :gutter="0" v-for="(param,paramIndex) in request.params">
            <el-col :span="10">
              <el-input v-model="request.params[paramIndex].name" size="mini" placeholder="Name" :disabled="requestLoading"></el-input>
            </el-col>
            <el-col :span="1">
              &nbsp;
            </el-col>
            <el-col :span="11">
              <el-input v-model="request.params[paramIndex].value" size="mini" placeholder="Value" :disabled="requestLoading"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button plain size="mini" @click="request.params.splice(paramIndex,1)" :disabled="requestLoading"><i class="el-icon-delete"></i></el-button>
            </el-col>
          </el-row>
          <div>
            <el-button plain size="mini" @click="request.params.push({name:'',value:''})" :disabled="requestLoading">
              <i class="el-icon-plus"></i>
              Add
            </el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" size="mini" @click="doSend()" :loading="requestLoading">Send</el-button>
          <el-button plain size="mini" @click="doClear()" :disabled="requestLoading" v-if="history.length>0">Clear History</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-collapse class="history-list" v-model="historyItemView">
      <el-collapse-item v-for="(historyItem,historyItemIndex) in history" :name="historyItem.id">
        <template slot="title">
          <span v-if="historyItem.loading">[<i class="el-icon-loading"></i>]</span>
          <span v-if="!historyItem.loading && historyItem.response && historyItem.response.status===200" data-text-type="success">[{{historyItem.response.status}}]</span>
          <span v-if="!historyItem.loading && historyItem.response && historyItem.response.status!==200" data-text-type="danger">[{{historyItem.response.status}}]</span>
          [{{historyItem.request.method.toUpperCase()}}] {{historyItem.url}}
        </template>
        <div>
          <table class="request-item-table">
            <tr>
              <td width="70">Request:</td>
              <td>
                <table class="requester-info" v-if="!!historyItem.request">
                  <tr>
                    <td width="60" class="label">Url:</td>
                    <td>{{historyItem.request.url}}</td>
                  </tr>
                  <tr>
                    <td class="label">Method:</td>
                    <td>{{historyItem.request.method.toUpperCase()}}</td>
                  </tr>
                  <tr v-if="historyItem.request.headers.length>0" v-for="(header,headerIndex) in historyItem.request.headers">
                    <td class="label" v-if="headerIndex===0" :rowspan="headerIndex===0?historyItem.request.headers.length:1">Header:</td>
                    <td>
                      {{historyItem.request.headers[headerIndex].name}}
                      :
                      {{historyItem.request.headers[headerIndex].value}}
                    </td>
                  </tr>
                  <tr v-if="historyItem.request.params.length>0" v-for="(param,paramIndex) in historyItem.request.params">
                    <td class="label" v-if="paramIndex===0" :rowspan="paramIndex===0?historyItem.request.params.length:1">Param:</td>
                    <td>
                      {{historyItem.request.params[paramIndex].name}}
                      :
                      {{historyItem.request.params[paramIndex].value}}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>Response:</td>
              <td>
                <table class="requester-info" v-if="!!historyItem.response">
                  <tr v-if="historyItem.response.headers.length>0" v-for="(header,headerIndex) in historyItem.response.headers">
                    <td class="label" v-if="headerIndex===0" :rowspan="headerIndex===0?historyItem.response.headers.length:1">Header:</td>
                    <td>
                      {{historyItem.response.headers[headerIndex].name}}
                      :
                      {{historyItem.response.headers[headerIndex].value}}
                    </td>
                  </tr>
                  <tr>
                    <td width="60" class="label">Body:</td>
                    <td>
                      <el-input
                        type="textarea"
                        :rows="4"
                        size="mini"
                        :readonly="true"
                        style="padding:0px;width:100%;"
                        v-model="historyItem.response.body">
                      </el-input>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script>
  const Storage = require('../lib/storage')
  // const Validate = require('../lib/validate')
  let empty = {
    request: {
      url: '/',
      method: 'get',
      headers: [],
      params: [],
    },
    historyItem:{
      id:'',
      loading: true,
      request:null,
      response:null,
    }
  }
  module.exports = {
    data() {
      return {
        currentPageUrl: '',
        history: [],
        request: Object.assign({}, empty.request),
        requestLoading: false,
        requestValue: null,
        responseValue: null,
        historyItemView: '',
      }
    },
    watch: {
      request: {
        handler(newName, oldName) {
          Storage.localSet('Requester_RequestSave', this.request, function (value) {})
          console.log('save')
        },
        deep: true
      }
    },
    mounted() {
      var me = this
      Storage.localGet('Requester_History', [], function (value) {
        me.history = value;
      });
      Storage.localGet('Requester_RequestSave', Object.assign({}, empty.request), function (value) {
        me.request = value;
      });
      if(chrome.runtime.onMessage){
        chrome.runtime.onMessage.addListener(function (msg, sender) {
          if(('type' in msg) && ('payload' in msg) && msg.type==='Requester_Response'){
            me.history[0].response = msg.payload.response;
            me.history[0].loading = false;
            me.requestLoading = false;
            Storage.localSet('Requester_History', me.history, function () {})
          }
        });
      }
      if(chrome.tabs){
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
          var l = document.createElement("a");
          l.href = tabs[0].url;
          me.currentPageUrl = l.protocol+'//'+l.host;
          if(!me.request.url){
            me.request.url = l.pathname;
          }
        });
      }else{
        // mock
        var l = document.createElement("a");
        l.href = window.location.href;
        me.currentPageUrl = l.protocol+'//'+l.host;
        me.request.url = l.pathname;
      }
    },
    methods: {
      doSend() {
        var me = this;
        var payload = {};
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var cs = []
        for (var i = 0; i < 16; i++) {
          cs.push(chars.charAt(Math.floor(Math.random() * chars.length)))
        }
        payload.id = cs.join('');
        payload.request = Object.assign({},me.request);
        me.requestLoading = true;
        me.requestValue = payload.request;
        me.responseValue = '';

        var historyItem = Object.assign({},empty.historyItem);
        historyItem.id = payload.id;
        historyItem.request = payload.request;
        this.history.splice(0,0,historyItem);
        this.historyItemView = payload.id;

        Storage.localSet('Requester_History', me.history, function () {})

        if(chrome.tabs){

          chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {type: "Requester_Request",payload:payload}, function (response) {});
          });

        }else{
          // mock
          setTimeout(function () {
            historyItem.loading = false;
            historyItem.response = {
              status:200,
              headers:[
                {name:'Content-Type',value:'application/json'},
                {name:'Mock',value:'foo'},
              ],
              body:'{code:1,msg:"ok"}'
            };
            me.requestLoading = false;

            Storage.localSet('Requester_History', me.history, function () {})

          },3000);
        }
      },
      doClear() {
        Storage.localSet('Requester_History', [], function () {});
        this.history = [];
      }
    }
  }
</script>
<style lang="scss">
  .request-item-table{
    width:100%;
    td {
      vertical-align: top;
      div{
        margin:0;
        padding:0;
        width:auto;
      }
    }
  }
  .requester-info{
    border:1px solid #EEE;
    border-radius:3px;
    font-size:12px;
    width:100%;
    line-height:1.4em;
    border-collapse: collapse;
    font-family: Consolas,monospace,serif;
    td{
      vertical-align: top;
      background:#F8F8F8;
      border:1px solid #EEE;
      padding:3px 5px;
      border-radius:3px;
      color:#666;
      &.label{
        //font-weight:bold;
      }
      textarea{
        padding:2px 5px;
      }
    }
  }
  .history-list{
    font-family: Consolas,monospace,serif;
    font-size:12px;
    .el-collapse-item__header{
      line-height:30px;
      height:30px;
      .el-collapse-item__arrow{
        line-height:30px;
        height:30px;
      }
    }
    .el-collapse-item__content{
      font-size:12px;
    }
  }
</style>
