<template>
  <div>
    <header class="header"> 
      <div class="logo">
        <p style="font-size:20px; color: #F54D4D; font-weight: bold; margin-top:1px; font-family:Poppins;letter-spacing:2px ">PayMedia</p>
        <p style="font-size:30px; color: #F54D4D; font-weight: bold; margin-top:0.4px; margin-left:3px; letter-spacing:2px; font-family:Poppins;">EKYC</p>
      </div>
      <div class= "contact">
        <b-button class="center-content" rounded @click="showAlert"> <img src ="../assets/calling.png" alt="Calling icon" />  +94 11 2461461</b-button>   
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'HeaderView',
  methods: {
    showAlert() {
      alert('Calling'); // Show alert when the button is clicked
    }
  }
}
</script>

<style scoped>
.header {
  background-image: url('../assets/background.png'); 
  color: #fff;
  width:  100%;
  height: 300px;
  /* padding:5%; */
  background-repeat: no-repeat;
  background-position:center;
  background-size: cover;
}

/* .columns {
  margin: 30px;
} */

button {
  background-color: #F54D4D;  
  color: #fff;
  margin-top: 50px;
  margin-right: 50px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.logo {
  flex: 1 0 auto;
  margin-top: 50px;
  margin-left: 50px;
}

.contact {
  text-align: center; 
}

.center-content {
  display: flex;
  align-items: center; /* Align items vertically */
  justify-content: space-around; /* Align items horizontally */
}
</style>
