import styles from '../Table.module.scss';

const Table = ({ enquiry }) => {
  return (
    <div className={styles.overflow}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th scope="col" className={styles.tableHead}>
              First Name
            </th>
            <th scope="col" className={styles.tableHead}>
              Last Name
            </th>
            <th scope="col" className={styles.tableHead}>
              Email
            </th>
            <th scope="col" className={styles.tableHead}>
              Hotel
            </th>
            <th scope="col" className={styles.tableHead}>
              Check In
            </th>
            <th scope="col" className={styles.tableHead}>
              Check Out
            </th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {enquiry &&
            enquiry.data.map((hotel) => {
              return (
                <tr key={hotel.id} className={styles.tableRow}>
                  <td className={styles.tableHead}>
                    {hotel.attributes.firstName}
                  </td>
                  <td className={styles.tableHead}>
                    {hotel.attributes.lastName}
                  </td>
                  <td className={styles.tableHead}>{hotel.attributes.email}</td>
                  <td className={styles.tableHead}>
                    {hotel.attributes.hotelName}
                  </td>
                  <td className={styles.tableHead}>
                    {hotel.attributes.checkIn}
                  </td>
                  <td className={styles.tableHead}>
                    {hotel.attributes.checkOut}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
