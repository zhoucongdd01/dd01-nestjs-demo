import { _Request } from '../../utils/request';


const HomePage = (props) => {
    return (
      <div>这是首页{props.name}</div>
    )
}

HomePage.getInitialProps = async (ctx) => {
    const res = await _Request('/menu/list', 'GET');
    return {
       
    };
}

export default HomePage