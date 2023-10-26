import React from 'react';
import {
  Typography,
  Col,
  Row,
  Card,
  Avatar,
  Space,
  Divider,
  Progress,
} from 'antd';
import Table from '../../components/Table';
import Rating from '../../components/Rating';

const { Title, Text, Paragraph } = Typography;

export default ({ reviews }) => {
  const total = reviews.length;
  let totalRating = 0;
  let total5 = 0;
  let total4 = 0;
  let total3 = 0;
  let total2 = 0;
  let total1 = 0;

  reviews.forEach(review => {
    const rating = parseInt(review.rating, 10);
    if (rating === 5) { total5 = total5 + 1; }
    if (rating === 4) { total4 = total4 + 1; }
    if (rating === 3) { total3 = total3 + 1; }
    if (rating === 2) { total2 = total2 + 1; }
    if (rating === 1) { total1 = total1 + 1; }
    totalRating = totalRating + rating;
  });

  return (reviews && reviews.length > 0) ? (
    <Row style={{ marginTop: 20 }} align="middle" justify="center" gutter={2}>
      <Card
        title={<Title style={{ fontWeight: 900 }} level={4}>Reviews</Title>}
        style={{ width: '100%', padding: 20 }}
      >
        <Row align="middle" justify="start" style={{ padding: '60px 0' }}>
          <Col xs={24} sm={12}>
            <Space direction="vertical" size="large">
              <Text style={{ fontWeight: 900 }}>
                Overall Rating
              </Text>
              <Rating disabled defaultSize={30} defaultValue={totalRating/total} />
              <Text>
                {reviews.length} reviews
              </Text>
            </Space>
          </Col>
          <Col xs={24} sm={12}>
            <Row align="middle" justify="start">
              5 stars - {total5} reviews <Progress size={['100%', 15]} percent={(total5 * 100)/total} showInfo={false} strokeColor="green" />
            </Row>
            <Row align="middle" justify="start">
              4 stars - {total4} reviews <Progress size={['100%', 15]} percent={(total4 * 100)/total} showInfo={false} strokeColor="orange" />
            </Row>
            <Row align="middle" justify="start">
              3 stars - {total3} reviews <Progress size={['100%', 15]} percent={(total3 * 100)/total} showInfo={false} strokeColor="orange" />
            </Row>
            <Row align="middle" justify="start">
              2 stars - {total2} reviews <Progress size={['100%', 15]} percent={(total2 * 100)/total} showInfo={false} strokeColor="yellow" />
            </Row>
            <Row align="middle" justify="start">
              1 stars - {total1} reviews <Progress size={['100%', 15]} percent={(total1 * 100)/total} showInfo={false} strokeColor="red" />
            </Row>
          </Col>
        </Row>
        <Divider />
        <Table data={reviews} />
      </Card>
    </Row>
  ) : null;
};
