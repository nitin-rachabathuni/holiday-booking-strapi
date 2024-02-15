import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Dashboard.module.scss';
import Head from 'next/head';
import Navbar from '../../components/navbar/Navbar';
import Cookies from 'js-cookie';
import { fetcher } from '../../lib/api';
import Table from '../../components/table/hotels/Table';
import { Button } from '../../components/buttons/Button';
import Enquiry from '../../components/table/enquiry/Enquiry';
import Message from '../../components/table/message/Message';

const Dashboard = ({ hotels, enquiry, messages }) => {
  const [isLogged, setIsLogged] = useState();
  useEffect(() => {
    setIsLogged(Cookies.get('jwt'));
  }, []);

  console.log(messages);
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
              👋🏼 &nbsp;Welcome back, <b>{Cookies.get('username')}</b>!
              <br />
              See messages, enquiries and edit hotels.
            </p>
            <h2>Messages</h2>
            <Message messages={messages} />
            <h2>Enqueries</h2>
            <Enquiry enquiry={enquiry} />
            <h2>Add or edit hotels</h2>
            <Table hotels={hotels} />
            <div className={styles.buttonContainer}>
              <Button href="/dashboard/addHotel">Add new hotel</Button>
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
export default Dashboard;

export async function getServerSideProps() {
  const hotelResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/hotels`
  );
  const enquiryResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/enquiries`
  );
  const messageResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/messages`
  );

  return {
    props: {
      hotels: hotelResponse,
      enquiry: enquiryResponse,
      messages: messageResponse,
    },
  };
}
