import LoginModal from '@/components/LoginModal.vue'
import OtpModal from './components/OtpModal.vue'
import FormSignup from './components/FormSignup.vue'
import SignUpload from './components/SignUpload.vue'
import PreviewForm from './components/PreviewForm.vue'
import SuccessModal from './components/SuccessModal.vue'
// import HeaderView from './components/HeaderView.vue'
// import FooterView from './components/FooterView.vue'
import ImageUploader from './components/ImageUploader.vue'

export default[
    {path:'/',component:LoginModal},
    {path:'/otp/:contact?',component:OtpModal},
    {path:'/signup',component:FormSignup},
    {path:'/upload',component:SignUpload},
    {path:'/preview',component:PreviewForm},
    {path:'/success',component:SuccessModal},
    // {path:'/footer',component:FooterView},
    // {path:'/header',component:HeaderView},
    {path:'/imageupload',component:ImageUploader},
]