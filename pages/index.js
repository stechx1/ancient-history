import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      
    </div>
  )
}

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: '/blog'
    }
  }
}
