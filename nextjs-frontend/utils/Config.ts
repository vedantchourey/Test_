import getConfig from 'next/config';
import { IFrontendConfig } from './IFrontendConfig';

const { publicRuntimeConfig } = getConfig()
const config: IFrontendConfig = publicRuntimeConfig.frontendConfig;

export default config
