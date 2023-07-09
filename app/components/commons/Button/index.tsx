import type { FC, MouseEventHandler } from 'react'
import styles from './styles.module.css'

interface ButtonProps {
  label: string
  loading: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const links = () => [{ rel: 'stylesheet', href: styles }]

export const Button: FC<ButtonProps> = ({ label, loading, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {loading ? <div className={styles['center-dots']}>·</div> : label}
    </button>
  )
}
