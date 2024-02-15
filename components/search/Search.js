import styles from './Search.module.scss';
import { useState, useEffect } from 'react';
import { DateRangePicker } from '@mantine/dates';
import { Calendar, Search } from 'tabler-icons-react';
import { NumberInput } from '@mantine/core';
import Cookies from 'js-cookie';

const HotelSearch = ({ data }) => {
  const [value, setValue] = useState([Date | null][Date | null]);
  const [people, setPeople] = useState('');

  new Date(2022, 11, 1), new Date(2022, 11, 5);
  // Saving dates in LocalStorage to save it as an array
  useEffect(() => {
    localStorage.setItem('date', JSON.stringify(value));
    Cookies.set('people', people);
  }, [people, value]);

  return (
    <div className={styles.container}>
      <DateRangePicker
        label="Date"
        icon={<Calendar size={16} />}
        placeholder={value || 'To - From'}
        value={value}
        onChange={setValue}
      />
      <NumberInput
        label="People"
        placeholder="2 people"
        max={5}
        min={1}
        value={people}
        onChange={setPeople}
      />
    </div>
  );
};

export default HotelSearch;
