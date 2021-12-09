import getConfig from 'next/config';
import { IFrontendConfig } from './i-frontend-config';

const { publicRuntimeConfig } = getConfig()
const frontEndConfig: IFrontendConfig = publicRuntimeConfig.frontendConfig;

export default frontEndConfig
