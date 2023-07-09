import styles from './styles.module.css'

export const links = () => [{ rel: 'stylesheet', href: styles }]

export const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src="/logo.png" alt="Tech News logo" />
    </header>
  )
}
