import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ErpDataSource} from '../datasources';
// import {CreDataSource} from '../datasources';
import {User, UserRelations} from '../models/user.model';

export type Credentials = {
  username: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  // constructor(@inject('datasources.cre') dataSource: CreDataSource) {
  constructor(@inject('datasources.erp') dataSource: ErpDataSource) {
    super(User, dataSource);
  }
}
