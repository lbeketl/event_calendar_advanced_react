import { Button, Form, Input, Card } from "antd";
import React, { FC, useState } from "react";
import { rules } from "../utils/rules";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions} from '../hooks/useActions';


const LoginForm: FC = () => {
    const { error, isLoading } = useTypedSelector((state) => state.auth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useActions();

    const submit = () => {
       login(username, password);
    };

    return (
        <Card>
            <Form onFinish={submit}>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[rules.required("Please input your username")]}
                    
                >
                    <Input  value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[rules.required("Please input your password!")]}
                >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default LoginForm;
