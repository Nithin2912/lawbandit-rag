// src/app/Footer.tsx
export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1a202c',
      color: '#fff',
      padding: '1rem 2rem',
      textAlign: 'center',
      marginTop: '2rem'
    }}>
      &copy; {new Date().getFullYear()} LawBandit RAG. All rights reserved.
    </footer>
  );
}
