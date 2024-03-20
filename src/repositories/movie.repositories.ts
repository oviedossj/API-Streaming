import { Connection, Model } from 'mongoose';
import { IMovie,movieSchema } from '@/models/mongo/movie.schema';
import { IMovieRepository } from '@/models';
class MovieRepository implements IMovieRepository<IMovie> {
  private readonly model: Model<IMovie>;

  constructor(private readonly connection: Connection) {
    this.model = this.connection.model('Flims', movieSchema);
  }
  /**
   * Function to search for documents by Category
   * @param {string} CategorieIds - The MovieIds used for filtering documents.
   */
  async getMovies(CategorieIds: string): Promise<IMovie[]> {
    return this.model.find({
      category: { $in: CategorieIds },
    }).lean();;
  }
  async getMovie(MovieIds: string): Promise<IMovie | null> {
    const data = await this.model.findById(MovieIds).lean();
    return data;
  }
  
}

export default MovieRepository;
