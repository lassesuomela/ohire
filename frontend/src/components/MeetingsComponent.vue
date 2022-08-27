<template>
<div class="container">
  <el-card>
  <ul class="infinite-list">
    <li v-for="meeting in meetings" :key="meeting">
      <el-card shadow="hover" :body-style="list-item">
        <div class="card-header">
          <el-row>
            <el-col :span="20">
              <span>{{meeting.description}}</span>
            </el-col>
            
            <el-col :span="4">
              <el-tag class="companyHeader" size="large">{{meeting.username}}</el-tag>
              <el-tag class="detailTag" type="info" size="large">{{meeting.timestamp}}</el-tag>

            </el-col>
          </el-row>
          <el-row class="btn">
            <el-button @click="Join(meeting.meetingId, meeting.uuid)" size="medium" type="primary">Join<i class="material-symbols-outlined">groups</i></el-button>
          </el-row>
        </div>
      </el-card>
    </li>
  </ul>
  </el-card>
</div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'meetingsComponent',
  components: {
  },
  data () {
    return {
      status: null,
      meetings: [],
    }
  },
  methods: {
    FetchMeetings () {

      if(!localStorage.getItem("token")){
        return;
      }

      axios.get('/meetings').then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.meetings = response.data.data;
        }

        if(response.data.status === "error"){
          this.status = response.data.message;

          // send error msg
          this.$notify({title:"Error", message:this.status, type:"error", customClass:"notification"});
          return;
        }

        for(let i = 0; i < this.meetings.length; i++){
          this.meetings[i].timestamp = this.FormatToDate(this.meetings[i].timestamp);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    FormatToDate(timestamp){

      const date = new Date(timestamp);
            
      return date.toLocaleString('fi');
    },
    Join(id, uuid){
      this.$router.push("/testWebcam/" + id + "/" + uuid);
    }
  },
  mounted () {
    this.FetchMeetings();
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
  padding: 15rem;
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
.btn i {
  padding-left: 0.5rem;
}

</style>
