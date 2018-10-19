import { Container } from 'inversify';
import { RegistrableController } from '../controller/RegistrableController';
import Types from './types';
import { PreferenceController } from '../controller/preferenceController';
import { PreferenceService, PreferenceServiceImpl } from '../service/preferenceService';
import { PreferenceRepository } from '../repository/preferenceRepository';

const container: Container = new Container();

// Controllers
container.bind<RegistrableController>(Types.Controller).to(PreferenceController);

// Services
container.bind<PreferenceService>(Types.PreferenceService).to(PreferenceServiceImpl).inSingletonScope();

// Repositories
container.bind<PreferenceRepository>(Types.PreferenceRepository).to(PreferenceRepository).inSingletonScope();


export { container };