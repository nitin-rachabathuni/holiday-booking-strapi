import { setToken } from '../../lib/auth';
import Head from 'next/head';
import Navbar from '../../components/navbar/Navbar';
import { useState } from 'react';
import { fetcher } from '../../lib/api';
import styles from './Login.module.scss';
import Image from 'next/image';
import Alert from '../../components/alert/Alert';

const SignIn = () => {
  const [data, setData] = useState({
    identifier: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: data.identifier,
            password: data.password,
          }),
        }
      );
      setToken(responseData);
    } catch (error) {
      Alert(`Something went wrong: ${error}`);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
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
          <div className={styles.formContainer}>
            <h1 className={styles.header}>Welcome Back</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.label}>Username</label>
              <input
                type="text"
                name="identifier"
                onChange={handleChange}
                placeholder="username@email.com"
                className={styles.formInput}
                required
              />
              <label className={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="minimum 5 characters"
                className={styles.formInput}
                required
              />

              <button className={styles.formButton} type="submit">
                Login
              </button>
            </form>
            <div className="alert"></div>
          </div>
          <Image
            src={'/illustrations/HotelIllustration.svg'}
            alt={'Hotel'}
            width={500}
            height={500}
          />
        </div>
      </main>
    </div>
  );
};

export default SignIn;
