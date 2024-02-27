<template>
  <div>
    <FormSignup></FormSignup> 
    
    <b-modal v-model="showModal" :title="modalHeader">
      <div class="form-container">
        <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">   
          <h6>LOGIN OR REGISTER</h6>
          <p>Just need phone number to login or created a new </p>
          <p>account</p>
        
          <b-field is-size-1-mobile id="field" label="Contact Number*">
            <ValidationProvider name="selectedCountryCode" rules="required" v-slot="{ errors }"> 
              <b-select v-model="selectedCountryCode" placeholder="Select Country Code">
                <option value="+94">+94 (LK)</option>
              </b-select>
              <span>{{errors[0]}}</span>
            </ValidationProvider>

            <ValidationProvider name="mobileNumber" rules="required|min:9|max:9" v-slot="{ errors }"> 
              <b-input v-model="mobileNumber" type="text" placeholder="Enter your mobile no."></b-input>
              <!-- <b-input v-model="mobileNumber" type="number" placeholder="Enter your mobile no."></b-input> -->
              <span>{{errors[0]}}</span>
            </ValidationProvider>
          </b-field>

          <div class="buttons">
            <b-button id="back" @click="closeModal">Back</b-button>
            <b-button id="continue" @click="onSubmit" type="is-primary" :disabled="invalid">Continue</b-button>
          </div>
        </form>
       </ValidationObserver> 
      </div>
    </b-modal>
  </div>
</template>

<script>
import FormSignup from './FormSignup.vue';
// import axios from 'axios';
import {useMyStore} from '../storage/myStore.js';
import NetworkManager from '../network/NetworkManager.js'; 


export default {
  name:'LoginModal',
   setup(){
    const myStore = useMyStore()
    return {myStore}
  },

  components: {
    FormSignup,
  },
  data() {
    return {
      showModal: false,
      modalHeader: "Login",
      selectedCountryCode: "",
      mobileNumber: "",
      contactNumber:"",
  
    };
  },

  
  methods: {
    onSubmit() {
      const contactNumber = this.selectedCountryCode + this.mobileNumber
      
       NetworkManager.api_request('/ContactNumber/ContactNumber', {contact_number: contactNumber})
      // console.log("ygsyu",contactNumber)
      // axios.post(
      //  'https://localhost:7232/api/ContactNumber/ContactNumber',
      //  {contact_number: contactNumber})
      //  .then(response =>{
      //   console.log('Response:', response.data);
      // });
      this.$buefy.toast.open({
          message: 'OTP is successfully generated!',
           type: 'is-success'
          });
      this.myStore.updateMobileNumber(contactNumber);    
      this.$router.push('/otp/'+contactNumber);
    },

    closeModal() {
      this.selectedCountryCode = "";
      this.mobileNumber = "";
      this.showModal = false;
    },
  },
  computed: {
    invalid() {
      return !this.selectedCountryCode || !this.mobileNumber || isNaN(this.mobileNumber)|| this.mobileNumber.length !== 9;
    },
  },
  mounted() {
    this.showModal = true;
    console.log("in Login View");
  }
}
</script>

<style scoped>
.form-container {
  width: 400px;
  height: 400px;
  padding:5px;
  margin-left: auto; /* Center horizontally */
  margin-right: auto; /* Center horizontally */
  background-color: white;
}

h6{
  text-align:center;
  padding:4%;
  background: #F54D4D;
  margin-bottom:30px;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

p{
  text-align:center;
}

form{
  width:100%;
  height:100%;
}

.buttons{
  margin-top:80px; 
  margin-left:20px;
}

#continue{
  background-color: #F54D4D;
  width:160px;
}

#back{
  margin-right: 140px;
}

#field{
  margin-left: 30px;
  margin-top:50px;
}

span {
  color: red;
  font-size: 12px;
  margin-right: 2px;
}
</style>
