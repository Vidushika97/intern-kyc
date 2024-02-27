<template>
  <div>
    <PreviewForm></PreviewForm> 
    
      <b-modal v-model="showModal">
        <div class="form-container">
         <form>
          <div class="image-container" >
          <img src="../assets/success.png" width="150px" height="150px"/> 
          </div>
          <div class="text-container">
            <h6>CONGRATULATIONS!</h6>
            <p>Your KYC data has been Submitted successfully</p>
          </div>  
            
        
          

          <div class="buttons">
            
            <b-button id="continue" @click="ok" type="is-primary">OK</b-button>
          </div>
         </form>
        </div>
      </b-modal>
    
   
  </div>
</template>

<script>
import PreviewForm from './PreviewForm.vue';

export default {
  components: {
    PreviewForm,
  },
  data() {
    return {
      showModal: false,
      selectedCountryCode: "", // Initialize with an empty string or default country code
      mobileNumber: "" // Initialize with an empty string
    };
  },
  methods: {
    ok() {
    
      this.closeModal();
    },
    closeModal() {
     
      this.showModal = false;
    }
  },
  mounted() {
    this.showModal = true;
  }
}
</script>

<style scoped>
.form-container {
  width: 400px;
  height: 400px;
  margin-left: auto; /* Center horizontally */
  margin-right: auto; /* Center horizontally */
  background-color: white;
}

h6{
    text-align:center;
    color: #F54D4D;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 25px;
    font-weight: bold;

}

p{
    text-align:center;
    
    
}

form{
    width:100%;
    height:100%;
    margin-top: 20px;
    
    
}

.buttons{
   margin-top:80px; 
   margin-left: 120px;
   
}

#continue{
  background-color: #F54D4D;
  width:160px;
}


.image-container{
   text-align: center;
   margin-bottom: 20px;
   margin-top: 20px;
}



</style>
