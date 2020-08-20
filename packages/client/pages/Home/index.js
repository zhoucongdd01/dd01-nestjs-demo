import { withRouter} from 'next/router';
import ComLayout from '../../components/ComLayout';
import './index.scss';
import { _Request } from '../../utils/request';


const HomePage = (props) => {
    return (
      <div className="home-container">
        <ComLayout {...props}/>
      </div>
    )
}

HomePage.getInitialProps = async (ctx) => {
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

export default withRouter(HomePage)