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

        <div class="loginBtn">
          <el-button @click="Login" size="large" type="primary">Login<i class="material-symbols-outlined">login</i></el-button>
        </div>
      </el-form>
    </el-main>
    <el-footer>
      
      <div class="registerField">
        <span>New user? <router-link class="link" to="/register">Register now</router-link></span>
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
        this.$notify({title:"Error", message:error, type:"error", customClass:"notification"});
      })
    }
  },
  mounted () {
    if(localStorage.getItem('token')){
      this.$router.push('/profile');
    }
  }
}
</script>

<style scoped>
.registerField {
  padding-top: 1rem;
}

.registerField a:hover {
  color: #66b1ff;
}

.loginBtn{
  padding-top: 2rem;
}

.container {
  justify-content: center;
  text-align: center;
  display: grid;
  font-size: 1.2em;
}

</style>
