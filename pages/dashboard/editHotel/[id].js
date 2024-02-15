import Head from 'next/head';
import Navbar from '../../../components/navbar/Navbar';
import Link from 'next/link';
import styles from './Edithotel.module.scss';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetcher } from '../../../lib/api';
import Alert from '../../../components/alert/Alert';

const EditHotel = ({ hotel }) => {
  // Check if user is logged in
  const [isLogged, setIsLogged] = useState();
  useEffect(() => {
    setIsLogged(Cookies.get('jwt'));
  }, []);

  // Edit states for inputs on a updated hotel
  const [hotelName, sethotelName] = useState(hotel.attributes.title);
  const [hotelDesc, sethotelDesc] = useState(hotel.attributes.description);
  const [hotelFullDesc, sethotelFullDesc] = useState(
    hotel.attributes.full_desc
  );
  const [hotelPrice, sethotelPrice] = useState(hotel.attributes.prize);
  const [hotelCountry, sethotelCountry] = useState(hotel.attributes.country);
  const [hotelCity, sethotelCity] = useState(hotel.attributes.city);
  const [hotelImg, sethotelImg] = useState(hotel.attributes.img);

  // Sending info to Strapi
  async function NewHotel() {
    const jwt = Cookies.get('jwt');

    const hotelInfo = {
      title: hotelName,
      description: hotelDesc,
      full_desc: hotelFullDesc,
      prize: hotelPrice,
      country: hotelCountry,
      city: hotelCity,
      img: hotelImg,
    };

    try {
      const add = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/hotels/${hotel.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${jwt}`,
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ data: hotelInfo }),
        }
      );
      Alert('Success!', 'Changes to the hotel has been applied.');
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
        {isLogged ? (
          <>
            <p className={styles.welcome}>
              You are editing{' '}
              <Link href={`/detail/${hotel.id}`}>
                <a>
                  <u>{hotel.attributes.title}</u>
                </a>
              </Link>
              <br />
            </p>
            <div className={styles.formContainer}>
              <form className={styles.form}>
                <label className={styles.label}>Hotel name</label>
                <input
                  className={styles.formInput}
                  type="text"
                  onChange={(e) => sethotelName(e.target.value)}
                  value={hotelName}
                  placeholder={hotel.attributes.title}
                />
                <br />
                <label className={styles.label}>Hotel short description</label>
                <input
                  className={styles.formInput}
                  type="text"
                  onChange={(e) => sethotelDesc(e.target.value)}
                  value={hotelDesc}
                  placeholder={hotel.attributes.description}
                />
                <br />
                <label className={styles.label}>Hotel full description</label>
                <textarea
                  className={styles.formInput}
                  type="text"
                  onChange={(e) => sethotelFullDesc(e.target.value)}
                  value={hotelFullDesc}
                  placeholder={hotel.attributes.full_desc}
                />
                <br />
                <label className={styles.label}>Price</label>
                <input
                  className={styles.formInput}
                  type="number"
                  onChange={(e) => sethotelPrice(e.target.value)}
                  value={hotelPrice}
                  placeholder={`${hotel.attributes.prize} $`}
                />
                <br />
                <label className={styles.label}>Country</label>
                <input
                  className={styles.formInput}
                  type="text"
                  onChange={(e) => sethotelCountry(e.target.value)}
                  value={hotelCountry}
                  placeholder={hotel.attributes.country}
                />
                <br />
                <label className={styles.label}>City</label>
                <input
                  className={styles.formInput}
                  type="text"
                  onChange={(e) => sethotelCity(e.target.value)}
                  value={hotelCity}
                  placeholder={hotel.attributes.city}
                />
                <br />
                <label className={styles.label}>Image Url</label>
                <input
                  className={styles.formInput}
                  type="text"
                  onChange={(e) => sethotelImg(e.target.value)}
                  value={hotelImg}
                  placeholder={hotel.attributes.img}
                />
                <br />
                <button
                  className={styles.formButton}
                  type="button"
                  onClick={NewHotel}
                >
                  Edit hotel
                </button>
              </form>
              <div className="alert"></div>
            </div>
          </>
        ) : (
          <>
            <p>You dont have access here.</p>
            <p>
              You need to{' '}
              <span className={styles.orange}>
                <Link href={'/login'}>sign in</Link>
              </span>{' '}
              first.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default EditHotel;

export async function getServerSideProps({ params }) {
  const { id } = params;
  const hotelResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/hotels/${id}`
  );

  return {
    props: {
      hotel: hotelResponse.data,
    },
  };
}
