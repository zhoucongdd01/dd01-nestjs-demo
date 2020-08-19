import { useState, useEffect} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.scss';
import { _Request } from '../utils/request';

function MyApp({Component, pageProps}) {
  const [ count, setCount ] = useState(false);
  useEffect(() => {
     if (pageProps.err && pageProps.err.msg) {
      setCount(true)
     }
  }, [pageProps])
  return ( 
    <div className="blog-container">
      <Header {...pageProps}/>
        <Component {...pageProps} />
        {count && <span>{pageProps.err.msg}</span>}
      <Footer />
    </div>
  )
}

MyApp.getInitialProps = async (ctx) => {
  try {
    const props = await ctx.Component.getInitialProps();
    const res = await _Request('/menu/list', 'GET')
    return {
      pageProps: {
        MenuList: res.result,
        ...props
      }
    };
  } catch(err){
    return {
      pageProps: {
        err
      }
    }
  }
}

export default MyApp
