<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-5 col-md-7 col-sm-9 col-12 m-auto pt-5">
        <div class="card mt-5">
          <div class="card-header bg-white">
            <h3 class="text-center mb-0 text-secondary">
              {{$conf.logo}}
            </h3>
          </div>
          <div class="card-body">
            <el-form ref="ruleForm" :rules="rules" :model="form">
              <el-form-item prop="username">
                <el-input v-model="form.username" size="medium" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="form.password" size="medium" placeholder="请输入密码" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="w-100" @click="submit" type="primary" size="medium">立即登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: "请输入用户名", trigger: 'blur'}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: 'blur'}
        ]
      }
    }
  },

  methods: {
    submit(){
      this.$refs.ruleForm.validate((e)=>{
        if(!e) return;
        this.$router.push({name: 'index'})
      })
    }
  }

}
</script>

<style>

</style> 