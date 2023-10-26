import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';
import {
  Button,
  Typography,
  Col,
  Row,
  Card,
  Input,
  Avatar,
  Space,
  notification,
  Alert,
} from 'antd';

import { DOMAIN_URL } from '../../config';

import { getCompanyByName } from '../../api/company';
import { getReviewerHistory } from '../../api/history';
import { getManagerReviews, createReview } from '../../api/review';
import { createPending } from '../../api/pending';
import { getReviewerById, searchReviewers } from '../../api/reviewer';

import AutoComplete from '../../components/AutoComplete';
import Rating from '../../components/Rating';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import ReviewerSection from './ReviewerSection';
import CompanySection from './CompanySection';
import ReviewSection from './ReviewSection';
import HistorySection from './HistorySection';
import SubmitReview from './SubmitReview';

import debounce from '../../utils/debounce';
import styles from './style.module.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export default function Home({ user }) {
  const navigate = useNavigate();
  const { reviewerId } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const [reviewer, setReviewer] = useState(null);
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [history, setHistory] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    if (reviewerId) {
      try {
        getReviewerById(reviewerId).then((reviewer) => {
          if (reviewer) {
            onAutoCompleteSelect(reviewer);
          }
        });
      } catch(err) {
        console.error(err);
      }
    }
  }, [])

  const openNotification = (description) => {
    const key = `open${Date.now()}`;

    api.open({
      message: <strong>Review Submission Status</strong>,
      description,
      key,
    });
  };

  const onAutoCompleteSelect = async (reviewer) => {
    navigate(`/${reviewer._id}`);

    setReviewer(reviewer);
    const company = await getCompany(reviewer);
    await getReviews(company, reviewer);
    await getHistory(reviewer);
  };

  const getCompany = async (reviewer) => {
    const company = await getCompanyByName(reviewer.company);
    setCompany(company);
    return company;
  };

  const getHistory = async (reviewer) => {
    try {
      const data = await getReviewerHistory(reviewer._id)
      if (!data.companyHistory || (data.companyHistory && data.companyHistory.length === 0)) {
        data.companyHistory = [
          {
            name: reviewer.company,
          }
        ];
      }
      if (!data.workHistory || (data.workHistory && data.workHistory.length === 0)) {
        data.workHistory = [
          {
            name: reviewer.title,
            isCurrent: true,
          }
        ];
      }

      for(let i = 0; i < data.companyHistory.length; i++) {
        try {
          const companyData = await getCompanyByName(data.companyHistory[i].name);
          data.companyHistory[i].logo = companyData.logo || null;
        } catch(err) {
          console.error(err);
        }
      }

      setHistory(data);
    } catch(err) {
      console.error(err);
    }
  };

  const getReviews = async (company, reviewer) => {
    try {
      const data = await getManagerReviews(company._id, reviewer._id);
      setReviews(data);
    } catch(err) {
      console.error(err);
    }
  };

  const onRatingChange = (rating) => {
    setRating(rating);
  };

  const onCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleCommentChange = debounce(onCommentChange, 300);

  const submitReview = async() => {
    try {
      const resp = await createReview({
        company: company._id,
        manager: reviewer._id,
        rating: rating,
        description: comment,
      });

      openNotification(<Alert message="Success!" type="success" />);
      await getReviews(company, reviewer);
    } catch(err) {
      console.error(err);
      openNotification(<Alert message={err.message} type="error" />);
    }
  };

  const handlePendingSuccess = async(values) => {
    try {
      const data = {
        company_name: values.companyName,
        company_website: values.companyWebsite,
        manager_name: values.managerName,
        manager_title: values.managerTitle,
        rating: values.reviewRating || 0,
        description: values.reviewDetails,
      };

      console.log(data);


      const resp = await createPending(data);

      openNotification(<Alert message="Success! Please check back within 24 hours." type="success" />);
    } catch(err) {
      console.error(err);
      openNotification(<Alert message={err.message} type="error" />);
    }
  };

  return <>
    <Row style={{ maxWidth: '1200px', margin: 'auto' }}>
      <Col span={24} >
        {contextHolder}

        <Row>
          <Col span={24}>
            <Row align="middle" justify="center" gutter={2}>
              <Title style={{ fontWeight: 900 }} level={1}>
                Review your Manager or Supervisor
              </Title>
            </Row>
            <Row align="middle" justify="center" gutter={2}>
              <Title style={{ marginTop: 0, fontWeight: 100 }} level={4}>
                The most common way people give up their power is by thinking they don’t have any!
              </Title>
            </Row>
            <Row style={{ marginTop: 60 }}>
              <Col span={24} align="middle">
                <AutoComplete onAutoCompleteSelect={onAutoCompleteSelect} />
              </Col>
            </Row>
            <Row style={{ marginBottom: 60 }} align="middle" justify="center" gutter={2}>
              {user && <Modal handleSuccess={handlePendingSuccess} />}
            </Row>
          </Col>
        </Row>
      

        <Row align="middle" justify="space-between">
          <Col xs={24} sm={5}>
            {history && <HistorySection history={history} />}
          </Col>
          <Col xs={24} sm={18}>
            {company && <CompanySection company={company} />}
            {reviewer && <ReviewerSection reviewer={reviewer} />}
          </Col>
        </Row>

        {(company && reviewer) &&
          <SubmitReview
            user={user}
            onRatingChange={onRatingChange}
            submitReview={submitReview}
            handleCommentChange={handleCommentChange}
          />
        }

        {reviews && <ReviewSection reviews={reviews.map(review => ({ ...review, id: review._id, key: review._id }))} />}
      </Col>
    </Row>
  </>;
}
