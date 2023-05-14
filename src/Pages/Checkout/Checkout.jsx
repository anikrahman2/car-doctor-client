import { useContext } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from 'sweetalert2'



const Checkout = () => {
  const location = useLocation();
  console.log(location)
  const { user } = useContext(AuthContext);
  const service = useLoaderData();
  const { title, price, _id, img } = service;
  const handelBookOrder = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const date = form.date.value;
    const due = form.due.value;
    const order = {
        customerName: name,
        customerEmail: email,
        img,
        date,
        service: title,
        'service_id': _id,
        price: due
      }
    fetch('https://car-doctor-server-alpha-beryl.vercel.app/bookings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(order)
    })
    .then(res => res.json())
    .then(data => {
      if(data.acknowledged){
        Swal.fire(
          'Good job!',
          'Successfully Place Order',
          'success'
        )
      }
    })
  }
  return (

    <div>
      <h2 className="text-center text-3xl">Book Service: {title}</h2>
      <form onSubmit={handelBookOrder}>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="name" defaultValue={user?.displayName} className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input type="date" name="date" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="text" name="email" defaultValue={user?.email} className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due Amount</span>
              </label>
              <input type="text" name="due" defaultValue={'$  ' + price} className="input input-bordered" />
            </div>
          </div>
          <div className="form-control mt-6">
            <input type="submit" className="btn btn-primary" value="Order Confirm" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;