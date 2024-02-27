<template>
  <div>
    <FormSignup :disabled="showModal"></FormSignup> 
    <b-modal v-model="showModal" :title="modalHeader">
      <div class="form-container">
        <form>   
          <h6>ENTER OTP CODE</h6>
          <p>OTP code has been sent to {{ localContactNumber }}  Enter the code below to continue.</p>

          <div class="otp-inputs">
            <b-input ref="otpInput0" v-model="otpDigits[0]" maxlength="1" type="number" @input="moveToNext(0)"></b-input>
            <b-input ref="otpInput1" v-model="otpDigits[1]" maxlength="1" type="number" @input="moveToNext(1)"></b-input>
            <b-input ref="otpInput2" v-model="otpDigits[2]" maxlength="1" type="number" @input="moveToNext(2)"></b-input>
            <b-input ref="otpInput3" v-model="otpDigits[3]" maxlength="1" type="number" @input="moveToNext(3)"></b-input>
            <b-input ref="otpInput4" v-model="otpDigits[4]" maxlength="1" type="number" @input="moveToNext(4)"></b-input>
          </div>
           <span v-if="showOTPAlert" class="otp-error">Please fill all OTP fields.</span>
          

          <div class="countdown">
            <p v-if="timer > 0">{{ formatTime(timer) }}</p>
            <p v-else style="text-decoration: underline; cursor: pointer;" @click="resendOTP">Resend the OTP</p>
          </div>

          <div class="buttons">
            <b-button id="back" @click="redirectToLogin">Back</b-button>
            <b-button id="verify" @click="verify" type="is-primary">Verify</b-button>
          </div>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import FormSignup from './FormSignup.vue';
import axios from 'axios';
// import contactNumber from './LoginModal.vue'

export default {

  name:'otpModal',

  components: {
    FormSignup,
    
  },
  props:
    ['contactNumber'],
  

  data() {
    return {
      showModal: true,
      modalHeader: "OTP Verification",
      otpDigits: ['', '', '', '', ''],
      timer: 60,
      otpSent: false,
      showOTPAlert: false,
      localContactNumber:'',
      
    };
  },
  methods: {
    verify(){

     // console.log('vidushika');
      if (this.otpDigits.some(digit => !digit.trim())) {
        this.showOTPAlert = true; // Set showOTPAlert to true to display the alert message
        return;
      }
       // console.log('moda vidushika');
      
      const otpCode = this.otpDigits.join('');
      axios.post(
        'https://localhost:7232/api/ContactNumber/VerifyOTP',
        { otp: otpCode, contact_number: this.localContactNumber }

      ).then(response => {
       console.log('Response:', response) 
        // console.log('Response code:', response.data.status_code );

        
          if (response.data.status_code == 200) {
          this.$buefy.toast.open({
          message: 'Successfully logged in!',
           type: 'is-success'
          });


        // console.log('piccu')
        this.$router.push('/signup');
      } 
      else {
         
                this.$buefy.toast.open({
                    duration: 5000,
                    message: 'Invalid OTP!',
                    position: 'is-top',
                    type: 'is-danger'
                });
            
        
        console.error('Error verifying OTP:', response.data.error);
      }
      }).catch(error => {
        console.error('Error verifying OTP:', error);
        
      });
    },
    redirectToLogin() {
      
      this.otpDigits = ['', '', '', '', ''];
      
      this.showModal = false;
      
      this.$nextTick(() => {
        this.$router.push('/');
      });
    },
    moveToNext(index) {
      if (this.otpDigits[index] && index < 4) {
        this.$refs[`otpInput${index + 1}`].focus();
      }
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    resendOTP() {
    this.timer = 60;
    this.otpSent = true;
    const countdown = setInterval(() => {
        if (this.timer > 0) {
            this.timer--;
        } else {
            clearInterval(countdown);
            this.otpSent = false;
        }
    }, 1000);

    axios.post(
        'https://localhost:7232/api/ContactNumber/ResendOTP',
        { contact_number: this.localContactNumber }
    )
    .then(response => {
        console.log('Response:', response.data);
        // Handle the response here, such as displaying a success message or updating UI
        // Example:
        if (response.data.status_code === 200) {
            this.$buefy.toast.open({
                message: 'OTP successfully resent!',
                type: 'is-success'
            });
        } else {
            this.$buefy.toast.open({
                duration: 5000,
                message: 'Failed to resend OTP!',
                position: 'is-top',
                type: 'is-danger'
            });
            console.error('Failed to resend OTP:', response.data.error);
        }
    })
    .catch(error => {
        console.error('Error resending OTP:', error);
        // Handle the error here, such as displaying an error message or updating UI
    });
}

  },
  mounted() {
    this.resendOTP();
    this.localContactNumber = this.$route.params.contact;
    console.log("contact no :",this.localContactNumber)
  }
};

</script>

<style scoped>
.form-container {
  width: 400px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
}

h6 {
  text-align: center;
  padding: 4%;
  background: #F54D4D;
  margin-bottom: 30px;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

p {
  text-align: center;
  font-size: 12px;
}

form {
  width: 100%;
  height: 100%;
}

.buttons {
  margin-top: 80px; 
  margin-left: 20px;
}

#verify {
  background-color: #F54D4D;
  width: 160px;
}

#back {
  margin-right: 140px;
}

.otp-inputs {
  display: flex;
  justify-content: center;
  margin-top: 25px;
  margin-left: 15px;
  margin-right: 15px;
  text-align: center;
}

.b-input {
  width: 25px;
  margin: 0 5px;
  justify-content: center;
}

span{
  font-size: 12px;
  color: red;
  margin-left: 20px;
}
</style>