import { _Request } from '../utils/request';
import Home from './Home';

const Index = (props) => {
  return <Home {...props} />
}

Index.getInitialProps = async (ctx) => {
  return {}
}

export default Index;
