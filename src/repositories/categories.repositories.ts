import { Connection, Model, ObjectId } from 'mongoose';
import { ICategory,categorySchema } from '@/models/mongo/categoria.schema';
import { ICategoriRepository } from '@/models';
class CategoriRepository implements ICategoriRepository<ICategory>{
  private readonly model: Model<ICategory>;

  constructor(private readonly connection: Connection) {
    this.model = this.connection.model('Category', categorySchema);
  }
  async getCategories(): Promise<ICategory[]> {
    return this.model.find().lean();;
  }
  async getCategoryById(categoryId: ObjectId): Promise<ICategory | null> {
    return await this.model.findById(categoryId); 
  }
}

export default CategoriRepository;
