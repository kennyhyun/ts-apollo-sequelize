import { Recipe, Resolvers } from '../generated/graphql';

const resolver: Resolvers = {
  Query: {
    recipes: async (_, args, { getUser, models }): Promise<Recipe[]> => {
      const { Recipe, User } = models;
      const recipes = await Recipe.findAll({
        include: [
          {
            model: User,
            as: 'author',
          },
        ],
      });
      return recipes;
    },
  },
  Mutation: {
    createRecipe: async (_, args, { getUser, models, pubsub }): Promise<Recipe> => {
      const auth = await getUser();
      const { Recipe } = models;
      const { recipe: input } = args;
      // eslint-disable-next-line
      console.log('createRecipe', input);
      const recipe = await Recipe.create({ ...args.recipe, authorId: auth.id }, { raw: true });
      return recipe;
    },
  },
};

export default resolver;
