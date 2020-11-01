import Notification, { NotificationModelStatic } from './Notification';
import Post, { PostModelStatic } from './Post';
import Recipe, { RecipeModelStatic } from './Recipe';
import User, { UserModelStatic } from './User';

export default {
  Notification,
  User,
  Post,
  Recipe,
};

export interface ModelType {
  User: UserModelStatic;
  Post: PostModelStatic;
  Recipe: RecipeModelStatic;
  Notification: NotificationModelStatic;
}
