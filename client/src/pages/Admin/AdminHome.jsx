import React from 'react'
import Layout from './../../components/shared/Layout/Layout';
import { useSelector } from 'react-redux';

const AdminHome = () => {
  const { user } = useSelector(state => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Blood bank app</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ab magnam vel iusto consequatur enim cupiditate dolorum, neque porro architecto delectus quod quam minima necessitatibus repudiandae, assumenda iure, voluptatum accusantium facere quia dolorem nemo? Esse illo eos unde sunt deleniti corrupti iure necessitatibus, doloremque, reiciendis harum fugit, ex est inventore eligendi? Harum maiores omnis quae ea quas voluptatem sit magnam eum perspiciatis nesciunt eaque, laboriosam facilis repudiandae nostrum, beatae recusandae quidem veniam perferendis ullam consequatur illum. Asperiores adipisci accusantium voluptatibus molestias velit nihil laboriosam quisquam consectetur nemo nesciunt, neque quidem laudantium voluptas impedit provident hic explicabo quaerat eius id reiciendis quis saepe consequatur unde? Explicabo, obcaecati voluptates blanditiis enim facilis corporis nihil molestias eveniet laudantium omnis sed mollitia, dolorem laborum pariatur sequi in maiores vel totam, ratione similique! Aliquam repellendus, et quo aut nihil tempore fugit cum quisquam a est. Cumque sapiente sint, consequuntur aut nostrum facere voluptates nemo similique.</p>
        </div>
      </div>
    </Layout>
  )
}

export default AdminHome
