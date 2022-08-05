<template>
    <h1>{{title}}</h1>
    <h3>Salary: {{salary}}</h3>
  <div class="field">
    <Textarea v-model="description" :autoResize="true" rows="20" cols="100" maxlength="1000" disabled/>
  </div>
  <div class="field">
    <Button label="Apply" icon="pi pi-arrow-right" iconPos="right" @click="Apply(id)"/>
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
      id: this.$route.params.id,
      title: "",
      description: "",
      salary: null,
      status: null,
    }
  },
  methods: {
    FetchJob (id) {

      axios.get('/job/' + id).then(response => {
        console.log(response.data);

        if(response.data.status === "success"){
          this.title = response.data.data.title;
          this.description = response.data.data.description;
          this.salary = response.data.data.salary;

          if(!this.salary) {
            this.salary = "Not specified";
          }else {
            this.salary = this.FormatSalary(this.salary);
          }
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
    Apply(id) {
      this.$router.push('/apply/' + id);
    },
    FormatSalary(salary){

      return new Intl.NumberFormat('fi', {
        style: 'currency',
        currency: 'EUR'
      }).format(salary);
    }
  },
  mounted () {
    this.FetchJob(this.id);
  }
}
</script>

<style scoped>

.field i {
  padding-right: 1rem;
  font-size: 2rem;
}

.field {
  justify-content: center;
  text-align: center;
  display: flex;
  padding: 0.5rem;
}

.registerField {
  padding-top: 1rem;
}

</style>
