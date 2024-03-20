import logger from '@/utils/logger';
import MovieRepository from '@/repositories/movie.repositories';
import CategoriRepository from '@/repositories/categories.repositories';
import { IMovie, ICategory, IMovieService } from '@/models';
import { Category, Movie } from '@/models/graphql/types/graphql-types';

class MovieService implements IMovieService<Movie, Category> {
  constructor(private movieRepository: MovieRepository, private categoryRepository: CategoriRepository) {}

  async getMoviesbyId(MovieIds: string): Promise<Movie> {
    try {
      const movie = await this.movieRepository.getMovie(MovieIds);
      if (!movie) throw new Error(`Could not find movie with ID: ${MovieIds}`);
      const category = await this.categoryRepository.getCategoryById(movie.category);
      if (!category) throw new Error(`Categoría no encontrada para la película con ID: ${MovieIds}`);
      return this.transformMovie(movie, category);
    } catch (error) {
      logger.error('Error at MovieService.getMoviesbyId -> ', error);
      throw error;
    }
  }
  async getMoviesbyCategory(CategorieIds: string): Promise<Movie[]> {
    try {
      const movies = await this.movieRepository.getMovies(CategorieIds);
      if (!movies) throw new Error(`Could not find movies for category with ID: ${CategorieIds}`);
      const moviesPromise = await Promise.all(movies.map(async (movie) => {
        const category = await this.categoryRepository.getCategoryById(movie.category);
        if (!category) throw new Error(`Categoría no encontrada para la película con ID: ${movie._id}`);
        return this.transformMovie(movie, category);
      }));
      return moviesPromise
    } catch (error) {
      logger.error('Error at MovieService.getMoviesbyCategory -> ', error);
      throw error;
    }
  }
  async getCategory(): Promise<Category[]> {
    try {
      const data =  await this.categoryRepository.getCategories();
      const rto =  this.transformCategories(data)
      return rto
    } catch (error) {
      logger.error('Error at MovieService.getCategory -> ', error);
      throw error;
    }
  }
   private async  transformMovie(movie: IMovie, category: ICategory):  Promise<Movie> {
    const transformedCategory = this.transformCategory(category);
    if (!transformedCategory) {
      throw new Error("Categoría no encontrada");
    }
    return {
      ...movie,
      category: transformedCategory,
    };
  }
  private async transformCategories(categories: ICategory[]): Promise<Category[]> {
    return categories.map((category) => ({
      _id: category._id.toString(),
      name: category.name,
      flims: [],
    }));
  }  
  private transformCategory(category: ICategory ): Category {
    return {
      _id: category._id, 
      name: category.name,
      flims: [],
    };
  }
}

export default MovieService;
