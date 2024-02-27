import { defineStore } from 'pinia';


export const useMyStore = defineStore('myStore',{
  state: () => {
    return {
  "title": "",
  "full_name": "",
  "mobile_number": "",
  "email": "",
  "nicNumber": "",
  "nationality": "",
  "contactNumber": '',
  "base64NICFrontImage": "",
  "base64NICBackImage": "",
  "base64SelfieImage": "",
  }},
 
  actions: {
    
      updateMobileNumber(contactNumber) {
        this.mobile_number = contactNumber;
      },

      updateTitle(selectTitle) {
        this.title = selectTitle;
      },

      updateFullName(fullName) {
        this.full_name = fullName;
      },

      updateEmail(inputEmail) {
        this.email = inputEmail;
      },

      updateNIC(NIC) {
        this.nicNumber = NIC;
      },

      updateNationality(nationality) {
        this.nationality = nationality;
      },

      updateImageUrl(type, imageUrl) {
        console.log('ok', imageUrl)
        // this.base64NICFrontImage = imageUrl;
        switch (type) {
          case 'base64NICFrontImage':
            this.base64NICFrontImage = base64NICFrontImage;
            break;
          case 'base64NICBackImage':
            this.base64NICBackImage = base64NICBackImage;
            break;
          case 'base64SelfieImage':
            this.base64SelfieImage = base64SelfieImage;
            break;
          default:
            console.log('test')
            // this.base64NICFrontImage = imageUrl;
            break;
        }
      },
     
     
  },
});
