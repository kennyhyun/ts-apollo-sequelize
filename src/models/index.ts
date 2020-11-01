import Notification, { NotificationModelStatic } from './Notification';
import Post, { PostModelStatic } from './Post';
import Recipe, { RecipeModelStatic } from './Recipe';
import StepItem, { StepItemModelStatic } from './StepItem';
import User, { UserModelStatic } from './User';

export default {
  Notification,
  User,
  Post,
  Recipe,
  StepItem,
};

User.hasMany(Notification);
Notification.belongsTo(User);
User.hasMany(Post);
// User.hasMany(Recipe);
Post.belongsTo(User);

Recipe.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
Recipe.hasMany(StepItem);

export interface ModelType {
  User: UserModelStatic;
  Post: PostModelStatic;
  Recipe: RecipeModelStatic;
  StepItem: StepItemModelStatic;
  Notification: NotificationModelStatic;
}
