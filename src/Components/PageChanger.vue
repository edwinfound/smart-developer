<template>
  <div>

    <div v-if="page=='list'">
      <div class="page-header">
        <div class="more">
          <el-button type="text" size="mini" icon="el-icon-plus" @click="doAdd()">Add</el-button>
        </div>
        Page Changer Rule List
      </div>
      <el-table
        :data="list"
        stripe
        empty-text="Empty"
        style="width: 100%">
        <el-table-column label="RegExp.">
          <template slot-scope="scope">
            <span>{{ scope.row.rule }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Change title">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Hide fav">
          <template slot-scope="scope">
            <span>{{ scope.row.hideIcon?'Yes':'No' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Operation" width="80">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" icon="el-icon-delete" @click="doDelete(scope.$index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-if="page=='edit'">
      <div class="page-header">
        Add Page Changer Rule
      </div>
      <el-form label-width="80px">
        <el-form-item label="RegExp.">
          <el-input v-model="edit.rule" size="mini" placeholder="www.example.com"></el-input>
        </el-form-item>
        <el-form-item label="Change title">
          <el-input v-model="edit.title" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="edit.hideIcon">Hide fav</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" size="mini" @click="doSave()">Save</el-button>
          <el-button plain size="mini" @click="page='list'">Back</el-button>
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
            message: 'RegExp. is empty',
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
