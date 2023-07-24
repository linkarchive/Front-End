import { setupServer as setupNodeServer } from 'msw/node';
import { setupTestEnvironment } from '@test/utils/setupTestEnvironment';
import { handlers } from '@test/Settings/mocks/handlers';

const server = setupNodeServer(...handlers);

export const setupServer = () => setupTestEnvironment(server);
