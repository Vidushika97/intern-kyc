<template>
  <div>
      <b-modal v-model="showModalSuccess" :can-cancel="false">
        <div class="form-container">
         <form>
          <h5>
              <button @click="closeModal" class="delete-btn">X</button>
              
            </h5>
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


export default {
  components: {
    
  },
  data() {
    return {
      showModalSuccess: true,
 };
  },
  methods: {
    ok() {
      localStorage.clear();
      this.closeModal();
      
      
    },
    closeModal() {
     
      this.showModalSuccess = false;
    }
  },
  // mounted() {
  //   this.showModalSuccess = true;
  // }
}
</script>

<style scoped>
.form-container {
  width: 400px;
  height: 400px;
  margin-left: auto; /* Center horizontally */
  margin-right: auto; /* Center horizontally */
  background-color: white;
  border-radius: 10px;
  position: relative;
}

h6{
    text-align:center;
    color: #F54D4D;
    margin-top: 20px;
    margin-bottom: 12px;
    font-size: 22px;
    font-weight: bold;
  

}

h5{
  padding:5px
}

p{
    text-align:center;
    font-size: 12px;
    
    
}

form{
    width:100%;
    height:100%;
    margin-top: 20px;
    font-family: poppins;
    
    
}

.buttons{
   margin-top:60px; 
   margin-left: 120px;
   
}

#continue{
  background-color: #F54D4D;
  width:160px;
}


.image-container{
   text-align: center;
   margin-bottom: 2px;
   margin-top: 20px;
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


</style>
