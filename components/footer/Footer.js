import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footerLinks}>
        <div className={styles.footerSection}>
          <ul className={styles.footerList}>
            <b className={styles.footerHeader}>Holidaze</b>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <ul className={styles.footerList}>
            <b className={styles.footerHeader}>Payment</b>
            <li className={styles.footerLink}>Payment & Tickets</li>
            <li className={styles.footerLink}>Hotel reservation</li>
            <li className={styles.footerLink}>Travel terms</li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <ul className={styles.footerList}>
            <b className={styles.footerHeader}>Customer Service</b>
            <li className={styles.footerLink}>Contact us</li>
            <li className={styles.footerLink}>FAQ</li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <ul className={styles.footerList}>
            <b className={styles.footerHeader}>About us</b>
            <li className={styles.footerLink}>About Holidaze</li>
            <li className={styles.footerLink}>Payment & Security</li>
            <li className={styles.footerLink}>Terms & Conditions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
