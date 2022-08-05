<template>
  <div class="field">
    <i class="material-symbols-outlined">title</i>
    <InputText type="text" v-model="title" placeholder="Title" name="title" aria-describedby="title-help" maxLength="60"/>
    <span id="title-help">{{title.length}} / 60</span>
  </div>
  <div class="field">
    <i class="material-symbols-outlined">payments</i>
    <InputNumber v-model="salary" id="integeronly" placeholder="Salary" locale="fi-FI" />
  </div>
  <div class="field">
    <i class="material-symbols-outlined">edit_note</i>
    <Textarea v-model="description" placeholder="Description" :autoResize="true" rows="8" cols="60" maxlength="1000"/>
    <span id="description-help">{{description.length}} / 1000</span>
  </div>
  <div class="field">
    <Button label="Create" icon="pi pi-cloud-upload" iconPos="right" @click="Create"/>
  </div>
  <Toast />
</template>

<script>

import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

import axios from '../axios';

export default {
  name: 'LoginComponent',
  components: {
    InputText,
    Button,
    Textarea,
    Toast,
    InputNumber
  },
  data () {
    return {
      title: "",
      description: "",
      salary: null,
      status: null,
    }
  },
  methods: {
    Create () {

      if(!this.title || !this.description){
        this.$toast.add({severity:'warn', summary: 'One or more fields must be provided', detail:'', life: 3000});
        return;
      }

      if(this.description.length > 1000){
        this.$toast.add({severity:'warn', summary: 'Description is too long', detail:'Length must be less than 1000', life: 3000});
        return;
      }

      if(this.title.length > 60){
        this.$toast.add({severity:'warn', summary: 'Title is too long', detail:'Length must be less than 60', life: 3000});
        return;
      }

      let data = {
        title: this.title,
        description: this.description,
        salary: this.salary,
      }

      axios.post('/jobs', data).then(response => {
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
    }
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

#title-help {
  padding-left: 0.5rem;
  font-size: 14px;
}

#description-help {
  padding-left: 0.5rem;
  font-size: 14px;
}

</style>
