<template>
<div class="container">
  <el-card>
    <el-main>
      <el-form label-position="top">
        <el-form-item label="Username">
          <el-input v-model="username" placeholder="Username" size="large">
            <template #prepend>
              <i class="material-symbols-outlined">account_circle</i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Company name">
          <el-input v-model="company" placeholder="Company name" size="large">
            <template #prepend>
              <i class="material-symbols-outlined">apartment</i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Email" >
          <el-input v-model="email" placeholder="Email" size="large">
            <template #prepend>
              <i class="material-symbols-outlined">email</i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Password" >
          <el-input v-model="password" :show-password="true" type="password" placeholder="Password" size="large">
            <template #prepend>
              <i class="material-symbols-outlined">lock</i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Confirm password" >
          <el-input v-model="password2" :show-password="true" type="password" placeholder="Confirm password" size="large">
            <template #prepend>
              <i class="material-symbols-outlined">key</i>
            </template>
          </el-input>
        </el-form-item>
        <div class="registerBtn">
          <el-button @click="Register" size="large" type="primary">Register<i class="material-symbols-outlined">login</i></el-button>
        </div>
      </el-form>
    </el-main>
    <el-footer>

      <div class="registerField">
        <span>Already have an account? <router-link to="/login">Login here</router-link></span>
      </div>

    </el-footer>
  </el-card>
</div>
</template>

<script>

import { ElButton, ElForm} from 'element-plus';

import axios from '../axios';

export default {
  name: 'LoginComponent',
  components: {
    ElButton,
    ElForm
  },
  data () {
    return {
      username: null,
      password: null,
      password2: null,
      company: null,
      email: null,
      registerStatus: null,
    }
  },
  methods: {
    Register () {

      if(!this.username || !this.password || !this.password2 || !this.email || !this.company){
        // send notification
        this.$notify({title:"Warning", message:"One or more fields must be provided", type:"warning", customClass:"notification"});
        return;
      }

      if(this.password !== this.password2){
        // send notification
        this.$notify({title:"Warning", message:"Passwords don't match", type:"warning", customClass:"notification"});
        return;
      }

      let data = {
        username:this.username,
        password:this.password,
        email:this.email,
        company:this.company
      }

      axios.post('/registerCompany', data).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.loginStatus = response.data.message;

          // send success notification
          this.$notify({title:"Success", message:this.loginStatus, type:"success", customClass:"notification"});

          this.$router.push('/login');
        }

        if(response.data.status === "error"){
          this.loginStatus = response.data.message;

          // send error notification
          this.$notify({title:"Error", message:this.loginStatus, type:"error", customClass:"notification"});
        }

      }).catch(error => {
        console.log(error);

        // send error notification
        this.$notify({title:"Error", message:error.message, type:"error", customClass:"notification"});
      })
    }
  }
}
</script>

<style scoped>

.registerField {
  padding-top: 1rem;
}

.registerBtn{
  padding-top: 2rem;
}

.container {
  justify-content: center;
  text-align: center;
  display: grid;
  font-size: 1.2em;
}

</style>
