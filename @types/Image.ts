import Category from './Category';
import User from './User';

export default interface Image {
  id: number;
  title: number;
  url: string;
  categories: Category[];
  uploader: Omit<User, 'roles'>;
}
