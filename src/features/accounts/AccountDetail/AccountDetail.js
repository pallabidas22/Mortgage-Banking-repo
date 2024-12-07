import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Card, 
    Spin, 
    Alert, 
    Typography, 
    Button, 
    Descriptions, 
    Statistic, 
    Space 
} from 'antd';
import { 
    ArrowLeftOutlined, 
    BankOutlined, 
    HomeOutlined 
} from '@ant-design/icons';
import axios from 'axios';
import './AccountDetail.css';

const { Title } = Typography;

const AccountDetail = () => {
    const { accountNumber } = useParams();
    const navigate = useNavigate();
    const [accountResponse, setAccountResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5001/accounts`)
            .then(response => {
                setAccountResponse(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        console.log("=====", accountResponse);
    }, [accountResponse]);

    const account = accountResponse?.data?.filter(account => account.accountNumber === accountNumber)[0];

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

    if (loading) return <Spin size="large" className="center-spinner" />;
    if (error) return <Alert message="Error" description={error} type="error" showIcon />;

    return (
        <div className="account-detail-container">
            <Button 
                type="link" 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate('/accounts')}
                className="back-button"
            >
                Back to Accounts
            </Button>

            <Card className="account-detail-card">
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div className="account-header">
                        <div className="account-title">
                            {getAccountIcon(account?.accountType)}
                            <Title level={2}>{account?.accountType} Account</Title>
                        </div>
                        <Statistic
                            title="Current Balance"
                            value={account?.balance}
                            precision={2}
                            prefix="$"
                            className="balance-statistic"
                        />
                    </div>

                    <Descriptions
                        bordered
                        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                    >
                        <Descriptions.Item label="Account Number">
                            {account?.accountNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Account Type">
                            {account?.accountType}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status">
                            {account?.status}
                        </Descriptions.Item>
                        <Descriptions.Item label="last Transaction Date">
                            {new Date(account?.lastTransactionDate).toLocaleDateString()}
                        </Descriptions.Item>
                    </Descriptions>

                    <div>
                        <Button type="primary">Make a Transaction</Button>
                        <Button>Transaction History</Button>
                    </div>
                </Space>
            </Card>
        </div>
    );
};

export default AccountDetail;