import MovieService from './movie.service';
import {categotyRepository, movieRepository } from '../repositories';
const movieService = new MovieService(movieRepository,categotyRepository);

export { movieService };
