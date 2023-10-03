import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Layout from '../Layout';
import moment from 'moment';
import API from '../../../../services/API';

const Consumer = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector(state => state.auth);

  const getConsumers = async () => {
    try {
      const { data } = await API.post('/inventory/get-inventory-hospital', {
        filters: {
          inventoryType: 'out', hospital: user?._id
        }
      })
      if (data?.success) {
        setData(data?.inventory);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getConsumers();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <div className="container mt-4">
        <h1>Donor Details</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope='col'>Blood Group</th>
              <th scope='col'>Inventory Type</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Email</th>
              <th scope='col'>Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity}</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default Consumer
