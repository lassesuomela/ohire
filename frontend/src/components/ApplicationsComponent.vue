<template>
<div class="container">
  <el-card>
  <ul class="infinite-list">
    <li v-for="application in applications" :key="application">
      <div class="item">
        <el-card shadow="hover" :body-style="list-item">
          <div class="card-header">
            <div class="title">
              <span>{{application.title}}</span>
            </div>
            <div class="details">
              <el-tag v-if="application.company" class="companyHeader" size="large">{{application.company}}</el-tag>
              <el-tag v-else type="warning" class="companyHeader" size="large">Company Not Defined</el-tag>
              <el-tag class="detailTag" type="info" size="large">{{application.timestamp}}</el-tag>
              <el-tag class="detailTag" type="success" size="large" v-if="application.reviewed === 1">Reviewed</el-tag>
              <el-button type="danger" @click="Delete(application.applicationId)">Delete</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </li>
  </ul>
  </el-card>
</div>
</template>

<script>
import axios from '../axios';
import {ElLoading} from 'element-plus';

export default {
  name: 'ApplicationsComponent',
  components: {
  },
  data () {
    return {
      status: null,
      applications: [],
      loader: null
    }
  },
  methods: {
    Delete (id) {
      axios.delete('/application/' + id).then(response => {
        if(response.data.status === "success"){
          this.status = response.data.message;
          this.$notify({title:"Success", message:this.status, type:"success", customClass:"notification"});
          this.FetchApplications();
        }

        if(response.data.status === "error"){
          this.status = response.data.message;
          this.applications = [];

          // send error msg
          this.$notify({title:"Error", message:this.status, type:"error", customClass:"notification"});
          return;
        }
      }).catch(error => {
        console.log(error);
      })
    },
    FetchApplications () {

      if(!localStorage.getItem("token")){
        return;
      }

      axios.get('/application').then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.applications = response.data.data;
        }

        if(response.data.status === "error"){
          this.status = response.data.message;

          this.loader.close();
          // send error msg
          this.$notify({title:"Error", message:this.status, type:"error", customClass:"notification"});
          return;
        }

        for(let i = 0; i < this.applications.length; i++){
          this.applications[i].timestamp = this.FormatToDate(this.applications[i].timestamp);
        }

        this.loader.close();
      }).catch(error => {
        console.log(error);
      })
    },
    FormatToDate(timestamp){

      const date = new Date(timestamp);
            
      return date.toLocaleString('fi');
    }
  },
  mounted () {
    this.loader = ElLoading.service({ fullscreen: true });

    this.FetchApplications();
  }
}
</script>

<style scoped>
.container {
  justify-content: center;
  text-align: center;
  padding: 15rem;
}
.infinite-list {
  list-style: none;
  padding: 0rem;
}
.item {
  padding: 1rem;
}
.list-item {
  height: 12rem;
}
.card-header{
  text-align: start;
  font-weight: bold;
  display: flex;
}
.title {
  flex: 6;
}
.details {
  display: grid;
  text-align: end;
  flex: 1;
}
.details i {
  padding-bottom: 1rem;
}
.detailTag {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  font-weight: normal;
  text-align: center;
  float: right;
}
.companyHeader {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  float:right;
}

@media screen and (max-width: 600px) {
  .container, .item{
    padding: 0rem;
  }
  .item {
    padding-bottom: 0.5rem;
  }
  .card-header {
    font-size:0.9rem;
    display: grid;
  }
  .companyHeader, .detailTag {
    font-size: 0.9rem;
  }
  .details {
    padding-top: 1rem;
  }
}
</style>
