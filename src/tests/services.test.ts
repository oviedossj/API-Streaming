import { movieRepository, categotyRepository } from '@/repositories';
import MovieService from '@/services/movie.service';
import {movie,category} from './data'

const mockGetMovie = jest.fn().mockReturnThis() ;
const mockGetMovies = jest.fn().mockResolvedValue(movie);
const mockGetCategoryById = jest.fn().mockResolvedValue(category[0]);
const mockGetCategories = jest.fn().mockResolvedValue(category);
  
jest.mock('@/repositories', () => {
  return {
    movieRepository: {
      getMovie: mockGetMovie,
      getMovies: mockGetMovies,
    },
    categotyRepository: {
      getCategoryById: mockGetCategoryById,
      getCategories: mockGetCategories,
    }
  };
});

describe('MovieService', () => {
    let movieService : MovieService;
  
    beforeEach(() => {
      movieService = new MovieService(movieRepository, categotyRepository);
      mockGetMovie.mockClear();
      mockGetMovies.mockClear();
      mockGetCategoryById.mockClear();
      mockGetCategories.mockClear();
    });
  
    describe('getMoviesbyId', () => {
      test('should return a movie by ID with transformed category', async () => {
        mockGetMovie.mockResolvedValue(movie[0]);
        mockGetCategoryById.mockResolvedValue(category); 
        
        const result = await movieService.getMoviesbyId('someMovieId');
        
        expect(result).toHaveProperty('_id', movie[0]._id);
        expect(result).toHaveProperty('category');
        expect(result.category).toHaveProperty('_id', category[0]._id.toString()); 
      });
    });
  
    describe('getMoviesbyCategory', () => {
      test('should return movies by category with transformed categories', async () => {
        mockGetMovies.mockResolvedValue(movie);
        mockGetCategoryById.mockResolvedValue(category); 
        
        const results = await movieService.getMoviesbyCategory('categoryId');
        
        expect(results).toHaveLength(1); 
        results.forEach(result => {
          expect(result).toHaveProperty('category');
          expect(result.category).toHaveProperty('_id', category[0]._id.toString());
        });
      });
    });
  });
  
  
// describe('MovieService', () => {
//   let movieService : MovieService;

//   beforeEach(() => {
//     movieService = new MovieService(movieRepository, categotyRepository);
//     mockGetMovie.mockClear();
//     mockGetMovies.mockClear();
//     mockGetCategoryById.mockClear();
//     mockGetCategories.mockClear();
//   });

//   // Ejemplo de un test
//   describe('getMoviesbyId', () => {
//     test('should return one movie by ID', async () => {
//       mockGetMovie.mockResolvedValue(movie);
//       mockGetCategoryById.mockResolvedValue(category);
//       const rtoMovie = await movieService.getMoviesbyId('someMovieId');
//       const rtoCategory = await movieService.getMoviesbyCategory(rtoMovie.category._id)  
        
//     });
//   });
// });
