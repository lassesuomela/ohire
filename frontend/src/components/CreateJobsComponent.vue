<template>
<div class="container">
  <el-card class="content">
    <el-main class="main">
      <el-form label-position="top">
        <el-form-item label="Job Title" class="title">
          <el-input v-model="title" placeholder="Title" size="large" show-word-limit="true" maxlength="60" class="customText">
            <template #prepend>
              <i class="material-symbols-outlined">title</i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Salary" class="salary">
          <el-row>
            <el-col :span="15">
              <el-input type="number" v-model="salary" placeholder="0" size="large" controls="false" class="customText">
              <template #prepend>
                <i class="material-symbols-outlined">payments</i>
              </template>

              <template #suffix>
                <i class="material-symbols-outlined">euro</i>
              </template>
            </el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="Working time">
          <el-select v-model="workingTime" placeholder="Select">
            <el-option class="notification"
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Job Description" class="description">
          <el-input v-model="description" placeholder="Description" size="large" show-word-limit="true" maxlength="1000" type="textarea" :autosize="{minRows: 6}" class="customText"/>
        </el-form-item>

        <div class="btn">
          <el-button @click="Create" size="large" type="primary">Create<i class="material-symbols-outlined">send</i></el-button>
        </div>
      </el-form>
    </el-main>
  </el-card>
</div>
</template>

<script>
import { ElButton, ElForm} from 'element-plus';

import axios from '../axios';

export default {
  name: 'CreateJobsComponent',
  components: {
    ElButton,
    ElForm,
  },
  data () {
    return {
      title: "",
      description: "",
      salary: null,
      status: null,
      workingTime: null,
      options: [
        {
          value: 1,
          label: "Full-time",
        },
        {
          value: 2,
          label: "Part-time",
        }
      ]
    }
  },
  methods: {
    Create () {

      if(!this.title || !this.description || !this.workingTime){
        this.$notify({title:"Warning", message:"One or more fields must be provided", type:"warning", customClass:"notification"});
        return;
      }

      if(this.description.length > 1000){
        this.$notify({title:"Warning", message:"Description is too long", type:"warning", customClass:"notification"});
        return;
      }

      if(this.title.length > 60){
        this.$notify({title:"Warning", message:"Title is too long", type:"warning", customClass:"notification"});
        return;
      }

      let data = {
        title: this.title,
        description: this.description,
        salary: this.salary,
        workingTime: this.workingTime
      }

      axios.post('/jobs', data).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.status = response.data.message;

          // send success msg
          this.$notify({title:"Success", message:this.status, type:"success", customClass:"notification"});

          this.$router.go(-1);
        }

        if(response.data.status === "error"){
          this.status = response.data.message;

          // send error msg
          this.$notify({title:"Error", message:this.status, type:"error", customClass:"notification"});
        }

      }).catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>

.btn{
  padding-top: 2rem;
}

.btn i{
  padding-left: 0.5rem;
}

.container {
  justify-content: center;
  text-align: center;
  font-size: 1.2em;
  padding: 35rem;
  padding-bottom:0rem;
}

.customText {
  color: black;
  font-size: 16px;
}
.title {
  width: 70ch;
}
.salary {
  width: 40ch;
}
.description {
  width: 70h;
}
.content{
  justify-content: start;
}

@media screen and (max-width: 600px) {
  .container, .content .main{
    padding: 0rem;
    overflow: hidden;
  }
  .title {
    width: 33ch;
  }
  .salary {
    width: 40ch;
  }
  .description {
    width: 33ch;
  }
  .btn{
    padding: 0rem;
  }
  .btn i{
    padding-left: 0.5rem;
  }
}
</style>
