import { _Request } from '../utils/request';
import Home from './Home';

const Index = (props) => {
  return <Home {...props}/>
}

Index.getInitialProps = async (ctx) => {
  try {
    const res = await _Request('/article/list', 'GET');
    const category = await _Request('/category/list', 'GET');
    return {
      ArticleList: res.result,
      CategoryList: category.result
    };
  } catch(err){
    return {}
  }
}

export default Index;
