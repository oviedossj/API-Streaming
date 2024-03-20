import YAML from 'yamljs';
import { config } from '../env';
import { errorHandler, unauthorized } from './handler';

const errors = YAML.load(config.DIR_ERRORS);

export { errors, errorHandler, unauthorized };
