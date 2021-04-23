import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CreDataSource} from '../datasources';
import {Status, StatusRelations} from '../models';

export class StatusRepository extends DefaultCrudRepository<
  Status,
  typeof Status.prototype.property_id,
  StatusRelations
> {
  constructor(
    @inject('datasources.cre') dataSource: CreDataSource,
  ) {
    super(Status, dataSource);
  }
}
