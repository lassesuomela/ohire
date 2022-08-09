<template>
<div class="container">
  <el-card>
    <el-main>
      <el-form label-position="top">
        <el-header>
          <h2>Job title: {{title}}</h2>
        </el-header>
        <el-main>
          <h2>Salary: {{salary}}</h2>
        </el-main>

        <el-form-item label="Job Description">
          <el-input v-model="description" size="large" type="textarea" :autosize="{minRows: 8, minColumns:100}" class="customText" disabled/>
        </el-form-item>

        <div class="btn">          
          <el-button @click="this.$router.go(-1)" size="large" type="primary"><i class="material-symbols-outlined left">arrow_back</i>Back</el-button>
          <el-button @click="Apply(id)" size="large" type="primary">Apply<i class="material-symbols-outlined">edit_note</i></el-button>
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
  name: 'LoginComponent',
  components: {
    ElButton, 
    ElForm
  },
  data () {
    return {
      id: this.$route.params.id,
      title: "",
      description: "",
      salary: null,
      status: null,
    }
  },
  methods: {
    FetchJob (id) {

      axios.get('/job/' + id).then(response => {
        console.log(response.data);

        if(response.data.status === "success"){
          this.title = response.data.data.title;
          this.description = response.data.data.description;
          this.salary = response.data.data.salary;

          if(!this.salary) {
            this.salary = "Not specified";
          }else {
            this.salary = this.FormatSalary(this.salary);
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
    Apply(id) {
      this.$router.push('/apply/' + id);
    },
    FormatSalary(salary){

      return new Intl.NumberFormat('fi', {
        style: 'currency',
        currency: 'EUR'
      }).format(salary);
    }
  },
  mounted () {
    this.FetchJob(this.id);
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
