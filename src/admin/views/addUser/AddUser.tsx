import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';
import UserService from 'services/UserService';

const AddUser = () => {
  const history = useHistory();
  const { id } = useParams<any>();
  const [formData, setFormData] = useState<any>({
    status: 'verified',
  } as any);

  const handleOnChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    (async () => {
      if (id) {
        const userData = await UserService.getUserByID(id);
        setFormData({
          name: userData.name,
          email: userData.email,
          role: userData.role,
        });
      }
    })();
  }, [id]);
  const handleSubmit = async (e: any) => {
    if (id) {
      await UserService.updateUser(id, formData);
      toast.success('User added successfully!');
      history.push('/dashboard/users');
    } else {
      await UserService.addUser(formData);
      toast.success('User added successfully!');
      history.push('/dashboard/users');
    }
  };

  return (
    <div>
      <CCard>
        <CCardHeader>Add User</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel>Name</CFormLabel>
              <CFormInput
                value={formData.name}
                name="name"
                onChange={handleOnChange}
                type="text"
                id="inputEmail4"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Email</CFormLabel>
              <CFormInput
                value={formData.email}
                name="email"
                onChange={handleOnChange}
                type="text"
                id="inputPassword4"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Password</CFormLabel>
              <CFormInput
                name="password"
                onChange={handleOnChange}
                type="password"
                id="inputPassword4"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Role</CFormLabel>

              <CFormSelect
                name="role"
                value={formData.role}
                onChange={handleOnChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </CFormSelect>
            </CCol>

            <CCol xs={12}>
              <CButton onClick={handleSubmit} type="button">
                {id ? 'Update' : 'Add User'}
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default AddUser;
