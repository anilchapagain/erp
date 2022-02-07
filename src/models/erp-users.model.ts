import {Entity, model, property} from '@loopback/repository';

@model()
export class ErpUsers extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  username?: string;

  @property({
    type: 'string',
  })
  password?: string;


  constructor(data?: Partial<ErpUsers>) {
    super(data);
  }
}

export interface ErpUsersRelations {
  // describe navigational properties here
}

export type ErpUsersWithRelations = ErpUsers & ErpUsersRelations;
