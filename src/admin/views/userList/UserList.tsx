import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import Loader from 'components/Loader';
import useAsync from 'hooks/useAsync';
import { FaEdit, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserService from 'services/UserService';
import Swal from 'sweetalert2';
const UserList = () => {
  const { data, isLoading, isSuccess, isError, error, refetchData } = useAsync(
    UserService.getUsers
  );

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Are you sure to delete this user?',
      icon: 'warning',

      showCancelButton: true,
      confirmButtonText: 'Yes delete',
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await UserService.deleteUser(id);
        Swal.fire('User deleted', '', 'success');
        refetchData();
      }
    });
  };
  return (
    <div>
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          User List
          <Link to="/dashboard/add-user">
            <CButton variant="outline" color="primary">
              <FaPlus /> Add User
            </CButton>
          </Link>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Role</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {isSuccess &&
                data?.map((user) => (
                  <CTableRow key={user._id}>
                    <CTableDataCell>{user.name}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.role}</CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/dashboard/add-user/${user._id}`}>
                        <CButton
                          variant="outline"
                          size="sm"
                          className="me-2"
                          color="info"
                        >
                          <FaEdit />
                        </CButton>
                      </Link>

                      <CButton
                        onClick={() => handleDelete(user._id)}
                        variant="outline"
                        size="sm"
                        color="danger"
                      >
                        <FaTrashAlt />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              {isError && <h3>{error}</h3>}
            </CTableBody>
          </CTable>
          {isLoading && <Loader />}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default UserList;
