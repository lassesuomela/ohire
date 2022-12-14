<template>
<div class="container">
  <el-card class="table">
    <el-table :data="jobs" :stripe="true">
    <el-table-column label="Title" prop="title" width="200"/>
    <el-table-column label="Description" prop="description" width="150"/>

    <el-table-column label="Working Time" prop="workingTime">
      <template #default="scope">
        <el-tag class="label" v-if="scope.row.workingTime === 'Full-time'">{{scope.row.workingTime}}</el-tag>
        <el-tag class="label" v-else type="info">{{scope.row.workingTime}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="Salary" prop="salary" />
    <el-table-column label="Timestamp" prop="timestamp" width="140"/>
    <el-table-column label="Applications" prop="applicationCount" />

    <el-table-column label="Applicants">
      <template #default="scope">
        <el-button v-if="scope.row.applicationCount > 0"
          class="label"
          size="small"
          @click="ViewApplications(scope.row.id)"
          >View</el-button
        >
      </template>
    </el-table-column>

    <el-table-column label="Details">
      <template #default="scope">
        <el-button
          class="label"
          size="small"
          @click="ViewMore(scope.row.id)"
          >View</el-button
        >
      </template>
    </el-table-column>

    <el-table-column label="Remove">
      <template #default="scope">
        <el-button
          class="label"
          size="small"
          type="danger"
          @click="Delete(scope.row.id)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <div v-if="maxPage > 1 && maxPage < 5" class="buttons">
    <el-button link class="buttons" v-for="index in maxPage" :key="index" @click="Fetch(index)">{{index}}</el-button>
  </div>
  <div v-else class="buttons">
    <el-button link v-if="currentPage != 1" class="buttons" @click="Fetch(currentPage - 1)">{{currentPage - 1}}</el-button>
    <el-button link class="buttons" style="font-weight:bold">{{currentPage}}</el-button>
    <el-button link v-if="currentPage !== maxPage" class="buttons" @click="Fetch(currentPage + 1)">{{currentPage + 1}}</el-button>
    <el-button link v-if="currentPage !== maxPage && currentPage < 2" class="buttons" @click="Fetch(currentPage + 2)">{{currentPage + 2}}</el-button>
    <span v-if="currentPage !== maxPage && currentPage !== (maxPage - 1)">...</span>

    <el-button link v-if="currentPage !== maxPage && currentPage !== (maxPage - 1)" class="buttons" @click="Fetch(maxPage)">{{maxPage}}</el-button>
  </div>
  </el-card>

</div>
</template>

<script>
import axios from '../axios';
import { ElLoading } from 'element-plus';

export default {
  name: 'MyJobsComponent',
  components: {
  },
  data () {
    return {
      status: null,
      jobs: [],
      currentPage: 1,
      maxPage: 1,
      jobCount: 0,
      loader:null
    }
  },
  methods: {
    Fetch (page) {

      this.currentPage = page;

      if(!localStorage.getItem("token")){
        return;
      }

      axios.get('/company/jobs/' + page).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.jobs = response.data.data;
          this.jobCount = response.data.count;
          this.maxPage = response.data.maxPageAmount;
        }

        if(response.data.status === "error"){
          this.status = response.data.message;

          this.loader.close();
          // send error msg
          this.$notify({title:"Error", message:this.status, type:"error", customClass:"notification"});
          return;
        }

        for(let i = 0; i < this.jobs.length; i++){
          this.jobs[i].timestamp = this.FormatToDate(this.jobs[i].timestamp);
          this.jobs[i].salary = this.FormatSalary(this.jobs[i].salary);

          if(this.jobs[i].workingTime === 1){
            this.jobs[i].workingTime = "Full-time";
          }else{
            this.jobs[i].workingTime = "Part-time";
          }

          if(this.jobs[i].description.length > 50){
            this.jobs[i].description = this.jobs[i].description.substring(0, 50) + "...";
          }

          if(this.jobs[i].title.length > 35){
            this.jobs[i].title = this.jobs[i].title.substring(0, 35) + "...";
          }
        }

        this.loader.close();
      }).catch(error => {
        console.log(error);
      })
    },
    FormatToDate(timestamp){

      const date = new Date(timestamp);
            
      return date.toLocaleString('fi');
    },
    FormatSalary(salary){

      return new Intl.NumberFormat('fi', {
        style: 'currency',
        currency: 'EUR'
      }).format(salary);
    },
    Delete(id){

      axios.delete('/jobs/' + id).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.status = response.data.message;

           // send success msg
          this.$notify({title:"Success", message:this.status, type:"success", customClass:"notification"});

          // reset jobs array and fetch new job listings
          this.jobs = [];
          this.Fetch(1);
          return;
        }

        if(response.data.status === "error"){
          this.status = response.data.message;

          // send error msg
          this.$notify({title:"Error", message:this.status, type:"error", customClass:"notification"});
          return;
        }
      }).catch(error => {
        console.log(error);
      })
    },
    ViewMore(id){
      this.$router.push('/job/' + id);
    },
    ViewApplications(id){
      this.$router.push('/jobApplications/' + id);
    }
  },
  mounted () {
    this.loader = ElLoading.service({ fullscreen: true });
    this.Fetch(this.currentPage);
  }
}
</script>

<style scoped>
.container {
  justify-content: center;
  text-align: center;
  padding: 15rem;
  padding-bottom:5rem;
}

.label {
  font-size: 0.9rem;
}

.buttons {
  padding-top: 1rem;
}
.table {
  padding: 1rem;
}

@media screen and (max-width: 600px) {
  .container, .table{
    padding: 0rem;
  }
}
</style>
