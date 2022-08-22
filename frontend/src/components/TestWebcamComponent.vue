<template>
<div class="container">
  <el-card>
    <video autoplay id="myWebcam"></video>
  </el-card>
  <el-button size="large" type="primary" @click="OpenWebcam">Enable Webcam</el-button>
  <el-button size="large" type="primary" @click="JoinRoom">Join Meeting</el-button>
</div>
</template>

<script>
import Peer from 'peerjs';

export default {
  name: 'meetingsComponent',
  components: {
  },
  data () {
    return {
      status: null,
      uuid: null,
      mediaStream: null,
      webCam: null,
      peer: null,
      myUuid: null,
    }
  },
  methods: {
    JoinRoom () {
      if(!this.uuid){
        this.$notify({title:"Error", message:"Other participants uuid was not found", type:"error", class:"notification"});
        return;
      }

      if(!this.mediaStream){
        this.$notify({title:"Warning", message:"Enable your webcam", type:"warning", class:"notification"});
        return;
      }

      // connect to other peer with their id
      this.connection = this.peer.connect(this.uuid);
      
      this.inRoom = true;

      this.peer.on('open', () => {
        console.log("Connection established");
        this.$notify({title:"Success", message:"Connected!", type:"success", class:"notification"});
      })

      this.peer.on('data', () => {
        console.log("Data received");
      })

      this.connection.on('close', () => {
        console.log("User disconnected");
        this.Disconnect();
      })
    },
    OpenWebcam() {

      let myStream = document.getElementById('myWebcam');

      // ask user for perm on cam and mic use and pipe the stream to video player
      navigator.mediaDevices.getUserMedia({video: { width: 640, height: 480 }, audio: true}).then(stream => {

        this.mediaStream = stream;

        myStream.muted = true;
        myStream.srcObject = stream;
      }).catch(error => {
        console.log(error);
      })
    }
  },
  mounted () {
    console.log(this.myUuid);

    this.peer = new Peer(this.myUuid);

    this.peer.on('open', (id) => {
      console.log("my id: " + id);
    })
  },
  created () {
    this.uuid = this.$route.params.uuid;

    this.myUuid = this.$store.state.uuid;
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
.btn i {
  padding-left: 0.5rem;
}

</style>
