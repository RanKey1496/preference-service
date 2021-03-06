import { Container } from 'inversify';
import { RegistrableController } from '../controller/RegistrableController';
import Types from './types';
import { PreferenceController } from '../controller/preferenceController';
import { PreferenceService, PreferenceServiceImpl } from '../service/preferenceService';
import { PreferenceRepository } from '../repository/preferenceRepository';
import { ProductService } from '../service/productService';
import { ProductServiceImp } from '../service/productService';

const container: Container = new Container();

// Controllers
container.bind<RegistrableController>(Types.Controller).to(PreferenceController);

// Repositories
container.bind<PreferenceRepository>(Types.PreferenceRepository).to(PreferenceRepository).inSingletonScope();

// Services
container.bind<PreferenceService>(Types.PreferenceService).to(PreferenceServiceImpl).inSingletonScope();
container.bind<ProductService>(Types.ProductService).to(ProductServiceImp).inSingletonScope();

export { container };