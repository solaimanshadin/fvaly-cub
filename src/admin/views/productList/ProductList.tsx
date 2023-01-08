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
import ProductService from 'services/ProductService';
import Swal from 'sweetalert2';
import imageUrlParser from 'utils/imageUrlParser';

const ProductList = () => {
  const { data, isLoading, isSuccess, isError, error, refetchData } = useAsync(
    ProductService.getProducts
  );
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Are you sure to delete this product?',
      icon: 'warning',

      showCancelButton: true,
      confirmButtonText: 'Yes delete',
      denyButtonText: `Cancel`,
    }).then(async (result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await ProductService.deleteProduct(id);
        Swal.fire('Product deleted', '', 'success');
        refetchData();
      }
    });
  };
  return (
    <div>
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          Product List
          <Link to="/dashboard/add-product">
            <CButton variant="outline" color="primary">
              <FaPlus /> Add Product
            </CButton>
          </Link>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Image</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Price</CTableHeaderCell>
                <CTableHeaderCell style={{ width: 100 }}>
                  Action
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {isSuccess &&
                data?.map((product) => (
                  <CTableRow key={product._id}>
                    <CTableHeaderCell>
                      <img
                        width={100}
                        src={imageUrlParser(product.image)}
                        alt=""
                      />
                    </CTableHeaderCell>
                    <CTableDataCell>{product.name}</CTableDataCell>
                    <CTableDataCell>{product.price}</CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/dashboard/add-product/${product._id as any}`}>
                        <CButton
                          size="sm"
                          className="me-2"
                          variant="outline"
                          color="primary"
                        >
                          <FaEdit />
                        </CButton>
                      </Link>
                      <CButton
                        onClick={() => handleDelete(product._id as any)}
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

export default ProductList;
