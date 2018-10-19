import { unmanaged, injectable } from 'inversify';

export type Query<T> = {
    [P in keyof T]?: T[P] | { $regex: RegExp };
};

export interface Repository<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T>;
    findManyById(ids: number[]): Promise<T[]>;
    findByQuery(query?: Query<T>): Promise<T[]>;
    update(id: number, item: T): Promise<boolean>;
    save(data: T): Promise<T>;
    delete(id: number): Promise<boolean>;
}

@injectable()
export abstract class GenericRepositoryImp<TEntity> implements Repository<TEntity> {
    findAll(): Promise<TEntity[]> {
        throw new Error('Method not implemented.');
    }
    findById(id: number): Promise<TEntity> {
        throw new Error('Method not implemented.');
    }
    findManyById(ids: number[]): Promise<TEntity[]> {
        throw new Error('Method not implemented.');
    }
    findByQuery(query?: Query<TEntity>): Promise<TEntity[]> {
        throw new Error('Method not implemented.');
    }
    update(id: number, item: TEntity): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    save(data: TEntity): Promise<TEntity> {
        throw new Error('Method not implemented.');
    }
    delete(id: number): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}