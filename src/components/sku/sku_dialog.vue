<template>
  <el-dialog title="商品规格选择" :visible.sync="createModel" width="80%" top="5vh">
    <el-container style="position:relative;height:70vh;margin:-30px -20px">
      <el-container>
        <el-aside width="200px" 
        style="position: absolute; top: 0; left: 0; bottom: 0" 
        class="bg-white border-right">
        <!-- 侧边 规格卡片标题 -->
          <ul class="list-group list-group-flush">
            <li class="list-group-item list-group-item-action"
            v-for="(item,index) in skusList" :key="index"
            :class="skuIndex === index ? 'sum-active':''"
            @click="changeSku(index)">
            {{item.name}}</li>
          </ul>
        </el-aside>
        <el-container>
          <el-header style="position:absolute;top:0;left:200px;right:0;height:60px;
          line-height:60px"
          class="border-top border-bottom">
            <el-button type="primary" size="mini" @click="doChooseAll">
              {{isChooseAll? "取消全选":"全选"}}
            </el-button>
          </el-header>
          <el-main style="position: absolute; top: 60px; left: 200px; 
          right: 0; bottom: 0">
            <div class="d-flex flex-wrap">
              <span class="border rounded py-1 px-2 m-2"
              style="cursor:pointer" v-for="(item,index) in skuItems"
              :key="index" :class="item.isCheck ? 'sum-active': ''"
              @click="choose(item)">
                {{item.name}}
              </span>
            </div>
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

export default {
  data(){
    return {
      createModel: false,
      callback: false,
      //选中的按钮
      chooseList: [],
      skuIndex: 0,
      // 数据
      skusList: [
        {
          name: '颜色',
          type: 0, //规格类型 0无 1颜色 2图片
          list: [
            {
              id: 1,
              name: '黄色',
              image:'',
              color: '',
              isCheck: false
            },
            {
              id: 2,
              name: '红色',
              image: '',
              color: '',
              isCheck: false
            }
          ]
        },
        {
          name: '尺寸',
          type: 0, //规格类型 0无 1颜色 2图片
          list: [
            {
              id: 3,
              name: 'XL',
              image:'',
              color: '',
              isCheck: false
            },
            {
              id: 4,
              name: 'XXL',
              image: '',
              color: '',
              isCheck: false
            }
          ]
        },
      ]
 
    }
  },
  computed: {
    //当前规格下的规格属性列表
    skuItems(){
      return this.skusList[this.skuIndex].list
    },
    //是否全选
    isChooseAll(){
      return this.skuItems.length === this.chooseList.length
    }
  },
  methods: {
    chooseSkus(callback){
      this.callback = callback
      this.createModel = true
    },
    confirm(){
      //选中的sku
      if(typeof this.callback === 'function'){
        let item = this.skusList[this.skuIndex]
        this.callback({
          name: item.name,
          type: item.type,
          list: this.chooseList
        })
      }
      this.hide()
    },
    hide(){
      this.unChooseAll()
      this.createModel = false
      this.callback = false
    },
    //切换规格卡片
    changeSku(index){
      this.unChooseAll()
      this.skuIndex = index
    },
    //选中规格属性
    choose(item){
      //之前没有选中
      if(!item.isCheck){
        //加入选中列表
        this.chooseList.push(item)
        //修改选中状态
        return item.isCheck = true
      }
      //之前选中
      //找到当前对象在chooseList中的索引
      let index = this.chooseList.findIndex(v=>{
        return v.id === item.id
      })
      //找不到
      if(index < 0) return;
      //从选中列表中移除
      this.chooseList.splice(index,1)
      //修改选中状态
      item.isCheck = false
    },
    //选中取消选中
    doChooseAll(){
      let list = this.skusList[this.skuIndex].list
      //是否已经全选
      if(this.isChooseAll){ //取消全选
        return this.unChooseAll()
      }
      //全选
      this.chooseList = list.map(v=>{
        //设置全选状态
        v.isCheck = true 
        return v
      })
    },
    //取消选中所有
    unChooseAll(){
      let list = this.skusList[this.skuIndex].list
      //修改选中状态
      list.forEach(v=>{
        v.isCheck = false
      })
      //清空选中列表
      return this.chooseList = []
    }
  }
}
</script>

<style>
  .sum-active{
    background-color: teal;
    color: #fff;
  }
</style>