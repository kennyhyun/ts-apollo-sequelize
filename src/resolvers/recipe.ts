import { Recipe, Resolvers } from '../generated/graphql';

const resolver: Resolvers = {
  Mutation: {
    createRecipe: async (_, args, { getUser, models, pubsub }): Promise<Recipe> => {
      const auth = await getUser();
      const { recipe: input } = args;
      // TODO: create recipe
      const recipe = { ...input, id: '0' };
      // pubsub.publish(USER_UPDATED, { user });
      return recipe;
    },
  },
};

export default resolver;
