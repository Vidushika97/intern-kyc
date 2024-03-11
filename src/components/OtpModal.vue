<template>
  <div>
    <b-modal v-model="showOtpModal" :title="modalHeader" :can-cancel="false">
      <div class="form-container">
        <form>
          <h6>
            <button @click="closeModal" class="delete-btn">X</button>
            ENTER OTP CODE
          </h6>
          <p>OTP code has been sent to {{this.contactNumber}} Enter the code below to continue.</p>

          <div class="otp-inputs">
            <input
              class="otp-digits"
              ref="otpInput0"
              v-model="otpDigits[0]"
              maxlength="1"
              type="number"
              @input="moveToNext(0)"
              @keydown="moveToPrevious($event, 0)"
            />
            <input
              class="otp-digits"
              ref="otpInput1"
              v-model="otpDigits[1]"
              maxlength="1"
              type="number"
              @input="moveToNext(1)"
              @keydown="moveToPrevious($event, 1)"
            />
            <input
              class="otp-digits"
              ref="otpInput2"
              v-model="otpDigits[2]"
              maxlength="1"
              type="number"
              @input="moveToNext(2)"
              @keydown="moveToPrevious($event, 2)"
            />
            <input
              class="otp-digits"
              ref="otpInput3"
              v-model="otpDigits[3]"
              maxlength="1"
              type="number"
              @input="moveToNext(3)"
              @keydown="moveToPrevious($event, 3)"
            />
            <input
              class="otp-digits"
              ref="otpInput4"
              v-model="otpDigits[4]"
              maxlength="1"
              type="number"
              @input="moveToNext(4)"
              @keydown="moveToPrevious($event, 4)"
            />
          </div>
          <span v-if="showOTPAlert" class="otp-error">Please fill all OTP fields.</span>

          <div class="countdown">
            <p style="font-size: 28px;" v-if="timer > 0">{{ formatTime(timer) }}</p>
            <p
              style="text-decoration: underline; cursor: pointer; color:red"
              @click="timer === 0 ? resendOTP() : null"
            >Resend the OTP</p>
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
// import axios from 'axios';
import NetworkManager from "../network/NetworkManager.js";

export default {
  name: "otpModal",

  components: {},
  props: ["contactNumber"],

  data() {
    return {
      showOtpModal: true,
      modalHeader: "OTP Verification",
      otpDigits: ["", "", "", "", ""],
      timer: 10,
      otpSent: false,
      showOTPAlert: false
    };
  },
  computed: {
    isClickable() {
      return this.timer === 0;
    }
  },
  methods: {
    verify() {
      if (this.otpDigits.some(digit => !digit.trim())) {
        this.showOTPAlert = true;
        return;
      }
      const otpCode = this.otpDigits.join("");
      const otpDetails = {
        contact_number: this.contactNumber,
        otp: otpCode
      };
      console.log(otpDetails);

      NetworkManager.api_request(
        "/ContactNumber/VerifyOTP",
        otpDetails ,
        this
      ).then(response => {
         if (response.status_code == 200) {
           console.log('nethsara')
          
           this.showOtpModal=false;
         }
       
        console.log("response", response.data);
      });

      // const otpCode = this.otpDigits.join('');
      // axios.post(
      //   'https://localhost:7232/api/ContactNumber/VerifyOTP',
      //   { otp: otpCode, contact_number: this.contactNumber }

      // ).then(response => {
      //  console.log('Response:', response)

      //     if (response.data.status_code == 200) {
      //     this.$buefy.toast.open({
      //     message: 'Successfully logged in!',
      //      type: 'is-success'
      //     });

      //    this.showOtpModal = false;
      // }
      // else {

      //           this.$buefy.toast.open({
      //               duration: 5000,
      //               message: 'Invalid OTP!',
      //               position: 'is-top',
      //               type: 'is-danger'
      //           });

      //   console.error('Error verifying OTP:', response.data.error);
      // }
      // }).catch(error => {
      //   console.error('Error verifying OTP:', error);

      // });
    },

    closeModal() {
      this.showOtpModal = false;
    },
    redirectToLogin() {
      this.otpDigits = ["", "", "", "", ""];
      this.$router.go(-1);

      this.$nextTick(() => {
        this.showOtpModal = false;
      });
    },
    moveToNext(index) {
      if (this.otpDigits[index] && index < 4) {
        this.$refs[`otpInput${index + 1}`].focus();
      }
    },

    moveToPrevious(event, index) {
      if (event.key === "Backspace" && !this.otpDigits[index] && index > 0) {
        this.$refs[`otpInput${index - 1}`].focus();
      }
    },

    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    },
    resendOTP() {
      this.timer = 10;
      this.otpSent = true;
      const countdown = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(countdown);
          this.otpSent = false;
        }
      }, 1000);

      NetworkManager.api_request(
        "/ContactNumber/ResendOTP",
        { contact_number: this.contactNumber },
        this
      ).then(response => {
        console.log("response", response.data);
      });

      // axios.post(
      //     'https://localhost:7232/api/ContactNumber/ResendOTP',
      //     { contact_number: this.localContactNumber }
      // )
      // .then(response => {
      //     console.log('Response:', response.data);

      //     if (response.data.status_code === 200) {
      //         this.$buefy.toast.open({
      //             message: 'OTP successfully resent!',
      //             type: 'is-success'
      //         });
      //     } else {
      //         this.$buefy.toast.open({
      //             duration: 5000,
      //             message: 'Failed to resend OTP!',
      //             position: 'is-top',
      //             type: 'is-danger'
      //         });
      //         console.error('Failed to resend OTP:', response.data.error);
      //     }
      // })
      // .catch(error => {
      //     console.error('Error resending OTP:', error);

      // });
    }
  },
  mounted() {
    const inputs = document.querySelectorAll(".otp-digits");
    inputs.forEach(input => {
      input.addEventListener("keydown", function(event) {
        if (this.value.length === 1 && event.key !== "Backspace") {
          event.preventDefault();
        }
      });
    });
    this.contactNumber = this.contactNumber;
    this.resendOTP();
    console.log("contact no :", this.contactNumber);
  }
};
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.form-container {
  width: 450px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-radius: 10px;
  position: relative;
}

h6 {
  text-align: center;
  padding: 4%;
  background: #f54d4d;
  margin-bottom: 30px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  letter-spacing: 1.5px;
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

p {
  text-align: center;
  font-size: 12px;
}

form {
  width: 100%;
  height: 100%;
  font-family: poppins;
}

.buttons {
  margin-top: 55px;
  margin-left: 20px;
}

#verify {
  background-color: #f54d4d;
  width: 160px;
  font-weight: 600;
}

#back {
  margin-right: 140px;
  margin-left: 20px;
  width: 100px;
  font-weight: 600;
}

.otp-inputs {
  display: flex;
  justify-content: center;
  margin-top: 25px;
  margin-left: 15px;
  margin-right: 15px;
  text-align: center;
}

.otp-digits {
  width: 43px;
  height: 55px;
  margin: 0 5px;
  justify-content: center;
  text-align: center;
  border-radius: 10px;
  background-color: #f8f8fa;
}

span {
  font-size: 12px;
  color: red;
  margin-left: 20px;
}

.countdown {
  font-size: 24px;
  margin-bottom: 10px;
  margin-top: 15px;
}

.resend-otp {
  text-decoration: underline;
  cursor: pointer;
  color: red;
}
</style>
