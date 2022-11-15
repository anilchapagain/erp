import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ErpDataSource} from '../datasources';
import {Supercomp, SupercompRelations} from '../models';

export class SupercompRepository extends DefaultCrudRepository<
  Supercomp,
  typeof Supercomp.prototype.id,
  SupercompRelations
> {
  constructor(
    @inject('datasources.erp') dataSource: ErpDataSource,
  ) {
    super(Supercomp, dataSource);
  }
}
