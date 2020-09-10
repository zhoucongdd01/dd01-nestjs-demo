import { withRouter} from 'next/router';
import ComLayout from '../../components/ComLayout';
import { _Request } from '../../utils/request';


const ArchivesPage = (props) => {
    return <div>
        这是归档页
    </div>
}

ArchivesPage.getInitialProps = async (ctx) => {
    return {
       
    };
}

export default withRouter(ArchivesPage)