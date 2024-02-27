<template>
<div>
    <footer>
      <div class="columns is-vcentered is mobile">
        <div class="column">
            <p style="font-size:20px; color: #FFFFFF; font-weight: bold; margin-top:2px; font-family:Poppins;letter-spacing:2px ">PayMedia</p>
            <p style="font-size:30px; color: #FFFFFF; font-weight: bold; margin-top:0.4px; margin-left:3px; letter-spacing:2px; font-family:Poppins;">EKYC</p>
        </div>
        <div class="column ">
            <div>
                <p style="font-size:20px; color: #FFFFFF; font-weight: bold; margin:10px; font-family:Poppins;margin-bottom:5px;">Contact Us</p>
                <p style="font-size:12px; color: #FFFFFF; font-weight: bold; margin-top:5px; font-family:Poppins; margin-left:1px; margin-bottom:2px;  "> 
                    <img src="../assets/calling.png"/> +94 11 2461461</p>
                <p style="font-size:12px; color: #FFFFFF; font-weight: bold; margin-top:5px; font-family:Poppins; margin-left:1px; margin-bottom:2px;">
                    <img src="../assets/message.png"/>
                    <a v-bind:href="'mailto:' + emailAddress"> {{ emailAddress }}</a></p> 
                <p style="font-size:12px; color: #FFFFFF; font-weight: bold; margin-top:5px; font-family:Poppins; margin-left:1px; margin-bottom:2px;">
                    <img src="../assets/location.png"/>PayMedia Limited,</p> 
                <p style="font-size:12px; color: #FFFFFF; font-weight: bold; margin-top:5px; font-family:Poppins; margin-left:20px; margin-bottom:2px;">
                  106 Havelock Road,   </p> 
                <p style="font-size:12px; color: #FFFFFF; font-weight: bold; margin-top:5px; font-family:Poppins; margin-left:20px; margin-bottom:2px;">
                  Colombo 5.</p>          
            </div>
        </div>
        <div class="column is-two-fifths">
            <p style="font-size:20px; color: #FFFFFF; font-weight: bold; margin-top:5px; font-family:Poppins;margin-bottom:5px;">Social Media</p>
            <div class="columns is-mobile">
            <div class="column"> <img src="../assets/youtube.png"/></div>
            <div class="column"> <img src="../assets/instagram.png"/></div>
            <div class="column"> <img src="../assets/twitter.png"/></div>
            <div class="column"> <img src="../assets/facebook.png"/></div>
            <div class="column"> <img src="../assets/linkedin.png"/></div>
            </div>
        </div>
     </div>
     <hr>
     <p style="font size:8px; color: #FFFFFF; margin-top:10px;  margin-left:500px; " >Copyright ©2023 PayMedia. All Rights Reserved</p>
    </footer>

</div>

  
</template>

<script>
export default {
    name:'FooterView',

    data() {
    return {
      emailAddress: 'care@paymedia.lk',
    }
    }

}
</script>

<style scoped>
footer{
    width:100%;
    height:15%;
    background: #F54D4D;
    padding:1%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-top: 2%;
    

}

.columns{
    justify-content: center;
    align-items:center;
    
}



</style>