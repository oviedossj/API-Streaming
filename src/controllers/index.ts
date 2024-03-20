import MovieController from './movie.controller'
import { movieService } from '../services';

const movieController = new MovieController(movieService);

export { movieController  };
