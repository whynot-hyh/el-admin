<template>
  <el-dialog title="商品规格选择" :visible.sync="imageModel" width="80%" top="5vh">
    <el-container style="position:relative;height:70vh;margin:-30px -20px">
      <el-container>
        <el-aside width="200px" 
        style="position: absolute; top: 0; left: 0; bottom: 0" 
        class="bg-white border-right">
        <!-- 侧边 相册列表 -->
          <ul class="list-group list-group-flush">
            <li class="list-group-item list-group-item-action sum-active">123</li>
            <li class="list-group-item list-group-item-action">123</li>
            <li class="list-group-item list-group-item-action">123</li>
            <li class="list-group-item list-group-item-action">123</li>
          </ul>
        </el-aside>
        <el-container>
          <el-header style="position:absolute;top:0;left:200px;right:0;height:60px;
          line-height:60px"
          class="border-top border-bottom">
            <el-button type="primary" size="mini">全选</el-button>
          </el-header>
          <el-main style="position: absolute; top: 60px; left: 200px; right: 0; bottom: 0">
          </el-main>
        </el-container>
      </el-container>
    </el-container>


    <div slot="footer" class="dialog-footer">
      <el-button @click="hide">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import albumItem from "../image/album-item"
export default {
  components: {
    // albumItem
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

  }
}
</script>

<style>
  .sum-active{
    background-color: teal;
    color: #fff;
  }
</style>