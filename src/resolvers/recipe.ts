import { Recipe, Resolvers } from '../generated/graphql';

const isUrl = (urlOrText: string) => false;

const resolver: Resolvers = {
  Query: {
    recipes: async (_, args, { getUser, models }): Promise<Recipe[]> => {
      const { Recipe, User, StepItem } = models;
      const recipes = await Recipe.findAll({
        include: [{ model: StepItem }, { model: User, as: 'author' }],
      });
      return recipes;
    },
  },
  Mutation: {
    createRecipe: async (_, args, { getUser, models, pubsub }): Promise<Recipe> => {
      const auth = await getUser();
      const { Recipe, StepItem } = models;
      const { recipe: input } = args;
      // eslint-disable-next-line
      console.log('createRecipe', input);
      const recipe = await Recipe.create(
        {
          ...args.recipe,
          authorId: auth.id,
          stepItems: input.stepItems.map((i, idx) => ({
            sequence: (idx + 1) * 10,
            ...(isUrl(i) ? { url: i, type: 'url' } : { text: i, type: 'text' }),
          })),
        },
        {
          raw: true,
          include: [
            {
              model: StepItem,
              as: 'stepItems',
            },
          ],
        },
      );
      return recipe;
    },
  },
};

export default resolver;
