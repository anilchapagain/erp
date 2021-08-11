import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CreDataSource} from '../datasources';
import {Usersession, UsersessionRelations} from '../models';

export class UsersessionRepository extends DefaultCrudRepository<
  Usersession,
  typeof Usersession.prototype.id,
  UsersessionRelations
> {
  constructor(
    @inject('datasources.cre') dataSource: CreDataSource,
  ) {
    super(Usersession, dataSource);
  }
}
