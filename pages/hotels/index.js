import Cards from '../../components/cards/Card';
import styles from './Hotels.module.scss';
import Head from 'next/head';
import Navbar from '../../components/navbar/Navbar';
import { fetcher } from '../../lib/api';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useQuery, useQueryClient } from 'react-query';
import Cookies from 'js-cookie';
import { NumberInput } from '@mantine/core';
import moment from 'moment';
import Router from 'next/router';

const getHotels = async (key) => {
  const countriesId = key.queryKey[1].country.map(
    (id) => `filters[countries]=${id}`
  );

  const countryQueryString = countriesId.join('&');

  if (countryQueryString) {
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/hotels?${countryQueryString}`
    );
    return res.data;
  }

  const res = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/hotels`);
  return res.data;
};

const Hotels = ({ hotels, countries }) => {
  const queryClient = useQueryClient();
  const [countryId, setCountryId] = useState([]);
  const [date, setDate] = useState('');
  const { data, status } = useQuery(
    ['hotels', { country: countryId }],
    getHotels
  );

  const searchList = hotels.map(({ attributes, id }) => {
    return {
      value: attributes.title,
      label: attributes.title,
      id: id,
    };
  });

  const peopleFromHomePage = Cookies.get('people');
  const [People, setPeople] = useState(parseFloat(peopleFromHomePage) || '0');
  Cookies.set('people', People);

  useEffect(() => {
    // Restoring dates from Local Storage to get it back as an array
    const getDates = localStorage.getItem('date');
    const DatesArray = JSON.parse(getDates);
    setDate(DatesArray);
  }, []);

  return (
    <div>
      <Head>
        <title>Holidaze</title>
        <meta name="description" content="Holidaze - Enjoy your vacation!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.filter}>
          <div>
            <label>Search hotel</label>
            <Select
              options={searchList}
              placeholder="Search by name"
              openMenuOnClick={false}
              getOptionValue={(option) => option.id}
              onChange={(selectedOption) => {
                Router.push(`/detail/${selectedOption.id}`);
              }}
            />
          </div>
          <div>
            <label>Select Country</label>
            <Select
              className={styles.selectCountry}
              getOptionLabel={(option) => `${option.attributes.country}`}
              getOptionValue={(option) => option.id}
              options={countries}
              instanceId="countries"
              isMulti
              placeholder="Filter By Country"
              onChange={(values) =>
                setCountryId(values.map((country) => country.id))
              }
            />
          </div>

          <div>
            <label>Select People</label>
            <NumberInput
              value={People}
              onChange={setPeople}
              className={styles.input}
              placeholder="Max 5"
              max={5}
              min={0}
            />
          </div>
          <div>
            <label>Selected Date</label>
            <p className={styles.date}>
              {moment(date[0]).utc().format('LL')} -{' '}
              {moment(date[1]).utc().format('LL')}
            </p>
          </div>
        </div>
        <h1>Hotels</h1>
        <div className={styles.cards}>
          {status === 'success' && <Cards data={data} />}
        </div>
      </div>
    </div>
  );
};

export default Hotels;

export async function getServerSideProps() {
  const hotelResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/hotels`
  );

  const categoryResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/countries`
  );
  return {
    props: {
      hotels: hotelResponse.data,
      countries: categoryResponse.data,
    },
  };
}
