import Role from './Role';

export default interface User {
  id: number;
  name: string;
  email: string;
  nickname: string;
  roles: Role[];
}
