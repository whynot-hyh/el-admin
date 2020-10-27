<template>
  <div>
    <el-container style="position: absolute; top: 55px; left: 0; right: 0; bottom: 0;">
      <el-header class="d-flex align-items-center border-bottom">
        <div class="d-flex mr-auto">
          <el-select class="mr-2" placeholder="请选择图片排序方式" v-model="searchForm.order" size="mini" style="width: 150px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-input size="mini" class="mr-2" placeholder="输入相册名称"  v-model="searchForm.keyword" style="width: 150px"></el-input>
          <el-button type="success" size="mini">搜索</el-button>
        </div>
        <el-button type="success" size="mini" @click="openAlbumModel(false)">创建相册</el-button>
        <el-button type="warning" size="mini" @click="uploadModel = true">上传图片</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px" style="position: absolute; top: 60px; left: 0; bottom: 60px" class="bg-white border-right">
          <ul class="list-group list-group-flush">
            <album-item v-for="(item,index) in albums" :key="index"
            :item="item" :index="index" 
            :active="albumIndex === index"
            @change="albumChange"
            @edit="openAlbumModel"
            @del="albumDel"></album-item>
          </ul>
        </el-aside>
        <el-container>
          <el-main style="position: absolute; top: 60px; left: 200px; right: 0; bottom: 60px">
            
          </el-main>
        </el-container>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>

    <!-- 修改或创建相册 -->
    <el-dialog :title="title" :visible.sync="albumModel">
      <el-form :model="albumForm" ref="form" label-width="80px">
        <el-form-item label="相册名称">
          <el-input v-model="albumForm.name" size="medium" placehoder="请输入相册名称"></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number v-model="albumForm.order" :min="0" size="medium"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="albumModel = false">取 消</el-button>
        <el-button type="primary" @click="confirmAlbumModel">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 上传图片 -->
    <el-dialog title="上传图片" :visible.sync="uploadModel">
      <div class="text-center">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import albumItem from "../../components/image/album-item"
export default {
  components: {
    albumItem
  },
  data(){
    return {
      searchForm: {
        order: '',
        keyword: ''
      },
      albums: [],
      albumIndex: 0,
      albumModel: false,
      albumForm: {
        name: "",
        order: 0
      },
      albumEditIndex: -1,
      title: '',
      uploadModel: false
    }
  },
  created(){
    this.__init()
  },
  methods: {
    __init(){
      for(let i = 0; i < 20; i++){
        this.albums.push({
          name: "相册"+i,
          num: Math.floor(Math.random()*100),
          order: 0
        })
      }
    },
    //切换相册
    albumChange(index){
      this.albumIndex = index
    },
    openAlbumModel(obj){
      //修改
       if(obj){
         let {item,index} = obj 
         this.albumForm.name = item.name;
         this.albumForm.order = item.order
         this.albumEditIndex = index
         this.title = '修改相册'
         return this.albumModel = true
       }
       //创建
       this.albumForm = {
         name: '',
         order: 0
       }
       this.albumEditIndex = -1
       this.albumModel = true
       this.title = '创建相册'
    },
    //点击确定修改创建相册
    confirmAlbumModel(){
      //判断是否为修改
      if(this.albumEditIndex > -1){
        this.albumEdit()
        return this.albumModel = false
      }
      //追加album
      this.albums.unshift({
        name: this.albumForm.name,
        order: this.albumForm.order,
        num: 0
      })
      this.albumModel = false
    },
    albumEdit(){
      this.albums[this.albumEditIndex].name = this.albumForm.name
      this.albums[this.albumEditIndex].order = this.albumForm.order
    },
    albumDel(index){
      this.$confirm('是否删除该相册?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.albums.splice(index,1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    },

  }
}
</script>

<style>
.sum-active{
  color: #67C23A !important;
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}
</style>