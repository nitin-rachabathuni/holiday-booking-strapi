import Head from 'next/head';
import { Button } from '../components/buttons/Button';
import Cards from '../components/cards/Card';
import Navbar from '../components/navbar/Navbar';
import HotelSearch from '../components/search/Search';
import SectionWithImage from '../components/sections/sectionWithImage/SectionWithImage';
import styles from '../styles/Home.module.scss';

export default function Home({ data, countries }) {
  return (
    <div>
      <Head>
        <title>Holidaze</title>
        <meta name="description" content="Holidaze - Enjoy your vacation!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <SectionWithImage
            icon={'icons/mapIcon.svg'}
            title="Find the perfect place for 
        your holiday."
            text={
              'Choose from a great variety of hotels, in many different countries and book your holiday now!'
            }
            image={'illustrations/HotelIllustration.svg'}
          />
        </div>
        <div className={styles.secondaryBG}>
          <div className={styles.container}>
            <h2 className={styles.centerText}>
              Set a date and number of people and we will find you hotels.
            </h2>
            <HotelSearch data={countries} />
            <div className={styles.centerText}>
              <Button href="/hotels">Search</Button>
            </div>
            <div className={styles.cards}>
              <Cards data={data} />
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <SectionWithImage
            subtitle="How it works"
            text={
              'Book with us to get the best deals. Once your reservation is ordered, you get an email verification and can rest assure that your booking is legit and safe.We also offer 30 days money back guarantee.'
            }
            image={'images/howitworks.png'}
          />
        </div>
      </main>
    </div>
  );
}
