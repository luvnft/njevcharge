const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#666'
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px'
  },
  twoColumns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '20px'
  },
  results: {
    backgroundColor: '#f5f5f5',
    padding: '15px',
    borderRadius: '4px',
    marginTop: '20px'
  },
  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  resultLabel: {
    color: '#666',
    fontSize: '14px'
  },
  resultValue: {
    fontWeight: 'bold'
  },
  githubLink: {
    marginTop: '15px',
    textAlign: 'center',
  },
  link: {
    color: '#666',
    textDecoration: 'none',
    fontSize: '12px',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
};

export default styles