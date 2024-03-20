export interface IMovieController<T,K>{
    getMoviesbyId(MovieIds:string):Promise<T>
    getMovieXCategory(CategorieIds:string):Promise<T[]>
    Categories():Promise<K[]>

}