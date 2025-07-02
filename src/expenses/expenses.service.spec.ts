// src/expenses/expenses.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './entities/expense.entity';
import { User } from '../users/entities/user.entity';
import { MailService } from '../mail/mail.service';

const mockUser: User = {
  id: 'user-uuid-123',
  name: 'Test User',
  email: 'test@user.com',
  password: 'hashedpassword',
  expenses: [],
};


const mockExpense: Expense = {
  id: 'expense-uuid-456',
  description: 'Test Expense',
  date: new Date('2025-07-01'),
  value: 100,
  user: mockUser,
};

describe('ExpensesService', () => {
  let service: ExpensesService;
  let repository: Repository<Expense>;

  const mockExpensesRepository = {
    create: jest.fn().mockResolvedValue(mockExpense),
    save: jest.fn().mockResolvedValue(mockExpense),
    find: jest.fn().mockResolvedValue([mockExpense]),
    findOneBy: jest.fn().mockResolvedValue(mockExpense),
    remove: jest.fn().mockResolvedValue(mockExpense),
  };

  const mockMailService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        {
          provide: getRepositoryToken(Expense),
          useValue: mockExpensesRepository,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
    repository = module.get<Repository<Expense>>(getRepositoryToken(Expense));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return an expense', async () => {
      const createDto = {
        description: 'Test Expense',
        date: new Date('2025-07-01'),
        value: 100,
      };

      jest.spyOn(repository, 'create').mockReturnValueOnce(mockExpense as any);
      
      const result = await service.create(createDto, mockUser);

      expect(repository.create).toHaveBeenCalledWith({
        ...createDto,
        user: mockUser,
      });
      expect(repository.save).toHaveBeenCalledWith(mockExpense);
      expect(mockMailService.sendMail).toHaveBeenCalled();
      expect(result).toEqual(mockExpense);
    });
  });

  describe('findAll', () => {
    it('should return an array of expenses for a user', async () => {
      const result = await service.findAll(mockUser);
      expect(repository.find).toHaveBeenCalledWith({
        where: { user: { id: mockUser.id } },
      });
      expect(result).toEqual([mockExpense]);
    });
  });

  describe('findOne', () => {
    it('should find and return an expense by ID for a specific user', async () => {
      const result = await service.findOne(mockExpense.id, mockUser);
      expect(repository.findOneBy).toHaveBeenCalledWith({
        id: mockExpense.id,
        user: { id: mockUser.id },
      });
      expect(result).toEqual(mockExpense);
    });

    it('should throw NotFoundException if expense is not found or does not belong to the user', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

      await expect(service.findOne('wrong-id', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should find an expense and remove it', async () => {
      await service.remove(mockExpense.id, mockUser);
      expect(repository.findOneBy).toHaveBeenCalledWith({
        id: mockExpense.id,
        user: { id: mockUser.id },
      });
      expect(repository.remove).toHaveBeenCalledWith(mockExpense);
    });

    it('should throw NotFoundException when trying to remove an expense that does not exist', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);
      await expect(service.remove('wrong-id', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
