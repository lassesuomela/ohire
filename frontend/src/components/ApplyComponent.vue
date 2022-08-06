<template>
  <div class="field">
    <h2>{{title}}</h2>
  </div>

  <div class="field">
    <i class="material-symbols-outlined">edit_note</i>
    <Textarea v-model="application" placeholder="Application" :autoResize="true" rows="8" cols="60" maxlength="1000"/>
  </div>
  <p id="application-help">{{application.length}} / 1000</p>

  <div class="field">
    <Button label="Send" icon="pi pi-arrow-right" iconPos="right" @click="SendApplication"/>
  </div>
  
  <Toast />
</template>

<script>
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

import axios from '../axios';

export default {
  name: 'LoginComponent',
  components: {
    Button,
    Textarea,
    Toast,
  },
  data () {
    return {
      application: '',
      status: null,
      title: null,
      jobId: this.$route.params.id,
    }
  },
  methods: {
    SendApplication () {

      if(!this.application){
        this.$toast.add({severity:'warn', summary: 'One or more fields must be provided', detail:'', life: 3000});
        return;
      }

      let data = {
        application:this.application,
        jobId:this.jobId
      }

      axios.post('/application', data).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.status = response.data.message;

          // send success toast msg
          this.$toast.add({severity:'success', summary: this.status, life: 2000});
        }

        if(response.data.status === "error"){
          this.status = response.data.message;

          // send error toast msg
          this.$toast.add({severity:'error', summary: this.status, life: 2000});
        }

      }).catch(error => {
        console.log(error);
      })
    },
    FetchJobData (id) {
      axios.get('/job/' + id).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.title = response.data.data.title;
        }

        if(response.data.status === "error"){
          this.status = response.data.message;

          // send error toast msg
          this.$toast.add({severity:'error', summary: this.status, life: 2000});
        }

      }).catch(error => {
        console.log(error);
      })
    }
  },
  mounted () {
    this.FetchJobData(this.jobId);
  }
}
</script>

<style scoped>

.field i {
  font-size: 2rem;
  padding-right: 1rem;
}

.field {
  justify-content: center;
  text-align: center;
  display: flex;
  padding: 0.5rem;
}

#application-help {
  padding-top: 0rem;
  padding-left: 30rem;
}

</style>
