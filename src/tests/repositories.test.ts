import { connection } from '../config/databases';
import CategotyRepository from '@repositories/categories.repositories';
import mongoose from 'mongoose';

const mockCategories = [
  {
    _id: new mongoose.Types.ObjectId().toString(), 
    name: "Science Fiction",
    flims: [new mongoose.Types.ObjectId().toString(), new mongoose.Types.ObjectId().toString()],
  },
  {
    _id: new mongoose.Types.ObjectId().toString(), 
    name: "Action",
    flims: [new mongoose.Types.ObjectId().toString(), new mongoose.Types.ObjectId().toString()],
  }
];

const mockModel = {
  find: jest.fn().mockReturnThis(), 
  findById: jest.fn().mockReturnThis(), 
  lean: jest.fn().mockResolvedValue(mockCategories),
};

jest.mock('../config/databases', () => ({
  connection: {
    model: jest.fn(() => mockModel)
  }
}));

describe('**verification the method CategotyRepository', () => {
  let categoryRepository: CategotyRepository;

  beforeAll(() => {
    categoryRepository = new CategotyRepository(connection);
  });

  beforeEach(() => {
    mockModel.find.mockClear();
    mockModel.findById.mockClear();
    mockModel.lean.mockClear();
  });

  describe('getCategories', () => {
    test('should return a list of categories', async () => {
      const categories = await categoryRepository.getCategories();
      expect(categories).toEqual(mockCategories);
      expect(mockModel.find).toHaveBeenCalledTimes(1);
      expect(mockModel.lean).toHaveBeenCalledTimes(1);
    });
    test('should return an empty array if there are no categories', async () => {
      mockModel.find.mockReturnThis();
      mockModel.lean.mockResolvedValue([]);
  
      const categories = await categoryRepository.getCategories();
      expect(categories).toEqual([]); 
      expect(mockModel.find).toHaveBeenCalledTimes(1); 
      expect(mockModel.lean).toHaveBeenCalledTimes(1); 
    });
    test('should handle errors if the query fails', async () => {
      mockModel.find.mockReturnThis();
      mockModel.lean.mockRejectedValue(new Error("Error de base de datos")); 
      await expect(categoryRepository.getCategories()).rejects.toThrow("Error de base de datos");
      expect(mockModel.find).toHaveBeenCalledTimes(1);
      expect(mockModel.lean).toHaveBeenCalledTimes(1);
    });
    
  });
});
