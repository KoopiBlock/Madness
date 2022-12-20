import React, {useState} from 'react'
import { FiSend } from 'react-icons/fi';
import styles from './MailList.module.css'
import axios from 'axios'

const MailList = () => {

   const [email, setEmail] = useState('')

   const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email)

    const data = {
        Email: email
    }

    axios.post('https://sheet.best/api/sheets/f80608e9-0b2c-4b65-aa1c-4cc86ef9fa61', data).then((response) => {})
    
        setEmail('')
   }

  return (
    <div className={styles.formCOntainer}>
        <h1 className={styles.formTitle}>Join our mailing list to be the first notified of ur next drops! </h1>
        <form className={styles.form} name='submit-to-google-sheet' onSubmit={handleSubmit}>
            <input
             type='email'
            name='Email'
            placeholder='Join Us!'
            required
            className={styles.input}
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            /> 
            <button type='submit' className={styles.formButton}><FiSend className={styles.formButtonIcon} /></button>
        </form>
    </div>
   
  )
}

export default MailList