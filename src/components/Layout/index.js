import React from 'react';
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary'
import { Layout, Typography, Button, Space } from 'antd';
import { RetweetOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useAuth0 } from "@auth0/auth0-react";

import ErrorHandler from '../ErrorHandler';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

export default ({ title }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <Layout>
        <Header
          style={{
            minWidth: 0,
            width: '100%',
            background: '#fff',
            borderBottom: '1px #ccc solid',
            padding: '0 20px',
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
            <div>
            <Title style={{ fontWeight: 900, marginTop: '10px' }} level={2}>
              <RetweetOutlined style={{ fontWeight: 900, fontSize: 45, marginRight: 10 }} />
              Underdogs.fyi
            </Title>
            </div>
            <div style={{ position: 'absolute', right: '20px' }}>
              {(!isAuthenticated && !isLoading) && <LoginButton />}
              {(isAuthenticated && !isLoading) && <LogoutButton />}
            </div>
          </div>
        </Header>
        <Content
          style={{
            padding: '60px 40px',
            minHeight: '800px',
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            background: '#fff',
            bottom: 0,
          }}
        >
          Underdogs.fyi ©2023 Created by RM2
        </Footer>
        </Layout>
    </ErrorBoundary>
  )
};
