import OtpModal from './components/OtpModal.vue'
import FormSignup from './components/FormSignup.vue'
import SignUpload from './components/SignUpload.vue'
import PreviewForm from './components/PreviewForm.vue'


export default[
    {path:'/',component:FormSignup},
    // {path:'/otp/',component:OtpModal},
    {path:'/otp/:contact?',component:OtpModal},
    {path:'/upload',component:SignUpload},
    {path:'/preview',component:PreviewForm},
    
]