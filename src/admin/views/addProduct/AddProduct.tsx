import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';
import ProductService from 'services/ProductService';

interface IFormData {
  _id?: string;
  name: string;
  category: string;
  description: string;
  store: string;
  price: number | string;
  image: any;
  __v: number;
}
const AddProduct = () => {
  const [formData, setFormData] = useState<IFormData>({
    store: '611133844180ee0b13254168',
    category: '611130734180ee0b1325415e',
  } as IFormData);
  const { id } = useParams<any>();

  const [file, setFile] = useState<string>('');
  const handleFileUpload = (e: any) => {
    setFile(e.target.files[0]);
  };
  console.log('file', file);
  const handleOnChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    (async () => {
      if (id) {
        const productData = await ProductService.getProductByID(id);
        setFormData({
          ...formData,
          name: productData.name,
          price: productData.price,
          description: productData.description,
        });
      }
    })();
  }, [id]);
  const history = useHistory();

  const handleSubmit = async (e: any) => {
    // const dataSubmit: any = {
    //   ...formData,
    //   image: file,
    // };

    const newFormData = new FormData();
    newFormData.append('name', formData.name);
    newFormData.append('category', formData.category);
    newFormData.append('store', formData.store);
    newFormData.append('description', formData.description);
    newFormData.append('image', file);
    newFormData.append('price', formData.price);
    if (id) {
      await ProductService.updateProduct(id, newFormData);
      toast.success('Product Updated');
    } else {
      await ProductService.addProduct(newFormData);
      toast.success('Product added');
    }

    history.push('/dashboard/products');
  };

  return (
    <div>
      <CCard>
        <CCardHeader>Add Product</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel>Name</CFormLabel>
              <CFormInput
                name="name"
                onChange={handleOnChange}
                type="text"
                value={formData.name}
                id="inputEmail4"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Price</CFormLabel>
              <CFormInput
                name="price"
                value={formData.price}
                onChange={handleOnChange}
                type="number"
                id="inputPassword4"
              />
            </CCol>

            <CCol xs={12}>
              <CFormLabel>Description</CFormLabel>
              <textarea
                onChange={handleOnChange}
                className="form-control"
                rows={5}
                value={formData.description}
                name="description"
                id="exampleFormControlTextarea1"
              ></textarea>
            </CCol>
            <CCol xs={12}>
              <div className="mb-3">
                <CFormLabel>Product Image</CFormLabel>
                <CFormInput
                  onChange={handleFileUpload}
                  type="file"
                  id="formFile"
                />
              </div>
            </CCol>

            <CCol xs={12}>
              <CButton onClick={handleSubmit} type="button">
                {id ? 'Update ' : 'Add '} Product
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default AddProduct;
