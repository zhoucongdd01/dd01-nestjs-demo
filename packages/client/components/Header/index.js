import './index.scss';

const Header = (props) => {
    return <div className="cl-header">
        <ul>
            {props.MenuList.map(item => {
            return <li key={item.menu_id}>{item.menu_name}</li>
            })}
        </ul>
    </div>;
}

export default Header;