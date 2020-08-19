import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  console.log(pageProps);
  return ( 
    <div className="blog-container">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

MyApp.getInitialProps = async (ctx) => {
  return {
    pageProps: {
      name: 'zhoucong'
    }
  }
}

export default MyApp
