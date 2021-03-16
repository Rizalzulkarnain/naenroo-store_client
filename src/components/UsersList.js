import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import Sidebar from '../screen/Admin/Sidebar';
import MetaData from './MetaData';
import Spinner from './Spinner/Spinner';

import { toastr } from 'react-redux-toastr';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllUsersActions,
  clearErrors,
} from '../redux/actions/allUsersActions';

const UsersList = () => {
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsersActions());

    if (error) {
      toastr.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: 'User ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
        },
        {
          label: 'Role',
          field: 'role',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <>
            <Link
              to={`/admin/user-detail/${user._id}`}
              className="btn btn-primary py-1"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2">
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title="All Users" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-5">All Users</h1>
          {loading ? (
            <Spinner />
          ) : (
            <MDBDataTable
              data={setUsers()}
              className="px-3"
              bordered
              striped
              hover
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UsersList;
