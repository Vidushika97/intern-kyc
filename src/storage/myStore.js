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
    
     
  },
});
