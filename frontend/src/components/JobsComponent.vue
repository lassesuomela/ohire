<template>
<div class="container">
  <el-card>
  <ul v-infinite-scroll="Fetch" class="infinite-list">
    <li v-for="job in allJobs" :key="job">
      <a @click="ViewMore(job.id)" class="item">
        <el-card shadow="hover" :body-style="list-item">
          <template #header>
            <div class="card-header">
              <el-row>
                <el-col :span="22">
                  <span>{{job.title}}</span>
                </el-col>
                <el-col :span="2">
                  <el-tag class="companyHeader" size="large">{{job.company || "Company Not Defined"}}</el-tag>
                </el-col>
              </el-row>
            </div>
          </template>
          <el-row class="description">
            <el-col :span="18">
              <p>{{job.description}}</p>
            </el-col>
            
            <el-col :span="4" class="details">
              <el-col :span="24" class="details">
                <i class="material-symbols-outlined">calendar_month</i>
              </el-col>
              <el-col :span="24" class="details">
                <i class="material-symbols-outlined">schedule</i>
              </el-col>
              <el-col :span="24" class="details">
                <i class="material-symbols-outlined">payments</i>
              </el-col>
            </el-col>

            <el-col :span="2" class="details">
              <el-col :span="24" class="details">
                <el-tag class="detailTag" size="large" type="info">{{job.timestamp}}</el-tag>
              </el-col>
              <el-col :span="24" class="details">
                <el-tag class="detailTag" size="large" type="info">{{job.workingTime}}</el-tag>
              </el-col>
              <el-col :span="24" class="details">
                <el-tag class="detailTag" size="large" type="success">{{job.salary}}</el-tag>
              </el-col>
            </el-col>
          </el-row>
          
        </el-card>
      </a>
    </li>
    <p v-if="loading">Loading...</p>
    <p v-if="!noMore">Scroll to show more job listings</p>
    <p v-if="noMore">No more job listings found</p>
  </ul>
  </el-card>
</div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'JobsComponent',
  components: {
  },
  data () {
    return {
      status: null,
      currentPage: 1,
      maxPage: 1,
      firstFetch: true,
      jobs: [],
      allJobs: [],
      loading: true,
      noMore: false,
    }
  },
  methods: {
    FetchJobs () {

      if(!localStorage.getItem("token")){
        return;
      }

      axios.get('/jobs/' + this.currentPage).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.maxPage = response.data.maxPageAmount;
          this.jobs = response.data.data;
        }

        if(response.data.status === "error"){
          this.status = response.data.message;

          // send error toast msg
          this.$toast.add({severity:'error', summary: this.status, life: 2000});
          return;
        }

        for(let i = 0; i < this.jobs.length; i++){

          this.jobs[i].timestamp = this.FormatToDate(this.jobs[i].timestamp);

          if(this.jobs[i].salary){
            this.jobs[i].salary = this.FormatSalary(this.jobs[i].salary);
          }else{
            this.jobs[i].salary = "Not specified";
          }

          if(this.jobs[i].description.length > 500){
            this.jobs[i].description = this.jobs[i].description.substring(0, 500) + "...";
          }

          if(this.jobs[i].title.length > 60){
            this.jobs[i].title = this.jobs[i].title.substring(0, 60) + "...";
          }

          if(this.jobs[i].workingTime === 1){
            this.jobs[i].workingTime = "Full-time";
          }else{
            this.jobs[i].workingTime = "Part-time";
          }

          this.allJobs.push(this.jobs[i]);
        }

        this.loading = false;
        console.log("loading done");

      }).catch(error => {
        console.log(error);
      })
    },
    FormatToDate(timestamp){

      const date = new Date(timestamp);
            
      return date.toLocaleDateString('fi');
    },
    FormatSalary(salary){

      return new Intl.NumberFormat('fi', {
        style: 'currency',
        currency: 'EUR'
      }).format(salary);
    },
    Apply(id) {
      this.$router.push('apply/' + id);
    },
    ViewMore(id) {
      this.$router.push('job/' + id);
    },
    Fetch() {
      if(this.firstFetch){
        this.firstFetch = false;
        this.loading = true;
        this.FetchJobs();
      }else if(this.currentPage < this.maxPage && !this.firstFetch){
        this.loading = true;
        this.currentPage++;
        this.FetchJobs();
      }else{
        this.noMore = true;
      }
    }
  }
}
</script>

<style scoped>
.el-col {
  padding: 0rem;
}
.el-col p{
  margin: 0rem;
  margin-bottom: 1rem;
}
.container {
  justify-content: center;
  text-align: center;
  padding: 20rem;
}
.infinite-list {
  list-style: none;
  padding: 0rem;
}
.item {
  cursor: pointer;
  padding: 1rem;
}
.list-item {
  height: 12rem;
}
.card-header{
  text-align: start;
  font-weight: bold;
}
.card-header-details {
  text-align: end;
}
.description {
  text-align: start;
  word-break: break-all;
}
.details {
  text-align: end;
}
.detailTag {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  text-align: center;
}
.details i {
  padding-bottom: 1rem;
}

.companyHeader {
  font-size: 1rem;
  font-weight: normal;
  float:right;
}

</style>
