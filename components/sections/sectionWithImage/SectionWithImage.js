import styles from './SectionWithImage.module.scss';

const SectionWithImage = ({
  image,
  icon,
  alt,
  title,
  subtitle,
  text,
  width,
  height,
  imageAlt,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <img src={icon} width={width} height={height} alt={alt} />
        <h1 className={title}>{title}</h1>
        <h2 className={subtitle}>{subtitle}</h2>
        <p className={text}>{text}</p>
      </div>
      <img
        className={styles.image}
        src={image}
        width={width}
        height={height}
        alt={imageAlt}
      />
    </div>
  );
};

export default SectionWithImage;
