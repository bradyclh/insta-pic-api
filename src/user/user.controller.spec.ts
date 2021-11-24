import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            find: jest.fn().mockResolvedValue([
              {
                id: 1,
                username: 'admin',
                status: 'REGISTERED',
                createdAt: '2021-11-23T16:47:09.068Z',
                updatedAt: '2021-11-23T16:47:09.068Z',
                deletedAt: null,
                roles: [
                  {
                    id: 2,
                    role: 'ADMIN',
                    createdAt: '2021-11-23T16:47:46.188Z',
                    updatedAt: '2021-11-23T16:47:46.188Z',
                    deletedAt: null,
                  },
                ],
              },
              {
                id: 2,
                username: 'user',
                status: 'INACTIVATED',
                createdAt: '2021-11-23T16:52:05.727Z',
                updatedAt: '2021-11-23T16:52:05.727Z',
                deletedAt: null,
                roles: [
                  {
                    id: 1,
                    role: 'USER',
                    createdAt: '2021-11-23T16:47:40.554Z',
                    updatedAt: '2021-11-23T16:47:40.554Z',
                    deletedAt: null,
                  },
                ],
              },
            ]),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should get user list', async () => {
    await expect(
      userController.find({
        limit: 10,
        pageIndex: 1,
        orderColumn: 'id',
        orderBy: 'asc',
      }),
    ).resolves.toEqual([
      {
        id: 1,
        username: 'admin',
        status: 'REGISTERED',
        createdAt: '2021-11-23T16:47:09.068Z',
        updatedAt: '2021-11-23T16:47:09.068Z',
        deletedAt: null,
        roles: [
          {
            id: 2,
            role: 'ADMIN',
            createdAt: '2021-11-23T16:47:46.188Z',
            updatedAt: '2021-11-23T16:47:46.188Z',
            deletedAt: null,
          },
        ],
      },
      {
        id: 2,
        username: 'user',
        status: 'INACTIVATED',
        createdAt: '2021-11-23T16:52:05.727Z',
        updatedAt: '2021-11-23T16:52:05.727Z',
        deletedAt: null,
        roles: [
          {
            id: 1,
            role: 'USER',
            createdAt: '2021-11-23T16:47:40.554Z',
            updatedAt: '2021-11-23T16:47:40.554Z',
            deletedAt: null,
          },
        ],
      },
    ]);
  });
});
