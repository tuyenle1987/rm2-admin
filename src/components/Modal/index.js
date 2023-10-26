import React, { useState } from 'react';
import { Button, Modal, Form, Input, Typography } from 'antd';
import Rating from '../../components/Rating';

const { TextArea } = Input;
const { Link } = Typography;

export default ({ handleSuccess }) => {
  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onRatingChange = (rating) => {
    setRating(rating);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    handleSuccess(values);
    handleOk();
  };

  const onFinishFailed = (errorInfo) => {
    console.error(errorInfo);
  };

  return (
    <>
      <Link onClick={showModal}>
        Could not find the manager ? Submit a subjected to approval review.
      </Link>
      <Modal
        title="Submit Review (Subject to Approval)"
        width={600}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (<></>)}
      >
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          style={{ padding: '40px 0' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[
              {
                required: true,
                message: 'Please input company name!',
              },
            ]}
          >
            <Input placeholder="Company Name" />
          </Form.Item>
          <Form.Item
            label="Company Website"
            name="companyWebsite"
          >
            <Input placeholder="Company Website" />
          </Form.Item>
         <Form.Item
            label="Manager Name"
            name="managerName"
            rules={[
              {
                required: true,
                message: 'Please input manager name!',
              },
            ]}
          >
            <Input placeholder="Manager Name" />
          </Form.Item>
          <Form.Item
            label="Manager Titlte"
            name="managerTitle"
            rules={[
              {
                required: true,
                message: 'Please input manager title!',
              },
            ]}
          >
            <Input placeholder="Manager Title" />
          </Form.Item>
          <Form.Item
            label="Review Rating"
            name="reviewRating"
          >
            <Rating onRatingChange={onRatingChange} />
          </Form.Item>

          <Form.Item
            label="Review Details"
            name="reviewDetails"
          >
            <TextArea rows={10} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
