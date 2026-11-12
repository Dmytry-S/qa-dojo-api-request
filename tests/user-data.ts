import { faker } from '@faker-js/faker';

interface User {
    username: string;
    email: string;
    password: string;
}

function createUser(): User {
    return {
        username: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }
}

export { createUser };