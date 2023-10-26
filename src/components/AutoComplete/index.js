import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { Avatar, Space } from 'antd';
import debounce from '../../utils/debounce';
import { DOMAIN_URL } from '../../config';
import { searchReviewers } from '../../api/reviewer';

export default ({ onAutoCompleteSelect }) => {
  const [defaultValue, setDefaultValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = async (value) => {
    if (value && value.trim().length < 3) {
      return;
    }

    try {
      setLoading(true);
      const data = await searchReviewers(value);

      const result = [];
      data.forEach(item => {
        result.push({
          item,
          value: `${item.name} - ${item.title} - ${item.company}`,
          label: (
            <div
              key={item._id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <Avatar style={{ marginRight: 5 }} shape="circle" size={38} src={item.image} />
                  </div>
                  <div>
                    <strong>{item.name}</strong>
                    <br />
                    {item.title}
                  </div>
                </div>
              </span>
              <span>{item.company}</span>
            </div>
          ),
        });
      });

      setOptions(result);
    } catch(err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearchDebounce = debounce(handleSearch, 300);

  const onSelect = (value) => {
    onAutoCompleteSelect(options.filter(option => `${option.item.name} - ${option.item.title} - ${option.item.company}` === value)[0].item);
    setOptions([]);
    setDefaultValue('');
  };

  return (
    <AutoComplete
      style={{
        width: '100%'
      }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearchDebounce}
      size="large"
    >
      <Input.Search size="large" loading={loading} placeholder="Search Manager" />
    </AutoComplete>
  );
};
