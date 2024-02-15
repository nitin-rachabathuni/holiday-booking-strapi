import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../components/navbar/Navbar';
import styles from './Success.module.scss';

const About = () => {
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
          <Image
            src={'/illustrations/success.jpg'}
            alt={'success'}
            height={400}
            width={400}
          />
          <h2>Thank you!</h2>
          <p>You will recieve a confirmation on email shortly.</p>
        </div>
      </main>
    </div>
  );
};

export default About;
