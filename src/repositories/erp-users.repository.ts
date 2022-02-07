import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ErpusersDataSource} from '../datasources';
import {ErpUsers, ErpUsersRelations} from '../models';

export class ErpUsersRepository extends DefaultCrudRepository<
  ErpUsers,
  typeof ErpUsers.prototype.id,
  ErpUsersRelations
> {
  constructor(
    @inject('datasources.erpusers') dataSource: ErpusersDataSource,
  ) {
    super(ErpUsers, dataSource);
  }
}
