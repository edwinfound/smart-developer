<template>
  <div>

    <div v-if="page=='list'">
      <div class="page-header">
        <div class="more">
          <el-button type="text" size="mini" icon="el-icon-plus" @click="doAdd()">增加</el-button>
        </div>
        规则列表
      </div>
      <el-table
        :data="list"
        stripe
        empty-text="暂无规则"
        style="width: 100%">
        <el-table-column label="Url正则">
          <template slot-scope="scope">
            <span>{{ scope.row.rule }}</span>
          </template>
        </el-table-column>
        <el-table-column label="修改标题">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="隐藏ICON">
          <template slot-scope="scope">
            <span>{{ scope.row.hideIcon?'是':'否' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" icon="el-icon-delete" @click="doDelete(scope.$index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-if="page=='edit'">
      <div class="page-header">
        增加规则
      </div>
      <el-form label-width="80px">
        <el-form-item label="Url正则">
          <el-input v-model="edit.rule" size="mini" placeholder="www.example.com"></el-input>
        </el-form-item>
        <el-form-item label="修改标题">
          <el-input v-model="edit.title" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="edit.hideIcon">隐藏ICON</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" size="mini" @click="doSave()">保存</el-button>
          <el-button plain size="mini" @click="page='list'">返回</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  const Storage = require('../lib/storage')
  const Validate = require('../lib/validate')
  let empty = {
    rule: '',
    title: '',
    hideIcon: false
  }
  module.exports = {
    data() {
      return {
        page: 'list',
        list: [],
        edit: Object.assign({}, empty)
      }
    },
    mounted() {
      var me = this
      Storage.get('PageChanger_List', [], function (value) {
        me.list = value
      })
    },
    methods: {
      doSave() {
        var me = this
        if (Validate.isEmpty(this.edit.rule)) {
          this.$message({
            message: 'Url RegExp. is empty',
            type: 'error',
          })
          return;
        }
        this.list.push(Object.assign({}, this.edit));
        Storage.set('PageChanger_List', this.list, function () {
          me.$message({
            message: 'Save Success',
            type: 'success',
          })
          me.page = 'list'
        });
      },
      doAdd() {
        this.page = 'edit'
        this.edit = Object.assign({}, empty)
      },
      doDelete(index) {
        this.list.splice(index,1)
        Storage.set('PageChanger_List', this.list)
      }
    }
  }
</script>
