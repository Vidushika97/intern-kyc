<template>
  <div>
    <HeaderView/>
    <div>
      <h1>KYC Form</h1>
      <h6>Please enter your valid Name & email address to use all of our features</h6>
      <h6>feature</h6>
      <form>
        <div class="columns is-vcentered is-multiline is-mobile">
          <div class="column is-half">
            <p>NIC / DL front image*</p>
            <ImageUploader @custom-event="(front)=>{captureImageFront(front)}"></ImageUploader>
            
          </div>
          <div class="column is-half">
            <p>NIC / DL rear image*</p>
            <ImageUploader @custom-event="(rear)=>{captureImageRear(rear)}"></ImageUploader>
          </div>
          <div class="column is-half">
            <p>Selfie Image*</p>
            <ImageUploader @custom-event="(selfie)=>{captureImageSelfie(selfie)}"></ImageUploader>
          </div>
        </div>
      </form> 
      <div class="buttons">
        <b-button id="back" @click="goBack">Back</b-button>
        <b-button id="next" type="is-primary" @click="next">Next</b-button>
        
      </div>
    </div> 
    <FooterView/> 
  </div>
</template>

<script>
import ImageUploader from './ImageUploader.vue';
import FooterView from './FooterView.vue';
import HeaderView from './HeaderView.vue';
import { useMyStore } from '../storage/myStore.js';
// import axios from 'axios';
import NetworkManager from '../network/NetworkManager.js'; 

export default {
  name: 'SignUpload',
  data() {
    return {
     
    };
  },
  setup() {
    const myStore = useMyStore();

    return { myStore };
  },
  
  methods: {

    captureImageFront(front) {
     
      console.log('front', front)
      
      this.myStore.base64NICFrontImage =  front;
      
    },

    captureImageRear(rear) {
      
      
      this.myStore.base64NICBackImage = rear;
      
    },

    captureImageSelfie(selfie) {
      
      
      this.myStore.base64SelfieImage = selfie;
      
    },

    
    next() {
      // const comp = this
      console.log("next");

      const imageUploaders = [this.myStore.base64NICFrontImage, this.myStore.base64NICBackImage, this.myStore.base64SelfieImage];
      let allFieldsFilled = true;
      for (const uploader of imageUploaders) {
        if (uploader.imageUrl !== "") {
          // allFieldsFilled = false;
          break;
        }
      }
  console.log("next2")
      if (allFieldsFilled) {
      // Define your image upload data
let imageUpload = {
  kycForms: "string",
  base64NICFrontImage: this.myStore.base64NICFrontImage,
  base64NICBackImage: this.myStore.base64NICBackImage,
  base64SelfieImage: this.myStore.base64SelfieImage,
  
};

// Call the api_request function from NetworkManager
NetworkManager.api_request('/FileUpload/UploadImage', imageUpload)

      this.$buefy.toast.open({
          message: 'Data saved successfully!',
           type: 'is-success'
          });
	
        
        this.$router.push('/preview');
      } else {
        //alert('Please fill all fields of the image uploader.');
      }
    },

    goBack() {
      this.$router.go(-1);
    },
  },
  components: {
    ImageUploader,
    FooterView,
    HeaderView,
  },
};
</script>

<style scoped>
form {
  margin-left: 15%;
  margin-bottom: 2%;
  margin-top: 2%;
}

h1 {
  color: #F54D4D;    
  font-family: Gotham;
  font-size: 22px;
  font-weight: 900;
  line-height: 53px;
  letter-spacing: 0.05em;
  text-align: center;
  font-weight: bold;
  word-spacing: 0.1em;
}

h6 {
  font-family: Poppins;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0.04em;
  text-align: center;
  word-spacing: 0.1em;
}

#next {
  background-color: #F54D4D;
  width: 30%;
}

#back {
  width: 20%;
  border-color: black;
  margin-right: 4%;
}

.buttons {
  margin-left: 50%;
  margin-bottom: 5%;
}
</style>
