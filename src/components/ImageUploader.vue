<template>
  <div>
    <div id="image-container" @dragover.prevent @drop="handleDrop">
       <img :style="{ display: showPreviewImage ? 'block' : 'none' }" src="../assets/preview_image.png"/>
      <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" id="preview-image">
      <p v-else>Drop your image here</p>
      <p>or</p>
    
      <b-button id="capture-button" rounded @click="captureImage" >Capture</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'ImageUploader',

   
 
  data() {
    return {
      imageUrl: "",
      showPreviewImage: true
    };
  },
 methods: {
handleDrop(event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
          // Optionally emit the base64 image URL to the parent component
          if (this.imageUrl !== "") {
            this.$emit('custom-event', this.imageUrl);
          }
          this.showPreviewImage = false; // Hide the preview image
        };
        reader.readAsDataURL(file);
      }
    },
    async captureImage() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = mediaStream;
        video.play();
        video.onloadedmetadata = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

          // Convert captured image to base64
          const base64ImageURL = canvas.toDataURL('image/png');

          // Set the base64 image URL to imageUrl
          this.imageUrl = base64ImageURL;
          console.log("image url", this.imageUrl);

          video.srcObject.getTracks().forEach(track => track.stop());
          this.$emit('custom-event', this.imageUrl);
          this.showPreviewImage = false; // Hide the preview image
        };

      // Emit the base64 image URL
          
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }
  }
};
</script>

<style scoped>
#image-container {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  width: 50%;
  height:100%;

}

#preview-image {
  max-width: 100%;
  max-height: 400px;
  margin-bottom: 10px;
}

#capture-button {
  
  background-color: #F54D4D; 
  color:white 

}


</style>
