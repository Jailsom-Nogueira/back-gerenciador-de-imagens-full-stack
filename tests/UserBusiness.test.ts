import { UserBusiness } from '../src/business/UserBusiness';
import { User, UserInputDTO, UserRole } from '../src/model/User';

const userDatabase = {
  createUser: jest.fn(async (user: User) => {}),
  getUserByEmail: jest.fn((email: string) => undefined),
} as any;
const idGenerator = {
  generate: jest.fn(() => 'id mock'),
} as any;
const hashManager = {
  hash: jest.fn((password: string) => 'cypher password'),
  compare: jest.fn(async (s: string, hash: string) => true),
} as any;
const authenticator = {
  generateToken: jest.fn(
    (payload: { id: string; role: UserRole }) => 'token de mentirinha',
  ),
} as any;

const userBusiness: UserBusiness = new UserBusiness(
  userDatabase,
  idGenerator,
  hashManager,
  authenticator,
);

describe('Testa o método de cadastro', () => {
  test('Deve retornar erro quando um nome não for passado', async () => {
    expect.assertions(2);

    const input: UserInputDTO = {
      email: 'astrodev@labenu.com.br',
      name: '',
      password: 'bananinha',
      role: 'ADMIN',
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe('Um ou mais parâmetros faltando');
      expect(error.statusCode).toBe(422);
    }
  });

  test('Deve retornar erro quando um email não for passado', async () => {
    expect.assertions(2);

    const input: UserInputDTO = {
      email: '',
      name: 'Astro',
      password: 'bananinha',
      role: 'ADMIN',
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe('Um ou mais parâmetros faltando');
      expect(error.statusCode).toBe(422);
    }
  });
  test('Deve retornar erro quando uma senha for não for passada', async () => {
    expect.assertions(2);

    const input: UserInputDTO = {
      email: 'astrodev@labenu.com.br',
      name: 'Astro',
      password: '',
      role: 'ADMIN',
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe('Um ou mais parâmetros faltando');
      expect(error.statusCode).toBe(422);
    }
  });

  test('Deve retornar erro quando um role não for passado', async () => {
    expect.assertions(2);

    const input: UserInputDTO = {
      email: 'astrodev@labenu.com.br',
      name: 'Astro',
      password: 'bananinha',
      role: '',
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe('Um ou mais parâmetros faltando');
      expect(error.statusCode).toBe(422);
    }
  });

  test('Deve retornar erro quando o email for inválido', async () => {
    expect.assertions(2);

    const input: UserInputDTO = {
      email: 'astrodevlabenu.com.br',
      name: 'Astro',
      password: 'bananinha',
      role: 'ADMIN',
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe('Formato de email inválido');
      expect(error.statusCode).toBe(422);
    }
  });

  test('Deve retornar erro quando a senha for inválida', async () => {
    expect.assertions(2);

    const input: UserInputDTO = {
      email: 'astro@devlabenu.com.br',
      name: 'Astro',
      password: 'bana',
      role: 'ADMIN',
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe('Formato de senha inválida');
      expect(error.statusCode).toBe(422);
    }
  });

  test('Deve retornar erro quando o role for inválido', async () => {
    expect.assertions(2);

    const input: UserInputDTO = {
      email: 'astro@devlabenu.com.br',
      name: 'Astro',
      password: 'bananinha',
      role: 'DMIN',
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe(
        'Formato inválido, escolha entre "ADMIN" ou "NORMAL"',
      );
      expect(error.statusCode).toBe(422);
    }
  });
});
