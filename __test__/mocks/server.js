import { setupServer } from 'msw/node';
import { handlers as ProfileHandlers } from '@test/Profile/handlers';
import { handlers as SettingsHandlers } from '@test/Settings/handlers';

export const server = setupServer(...ProfileHandlers, ...SettingsHandlers);
