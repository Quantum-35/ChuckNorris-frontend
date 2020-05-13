import React, { useState } from 'react';
import { message, Input, Form, Button, Spin } from 'antd';
import { Mutation } from 'react-apollo';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '@ant-design/compatible/assets/index.css';

import { LOGIN } from '../../graphql/mutation';
import { CATEGORIES } from '../../graphql/query';
import './style.css';

const Login = props => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleInputChange = e => {
        const { name, value } = e.target;
        switch(name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value)
                break;
            default:
                // nothing
        }
    };

    const loginUserErrors = errors => {
         message.error(errors.message.split(':')[2], 6)
    }

    const loginSuccessful = (cache, { data }) => {
        console.log('--> LOGIN USER COMPLETE', data);
        message.success('Logged in successfully');
        localStorage.setItem('token', data.signIn.token);
        setTimeout(() => {
            props.history.push('/');
        }, 2000)
    }

    const loginVariables = {
        data: {
            email,
            password
          }
    }

    return(
        <Mutation
            mutation={LOGIN}
            variables={loginVariables}
            onError={error => loginUserErrors(error)}
            update={loginSuccessful}
            refetchQueries={[{query: CATEGORIES}]}
        >
            {(createUser, {error, loading}) => {
                return (
                <div className="form_container">
                    <Form
                        name="normal_signup"
                        className="normal_signup"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={async e => {
                            await createUser();
                        }}
                        >
                        <Form.Item
                            name="email"
                            rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Please input your Email!',
                            },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                                name="email"
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                    
                        <Form.Item>
                            <div className="form-footer">
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    {loading ? <LoadingOutlined style={{ fontSize: 24 }} spin /> : 'LOGIN'}
                                </Button>
                                    <span>
                                        Or <Link to="/register">Register now!</Link>
                                    </span>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            )}
            }
        </Mutation>
    );
}

export default Login;
