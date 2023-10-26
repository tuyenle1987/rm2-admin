import React from 'react';
import moment from 'moment';
import { Space, Table, Tag } from 'antd';

import Rating from '../Rating';

const columns = [
  {
    title: 'Comment',
    dataIndex: 'description',
    key: 'description',
    render: (description, data) => {
      console.log(data);
      const { rating, createdOn } = data;
      return <div style={{ padding: '20px 0' }}>
        <Space size="large">
          <Rating disabled defaultSize={30} defaultValue={rating} />
          <span><strong>{moment(createdOn).format('lll')}</strong></span>
        </Space>
        <div style={{ marginTop: 20 }}>{description}</div>
      </div>;
    },
  },
];

export default ({ data }) => {
  return <Table
    columns={columns}
    dataSource={data}
    pagination={{ pageSize: 10 }}
    showHeader={false}
  />;
};
