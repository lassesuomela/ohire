<template>
<div class="container">
  <el-card>
    <el-container class="content">
      
      <el-aside class="avatar">
        <el-avatar :src="profilePicture" :size="200" id="avatar">
          <i class="material-symbols-outlined">person</i>
        </el-avatar>

        <div>
          <p>Change profile picture</p>
          <el-upload
            :auto-upload="false"
            :limit="1"
            accept=".png, .jpg, .jpeg"
            :on-change="HandleFile"
            v-model:file-list="list"
            :on-exceed="HandleExceed"
          >
            <template #trigger>
              <el-button type="normal">Select File</el-button>
            </template>

            <template #tip>
              <div class="el-upload__tip">
                Max file size 2 Mb.
              </div>
            </template>
          </el-upload>
        </div>
      </el-aside>

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
    </el-container>
    <el-button @click="UpdateProfile" type="primary">Update</el-button>
  </el-card>
</div>
</template>

<script>
import {ElForm, ElLoading} from 'element-plus';

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
      picture: null,
      list: [],
      profilePicture: null,
      loader:null
    }
  },
  methods: {
    HandleExceed(UploadFiles) {

      // when file limit is exceeded remove old file and replace it with the new one
      this.picture = UploadFiles[0];
      this.list = UploadFiles;
    },
    HandleFile (uploadFile) {
      this.picture = uploadFile.raw;
      this.list = this.picture;
    },
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

        this.loader.close();

      }).catch(error => {
        console.log(error);
      })
    },
    FormatDate(timestamp){

      const date = new Date(timestamp);
            
      return date.toLocaleString('fi');
    },
    UpdateProfile () {

      if(!this.picture){
        this.$notify({title:"Warning", message:"Picture must be selected", type:"warning", customClass:"notification"});
        return;
      }

      let formData = new FormData();

      formData.append("picture", this.picture);

      axios.post('/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }}).then(response => {

        if(response.data.status === "success"){
          this.status = response.data.message;

          // send success msg
          this.$notify({title:"Success", message:this.status, type:"success", customClass:"notification"});

          this.$router.go();
        }

        if(response.data.status === "error"){
          this.status = response.data.message;

          // send error msg
          this.$notify({title:"Error", message:this.status, type:"error", customClass:"notification"});
        }

      }).catch(error => {
        console.log(error);
      })
    },
    FetchProfilePicture() {
      axios.get('/user/profile/picture').then(response => {

        this.profilePicture = response.data;
        console.log(this.profilePicture);


      }).catch(error => {
        console.log(error);
      })
    }
  },
  mounted () {
    this.loader = ElLoading.service({ fullscreen: true });

    this.FetchProfileData();
    this.FetchProfilePicture();
  }
}
</script>

<style scoped>

#avatar {
  background-color: Transparent;
  border: .25rem solid var(--primary);
}
#avatar i {
  color:   var(--grayish-color);
}
.customText {
  color: black;
  font-size: 1rem;
  width:60ch;
}

.avatar {
  justify-content: center;
  display: grid;
  padding-top:3rem;
  padding-bottom: 1rem;
}

.avatar div {
  font-size: 1rem;
}
.avatar i {
  font-size: 10rem;;
}
.container {
  justify-content: center;
  text-align: center;
  padding: 35rem;
  padding-bottom: 0rem;
  font-size: 1.2em;
}

.info {
  display: flex;
  padding-top:1rem;
}

@media screen and (max-width: 600px) {
  .container{
    padding: 0rem;
  }
  .content {
    display: grid;
  }
}
</style>
