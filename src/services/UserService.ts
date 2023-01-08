import requests from 'services/httpService';
import { IUser } from 'types';
class UserService {
  getUsers(): Promise<IUser[]> {
    return requests.get('/user');
  }

  getMerchantsUsers(): Promise<IUser[]> {
    return requests.get('/merchant/users');
  }

  getUserByID(id: string): Promise<IUser> {
    return requests.get(`/user/${id}`);
  }

  addUser(body: {}): Promise<IUser> {
    return requests.post(`/user/`, body);
  }

  updateUser(id: string, body: {}): Promise<IUser> {
    return requests.patch(`/user/${id}`, body);
  }

  deleteUser(id: string): Promise<IUser> {
    return requests.delete(`/user/${id}`);
  }
}

export default new UserService();
