import React, { useState, useEffect } from 'react';
import { Card, Select, Spin, Alert, Typography, Row, Col, Statistic } from 'antd';
import { BankOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AccountList.css';

const { Title } = Typography;
const { Option } = Select;

const AccountList = () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accountTypeFilter, setAccountTypeFilter] = useState('all');

    useEffect(() => {
        axios.get('http://localhost:5001/accounts')
            .then((response) => {
                setAccounts(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.error);
                setLoading(false);
            });
    }, []);

    const getAccountIcon = (accountType) => {
        switch (accountType) {
            case 'Savings':
                return <BankOutlined />;
            case 'Mortgage':
                return <HomeOutlined />;
            default:
                return <BankOutlined />;
        }
    };

    const filteredAccounts = accounts?.filter(account => 
        accountTypeFilter === 'all' || account.type === accountTypeFilter
    );

    if (loading) return <Spin size="large" className="center-spinner" />;
    if (error) return <Alert message="Error" description={error} type="error" showIcon />;

    return (
        <div className="account-list-container">
            <div className="account-list-header">
                <Title level={2}>My Accounts</Title>
                <div className="account-filter">
                    <Select
                        defaultValue="all"
                        style={{ width: 200 }}
                        onChange={setAccountTypeFilter}
                        value={accountTypeFilter}
                >
                    <Option value="all">All</Option>
                    <Option value="Savings">Savings</Option>
                        <Option value="Mortgage">Mortgage</Option>
                    </Select>
                </div>
            </div>

            <Row gutter={[16, 16]}>
                {filteredAccounts?.map((account) => (
                    <Col xs={24} sm={12} md={8} key={account.accountNumber}>
                        <Card
                            hoverable
                            className="account-card"
                            onClick={() => navigate(`/accounts/${account.accountNumber}`)}
                        >
                            <div className="account-card-header">
                                <span className='account-icon'>{getAccountIcon(account.type)}</span>
                                <span className="account-number">{account.accountNumber}</span>
                            </div>
                            <Statistic
                                title="Balance"
                                value={account.balance}
                                precision={2}
                                prefix="$"
                            />
                            <div className="account-type">
                                {account.type}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AccountList;