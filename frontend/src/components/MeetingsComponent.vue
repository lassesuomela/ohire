<template>
<div class="container">
  <el-card>
  <ul class="infinite-list">
    <li v-for="meeting in meetings" :key="meeting">
      <el-card shadow="hover" :body-style="list-item">
        <div class="card-header">
          <div class="title">
            <span>{{meeting.description}}</span>
          </div>
            <div class="details">
              <el-tag class="companyHeader" size="large">{{meeting.username}}</el-tag>
              <el-tag class="detailTag" type="info" size="large">{{meeting.timestamp}}</el-tag>

              <el-button @click="Join(meeting.meetingId, meeting.uuid)" size="medium" type="primary">Join</el-button>
            </div>
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
.container {
  justify-content: center;
  text-align: center;
  padding: 15rem;
}
.infinite-list {
  list-style: none;
  padding: 1rem;
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
  display: flex;
}
.title {
  text-align: start;
  word-break: break-all;
  flex: 6;
}
.details {
  flex: 1;
  display: grid;
}
.detailTag {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  font-weight: normal;
}
.companyHeader {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  float:right;
}
@media screen and (max-width: 600px) {
  .container, .infinite-list, .item{
    padding: 0rem;
  }
}
</style>
