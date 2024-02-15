import styles from '../Table.module.scss';

const Message = ({ messages }) => {
  return (
    <div className={styles.overflow}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th scope="col" className={styles.tableHead}>
              Name
            </th>
            <th scope="col" className={styles.tableHead}>
              Email
            </th>
            <th scope="col" className={styles.tableHead}>
              Message
            </th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {messages &&
            messages.data.map((hotel) => {
              return (
                <tr key={hotel.id} className={styles.tableRow}>
                  <td className={styles.tableHead}>{hotel.attributes.name}</td>
                  <td className={styles.tableHead}>{hotel.attributes.email}</td>
                  <td className={styles.tableHead}>
                    {hotel.attributes.message}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Message;
