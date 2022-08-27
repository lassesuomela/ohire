<template>
<div class="container">
  <el-card>
    <el-main>
      <el-form label-position="top">
        <el-form-item label="Company Name" v-if="company">
          <el-input v-model="company" size="large" disabled class="customText">
            <template #prepend>
              <i class="material-symbols-outlined">apartment</i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Username">
          <el-input v-model="username" size="large" disabled class="customText">
            <template #prepend>
              <i class="material-symbols-outlined">account_circle</i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Email">
          <el-input v-model="email" size="large" disabled class="customText">
            <template #prepend>
              <i class="material-symbols-outlined">email</i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Account type">
          <el-input v-model="accountType" size="large" disabled class="customText">
            <template #prepend>
              <i class="material-symbols-outlined">badge</i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Creation date">
          <el-input v-model="createdAt" size="large" disabled class="customText">
            <template #prepend>
              <i class="material-symbols-outlined">calendar_month</i>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-main>
  </el-card>
</div>
</template>

<script>
import {ElForm} from 'element-plus';

import axios from '../axios';

export default {
  name: 'ProfileComponent',
  components: {
    ElForm
  },
  data () {
    return {
      username: null,
      email: null,
      createdAt: null,
      status: null,
      accountType: null,
      company: null,
    }
  },
  methods: {
    FetchProfileData () {

      axios.get('/user/profile').then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.username = response.data.data.username;
          this.email = response.data.data.email;
          this.company = response.data.data.company;

          this.createdAt = this.FormatDate(response.data.data.createdAt);

          // check for role
          if(response.data.data.role === 1){
            this.accountType = "User";
          }else if(response.data.data.role === 2){
            this.accountType = "Corporate User";
          }
        }

        if(response.data.status === "error"){
          this.status = response.data.message;

          // send error msg
          this.$notify({title:"Error", message:this.status, type:"error", class:"notification"});
        }

      }).catch(error => {
        console.log(error);
      })
    },
    FormatDate(timestamp){

      const date = new Date(timestamp);
            
      return date.toLocaleString('fi');
    },
  },
  mounted () {
    this.FetchProfileData();
  }
}
</script>

<style scoped>

.customText {
  color: black;
  font-size: 16px;
}

.container {
  justify-content: center;
  text-align: center;
  padding: 15rem;
  font-size: 1.2em;
}
</style>
