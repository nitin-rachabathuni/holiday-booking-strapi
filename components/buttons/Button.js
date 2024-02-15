import styles from './Button.module.scss';
import Link from 'next/link';

export function Button({ href, children, ...props }) {
  return (
    <div className={styles.buttonWrapper}>
      <Link href={href}>
        <a className={styles.add} {...props}>
          {children}
        </a>
      </Link>
    </div>
  );
}
