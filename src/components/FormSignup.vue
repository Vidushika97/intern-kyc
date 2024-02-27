<template>
  <div>
    <HeaderView />
    <div>
      <h1>KYC Form</h1>
      <p>Please enter your valid Name & email address to using all of our</p>
      <p>feature</p>
      <div class="form-container"> 
        <form @submit.prevent="continuev">
          <div class="columns is-8 is-mobile">
            <div class="column is-half">
              <b-field label="Title">
                <b-select v-model="selectTitle" placeholder="Select One" required>
                  <option value="mr">Mr.</option>
                  <option value="ms">Ms.</option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Full Name">
                <b-input v-model="fullName" required>
                  <span v-if="isFullNameEmpty" class="error-message">Full name is required</span>
                  <span v-else-if="containsNumbers" class="error-message">Only letters are allowed</span>
                </b-input>
              </b-field>
            </div>
          </div>
          <div class="columns is-8 is-mobile">
            <div class="column is-half">
              <b-field label="Mobile Number">
                <b-input v-model="number" type="text" placeholder="+94XXXXXXXXX" required></b-input>
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Email">
                <b-input v-model="inputEmail" type="email" maxlength="30" required></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns is-8 is-mobile">
            <div class="column is-half">
              <b-field label="NIC Number">
                <b-input v-model="NIC" required></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Nationality">
                <b-select v-model="nationality" placeholder="Select One" required>
                <option v-for="option in nationalityOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                </b-select>
              </b-field>
            </div>
          </div>
          <div class="buttons">
            <b-button id="back" @click="goBack">Back</b-button>
            <b-button id="continue" @click="continuev" type="is-primary">Let's Continue</b-button>
            
          </div>
        </form>
      </div>
    </div>
    <FooterView />
  </div>
</template>

<script>
import FooterView from './FooterView.vue';
import HeaderView from './HeaderView.vue';
import {useMyStore} from '../storage/myStore.js';
// import axios from 'axios';
import NetworkManager from '../network/NetworkManager.js'; 

export default {
  name: 'FormSignup',
  setup(){
    const myStore = useMyStore()
    return {myStore}
  },

 

  data() {
    return {
      fullName: "",
      number: "",
      NIC: "",
      nationality: "",
      nationalityOptions:[
        { value: 'sinhala', label: 'Sinhala' },
        { value: 'tamil', label: 'Tamil' },
        { value: 'muslim', label: 'Muslim' },
        { value: 'malay', label: 'Malay' },
      ],
      selectTitle: "",
      inputEmail: ""
    }
  },

  components: {
    FooterView,
    HeaderView,
  },

  computed: {
    isFullNameEmpty() {
      return !this.fullName.trim();
    },
    containsNumbers() {
      return !/^[a-zA-Z\s]+$/.test(this.fullName);
    }
  },

  methods: {
    continuev() {
      if (!this.isValid()) {
        return;
      }

      let kycDetails = {
	
        title : this.selectTitle,
        full_name : this.fullName,
        mobile_number : this.number,
        email : this.inputEmail,
        nicNumber: this.NIC,
        nationality: this.nationality

      }
      console.log("Kyc",this.number)

      NetworkManager.api_request('/KYC/RegisterKYCForm', kycDetails)
      
	    // axios.post(
      //   'https://localhost:7232/api/KYC/RegisterKYCForm',
      //    kycDetails)
      //  .then(response =>{
      //   console.log('Response:', response.data);
      // });

      this.$buefy.toast.open({
          message: 'Data saved successfully!',
           type: 'is-success'
          });

      this.myStore.updateTitle(this.selectTitle);
      this.myStore.updateFullName(this.fullName); 
      this.myStore.updateEmail(this.inputEmail); 
      this.myStore.updateNIC(this.NIC); 
      this.myStore.updateNationality(this.nationality);
      
      
      this.$router.push('/upload');
    },

    goBack() {
      this.$router.go(-1);
    },

    isValid() {
      if (!this.fullName || !this.number || !this.NIC || !this.inputEmail) {
        
        // alert("All fields are required."); 
        return false;
      }

      
      if (!/^[a-zA-Z\s]+$/.test(this.fullName)) {
        // alert("Name should only contain letters.");
        return false;
      }

      // Mobile number should be in the format +94XXXXXXXXX
      if (!/^\+94\d{9}$/.test(this.number)) {
        // alert("Mobile number should be in the format +94XXXXXXXXX.");
        return false;
      }

      return true;
    }
  
  },
  mounted(){
    this.number = this.myStore.mobile_number;
  }

}
</script>


<style scoped>
h1{
color:#F54D4D;    
font-family: Gotham;
font-size: 22px;
font-weight: 900;
line-height: 53px;
letter-spacing: 0.05em;
text-align: center;
font-weight: bold;
word-spacing: 0.1em;

}

p{
font-family: Poppins;
font-size: 15px;
font-weight: 400;
line-height: 30px;
letter-spacing: 0.04em;
text-align: center;
word-spacing: 0.1em;

}

.form-container {
  /* width:75%;
  display: flex;
  align-items: center;*/
  margin-left: 18%; 
  display: flex;
  justify-content: center; /* Horizontally center the form */
  /* align-items: center; Vertically center the form */
  /* height: 100vh; Set the height of the container to full viewport height */
  width:75%;
  margin-bottom:5%;
  
}
form{
/* width: 75%;
height: 25%; 
margin-right: 30%; */
width: 90%; /* Ensure the form takes full width of its container */
/* max-width: 600px; Optional: Set a max-width for better readability */

}



#continue{
    background-color: #F54D4D;
    width:40%;
}

#back{
  width:20%;
  border-color: black;
  margin-right: 4%;
}

.buttons{
  margin-left: 70%;
  margin-bottom: 5%;
  
}
#label{
  font-size: 5px;
}




</style>