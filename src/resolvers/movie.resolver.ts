import { movieController } from '@/controllers';
import { QueryGetMoviesXCategoriArgs, QueryGetMovieArgs } from '@/models';
import { Resolvers } from '@/models/graphql/types/graphql-types';

export const resolver: Resolvers = {
  Query: {
    Movie: async (_parent: unknown, args: QueryGetMovieArgs) => movieController.getMoviesbyId(args.MovieIds),
    Movies: async (_parent: unknown, args: QueryGetMoviesXCategoriArgs) => movieController.getMovieXCategory(args.CategorieIds),
    Category: async () => movieController.Categories(),
  },
};




