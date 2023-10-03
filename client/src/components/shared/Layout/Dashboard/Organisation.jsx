import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import API from '../../../../services/API';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Organisation = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector(state => state.auth);
  const getOrg = async () => {
    try {
      if (user?.role === 'donor') {
        const { data } = await API.get('/inventory/get-organisations')
        // console.log(data);
        if (data?.success) {
          setData(data?.organisations);
        }
      }
      if (user?.role === 'hospital') {
        const { data } = await API.get('/inventory/get-organisation-for-hospitals')
        // console.log(data);
        if (data?.success) {
          setData(data?.organisations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getOrg();
    // eslint-disable-next-line
  }, [user]);
  return (
    <Layout>
      <h1>Organisation Details</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Address</th>
            <th scope='col'>Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.organisationName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.address}</td>
              <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Organisation
