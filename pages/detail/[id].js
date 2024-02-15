import Head from 'next/head';
import Navbar from '../../components/navbar/Navbar';
import styles from './Detail.module.scss';
import { fetcher } from '../../lib/api';
import Image from 'next/image';
import { NumberInput } from '@mantine/core';
import { Bed } from 'tabler-icons-react';
import { Button } from '../../components/buttons/Button';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import moment from 'moment';

const Hotel = ({ hotel, reviews }) => {
  const peopleFromHomePage = Cookies.get('people');
  const [People, setPeople] = useState(parseFloat(peopleFromHomePage) || '0');
  const [date, setDate] = useState('');
  Cookies.set('people', People);
  Cookies.set('HotelName', hotel.attributes.title);

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
      <div className={styles.containerBlue}>
        <div className={styles.main}>
          <div className={styles.mainInfo}>
            <h1>
              {hotel.attributes.title}, {hotel.attributes.city}
            </h1>
            <h2>Details</h2>
            <h2>{hotel.attributes.prize}$</h2>
            <h3>{hotel.attributes.country}</h3>
          </div>
          <div className={styles.mainImage}>
            <Image
              src={hotel.attributes.img}
              alt={hotel.attributes.name}
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.mainDesc}>
          <div className={styles.mainInfo}>
            <h2>About the hotel</h2>
            <p className={styles.desc}>{hotel.attributes.description}</p>
            <h2>Stuff you can do</h2>
            <p className={styles.desc}>{hotel.attributes.description}</p>
            <h2>Food and drinks</h2>
            <p className={styles.desc}>{hotel.attributes.description}</p>
          </div>
          <div className={styles.mainImage}>
            <div className={styles.infoBox}>
              <h2>Quick Facts</h2>
              <strong>Beach: </strong>
              <strong>Restaurant: </strong>
              <strong>Wifi: </strong>
            </div>
          </div>
        </div>
        <div className={styles.booking}>
          <div className={styles.bookingBorder}>
            <div className={styles.bookingLine}>
              <h3>Double Room</h3>
              <p className={styles.dates}>
                Date: {''}
                {moment(date[0]).utc().format('LL')} -{' '}
                {moment(date[1]).utc().format('LL')}
              </p>
              <NumberInput
                value={People}
                onChange={setPeople}
                className={styles.input}
                placeholder="Max 5"
                label="People"
                max={5}
                min={0}
              />
            </div>
            <div className={styles.room}>
              <Bed size={16} />
              {''}
              <p className={styles.roomBed}>1 Double bed</p>
            </div>
            <div className={styles.bookingLine}>
              <div>
                <p className={styles.bookingDesc}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque et dui quis lacus pulvinar suscipit vitae vitae est.
                  Suspendisse vestibulum ut nunc in sagittis.{' '}
                </p>
              </div>
              <div>
                <p className={styles.price}>
                  {hotel.attributes.prize}$ / per night
                </p>
                <Button href={'/enquiry'}>Book</Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reviews}>
          <h2>Reviews</h2>
          {reviews.map((review) => {
            return (
              <div key={review.id} className={styles.review}>
                <strong key={review.id}>{review.attributes.name}</strong>
                <p>{review.attributes.review}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hotel;

export async function getServerSideProps({ params }) {
  const { id } = params;
  const hotelResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/hotels/${id}?populate=*`
  );

  return {
    props: {
      hotel: hotelResponse.data,
      reviews: hotelResponse.data.attributes.reviews.data,
    },
  };
}
