<template>
  <el-dialog title="图片管理" :visible.sync="imageModel" width="80%" top="5vh">
    <el-container style="position:relative;height:70vh;margin:-30px -20px">
      <el-header class="d-flex align-items-center border-bottom">
        <div class="d-flex mr-auto">
          <el-select class="mr-2" placeholder="请选择图片排序方式"
          v-model="searchForm.order" size="mini" style="width: 150px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-input size="mini" class="mr-2" placeholder="输入相册名称"  
          v-model="searchForm.keyword" style="width: 150px"></el-input>
          <el-button type="success" size="mini">搜索</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" 
        style="position: absolute; top: 60px; left: 0; bottom: 60px" 
        class="bg-white border-right">
        <!-- 侧边 相册列表 -->
          <ul class="list-group list-group-flush">
            <album-item v-for="(item,index) in albums" :key="index"
            :item="item" :index="index" 
            :active="albumIndex === index"
            @change="albumChange" :showOptions="false"></album-item>
          </ul>
        </el-aside>
        <el-container>
          <el-main style="position: absolute; top: 60px; left: 200px; right: 0; bottom: 60px">
            <el-row :gutter="10">
              <el-col :span="24" :lg="4" :md="6" :sm="8"
              v-for="(item,index) in imageList" :key="index">
                <el-card class="box-card mb-3 position-relative" 
                :body-style="{'padding':'0'}" shadow="hover" style="cursor:pointer">
                  <div class="border" :class="{'border-danger':item.isChecked}">
                    <span class="badge badge-danger" 
                    v-if="item.isChecked" style="position:absolute;right:0;top:0;">
                      {{item.checkOrder}}
                    </span>
                    <img class="w-100" style="height: 100px" :src="item.url" @click="choose(item)">
                    <div class="w-100 text-white px-1" style="background:rgba(0,0,0,0.5);margin-top: -25px;position:absolute">
                      <span class="small">{{item.name}}</span>
                    </div>
                    <div class="p-2 text-center">
                      <el-button-group>
                        <el-button size="mini" @click="imageEdit(item,index)" 
                        class="p-2" icon="el-icon-edit"></el-button>
                        <el-button size="mini" @click="imageDel({index})" 
                        class="p-2" icon="el-icon-delete"></el-button>
                      </el-button-group>
                    </div>
                  </div>

                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
      <el-footer class="border-top d-flex align-items-center px-0">
        <div style="width:200px;flex-shrink:0;" 
        class="h-100 d-flex align-items-center justify-content-center border-right">
          <el-button-group>
            <el-button size="mini">上一页</el-button>
            <el-button size="mini">下一页</el-button>
          </el-button-group>
        </div>
        <div style="flex:1;" class="px-2">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>
      </el-footer>
    </el-container>


    <div slot="footer" class="dialog-footer">
      <el-button @click="hide">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import albumItem from "../image/album-item"
export default {
  components: {
    albumItem
  },
  props: {
    //选中数量限制
    max: {
      type: Number,
      default: 9
    }
  },
  data(){
    return {
      imageModel: false,
      callback: false,


      searchForm: {
        order: '',
        keyword: ''
      },
      albums: [],
      albumIndex: 0,
      title: '',
      previewUrl: '',
      imageList:[],
      chooseList: [],
      currentPage: 1
    }
  },
    created(){
    this.__init()
  },
  methods: {
    chooseImage(callback){
      //取消选中
      this.unChoose()
      this.callback = callback
      this.imageModel = true
    },
    confirm(){
      //选中的图片url
      if(typeof this.callback === 'function'){
        this.callback(this.chooseList)
      }
      this.hide()
    },
    hide(){
      this.imageModel = false
      this.callback = false
    },


    __init(){
      for(let i = 0; i < 20; i++){
        this.albums.push({
          name: "相册"+i,
          num: Math.floor(Math.random()*100),
          order: 0
        })
      }

      for(let i=0;i<30;i++){
        this.imageList.push({
          id: i,      
          url: 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg',
          name: '图片'+i,
          isChecked: false,
          checkOrder: 0
        })
      }
    },
    //切换相册
    albumChange(index){
      this.albumIndex = index
    },

    //修改图片名称
    imageEdit(item){
      this.$prompt('请输入新名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: item.name,
        inputValidator(val){
          if(val === ''){
            return '图片名称不能为空'
          }
        }
      }).then(({ value }) => {
        item.name = value
        this.$message({
          type: 'success',
          message: '修改成功'
        });
      })
    },
    //删除图片
    imageDel(obj){
      this.$confirm(obj.all?'是否删除选中图片?':'是否删除该图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(obj.all){
          //批量删除
          let list = this.imageList.filter(img => {
            return !this.chooseList.some(c => c.id === img.id)
          })
          this.imageList = list
          this.chooseList = []
        }else{
          this.imageList.splice(obj.index,1)
        }
      
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      });  
    },

    //取消选中
    unChoose(){
      this.imageList.forEach(img => {
        let i = this.chooseList.findIndex(item => {
          return item.id === img.id        
        })
        if(i > -1){
          //取消选中样色,选中排序归零
          img.isChecked = false
          img.checkOrder = 0
          //从chooseList中移除
          this.chooseList.splice(i,1)

        }
      })
    },

    //选中图片
    choose(item){
      if(!item.isChecked){
        //限制选中数量
        if(this.chooseList.length >= this.max){
          return this.$message({
            message: '最多选择'+this.max+'张图片',
            type: 'warning'
          })
        }
        //加入选中
        this.chooseList.push({id: item.id, url: item.url})
        item.checkOrder = this.chooseList.length
        item.isChecked = true
        return
      }
      //取消选中
      let i = this.chooseList.findIndex(v => v.id === item.id)
      if(i === -1) return
      let length = this.chooseList.length
      //取消选中中间部分
      if(i+1 < length){
        for(let j = i; j < length; j++){
          let no = this.imageList.findIndex(v => v.id === this.chooseList[j].id)
          if(no > -1){
            this.imageList[no].checkOrder--
          }
        }
      }
       
      this.chooseList.splice(i,1)

      item.isChecked = false
      item.checkOrder = 0
    },

    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style>

</style>