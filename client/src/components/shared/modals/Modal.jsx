import React, { useState } from 'react'
import InputType from './../Form/InputType';
import { useSelector } from 'react-redux';
import API from './../../../services/API';

const Modal = () => {
  const [inventoryType, setInventoryType] = useState('in');
  const [bloodGroup, setBloodGroup] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState('');
  const { user } = useSelector(state => state.auth);
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity || !donorEmail) {
        return alert('Please provide all fields');
      }
      const { data } = await API.post('/inventory/create-inventory', {
        inventoryType, bloodGroup, quantity,
        email,
        organisation: user?._id,
      });
      if (data?.success) {
        alert('New record created');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  }

  return (
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Manage Blood Record</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="d-flex">
              Blood Type: &nbsp;
              <div className="form-check ms-3">
                <input type="radio" name='inRadio' defaultChecked className='form-check-input' value={'in'} onChange={(e) => setInventoryType(e.target.value)} />
              </div>
              <label htmlFor="in" className='form-check-label'>IN</label>
            </div>
            <div className="d-flex">
              Blood Type: &nbsp;
              <div className="form-check ms-3">
                <input
                  type="radio"
                  name='inRadio'
                  className='form-check-input'
                  value={'out'}
                  onChange={(e) => setInventoryType(e.target.value)}
                />
              </div>
              <label htmlFor="out" className='form-check-label'>OUT</label>
            </div>
            <select
              className='form-select'
              aria-label='Default select example'
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option defaultValue={'select blood group'}>Select Blood Group</option>
              <option value={'O+'}>O+</option>
              <option value={'O-'}>O-</option>
              <option value={'AB+'}>AB+</option>
              <option value={'AB-'}>AB-</option>
              <option value={'A+'}>A+</option>
              <option value={'A-'}>A-</option>
              <option value={'B+'}>B+</option>
              <option value={'B-'}>B-</option>
            </select>
            <InputType
              labelText={'Donor Email'}
              labelFor={'email'}
              inputType={'email'}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <InputType
              labelText={'Blood Quantity'}
              labelFor={'quantity'}
              inputType={'Number'}
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleModalSubmit}>Submit</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Modal
