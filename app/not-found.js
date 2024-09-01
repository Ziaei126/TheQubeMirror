import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.header}>404</h1>
        <h2 style={styles.subHeader}>Oops! Page Not Found</h2>
        <p style={styles.text}>Sorry, we couldn't find the page you were looking for.</p>
        <Link href="/" style={styles.link}>
          Return Home
        </Link>
      </div>
      
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px',
  },
  content: {
    maxWidth: '600px',
    marginBottom: '20px',
  },
  header: {
    fontSize: '72px',
    color: '#333',
  },
  subHeader: {
    fontSize: '36px',
    color: '#555',
    margin: '20px 0',
  },
  text: {
    fontSize: '18px',
    color: '#777',
    marginBottom: '30px',
  },
  link: {
    fontSize: '18px',
    color: '#0070f3',
    textDecoration: 'none',
    border: '2px solid #0070f3',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  linkHover: {
    backgroundColor: '#0070f3',
    color: '#fff',
  },
  image: {
    width: '300px',
    marginTop: '20px',
  },
}