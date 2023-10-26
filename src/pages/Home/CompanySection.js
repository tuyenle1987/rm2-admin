import React from 'react';
import {
  Typography,
  Col,
  Row,
  Card,
  Avatar,
  Space,
} from 'antd';
import {
  LinkedinOutlined,
  HomeOutlined,
  TwitterOutlined,
  MailOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  BankOutlined,
  DingdingOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default ({ company }) => {
  return company ? (
    <Row align="middle" justify="center">
      <Card style={{ width: '100%', padding: 20 }}>
        <Row align="middle" justify="start">
          <Col xs={24} sm={3}>
            <Avatar style={{ border: '1px solid #ccc' }} shape="circle" size={84} src={company.logo} />
          </Col>
          <Col xs={24} sm={6}>
            <Title style={{ fontWeight: 900 }} level={4}>
              {company.name}
            </Title>
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }} align="middle" justify="start">
          <Paragraph>
            {company.description}
          </Paragraph>
        </Row>
        <Row style={{ marginTop: 20 }} justify="space-between">
          <Col style={{ marginTop: 20 }} xs={24} sm={5}>
            <div>
              <BankOutlined />
              <Text style={{ marginLeft: 5, fontWeight: 900 }}>
                Industries
              </Text>
            </div>
            <div style={{ marginTop: 10 }}>
              <Text>
                {(company.industry|| '').split(','). join(' - ')}
              </Text>
            </div>
          </Col>
          <Col style={{ marginTop: 20 }} xs={24} sm={5}>
            <div>
              <EnvironmentOutlined />
              <Text style={{ marginLeft: 5, fontWeight: 900 }}>
                Headquarters
              </Text>
            </div>
            <div style={{ marginTop: 10 }}>
              <Text>
                {(company.headquarter || '').split(','). join(' - ')}
              </Text>
            </div>
          </Col>
          <Col style={{ marginTop: 20 }} xs={24} sm={5}>
            <div>
              <TeamOutlined />
              <Text style={{ marginLeft: 5, fontWeight: 900 }}>
                Employees
              </Text>
            </div>
            <div style={{ marginTop: 10 }}>
              {company.size}
            </div>
          </Col>
          <Col style={{ marginTop: 20 }} xs={24} sm={5}>
            <div>
              <DingdingOutlined />
              <Text style={{ marginLeft: 5, fontWeight: 900 }}>
                Links
              </Text>
            </div>
            <div style={{ marginTop: 10 }}>
              {company.website && <a href={company.website}>
                <HomeOutlined style={{ fontSize: '20px', marginRight: 10 }} />
              </a>}
              {company.linkedin && <a href={company.linkedin}>
                <LinkedinOutlined style={{ fontSize: '20px', marginRight: 10 }} />
              </a>}
              {company.twitter && <a href={company.twitter}>
                <TwitterOutlined style={{ fontSize: '20px' }} />
              </a>}
            </div>
          </Col>
        </Row>
      </Card>
    </Row>
  ) : null;
};




    