<template>
  <div class="bg-white px-3" style="margin:-20px;margin-top:-1rem;">
    <el-tabs @tab-click="handleClick">
    <el-tab-pane :label="tab.name" 
    v-for="(tab,tabI) in tabbars"
    :key="tabI">
      <div class="d-flex align-items-center">
        <el-button type="success" size="mini">发布商品</el-button>
        <el-button type="danger" size="mini">批量删除</el-button>
        <div class="ml-auto" v-show="!superSearch">
          <el-input v-model="form.name" placehoder="要搜索的商品名称"
          size="mini" style="width:150px" class="mr-2"></el-input>
          <el-button type="info" size="mini">搜索</el-button>
          <el-button size="mini" @click="superSearch = true">高级搜索</el-button>
        </div>
      </div>
      <el-card class="box-card bg-light my-3" v-show="superSearch">
        <div slot="header" class="clearfix" style="margin:-10px">
          <span>高级搜索</span>
          <el-button @click="superSearch = false"
          style="float: right; padding: 3px 0" type="text">
            收起
          </el-button>
        </div>
        <!-- 表单 -->
        <el-form inline ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称" class="mb-0">
            <el-input v-model="form.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="商品编码" class="mb-0">
            <el-input v-model="form.code" size="mini"></el-input>
          </el-form-item>          
          <el-form-item label="商品类型" class="mb-0">
            <el-select v-model="form.type" size="mini">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>          
          <el-form-item label="商品分类" class="mb-0">
            <el-input v-model="form.category" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
            <el-button size="mini" @click="clearSearch">清空筛选条件</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  data(){
    return {
      tabIndex: 0,
      tabbars: [
        {name: '审核中'},
        {name: '出售中'},
        {name: '已下架'},
        {name: '库存预警'},
        {name: '回收站'}
      ],
      superSearch: false,
      form: {
        name: '',
        code: '',
        typr: '',
        category: ''
      }
    }
  },
  methods: {
    handleClick(tab,event){
      // console.log(tab,event)
    },
    //清空筛选条件
    clearSearch(){
      this.form = {
        name: '',
        code: '',
        typr: '',
        category: ''
      },
      this.superSearch = false
    },
    //搜索事件
    searchEvent(){

    }
  }
}
</script>

<style>

</style>