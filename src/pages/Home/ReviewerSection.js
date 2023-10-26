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
  TeamOutlined,
  DingdingOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default ({ reviewer }) => {
  return reviewer ? (
    <Row style={{ marginTop: 20 }} align="middle" justify="center">
      <Card style={{ width: '100%', padding: 20 }}>
        <Row align="middle" justify="start">
          <Col xs={24} sm={3}>
            <Avatar shape="circle" size={84} src={reviewer.image} />
          </Col>
          <Col xs={24} sm={6}>
            <Title style={{ fontWeight: 900 }} level={4}>
              {reviewer.name}
            </Title>
          </Col>
        </Row>

        <Row style={{ marginTop: 20 }} align="middle" justify="start">
          <Paragraph>
            {reviewer.description}
          </Paragraph>
        </Row>

        <Row style={{ marginTop: 20 }} justify="space-between">
          <Col style={{ marginTop: 20 }} xs={24} sm={12}>
            <div>
              <TeamOutlined />
              <Text style={{ marginLeft: 5, fontWeight: 900 }}>
                Job Title
              </Text>
            </div>
            <div style={{ marginTop: 10 }}>
              <Text>
                {reviewer.title}
              </Text>
            </div>
          </Col>
          <Col style={{ marginTop: 20 }} xs={24} sm={12}>
            <div>
              <DingdingOutlined />
              <Text style={{ marginLeft: 5, fontWeight: 900 }}>
                Links
              </Text>
            </div>
            <div style={{ marginTop: 10 }}>
              {reviewer.linkedin && <a href={reviewer.linkedin}>
                <LinkedinOutlined style={{ fontSize: '20px', marginRight: 10 }} />
              </a>}
              {reviewer.email && <a href={reviewer.email}>
                <MailOutlined style={{ fontSize: '20px' }} />
              </a>}
            </div>
          </Col>
        </Row>
      </Card>
    </Row>
  ) : null;
};

