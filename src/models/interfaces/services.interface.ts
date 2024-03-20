
interface IMovieService<T,K> {
    getMoviesbyId(MovieIds:string):Promise<T>
    getMoviesbyCategory(CategorieIds: string): Promise< T[] | null> ;
    getCategory(): Promise< K[] | null> 
}

export { IMovieService };
