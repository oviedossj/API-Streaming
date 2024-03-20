import MovieService from '../services/movie.service';
import { errorHandler } from '@/config/errors';
import { Category, Movie } from '@/models/graphql/types/graphql-types';

class MovieController  {
  constructor(private readonly MoviesService: MovieService) {}

  async getMoviesbyId(MovieIds: string): Promise<Movie> {
    try {
      return await this.MoviesService.getMoviesbyId(MovieIds);
    } catch (err) {
      throw errorHandler(err);
    }
  }

  async getMovieXCategory(CategorieIds: string): Promise<Movie[]> {
    try {
      return await this.MoviesService.getMoviesbyCategory(CategorieIds);
    } catch (err) {
      throw errorHandler(err);
    }
  }

  async Categories(): Promise<Category[]> {
    try {
      return await this.MoviesService.getCategory();
    } catch (err) {
      throw errorHandler(err);
    }
  }
}

export default MovieController;
