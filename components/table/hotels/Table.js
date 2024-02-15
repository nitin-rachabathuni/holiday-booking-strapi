import styles from '../Table.module.scss';
import { Edit } from 'tabler-icons-react';
import Link from 'next/link';

const Table = ({ hotels }) => {
  return (
    <div className={styles.overflow}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th scope="col" className={styles.tableHead}>
              Name
            </th>
            <th scope="col" className={styles.tableHead}>
              Country
            </th>
            <th scope="col" className={styles.tableHead}>
              City
            </th>
            <th scope="col" className={styles.tableHead}>
              Price
            </th>
            <th scope="col" className={styles.tableHead}>
              Edit Hotel
            </th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {hotels &&
            hotels.data.map((hotel) => {
              return (
                <tr key={hotel.id} className={styles.tableRow}>
                  <td className={styles.tableHead}>{hotel.attributes.title}</td>
                  <td className={styles.tableHead}>
                    {hotel.attributes.country}
                  </td>
                  <td className={styles.tableHead}>{hotel.attributes.city}</td>
                  <td className={styles.tableHead}>
                    {hotel.attributes.prize}$ /night
                  </td>
                  <td className={styles.tableHead}>
                    <Link href={`/dashboard/editHotel/${hotel.id}`}>
                      <a>
                        <Edit size={24} color="orange" />
                      </a>
                    </Link>
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
