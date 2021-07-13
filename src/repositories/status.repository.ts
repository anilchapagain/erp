import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CreDataSource} from '../datasources';
import {Status, StatusRelations} from '../models';

export class StatusRepository extends DefaultCrudRepository<
  Status,
  typeof Status.prototype.id,
  StatusRelations
> {
  constructor(
    @inject('datasources.cre') dataSource: CreDataSource,
  ) {
    super(Status, dataSource);
  }
  // public async findBy(
  //   property_id: string,
  //   order:'inserted_date DESC',
  // ): Promise<any> {
  //   // const typefilter = {where: {flow_type: flow_type}};
  //   const propertyfilter = {order:[{order}],where: {property_id: property_id}};
  //   const found = await this.find(propertyfilter);
  //   // const found1 = await this.find(typefilterorder);
  //   return found;
  // }
}
