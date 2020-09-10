import { useState, useEffect} from 'react';
import { useCookie } from 'next-cookie';
// import dynamic from 'next/dynamic';
import 'antd/dist/antd.css';
import 'highlight.js/styles/monokai-sublime.css';
import '../styles/themes.scss';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; //这个样式必须引入
import Router, { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.scss';
import '../styles/markdown.scss';
import { _Request } from '../utils/request';

// const Header = dynamic(
//   import('../components/Header'),
//   { ssr: false }
// );

Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({Component, pageProps}) {
  const cookies = useCookie();
  const userinfo = cookies.get('userinfo');
  const [loginStatus, setLoginStatus ] = useState(!!userinfo);
  return ( 
    <div className="blog-container">
      <Header {...pageProps} 
        loginStatus={loginStatus} 
        setLoginStatus={setLoginStatus}/>
      <Component {...pageProps}  
        loginStatus={loginStatus} 
        setLoginStatus={setLoginStatus}
      />
    </div>
  )
}

MyApp.getInitialProps = async (ctx) => {
  try {
    const props = await ctx.Component.getInitialProps(ctx.ctx);
    const res = await _Request('/menu/list', 'GET');
    const category = await _Request('/category/list', 'GET');
    const recommend = await _Request('/article/recommend', 'GET');
    return {
      pageProps: {
        MenuList: res.result,
        CategoryList: category.result,
        RecommendList: recommend.result,
        router: ctx.router,
        ...props
      }
    };
  } catch(err){
    return {}
  }
}

export default MyApp
