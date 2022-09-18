<template>
<div class="container">
  <el-card class="card">
    <div class="searchBar">
        <el-input v-model="search" placeholder="Search for title">
          <template #append><el-button @click="DoSearch" size="small" type="primary">Search</el-button></template>
        </el-input> 
      <p>Found {{jobCount}} job listings </p>
    </div>
  <ul v-infinite-scroll="Fetch" infinite-scroll-disabled="noMore" class="infinite-list">
    <li v-for="job in allJobs" :key="job">
      <a @click="ViewMore(job.id)" class="item">
        <el-card shadow="hover" :body-style="list-item">
          <template #header>
            <div class="card-header">
              <span>{{job.title}}</span>
            </div>
          </template>
          <div class="main">
            <div class="description">
              <span>{{job.description}}</span>
            </div>
            <div class="details">
              <el-tag v-if="job.company" class="companyHeader" size="large">{{job.company}}</el-tag>
              <el-tag v-else type="warning" class="companyHeader" size="large">Unknown Company</el-tag>
              <div class="info">
                <i class="material-symbols-outlined">calendar_month</i>
                <el-tag class="detailTag" size="large" type="info">{{job.timestamp}}</el-tag>

                <i class="material-symbols-outlined">schedule</i>
                <el-tag class="detailTag" size="large" type="info">{{job.workingTime}}</el-tag>

                <i class="material-symbols-outlined">payments</i>
                <el-tag class="detailTag" size="large" type="success">{{job.salary}}</el-tag>

              </div>
            </div>
          </div>
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
      search: '',
      jobCount: 0,
      searchMode: false
    }
  },
  methods: {
    FormatToDate(timestamp){

      const date = new Date(timestamp);
      
      let seconds = Math.floor((new Date() - date) / 1000);
      
      // divide with year in seconds and check for n years
      let interval = seconds / 31536000;

      if (interval > 1) {
        interval = Math.floor(interval);

        if(interval === 1){
          return interval + " year ago";
        }
        return interval + " years ago";
      }

      // divide with month in seconds and check for n months
      interval = seconds / 2592000;
      if (interval > 1) {

        interval = Math.floor(interval);

        if(interval === 1){
          return interval + " month ago";
        }
        return interval + " months ago";
      }

      // divide with day in seconds and check for n days
      interval = seconds / 86400;
      if (interval > 1) {
        interval = Math.floor(interval);

        if(interval === 1){
          return interval + " day ago";
        }
        return interval + " days ago";
      }

      // divide with hour in seconds and check for n hours
      interval = seconds / 3600;
      if (interval > 1) {
        interval = Math.floor(interval);

        if(interval === 1){
          return interval + " hour ago";
        }
        return interval + " hours ago";
      }

      // divide with minute in seconds and check for n minutes
      interval = seconds / 60;
      if (interval > 1) {

        interval = Math.floor(interval);

        if(interval === 1){
          return interval + " minute ago";
        }
        return interval + " minutes ago";
      }

      // only seconds have passed
      return Math.floor(seconds) + " seconds ago";
    },
    FormatSalary(salary){

      return new Intl.NumberFormat('fi', {
        style: 'currency',
        currency: 'EUR'
      }).format(salary);
    },
    ViewMore(id) {
      this.$router.push('job/' + id);
    },
    DoSearch(){

      // enable search mode and reset vars to defaults
      this.searchMode = true;
      this.currentPage = 1;
      this.maxPage = 1;
      this.noMore = false;
      this.allJobs = [];

      this.Fetch();
    },
    Fetch() {
      if(this.searchMode && !this.loading){
        // enable loading text and search with keywords
        this.loading = true;
        this.Search(this.search);
        return;
      }

      this.searchMode = false;

      // this is done when page is loaded for the first time
      // enable loading text and search with nothing as keywords
      if(this.firstFetch){

        this.firstFetch = false;
        this.loading = true;
        this.Search(this.search);
      }else{
        // this happens when user just scrolls the page
        // enable loading text and search with nothing as keywords
        this.loading = true;
        this.Search(this.search);
      }
    },
    Search(searchTerm) {

      axios.get('/jobs/' + this.currentPage + '/' + searchTerm).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.maxPage = response.data.maxPageAmount;
          this.jobs = response.data.data;
          this.jobCount = response.data.count;
        }

        if(response.data.status === "error"){
          this.status = response.data.message;
          
          this.jobCount = 0;
          this.allJobs = [];
          this.loading = false;
          this.noMore = true;
          return;
        }

        for(let i = 0; i < this.jobs.length; i++){

          this.jobs[i].timestamp = this.FormatToDate(this.jobs[i].timestamp);

          if(this.jobs[i].salary){
            this.jobs[i].salary = this.FormatSalary(this.jobs[i].salary);
          }else{
            this.jobs[i].salary = "Not Specified";
          }

          if(this.jobs[i].description.length > 500){
            this.jobs[i].description = this.jobs[i].description.substring(0, 500) + "...";
          }

          if(this.jobs[i].title.length > 60){
            this.jobs[i].title = this.jobs[i].title.substring(0, 60) + "...";
          }

          if(this.jobs[i].workingTime === 1){
            this.jobs[i].workingTime = "Full-Time";
          }else{
            this.jobs[i].workingTime = "Part-Time";
          }

          this.allJobs.push(this.jobs[i]);
        }

        if(this.currentPage < this.maxPage){
          this.currentPage++;
        }else{
          this.noMore = true;
        }

        this.loading = false;
      }).catch(error => {
        console.log(error);
        this.allJobs = [];
        this.loading = false;
        this.noMore = true;
      })
    }
  },
  mounted () {
    //this.Search('');
  }
}
</script>

<style scoped>
.container {
  justify-content: center;
  text-align: center;
  padding: 10rem;
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
  font-size: 1.5rem;
}
.main {
  display: flex;
}
.description {
  flex: 6;
  text-align: start;
  word-break: break-all;
  white-space: pre-wrap;
}
.details {
  flex: 1;
  text-align: end;
  padding-left: 10rem;
}
.detailTag {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}
.detailTag:last-of-type{
  margin-bottom: 0rem;
}
.info i {
  text-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.5rem;
}
.info  {
  display: grid;
  grid-template-columns: 50% 50%;
}
.companyHeader {
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
}
.btn i {
  padding-bottom: 1rem;
}
.searchBar {
  padding-bottom: 1rem;
  display: grid;
  width: 50ch;
}
.searchBar p {
  text-align: start;
  padding: 0rem;
}

@media screen and (max-width: 600px) {
  .container{
    padding: 0rem;
  }
  .card-header{
    font-size: 0.9rem;
    padding:0rem;
    word-break: break-all;
  }
  .searchBar {
    display: grid;
    width: 100%;
  }
  .searchBar p {
    text-align: start;
    padding: 0rem;
  }
  .main {
    display: grid;
  }
  .description {
    text-align: start;
    word-break: break-all;
    white-space: pre-wrap;
  }
  .details {
    padding-top: 1rem;
    padding: 0rem;
  }
  .detailTag {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }
  .info  {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .info i {
    text-align: start;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 0.5rem;
  }
  .companyHeader {
    font-size: 0.95rem;
    width: 100%;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
}
</style>
