import { ObjectId } from "mongoose";

export interface IMovieRepository<T> {
    getMovies(CategorieIds: string): Promise<T[]>;
    getMovie(movieIds: string): Promise<T | null>;
  }

  
export interface ICategoriRepository<K> {
    getCategories(): Promise<K[]>;
    getCategoryById(categoryId: ObjectId):Promise<K|null>;
}

