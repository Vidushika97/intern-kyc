<template>
  <footer>
    <div class="footer-cont is-vcentered is-mobile">
      <div class="footer-box-one">
        <p class="title-logo is-4 has-text-white">PayMedia</p>
        <p class="title-logo-two is-3 has-text-white">EKYC</p>
      </div>
      <div class="footer-box-two">
        <!-- Adjusted to center content -->
        <p class="subtitle-contact is-4 has-text-white">Contact Us</p>
       <div class="icon-container">
          <img src="../assets/calling.png" />
          <p class="mobile-no" >+94 11 2461461</p>
        </div>

        <div class="icon-container-mob">
          <img src="../assets/message.png" />
          <a :href="'mailto:' + emailAddress" class="has-text-white">{{
            emailAddress
          }}</a>
        </div>

          <div class="address-box">
        <div>
            <img src="../assets/location.png" />
          </div>
          <div class="address-box-two">
            <p>PayMedia Limited,</p>
          <p>106 Havelock Road,</p>
          <p>Colombo 5.</p>
          </div>
        </div>
      </div>
     <div class="footer-box-three is-two-fifths">
        <p class="social-media-sub subtitle is-4 has-text-white">Social Media</p>
        <div class="footer-box-columns is-mobile">
          <div class="box-column"><img src="../assets/youtube.png" /></div>
          <div class="box-column"><img src="../assets/instagram.png" /></div>
          <div class="box-column"><img src="../assets/twitter.png" /></div>
          <div class="box-column"><img src="../assets/facebook.png" /></div>
          <div class="box-column"><img src="../assets/linkedin.png" /></div>
        </div>
      </div>
    </div>
    <hr class="separator" />
    <p class="is-size-6 has-text-white copyright-tag">
      Copyright © 2023 PayMedia. All Rights Reserved
    </p>
  </footer>
</template>

<script>
export default {
  name: "FooterView",
  data() {
    return {
      emailAddress: "care@paymedia.lk",
    };
  },
};
</script>

<style scoped>
footer {
  width: 100%;
  height: 15%;
  background: #f54d4d;
  padding: 1%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 2%;
}

.footer-cont{
  display: flex;
  justify-content: space-between;
  padding: 20px 200px;

}

.footer-box-columns {
  padding: 0px !important;
  display: flex;
  gap: 10px;
}
 .footer-box-one{
  position: relative;
 }

.footer-box-two{
  display: flex;
  flex-direction: column;
  /* margin: 0 auto; */
} 
.box-column {
  height: 41px;
  width: 41px;
}

.has-text-white {
  color: #ffffff;
}
.social-media-sub {
  font-weight: 600;
  font-family: "Poppins";
}

.title-logo{
  margin-top: 75px;
  font-family: "Poppins";
  font-size: 25px;
  font-weight: 700;
  line-height: -50px;
  position: relative;
}

.title-logo-two{
  position: absolute;
  top:100px;
  font-family: "Poppins";
  /* font-style: italic; */
  letter-spacing:4px;
  font-size:33px;
  font-weight: 700;
  line-height: -50px;
  text-align: center;
  padding-left: 7px;
}
.icon-container{
  display: flex;
  gap: 5px;
  margin-bottom: 15px;
}

.icon-container-mob{
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
}

.mobile-no{
  color:#ffffff;
}

.address-box{
  display: flex;
  /* grid-template-columns: 1fr 20fr; */
  gap:10px;
  color:#ffffff;
  margin-bottom: 5px;
}

.address-box img{
  height: auto;
}

.address-box-two{
 
  color:#ffffff;
}

.subtitle-contact{
  font-family: "Poppins";
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 28px;
}

.copyright-tag{
  text-align: center;
}

.separator{
  height: 0.5px;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 18px;
}
</style>
