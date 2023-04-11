import React from 'react'
import styles from './DataNotFound.module.css'

const DataNotFound = ({text}) => {
  return (
    <div className={styles.dataNotFound}>
      <h3>{text}</h3>
    </div>
  )
}

export default DataNotFound
