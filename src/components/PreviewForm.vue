<template>
<div>
<HeaderView/>
  <div>
    <h1>KYC Form</h1>
    <h6>Please enter your valid Name & email address to using all of our</h6>
    <h6>feature</h6>
    
  <div class="form-container"> 
   <form>
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
            <b-input v-model="fullName"></b-input>
        </b-field>
  </div>
  </div>
  <div class="columns is-8 is-mobile">
    <div class="column is-half">
    <b-field label="Mobile Number">
            <b-input v-model="number"></b-input>
            
        </b-field>
    </div>
    <div class="column is-half">
    <b-field label="Email">
            <b-input v-model="inputEmail" type="email"
                value="john@"
                maxlength="30">
            </b-input>
        </b-field>
  </div>
  </div>
  

<div class="columns is-8 is-mobile">
    <div class="column is-half">
    <b-field label="NIC Number">
            <b-input v-model="NIC"></b-input>
        </b-field>
    </div>
    <div class="column ">
        <b-field label="Nationality">
            <b-select v-model="nationality" placeholder="Select One">
                <option value="sinhala">Sinhala</option>
                <option value="tamil">Tamil</option>
                <option value="muslim">Muslim</option>
                <option value="malay">Malay</option>
            </b-select>
        </b-field>
     
  </div>
  </div>

  <div class="columns is-vcentered is-multiline is-mobile">
          <div class="column is-half">
            <p>NIC / DL front image*</p>
           <img :src="imageUrlFront">
          </div>
          <div class="column is-half">
            <p>NIC / DL rear image*</p>
            <img :src="imageUrlRear">
          </div>
          <div class="column is-half">
            <p>Selfie Image*</p>
             <img :src="imageUrlSelfie">
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
// import ImageUploader from './ImageUploader.vue';
import FooterView from './FooterView.vue';
import HeaderView from './HeaderView.vue';
import {useMyStore} from '../storage/myStore.js';

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
      inputEmail:"",}
  },

     components:{
    //  ImageUploader,
     HeaderView,
     FooterView,
     
},
     methods: {
    submit() {
      console.log('test', this.imageUrlFront)
      this.$router.push('/success');
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
   

    // console.log("dd",this.number )
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

</style>