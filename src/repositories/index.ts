import { connection } from '../config/databases';
import CategotyRepository from './categories.repositories';
import MovieRepository from './movie.repositories';

const movieRepository = new MovieRepository(connection);
const categotyRepository = new CategotyRepository(connection);

export { movieRepository,categotyRepository };
