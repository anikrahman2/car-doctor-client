

const BookingTable = ({ booking, handelDelete, handelUpdate }) => {
  const { img, service, customerEmail, date, price, _id, status } = booking;

  return (
    <>
      {/* row 1 */}
      <tr>
        <th>
          <button className="btn btn-circle btn-sm" onClick={() => handelDelete(_id)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </th>
        <td>
          <div className="avatar">
            <div className="mask mask-squircle w-24 h-24">
              <img src={img} />
            </div>
          </div>
        </td>
        <td>
          {service}
        </td>
        <td>
          {date}
        </td>
        <td>
          {customerEmail}
        </td>
        <td>
          {price}
        </td>
        <th>
          {
            status === 'confirm'
              ?
              <span className="text-primary">Confirmed</span>
              :
              <button onClick={() => handelUpdate(_id)} className="btn btn-ghost btn-xs">Please Confirm</button>
          }
        </th>
      </tr>
    </>
  );
};

export default BookingTable;