<template>
<div class="container">
  <el-card>
    <div>
      <h2>{{ application.username }}</h2>
    </div>
    <div>
      <p>{{ application.application }}</p>
    </div>

    <div>
    </div>

    <el-row>
      <el-col>
        <el-button @click="DownloadCV">Download CV</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
      </el-col>
      <el-col class="slider" :span="8">
        <el-slider v-model="rating" :step="1" show-stops max="10"/>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button @click="Back">
          Back
        </el-button>
        <el-button @click="Save">
          Save
        </el-button>
      </el-col>
    </el-row>

  </el-card>
</div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'ReviewApplicationComponent',
  components: {
  },
  data () {
    return {
      status: null,
      application: [],
      rating: 0,
      applicationId: null,
      applicationUsersId: null,
      jobId: null,
      pdfLink: null,
      filename: null,
    }
  },
  methods: {
    Back () {
      this.$router.go(-1);
    },
    FetchApplication (id, jobId) {

      axios.get('/application/' + jobId + '/' + id).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.application = response.data.data[0];

          this.rating = this.application.rating;

          if(!this.rating) {
            this.rating = 0;
          }

          this.applicationId = this.application.id;
          this.applicationUsersId = this.application.users_id;
          this.filename = this.application.cvFile;
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
    Save() {

      if(!this.applicationId || !this.applicationUsersId || !this.jobId){
        this.$notify({title:"Warning", message:"One or more fields are missing", type:"warning", customClass:"notification"});
        return;
      }

      let data = {
        rating: this.rating.toString(),
        applicationId: this.applicationId,
        applicationUsersId: this.applicationUsersId,
        jobId: this.jobId
      }

      axios.post('/application/' + this.jobId + '/' + this.applicationId, data).then(response => {
        console.log(response);

        this.status = response.data.message;

        // send status msg
        if(response.data.status === "success"){
          this.$notify({title:"Success", message:this.status, type:"success", customClass:"notification"});
          this.$router.go(-1);
        }else{
          this.$notify({title:"Error", message:this.status, type:"error", customClass:"notification"});
        }
      }).catch(error => {
        console.log(error);
      })
    },
    DownloadCV () {
      axios.get("/cv/application/" + this.jobId + '/' + this.applicationId + '/' + this.applicationUsersId, {
        responseType: "arraybuffer",
      }).then(response => {
        console.log(response);

        const blob = new Blob([response.data], { type: "application/pdf" });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);

        let filename = this.filename.substring(0, this.filename.length - 36) + ".pdf";

        link.download = filename;
        link.click();

      }).catch(error => {
        console.log(error);
      })

    }
  },
  mounted () {
    this.applicationId = this.$route.params.id;
    this.jobId = this.$route.params.jobId;

    this.FetchApplication(this.applicationId, this.jobId);
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

@media screen and (max-width: 600px) {
  .container {
    padding: 0rem;
    font-size: 1rem;
  }
}
</style>
