<template>
<div class="container">
  <el-card>
    <el-table :data="applications" :stripe="true">
    <el-table-column label="Username" prop="username" />
    <el-table-column label="Timestamp" prop="timestamp" />
    <el-table-column label="Score" prop="score">
      <template #default="scope">
        <el-tag type="warning" v-if="!scope.row.rating">-</el-tag>
        <el-tag type="info" v-else>{{scope.row.rating}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="Status" prop="reviewed">
      <template #default="scope">
        <el-tag type="warning" v-if="scope.row.reviewed === 0">Not reviwed</el-tag>
        <el-tag type="success" v-else>Reviwed</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="View More">
      <template #default="scope">
        <el-button
          size="small"
          @click="ViewMore(scope.row.applicationId)"
          >Review</el-button
        >
      </template>
    </el-table-column>
  </el-table>

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
      applications: [],
      currentPage: 1,
      applicationCount: 0,
    }
  },
  methods: {
    Fetch (id, page) {

      this.currentPage = page;

      if(!localStorage.getItem("token")){
        return;
      }

      axios.get('/application/job/' + id).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.applications = response.data.data;
          this.applicationCount = response.data.count;
        }

        if(response.data.status === "error"){
          this.status = response.data.message;

          // send error msg
          this.$notify({title:"Error", message:this.status, type:"error", customClass:"notification"});
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
    },
    ViewMore(id){
      this.$router.push('/jobApplications/' + this.$route.params.id + '/' + id);
    }
  },
  mounted () {
    this.Fetch(this.$route.params.id, 1);
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
