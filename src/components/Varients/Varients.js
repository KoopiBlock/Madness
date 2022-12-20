import React from 'react'
import styles from './Variants.module.css'

const Varients = ({ variants, ...props }) => {
  
  
  return (
   <select
    className={styles.select}
    {...props}
   >
    {variants.map((variant) => (
        <option key={variant.id} value={variant.id} className={styles.selectOption}>
            {variant.name}
        </option>
    ))}
   </select>
  )
}

export default Varients