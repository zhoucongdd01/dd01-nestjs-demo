import { useState } from 'react';
import Router, { withRouter} from 'next/router';
import { Form, Input, Button, Checkbox, message, Upload} from 'antd';
import { useCookie } from 'next-cookie';
import { LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import './index.scss';
import { _Request } from '../../utils/request';




const LoginPage = (props) => {

    const [AvatarUrl, setAvatarUrl] = useState('')
    const [loading, setLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const cookies = useCookie();

    const onFinish = async values => {
        
        if (isRegister) {
            try {
                const res =  await _Request('/user/register', 'POST', {
                    username: values.username,
                    password: values.password,
                    email: values.email,
                    avatar: AvatarUrl
                });
                message.success('注册成功， 已登录!')
                cookies.set('account_token', res.result.account_token, { expires: res.result.expires});
                cookies.set('userinfo', res.result, { expires: res.result.expires});
                props.setLoginStatus(true)
                Router.back()
            } catch(err) {
                message.error(err)
            }
        } else {
            try {
                const res =  await _Request('/auth/login', 'POST', {
                    account: values.account,
                    password: values.password
                });
                cookies.set('account_token', res.result.account_token, { expires: res.result.expires});
                cookies.set('userinfo', res.result, { expires: res.result.expires});
                props.setLoginStatus(true)
                message.success('登录成功!')
                Router.back()
            } catch(err) {
                message.error(err)
            }
        }
        
    };

    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const beforeUpload = async (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file)
        const res = await _Request('/user/upload', 'POST', formData ,{}, {
          'Content-Type': 'multipart/form-data'
        })
        setLoading(false);
        setAvatarUrl(res.result);
    }

    return (
      <div className="login-container">
         <div className="login-form-container">
            <div className="lf-form">
                <Form
                    layout={'vertical'}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    >
                        {isRegister && <Form.Item
                            label="头像"
                            name="avatar"
                            rules={[{ required: true, message: '请上传头像' }]}
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                            >
                                {AvatarUrl ? <img src={AvatarUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>}

                        {isRegister && <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input />
                        </Form.Item>}

                        {isRegister && <Form.Item
                            label="邮箱"
                            name="email"
                            rules={[{ required: true, message: '请输入邮箱!' }]}
                        >
                            <Input />
                        </Form.Item>}

                        {!isRegister && <Form.Item
                            label="用户名/邮箱"
                            name="account"
                            rules={[{ required: true, message: '请输入用户名/邮箱!' }]}
                        >
                            <Input />
                        </Form.Item>}

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>记住密码</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type='primary' htmlType="submit">
                              { isRegister ? '注册' : '登录' }
                            </Button>
                            <Button type="link" onClick={() => setIsRegister(!isRegister)}>
                              { isRegister ? '登录' : '注册' }
                            </Button>
                        </Form.Item>
                    </Form>
            </div>
            <div className="advertising-area">
                <img src="https://wipi.oss-cn-shanghai.aliyuncs.com/2020-03-08/OXBA3L3HG6GJTIOTX8I7AH/LinuxUNIX-Certification-Training-Bundle.jpg" />
            </div>
         </div>
      </div>
    )
}

LoginPage.getInitialProps = async (ctx) => {
    
    try {
       await _Request('/user/getTestCode', 'GET');
    } catch(err) {
        return {
            CodeImg: err
        }
    }
    
}

export default withRouter(LoginPage)