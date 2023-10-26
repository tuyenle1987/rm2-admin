import React from 'react';
import { ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Typography, Timeline } from 'antd';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;

export default ({ data }) => {
  const items = [];

  data.forEach(item => {
    items.push({
      dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
      children: <div>
        <div>
          <Text strong>
            {item.name}
            {item.isCurrent && <CheckCircleOutlined style={{ color: 'green', marginLeft: 5 }} />}
          </Text>
        </div>
        <div>
          <Text>
            {item.startDate ? moment(item.startDate).format('MMM YYYY') : null}
          </Text>
        </div>
      </div>,
    });
  });

  items.push({
    dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
    children: '......',
  });

  return (
    <Timeline
      items={items}
    />
  );
};

