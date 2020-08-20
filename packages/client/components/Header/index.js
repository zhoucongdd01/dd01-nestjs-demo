import { useState } from 'react';
import Router from 'next/router'
import { Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import './index.scss';

const Header = (props) => {
    let pathname = '/';
    if ( props.router && props.router.pathname )  pathname = props.router.pathname;
    const [switch_theme, setSwitchTheme] = useState(false)
    const onToggleMenu = (item) => {
        Router.push(item.menu_path);
    }
    
    return <div className="cl-header">
        <div className="view-width">
            <div className="lf-menu">
                <img src='https://wipi.oss-cn-shanghai.aliyuncs.com/2020-02-10/TBRGIVFYPEAWW7M0AM6UAO/custw-logo.png' className="logo" />
                <ul>
                    {props.MenuList && props.MenuList.map(item => {
                      return <li key={item.menu_id} onClick={() => onToggleMenu(item)} className={classnames('', {'menu_active': 
                      pathname === item.menu_path})}>{item.menu_name}</li>
                    })}
                </ul>
            </div>
            <div className="rg-oper">
            <Switch checked={switch_theme} onChange={(value) => setSwitchTheme(value)}/>
            <SearchOutlined style={{fontSize: 20, transform: 'translateY(5px)'}}/>
            </div>
        </div>
    </div>;
}

export default Header;