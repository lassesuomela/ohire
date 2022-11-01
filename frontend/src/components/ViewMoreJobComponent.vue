<template>
<div class="container">
  <el-card>
    <el-container>
      <el-header class="header">
        <h2>{{title}}</h2>
        <el-divider />
        <h3>Salary: {{salary}}</h3>
        <h3>Description:</h3>
      </el-header>
      <el-main class="content">
        <div class="desc">
          <span class="customText">{{description}}</span>
        </div>

        <div class="btn">          
          <el-button @click="this.$router.go(-1)" size="large" type="primary"><i class="material-symbols-outlined left">arrow_back</i>Back</el-button>
          <el-button v-if="role === 1" @click="Apply(id)" size="large" type="primary">Apply<i class="material-symbols-outlined">edit_note</i></el-button>
        </div>
      </el-main>
    </el-container>
  </el-card>
</div>
</template>

<script>
import { ElButton, ElLoading } from 'element-plus';

import axios from '../axios';

export default {
  name: 'LoginComponent',
  components: {
    ElButton, 
  },
  data () {
    return {
      id: this.$route.params.id,
      title: "",
      description: "",
      salary: null,
      status: null,
      role: null,
      loader:null
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

          this.loader.close();

          // send error msg
          this.$notify({title:"Error", message:this.status, type:"error", customClass:"notification"});
        }

        this.loader.close();

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
    this.loader = ElLoading.service({ fullscreen: true });

    this.role = this.$store.state.role;
    this.FetchJob(this.id);
  }
}
</script>

<style scoped>
h1, h2, h3{ 
  text-align: start;
}
.container {
  justify-content: center;
  text-align: center;
  font-size: 1.2em;
  padding: 15rem;
  padding-bottom: 0rem;
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
  white-space: pre-wrap;
  word-break:normal;
}
.left {
  padding-right: 0.5rem;
}

.desc {
  text-align: start;
  word-break: break-all;
  padding-top:8rem;
}

@media screen and (max-width: 600px) {
  .container {
    padding: 0rem;
    font-size: 1rem;
  }
  .header {
    padding: 0rem;
  }
  .content {
    padding: 0rem;
  }
  .desc {
    padding-top:10rem;
  }
}
</style>
