import React, { useEffect, useState } from 'react'
import Layout from './../../components/shared/Layout/Layout';
import API from '../../services/API';
import moment from 'moment';

const OrganisationList = () => {
  const [data, setData] = useState([])
  const getOrganisationList = async () => {
    try {
      const { data } = await API.get('/admin/organisation-list');
      console.log(data);
      if (data?.success) {
        setData(data?.organisationData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getOrganisationList();
  }, []);

  //delete function
  const handleDelete = async (id) => {
    try {
      let answer = window.prompt('Are you sure want to delete this organisation', 'Sure');
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-organisation/${id}`);
      alert(data?.message)
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <h1>Organisation List</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Date</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.organisationName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(record._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default OrganisationList
