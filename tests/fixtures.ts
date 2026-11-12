import { test as base, expect } from '@playwright/test';
import { createUser } from './user-data';

type UserData = {
  username: string;
  email: string;
  password: string;
};

type MyFixtures = {
    registerUser: UserData;
};

const test = base.extend<MyFixtures>({
    registerUser: async ({ request, context, baseURL }, use) => {
        const newUser = createUser();
        const response = await request.post('/api/users', {
            data: { user: newUser },
            failOnStatusCode: true,
    });

    const json = await response.json();
    const token = json.user.token;

    await context.setStorageState({
        cookies: [],
        origins: [
            {
                origin: new URL(baseURL!).origin,
                localStorage: [{ name: 'qa-dojo.token', value: token }],
            },
        ],
    });

    await use(newUser);
    },
});

export { test, expect }