import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import BookingTable from "./BookingTable";
import Swal from 'sweetalert2';
import { useLocation, useNavigate} from "react-router-dom";

const Bookings = () => {
  const location = useLocation();
  const navigate = useNavigate()
  console.log(location)
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([])
  const url = `https://car-doctor-server-alpha-beryl.vercel.app/bookings?email=${user?.email}`;
  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('car-access-token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if(!data.error){
          setBookings(data);
        }
        else{
          navigate('/')
        }
      })
  }, [url, navigate])
  const handelDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://car-doctor-server-alpha-beryl.vercel.app/bookings/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your Booking has been deleted.',
                'success'
              )
              const remaining = bookings.filter(booking => booking._id !== id)
              setBookings(remaining);
            }
          })
      }
    })
  };
  const handelUpdate = id => {
    fetch(`https://car-doctor-server-alpha-beryl.vercel.app/bookings/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ status: 'confirm' })
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          const remaining = bookings.filter(booking => booking._id !== id);
          const updated = bookings.find(booking => booking._id === id);
          updated.status = 'confirm';
          const newBookings = [updated, ...remaining]
          setBookings(newBookings)
        }
        console.log(data)
      })
  }

  return (
    <div>
      <h2 className="text-5xl">Your Bookings: {bookings.length}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Service Image</th>
              <th>Service Name</th>
              <th>Date</th>
              <th>Email</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              bookings.map(booking => <BookingTable
                key={booking._id}
                booking={booking}
                handelDelete={handelDelete}
                handelUpdate={handelUpdate}
              ></BookingTable>)
            }
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Bookings;