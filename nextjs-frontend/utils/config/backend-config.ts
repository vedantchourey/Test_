import getConfig from 'next/config';
import { IBackendConfig } from './i-backend-config';

const { serverRuntimeConfig } = getConfig()
const backendConfig: IBackendConfig = serverRuntimeConfig.backendConfig;

export default backendConfig
