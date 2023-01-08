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
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OrderService from 'services/OrderService';

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'secondary';
    case 'delivered':
      return 'warning';
    case 'processing':
      return 'info';
    case 'cancelled':
      return 'danger';
    default:
      return 'success';
  }
};
const OrderList = () => {
  const { data, isLoading, isSuccess, isError, error } = useAsync(
    OrderService.getOrders
  );
  return (
    <div>
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          Order List
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Order No.</CTableHeaderCell>
                <CTableHeaderCell>Order By</CTableHeaderCell>
                <CTableHeaderCell>Ordered at</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {isSuccess &&
                data?.map((Order) => (
                  <CTableRow key={Order._id}>
                    <CTableDataCell>{Order.orderId}</CTableDataCell>
                    <CTableDataCell>
                      {Order?.userId?.name}
                      <p className="small"> {Order?.userId?.email}</p>
                    </CTableDataCell>
                    <CTableDataCell>{Order.createdAt}</CTableDataCell>
                    <CTableDataCell>
                      <Badge bg={getStatusColor(Order.status)}>
                        {Order.status}
                      </Badge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/dashboard/orders/${Order._id}`}>
                        <CButton size="sm" variant="outline" color="primary">
                          View Deatils
                        </CButton>
                      </Link>
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

export default OrderList;
