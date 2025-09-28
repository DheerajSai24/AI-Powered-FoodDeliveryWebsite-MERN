import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'


const PlaceOrder = () => {
  const { cartItem, food_list } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = (event) => {
    event.preventDefault();
    
    const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'country', 'phone'];
    const emptyFields = [];
    
    requiredFields.forEach(field => {
      if (!data[field] || data[field].trim() === '') {
        emptyFields.push(field);
      }
    });

    if (emptyFields.length > 0) {
      // Show alert with missing fields
      const fieldNames = emptyFields.map(field => {
        switch(field) {
          case 'firstName': return 'First Name';
          case 'lastName': return 'Last Name';
          case 'email': return 'Email Address';
          case 'street': return 'Street';
          case 'city': return 'City';
          case 'state': return 'State';
          case 'zipcode': return 'Zip Code';
          case 'country': return 'Country';
          case 'phone': return 'Phone';
          default: return field;
        }
      });
      
      alert(`Please fill the following fields: ${fieldNames.join(', ')}`);
      return;
    }

    // Check if cart is not empty
    if (getTotalCartAmount() === 0) {
      alert('Your cart is empty. Please add items before proceeding to payment.');
      return;
    }

    // If all validations pass
    alert('Proceeding to payment...');
    // Here you can add the payment logic
  }

   const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  }
  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' required />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' required />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' required />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' required />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
        </div>
    <input name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder='Phone' required />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <div>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <div>
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">Proceed To Payment</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
