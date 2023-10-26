import React from 'react';
import {
  Typography,
  Col,
  Row,
  Card,
  Avatar,
  Space,
} from 'antd';
import moment from 'moment';

import Timeline from '../../components/Timeline';

const { Title, Text, Paragraph } = Typography;

export default ({ history }) => {
  return history ? (
    <>
      <Card
        title={<Title style={{ fontWeight: 900 }} level={5}>Previous Company</Title>}
        style={{ width: '100%', padding: 20, minHeight: 250, }}
      >
        {(history?.companyHistory || []).map(company => (<div key={history._id + company.name} style={{ marginTop: 15 }}>
          <div>
            <Avatar style={{ border: '1px solid #ccc' }} shape="circle" size={40} src={company.logo} />
            <Text strong style={{ marginLeft: 8 }}>
              {company.name}
            </Text>
          </div>
          {(company.startDate && company.endDate) && <div>
            <Text>
              {company.startDate ? moment(company.startDate).format('MMM YYYY') : null} -
              {company.endDate ? moment(company.endDate).format('MMM YYYY') : null}
            </Text>
          </div>}
        </div>))}
      </Card>
      <Card
        title={<Title style={{ fontWeight: 900 }} level={5}>Timeline</Title>}
        style={{ width: '100%', marginTop: 10, padding: 20, minHeight: 500 }}
      >
        <div style={{ padding: '40px 0' }}>
          <Timeline data={history?.workHistory || []} />
        </div>
      </Card>
    </>
  ) : null;
};
