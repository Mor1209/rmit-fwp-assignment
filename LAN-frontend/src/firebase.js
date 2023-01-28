// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCgT0hPcp09XFXT-N1hR8yHiOITSJ6qWOA',
  authDomain: 'rmit-fwp-project.firebaseapp.com',
  projectId: 'rmit-fwp-project',
  storageBucket: 'rmit-fwp-project.appspot.com',
  messagingSenderId: '198577859655',
  appId: '1:198577859655:web:4e4f2bac4a5148c4eed562',
  measurementId: 'G-P935CXSSR6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

const imageUpload = async image => {
  if (image === null || image === undefined) return null

  try {
    const imgRef = ref(storage, `images/${uuidv4() + image.name}/`)
    const upload = await uploadBytes(imgRef, image)
    const URL = await getDownloadURL(upload.ref)
    return URL
  } catch (error) {
    return 'error'
  }
}

export { imageUpload }

export default app
