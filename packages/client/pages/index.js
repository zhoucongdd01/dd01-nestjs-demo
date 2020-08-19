import Home from './Home';

const Index = (props) => {
  return <Home {...props}/>
}

Index.getInitialProps = async (ctx) => {
  return {
    name: 'dasda'
  }
}

export default Index;
