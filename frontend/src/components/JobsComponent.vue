<template>

<div class="jobContainer">
  <DataTable :value="jobs" :paginator="true" :rows="30">
    <Column field="title" header="Title"></Column>
    <Column field="description" header="Description"></Column>
    <Column field="salary" header="Salary"></Column>
    <Column field="timestamp" header="Date"></Column>
    <Column header="Apply">
      <template #body="slotProps">
        <Button type="button" icon="pi pi-arrow-right" @click="Apply(slotProps.data.id)"></Button>
      </template>
    </Column>
  </DataTable>
</div>
  <Toast />

</template>

<script>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import Toast from 'primevue/toast';
import Button from 'primevue/button';

import axios from '../axios';

export default {
  name: 'LoginComponent',
  components: {
    Toast,
    Button,
    DataTable,
    Column,
  },
  data () {
    return {
      status: null,
      currentPage: 1,
      maxPage: 1,
      jobs: []
    }
  },
  methods: {
    FetchJobs () {

      if(!localStorage.getItem("token")){
        return;
      }

      axios.get('/jobs/' + this.currentPage).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.maxPage = response.data.maxPageAmount;
          this.jobs = response.data.data;
        }

        if(response.data.status === "error"){
          this.status = response.data.message;

          // send error toast msg
          this.$toast.add({severity:'error', summary: this.status, life: 2000});
          return;
        }

        for(let i = 0; i < this.jobs.length; i++){

          this.jobs[i].timestamp = this.FormatToDate(this.jobs[i].timestamp);

          if(this.jobs[i].salary){
            this.jobs[i].salary = this.FormatSalary(this.jobs[i].salary);
          }else{
            this.jobs[i].salary = "Not specified";
          }
        }

      }).catch(error => {
        console.log(error);
      })
    },
    FormatToDate(timestamp){

      const date = new Date(timestamp);
            
      return date.toLocaleDateString('fi');
    },
    FormatSalary(salary){

      return new Intl.NumberFormat('fi', {
        style: 'currency',
        currency: 'EUR'
      }).format(salary);
    },
    Apply(id) {
      this.$router.push('apply/' + id);
    }
  },
  mounted () {
    this.FetchJobs();
  }
}
</script>

<style scoped>

.jobContainer {
  padding: 2rem;
  padding-left: 5rem;
  padding-right: 5rem;
}
</style>
