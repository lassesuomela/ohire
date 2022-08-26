<template>
<div class="container">
  <el-card>
    <el-header>
      <h2>{{title}}</h2>
    </el-header>
    <el-main>
      <h2>Salary: {{salary}}</h2>
    </el-main>
    <el-form label-position="top">
      <el-form-item label="Job Application">
        <el-input v-model="application" placeholder="Job Application" size="large" show-word-limit="true" maxlength="1000" type="textarea" :autosize="{minRows: 6}" class="customText"/>
      </el-form-item>

      <p>Upload your CV</p>
      <el-upload
        :auto-upload="false"
        :limit="1"
        accept=".pdf"
        :on-change="HandleFile"
        v-model:file-list="list"
        :on-exceed="HandleExceed"
      >
        <template #trigger>
          <el-button type="primary">Select File</el-button>
        </template>

        <template #tip>
          <div class="el-upload__tip">
            Only pdf files are allowed. Max file size 5 Mb.
          </div>
        </template>
      </el-upload>

      <div class="btn">
        <el-button @click="this.$router.go(-1)" size="large" type="primary"><i class="material-symbols-outlined left">arrow_back</i>Back</el-button>
        <el-button @click="SendApplication" size="large" type="primary">Send<i class="material-symbols-outlined">send</i></el-button>
      </div>
    </el-form>
  </el-card>
</div>
</template>

<script>
import { ElButton} from 'element-plus';

import axios from '../axios';

export default {
  name: 'ApplyComponent',
  components: {
    ElButton,
  },
  data () {
    return {
      application: '',
      status: null,
      title: null,
      salary: null,
      jobId: this.$route.params.id,
      file: null,
      list: []
    }
  },
  methods: {
    HandleExceed(UploadFiles) {
      // when file limit is exceeded remove old file and replace it with the new one
      this.file = UploadFiles
      this.list = this.file;
    },
    HandleFile (uploadFile) {
      this.file = uploadFile.raw;
      this.list = this.file;
    },
    SendApplication () {

      if(!this.application || !this.file){
        this.$notify({title:"Warning", message:"One or more fields must be provided", type:"warning", customClass:"notification"});
        return;
      }

      let data = {
        application:this.application,
        jobId:this.jobId
      }

      let formData = new FormData();

      // send file and json data in the form data

      formData.append("file", this.file);
      formData.append("data", JSON.stringify(data));

      axios.post('/application', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }}).then(response => {

        if(response.data.status === "success"){
          this.status = response.data.message;

          // send success msg
          this.$notify({title:"Success", message:this.status, type:"success", customClass:"notification"});

          this.$router.push('/jobs');
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
    FetchJobData (id) {
      axios.get('/job/' + id).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.title = response.data.data.title;
          if(this.salary) {
            this.FormatSalary(response.data.data.salary);
          }else{
            this.salary = "Not specified"
          }
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
    FormatSalary(salary){

      return new Intl.NumberFormat('fi', {
        style: 'currency',
        currency: 'EUR'
      }).format(salary);
    },
  },
  mounted () {
    this.FetchJobData(this.jobId);
  }
}
</script>

<style scoped>

.container {
  justify-content: center;
  text-align: center;
  display: grid;
  font-size: 1.2em;
}

.btn{
  padding-top: 2rem;
}

.btn i{
  padding-left: 0.5rem;
}

.customText {
  color: black;
  font-size: 16px;
}
.left {
  padding-right: 0.5rem;
}

</style>
