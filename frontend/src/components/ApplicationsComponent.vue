<template>
<div class="container">
  <el-card>
  <ul class="infinite-list">
    <li v-for="application in applications" :key="application">
      <a @click="ViewMore(application.applicationId)" class="item">
        <el-card shadow="hover" :body-style="list-item">
          <div class="card-header">
            <el-row>
              <el-col :span="20">
                <span>{{application.title}}</span>
              </el-col>
              
              <el-col :span="4">
                <el-tag class="companyHeader" size="large">{{application.company || "Company Not Defined"}}</el-tag>
                <el-tag class="detailTag" type="info" size="large">{{application.timestamp}}</el-tag>

                <el-tag class="detailTag" type="success" size="large" v-if="application.reviewed === 1">Reviewed</el-tag>
                <el-tag class="detailTag" type="warning" size="large" v-else>Not reviewed</el-tag>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </a>
    </li>
  </ul>
  </el-card>
</div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'ApplicationsComponent',
  components: {
  },
  data () {
    return {
      status: null,
      applications: [],
    }
  },
  methods: {
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

          // send error toast msg
          this.$toast.add({severity:'error', summary: this.status, life: 2000});
          return;
        }

        for(let i = 0; i < this.applications.length; i++){
          this.applications[i].timestamp = this.FormatToDate(this.applications[i].timestamp);
        }
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
    this.FetchApplications();
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
  font-weight: normal;
  text-align: center;
  float: right;
}
.details i {
  padding-bottom: 1rem;
}
.companyHeader {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  float:right;
}

</style>
