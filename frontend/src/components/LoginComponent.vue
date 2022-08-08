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

        <el-form-item label="Password" >
          <el-input v-model="password" :show-password="true" type="password" placeholder="Password" size="large">
            <template #prepend>
              <i class="material-symbols-outlined">lock</i>
            </template>
          </el-input>
        </el-form-item>

        <el-button @click="Login" size="large" type="primary">Login<i class="material-symbols-outlined">login</i></el-button>
      </el-form>
    </el-main>
    <el-footer>
      <div class="registerField">
        <span>New user? <router-link to="/register">Register now</router-link></span>
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
    ElForm,
  },
  data () {
    return {
      username: null,
      password: null,
      loginStatus: null,
    }
  },
  methods: {
    Login () {

      if(!this.username || !this.password){
        this.$notify({title:"Warning", message:"One or more fields must be provided", type:"warning", customClass:"notification"});
        return;
      }

      let data = {
        username:this.username,
        password:this.password
      }

      axios.post('/login', data).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.loginStatus = response.data.message;

          localStorage.setItem("token", response.data.token);3

          // send success msg
          this.$notify({title:"Success", message:this.loginStatus, type:"success", customClass:"notification"});
          // refresh
          this.$router.go();
        }

        if(response.data.status === "error"){
          this.loginStatus = response.data.message;

          // send error msg
          this.$notify({title:"Error", message:this.loginStatus, type:"error", customClass:"notification"});

        }

      }).catch(error => {
        console.log(error);
      })
    }
  },
  mounted () {
    if(localStorage.getItem('token')){
      this.$router.push('/jobs');
    }
  }
}
</script>

<style scoped>

.field i {
  padding-right: 1rem;
  font-size: 2rem;
}

.field {
  justify-content: center;
  text-align: center;
  display: flex;
  padding: 0.5rem;
}

.registerField {
  padding-top: 1rem;
}

.container {
  justify-content: center;
  text-align: center;
  display: grid;
  font-size: 1.2em;
}
</style>
