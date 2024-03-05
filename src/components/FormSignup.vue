
<template>
  <div>
    <HeaderView />
    
    <div v-if="showOtpModal">
      <OtpModal :contactNumber="this.myStore.mobile_number"/>
    </div>
    <div v-if="showModal">
      <LoginModal :setOtpModal="setOtpModal"/>
    </div>
    <div>
      <h1>KYC Form</h1>
      <p>Please enter your valid Name & email address to use all of our features.</p>
       <ValidationObserver v-slot="{ handleSubmit }">
           
        <div class="form-container"> 
         <form @submit.prevent="handleSubmit(onSubmit)">
            <div class="columns is-8 is-mobile">
              <div class="column is-one-fifth">
                <b-field label="Title">
                  <select  class="title-input"  v-model="myStore.title" placeholder="Select One">
                    <option class="title-option" value="mr">Mr.</option>
                    <option  value="ms">Ms.</option>
                  </select>
                </b-field>
              </div>
              <div class="column is-four-fifths">
                <b-field label="Full Name">
                  <ValidationProvider name="Full Name" rules="required|alpha_spaces" v-slot="{ errors }">
                    <b-input v-model="myStore.full_name"></b-input>
                    <span>{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-field>
              </div>
            </div>
            <div class="columns is-8 is-mobile">
              <div class="column is-half">
                <b-field label="Mobile Number">
                  <ValidationProvider name="Mobile Number" rules="required" v-slot="{ errors }">
                    <b-input v-model="myStore.mobile_number" type="text" placeholder="+94XXXXXXXXX"></b-input>
                    <span>{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-field>
              </div>
              <div class="column is-half">
                <b-field label="Email">
                  <ValidationProvider name="Email" rules="required" v-slot="{ errors }">
                    <b-input v-model="myStore.email" type="email" maxlength="30"></b-input>
                    <span>{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-field>
              </div>
            </div>
            <div class="columns is-8 is-mobile">
              <div class="column is-half">
                <b-field label="NIC Number">
                  <ValidationProvider name="NIC Number" rules="required" v-slot="{ errors }">
                    <b-input v-model="myStore.nicNumber"></b-input>
                    <span>{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-field>
              </div>
              <div class="column">
                <b-field label="Nationality">
                   <ValidationProvider name="Nationality" rules="required" v-slot="{ errors }">
                    <select class="nationality-input" v-model="myStore.nationality" placeholder="Select One">
                      <option class="nationality-options" v-for="option in nationalityOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                    </select>
                    <span>{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-field>
              </div>
            </div>
            <div class="buttons">
              <b-button id="back" @click="goBack">Back</b-button>
             <input type="submit" id="continue" tect="Let's Continue" value="Let's Continue">
             </div>
          </form>
        </div>
      </ValidationObserver>
    </div>
    <FooterView />
  </div>
</template>

<script>
import { extend } from 'vee-validate';
import FooterView from './FooterView.vue';
import HeaderView from './HeaderView.vue';
import { useMyStore } from '../storage/myStore.js';
import NetworkManager from '../network/NetworkManager.js';
import LoginModal from './LoginModal.vue';
import OtpModal from './OtpModal.vue';
// Extend VeeValidate with custom rules
// extend('required', {
//   validate(value) {
//     return {
//       required: true,
//       valid: !!value.trim(),
//     };
//   },
//   message: 'This field is required',
// });

extend('alpha_spaces', value => /^[A-Za-z\s]*$/.test(value) || 'Only alphabetic characters are allowed');

export default {
  name: 'FormSignup',
  setup() {
    const myStore = useMyStore();
    return { myStore };
  },
   data() {
    return {
      nationalityOptions: [
        { value: 'sinhala', label: 'Sinhala' },
        { value: 'tamil', label: 'Tamil' },
        { value: 'muslim', label: 'Muslim' },
        { value: 'malay', label: 'Malay' },
      ],
      showModal:true,
      showOtpModal:false,
      };
      
  },
  components: {
    FooterView,
    HeaderView,
    LoginModal,
    OtpModal,
    
  },
   computed: {
    invalid() {
      return !this.myStore.full_name || !this.myStore.mobile_number || !this.myStore.email || !this.myStore.email || ! this.myStore.nicNumber || !this.myStore.nationality || !this.myStore.title;
    },
  },
  methods: {
    onSubmit() {
      console.log("hit");
      // this.$refs.observer.validate().then(success => {
        // if (success) {
          const kycDetails = {
            title: this.myStore.title,
            full_name: this.myStore.full_name,
            mobile_number: this.myStore.mobile_number,
            email: this.myStore.email,
            nicNumber: this.myStore.nicNumber,
            nationality: this.myStore.nationality,
          };

          console.log(kycDetails);

          NetworkManager.api_request('/KYC/RegisterKYCForm', kycDetails,this)
            .then(response => {
              console.log('Response:', response.data);
            
              this.$router.push('/upload');
            })
            
        // }
      // });
    },
    setOtpModal(){
      this.showOtpModal=true;
    },

    
    goBack() {
      this.$router.go(-1);
    },
  },
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

.nationality-input{
width:500.73px;
padding: 7px 12px;
border-radius: 4px;
height: 40px;


/*  */
background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 86%);
    border-radius: 4px;
    color: hsl(0, 0%, 21%);

}

.title-input{
width:120px;
padding: 7px 12px;
border-radius: 4px;
height: 40px;
/*  */
background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 86%);
    border-radius: 4px;
    color: hsl(0, 0%, 21%);

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
    width:200px;
    border-style: none;
    height:42px;
    font-size: 15px;
    color: white;
    border-radius: 5px;
}

#back{
  margin-top: 2px;
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

span {
  color: red;
  font-size: 12px;
  margin-right: 2px;
}




</style>