<template>
<div class="container">
  <el-card>
    <el-table :data="jobs" :stripe="true">
    <el-table-column label="Title" prop="title" />
    <el-table-column label="Description" prop="description" />

    <el-table-column label="Working Time" prop="workingTime">
      <template #default="scope">
        <el-tag v-if="scope.row.workingTime === 'Full-time'">{{scope.row.workingTime}}</el-tag>
        <el-tag v-else type="info">{{scope.row.workingTime}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="Salary" prop="salary" />
    <el-table-column label="Timestamp" prop="timestamp" />

    <el-table-column label="Remove">
      <template #default="scope">
        <el-button
          size="small"
          type="danger"
          @click="Delete(scope.row.id)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <div v-if="maxPage > 1 && maxPage < 5">
    <el-button link class="btn" v-for="index in maxPage" :key="index" @click="Fetch(index)">{{index}}</el-button>
  </div>
  <div v-else>
    <el-button link v-if="currentPage != 1" class="btn" @click="Fetch(currentPage - 1)">{{currentPage - 1}}</el-button>
    <el-button link class="btn" style="font-weight:bold">{{currentPage}}</el-button>
    <el-button link v-if="currentPage !== maxPage" class="btn" @click="Fetch(currentPage + 1)">{{currentPage + 1}}</el-button>
    <el-button link v-if="currentPage !== maxPage && currentPage < 2" class="btn" @click="Fetch(currentPage + 2)">{{currentPage + 2}}</el-button>
    <span v-if="currentPage !== maxPage && currentPage !== (maxPage - 1)">...</span>

    <el-button link v-if="currentPage !== maxPage && currentPage !== (maxPage - 1)" class="btn" @click="Fetch(maxPage)">{{maxPage}}</el-button>
  </div>
  </el-card>

</div>
</template>

<script>
import axios from '../axios';

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
    }
  },
  methods: {
    Fetch (page) {

      this.currentPage = page;
      
      if(!localStorage.getItem("token")){
        return;
      }

      axios.get('/jobs/company/' + page).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.jobs = response.data.data;
          this.jobCount = response.data.count;
          this.maxPage = response.data.maxPageAmount;
        }

        if(response.data.status === "error"){
          this.status = response.data.message;

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
        }
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
      console.log("deleting " + id);
    }
  },
  mounted () {
    this.Fetch(this.currentPage);
  }
}
</script>

<style scoped>

.container {
  justify-content: center;
  text-align: center;
  padding: 20rem;
}

</style>
