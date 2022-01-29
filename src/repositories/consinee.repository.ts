import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ErpDataSource} from '../datasources';
import {Consinee, ConsineeRelations} from '../models';

export class ConsineeRepository extends DefaultCrudRepository<
  Consinee,
  typeof Consinee.prototype.id,
  ConsineeRelations
> {
  constructor(
    @inject('datasources.erp') dataSource: ErpDataSource,
  ) {
    super(Consinee, dataSource);
  }
}
