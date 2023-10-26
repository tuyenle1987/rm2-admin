import React, { useState, useEffect } from 'react';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Rate } from 'antd';

export default ({
  disabled = false,
  onRatingChange,
  defaultValue = 1,
  defaultSize = 38,
}) => {
  const [color, setColor] = useState('green');

  const customIcons = {
    1: <FrownOutlined style={{ fontSize: defaultSize }} />,
    2: <FrownOutlined style={{ fontSize: defaultSize }} />,
    3: <MehOutlined style={{ fontSize: defaultSize }} />,
    4: <SmileOutlined style={{ fontSize: defaultSize }} />,
    5: <SmileOutlined style={{ fontSize: defaultSize }} />,
  };

  const loadColor = (value) => {
    if (value === 1) {
      setColor('red');
    }
    if (value === 2) {
      setColor('yellow');
    }
    if (value === 3 || value === 4) {
      setColor('orange');
    }
    if (value === 5) {
      setColor('green');
    }
  }

  const onChange = (rating) => {
    loadColor(rating);
    onRatingChange(rating);
  }

  useEffect(() => {
    loadColor(defaultValue);
  }, [])


  return (
    <>
      <Rate
        style={{ color }}
        disabled={disabled}
        onChange={onChange}
        defaultValue={defaultValue}
        // character={({ index }) => customIcons[index + 1]}
      />
    </>
  );
};

