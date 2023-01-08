import requests from 'services/httpService';
import { IOrder } from 'types';
class OrderService {
  getOrders(): Promise<IOrder[]> {
    return requests.get('/order');
  }

  getMerchantsOrders(): Promise<IOrder[]> {
    return requests.get('/merchant/orders');
  }

  getOrderByID(id: string): Promise<IOrder> {
    return requests.get(`/order/${id}`);
  }

  addOrder(body: {}): Promise<IOrder> {
    return requests.post(`/order/`, body);
  }

  updateOrder(id: string, body: {}): Promise<IOrder> {
    return requests.patch(`/order/${id}`, body);
  }

  deleteOrder(id: string): Promise<IOrder> {
    return requests.delete(`/order/${id}`);
  }
}

export default new OrderService();
