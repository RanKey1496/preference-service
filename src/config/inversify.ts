import { Container } from 'inversify';
import { RegistrableController } from '../controller/RegistrableController';
import Types from './types';
import { PreferenceController } from '../controller/preferenceController';
import { PreferenceService, PreferenceServiceImpl } from '../service/preferenceService';
import { PreferenceRepository } from '../repository/preferenceRepository';
// import { AuthRepository } from '../repository/authRepository';
// import { AuthService, AuthServiceImp } from '../service/authService';

const container: Container = new Container();

// Controllers
container.bind<RegistrableController>(Types.Controller).to(PreferenceController);

// Repositories
// container.bind<AuthRepository>(Types.AuthRepository).to(AuthRepository).inSingletonScope();
container.bind<PreferenceRepository>(Types.PreferenceRepository).to(PreferenceRepository).inSingletonScope();

// Services
// container.bind<AuthService>(Types.AuthService).to(AuthServiceImp).inSingletonScope();
container.bind<PreferenceService>(Types.PreferenceService).to(PreferenceServiceImpl).inSingletonScope();

export { container };