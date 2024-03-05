<template>

  <div>
        <div v-if="showModalotp">
           <OtpModal/>

    </div>
    <b-modal v-model="showModal" :modaltitle="LoginModal" :can-cancel="false">
      <div class="form-container">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <h6>
              <button @click="closeModal" class="delete-btn">X</button>
              LOGIN OR REGISTER
            </h6>
            <p>Just need phone number to login or created a new</p>
            <p>account</p>

            <field is-size-1-mobile id="field">
              <label class="contact-input-label"
                >Contact number <span>*</span></label
              >
              <div class="input-box">
                <ValidationProvider
                  name="selectedCountryCode"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select v-model="selectedCountryCode" placeholder="+94">
                    <option value="+94">+94 (LK)</option>
                  </select>
                  <span class="country-code-span">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider
                  name="mobileNumber"
                  rules="required|min:9|max:9"
                  v-slot="{ errors }"
                >
                  <input
                    v-model="mobileNumber"
                    type="number"
                    placeholder="Enter Mobile Number"
                  />
                  <span class="mobile-number-span">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </field>

            <div class="buttons">
              <b-button id="back" @click="closeModal">Back</b-button>
              <b-button
                id="continue"
                @click="onSubmit"
                type="is-primary"
                :disabled="invalid"
                >Continue</b-button
              >
            </div>
          </form>
        </ValidationObserver>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import { useMyStore } from "../storage/myStore.js";
import OtpModal from './OtpModal.vue';

// import NetworkManager from "../network/NetworkManager.js";

export default {
  props: ['setOtpModal'],
  name: "LoginModal",
  setup() {
    const myStore = useMyStore();
    return { myStore };
  },

  components: {
    OtpModal,
  },

   
  data() {
    return {
      showModal:true,
      LoginModal:"LoginModal",
      modalHeader: "Login",
      selectedCountryCode: "",
      mobileNumber: "",
      contactNumber: "",
      showOtpModal:false,
    };
  },
  
  methods: {
    onSubmit() {
      const contactNumber = this.selectedCountryCode + this.mobileNumber;

      // NetworkManager.api_request(
      //   "/ContactNumber/ContactNumber",
      //   { contact_number: contactNumber },
      //   this
      // )

      //   .then((response) => {
      //     console.log("Response:", response.data);
      //     this.myStore.mobile_number = contactNumber;
      //     this.$router.push('/otp/' + contactNumber);
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //     // Handle error response
      //   });
      console.log("pass",contactNumber)
      axios.post(
       'https://localhost:7232/api/ContactNumber/ContactNumber',
       {contact_number: contactNumber})
       .then(response =>{
        console.log('Response:', response.data);
      });
      this.$buefy.toast.open({
          message: 'OTP is successfully generated!',
           type: 'is-success'
          });
      this.myStore.mobile_number = contactNumber;
      // this.$router.push('/otp/'+contactNumber);
      this.showOtpModal=true;

      this.showModal=false;
      this.setOtpModal();
    },

    closeModal() {
      this.selectedCountryCode = "";
      this.mobileNumber = "";
      this.$emit("close-modal");
    },
  },
  computed: {
    invalid() {
      return (
        !this.selectedCountryCode ||
        !this.mobileNumber ||
        isNaN(this.mobileNumber) ||
        this.mobileNumber.length !== 9
      );
    },
  },
  mounted() {
     console.log("in Login View");
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"] {
  width: 300px;
  height: 50px;
  font-weight: 500;
  font-family: poppins;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

select {
  width: 100px;
  height: 50px;
  font-weight: 500;
  font-family: poppins;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.country-code-span {
  position: absolute;
  top: 250px;
  left: 40px;
}
.mobile-number-span {
  position: absolute;
  top: 270px;
  left: 40px;
}

.form-container {
  width: 450px;
  height: 400px;
  padding: 0px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-radius: 10px;
  position: relative;
}
.input-box {
  display: flex;
}

.contact-input-label {
  color: black;
  font-family: poppins;
}

h6 {
  position: relative;
  font-family: "Poppins", sans-serif;
  text-align: center;
  padding: 4%;
  background: #f54d4d;
  margin-bottom: 30px;
  color: white;
  font-size: 20px;
  font-weight: 600;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  letter-spacing: 1.5px;
}

p {
  text-align: center;
  color: black;
  font-family: poppins;
}

form {
  width: 100%;
  height: 100%;
}

.buttons {
  margin-top: 80px;
  margin-left: 20px;
  font-family: poppins;
}

.delete-btn {
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 50%;
  font-weight: 700;
  position: absolute;
  top: 10px;
  right: 7px;
}

#continue {
  background-color: #f54d4d;
  width: 160px;
  margin-left: 25px;
}

#back {
  margin-right: 140px;
  font-weight: 450;
  outline-width: 3px;
  margin-left: 20px;
}

#field {
  margin-left: 30px;
  margin-top: 50px;
  display: flex;
  flex-direction: column !important;
}

span {
  color: red;
  font-size: 12px;
  /* margin-right: 2px; */
}


</style>
