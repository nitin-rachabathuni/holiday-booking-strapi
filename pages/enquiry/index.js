import Head from 'next/head';
import Navbar from '../../components/navbar/Navbar';
import Cookies from 'js-cookie';
import styles from './Enquiry.module.scss';
import { useState, useEffect } from 'react';
import moment from 'moment';
import Router from 'next/router';
import Alert from '../../components/alert/Alert';

const Enquiry = () => {
  const [people, setPeople] = useState('');
  const [date, setDate] = useState('');

  // Form Info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const hotel = Cookies.get('HotelName');

  useEffect(() => {
    setPeople(Cookies.get('people'));
    // Restoring dates from Local Storage to get it back as an array
    const getDates = localStorage.getItem('date');
    const DatesArray = JSON.parse(getDates);
    setDate(DatesArray);
  }, []);

  async function SendEnquiry() {
    const hotelInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      checkIn: `${moment(date[0]).utc().format('LL')}`,
      checkOut: `${moment(date[1]).utc().format('LL')}`,
      hotelName: hotel,
    };

    try {
      const add = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/enquiries`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ data: hotelInfo }),
        }
      );
      Router.push('/success');
      const getResponse = await add.json();
      console.log(getResponse);
    } catch (error) {
      Alert(`Something went wrong: ${error}`);
    }
  }

  return (
    <div>
      <Head>
        <title>Holidaze</title>
        <meta name="description" content="Holidaze - Enjoy your vacation!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.information}>
          <h1>Complete your order</h1>
          <h2>Hotel</h2>
          <p>{hotel}</p>
          <h2>People</h2>
          <p>{people} people</p>
          <h2>Check in:</h2>
          <p className={styles.dates}>{moment(date[0]).utc().format('LL')}</p>
          <h2>Check out:</h2>
          <p className={styles.dates}>{moment(date[1]).utc().format('LL')}</p>
          <h2>Room type</h2>
          <p className={styles.dates}>Double Room</p>
        </div>
        <div>
          <p className={styles.welcome}>
            Register your order
            <br />
          </p>
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <input
                className={styles.formInput}
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                placeholder="First Name"
              />
              <br />
              <input
                className={styles.formInput}
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                placeholder="Last Name"
              />
              <br />
              <input
                className={styles.formInput}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
              />

              <br />
              <button
                className={styles.formButton}
                type="button"
                onClick={SendEnquiry}
              >
                Book hotel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
