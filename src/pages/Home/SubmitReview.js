import React from 'react';
import {
  Typography,
  Row,
  Card,
  Input,
  Button,
} from 'antd';
import Table from '../../components/Table';
import Rating from '../../components/Rating';
import { useAuth0 } from "@auth0/auth0-react";

const { Title, Text, Paragraph, Link } = Typography;
const { TextArea } = Input;

export default ({ user, submitReview, handleCommentChange, onRatingChange }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Row style={{ marginTop: 40 }} align="middle" justify="center" gutter={2}>
      <Card
        title={<Title style={{ fontWeight: 900 }} level={4}>Submit Review</Title>}
        style={{ width: '100%', padding: 20 }}
      >
        {user ? (<>
          <Row style={{ marginTop: 40 }} align="middle" justify="start" gutter={2}>
            <Text style={{ fontWeight: 900 }}>
              Rating
            </Text>
          </Row>
          <Row style={{ marginTop: 20 }} align="middle" justify="start" gutter={2}>
            <Rating onRatingChange={onRatingChange} />
          </Row>

          <Row style={{ marginTop: 40 }} align="middle" justify="start" gutter={2}>
            <Text style={{ fontWeight: 900 }}>
              Comment
            </Text>
          </Row>
          <Row style={{ marginTop: 20 }} align="middle" justify="start" gutter={2}>
            <TextArea onChange={handleCommentChange} rows={10} />
          </Row>
          <Row style={{ marginTop: 40 }} align="middle" justify="start" gutter={2}>
            <Button onClick={submitReview} type="primary">Submit</Button>
          </Row>
        </>) : <Row style={{ marginTop: 40 }} align="middle" justify="start" gutter={2}>
            <Link onClick={() => loginWithRedirect()}>
              Please login to submit review.
            </Link>
          </Row>}
      </Card>
    </Row>
  );
};
