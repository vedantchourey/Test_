import getConfig from 'next/config';
import { IFrontendConfig } from './i-frontend-config';

const { publicRuntimeConfig } = getConfig()
const config: IFrontendConfig = publicRuntimeConfig.frontendConfig;

export default config
