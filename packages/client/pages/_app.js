import { useState, useEffect} from 'react';
import 'antd/dist/antd.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.scss';
import { _Request } from '../utils/request';

function MyApp({Component, pageProps}) {
  return ( 
    <div className="blog-container">
      <Header {...pageProps}/>
      <Component {...pageProps} />
    </div>
  )
}

MyApp.getInitialProps = async (ctx) => {
  try {
    const props = await ctx.Component.getInitialProps();
    const res = await _Request('/menu/list', 'GET');
    return {
      pageProps: {
        MenuList: res.result,
        ...props,
        router: ctx.router
      }
    };
  } catch(err){
    return {}
  }
}

export default MyApp
