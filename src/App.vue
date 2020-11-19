<template>
  <div id="app">
    <router-view></router-view>
    <image-dialog ref="imageDialog" :max="maxChooseImage"></image-dialog>
    <skus-dialog ref="skusDialog"></skus-dialog>
  </div>
</template>

<script>
import imageDialog from '../src/components/image/image-dialog'
import skusDialog from '../src/components/sku/sku_dialog'
export default {
  name: 'app',
  components: {
    imageDialog,
    skusDialog
  },
  provide(){
    return {
      app: this
    }
  },
  data(){
    return {
      maxChooseImage: 9
    }
  },
  methods: {
    //选择图片
    chooseImage(callback,max = 9){
      this.maxChooseImage = max
      this.$refs.imageDialog.chooseImage(callback)
    },
    //选择规格
    chooseSkus(callback){
      this.$refs.skusDialog.chooseImage(callback)
    }
  }
}
</script>

<style>

</style>
