<template>
<div>
<HeaderView/>
   <div v-if="showModalSuccess">
           <SuccessModal/>

    </div>
  <div>
    <h1>KYC Form</h1>
    <h6>Please enter your valid Name & email address to using all of our</h6>
    <h6>feature</h6>
    
  <div class="form-container"> 
   <form>
    <div class="columns is-8 is-mobile">
    <div class="column is-one-fifth">
    
    <b-field>
      <template #label>
            Title <b style="color:red;">*</b>
            </template>
            <b-select v-model="selectTitle" placeholder="Select One" expanded disabled>
                <option value="mr">Mr.</option>
                <option value="ms">Ms.</option>
            </b-select>
        </b-field>
    </div>
    <div class="column is-four-fifths">
     <b-field>
            <template #label>
            Full Name <b style="color:red;">*</b>
            </template>
            <b-input v-model="fullName" expanded disabled></b-input>
        </b-field>
  </div>
  </div>
  <div class="columns is-8 is-mobile">
    <div class="column is-half">
    <b-field>
      <template #label>
            Mobile Number <b style="color:red;">*</b>
            </template>
            <b-input v-model="number" disabled></b-input>
            
        </b-field>
    </div>
    <div class="column is-half">
    <b-field>
           <template #label>
            Email <b style="color:red;">*</b>
            </template>
            <b-input v-model="inputEmail" type="email"
                value="john@"
                maxlength="30" disabled>
            </b-input>
        </b-field>
  </div>
  </div>
  

<div class="columns is-8 is-mobile">
    <div class="column is-half">
    <b-field>
            <b-input v-model="NIC" disabled></b-input>
            <template #label>
            NIC Number <b style="color:red;">*</b>
            </template>
        </b-field>
    </div>
    <div class="column ">
        <b-field >
            <b-select v-model="nationality" placeholder="Select One" disabled expanded>
                <option value="sinhala">Sinhala</option>
                <option value="tamil">Tamil</option>
                <option value="muslim">Muslim</option>
                <option value="malay">Malay</option>
            </b-select>
            <template #label>
            Nationality <b style="color:red;">*</b>
            </template>
        </b-field>
     
  </div>
  </div>

  <div class="columns is-vcentered is-multiline is-mobile">
          <div class="column is-half">
            <p>NIC / DL front image<span>*</span></p>
           <img :src="imageUrlFront" disabled>
          </div>
          <div class="column is-half">
            <p>NIC / DL rear image<span>*</span></p>
            <img :src="imageUrlRear" disabled>
          </div>
          <div class="column is-half">
            <p>Selfie Image<span>*</span></p>
             <img :src="imageUrlSelfie" disabled>
          </div>
          <div class="column is-half">
          </div>
        </div>
    <div class="buttons">
    <b-button id=back @click="goBack">Back</b-button>
    <b-button id=submit type="is-primary" @click="submit">Submit</b-button>
  </div> 
 </form>
 </div>
 </div>
  
 
 <FooterView/> 
 </div>
</template>


   
  
  

<script>
import FooterView from './FooterView.vue';
import HeaderView from './HeaderView.vue';
import {useMyStore} from '../storage/myStore.js';
import SuccessModal from './SuccessModal.vue';

export default {
  name:'PreviewForm',
  setup(){
    const myStore = useMyStore()
    return {myStore}
  },
  data(){
    return{
      fullName: "",
      number:"",
      NIC:"",
      imageUrlFront: "",
      imageUrlRear: "",
      imageUrlSelfie: "",
      nationality:"",
      selectTitle:"",
      inputEmail:"",
      showModalSuccess:false,
     
      }
  },

   components:{
    
     HeaderView,
     FooterView,
     SuccessModal,
     
},
   methods: {
    submit() {
      console.log('test', this.imageUrlFront)
      this.showModalSuccess = true;
      console.log('modal-display',this.showModalSuccess)
    this.imageUrlFront = null
    this.imageUrlRear = null
    this.imageUrlSelfie = null 
    },

    goBack() {
      this.$router.go(-1);
    },
     },
     
      mounted(){
    this.number = this.myStore.mobile_number;
    this.fullName = this.myStore.full_name;
    this.NIC = this.myStore.nicNumber;
    this.nationality = this.myStore.nationality;
    this.selectTitle = this.myStore.title;
    this.inputEmail = this.myStore.email;
    this.imageUrlFront = this.myStore.base64NICFrontImage; 
    this.imageUrlRear = this.myStore.base64NICBackImage; 
    this.imageUrlSelfie = this.myStore.base64SelfieImage; 
   
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
  margin-left: 15%; 
  display: flex;
  justify-content: center; /* Horizontally center the form */
  /* align-items: center; Vertically center the form */
  /* height: 100vh; Set the height of the container to full viewport height */
  width:80%;
  margin-bottom:5%;
}
form{
/* width: 75%;
height: 25%; 
margin-right: 30%; */
width: 90%; /* Ensure the form takes full width of its container */
/* max-width: 600px; Optional: Set a max-width for better readability */


}


#submit{
    background-color: #F54D4D;
    width:50%;
}

#back{
  width:30%;
  border-color: black;
  margin-right: 4%;
}

.buttons{
  margin-left: 50%;
  margin-bottom: 5%;
  
}


h6{
font-family: Poppins;
font-weight: 400;
line-height: 30px;
letter-spacing: 0.04em;
text-align: center;
word-spacing: 0.1em;

}
span{
  color:red;
}

</style>