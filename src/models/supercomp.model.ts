import {Entity, model, property} from '@loopback/repository';

@model({settings: {postgresql: {table: 'super_comp'}}, })
export class Supercomp extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  nos_of_user_created?: string;

  @property({
    type: 'string',
  })
  nos_of_user?: string;

  @property({
    type: 'string',
  })
  db_name?: string;

  @property({
    type: 'string',
  })
  ip?: string;

  @property({
    type: 'string',
  })
  username: string;

  @property({
    type: 'string',
  })
  password: string;

  @property({
    type: 'string',
  })
  comp_email?: string;
  @property({
    type: 'boolean',
  })
  active?: boolean;


  constructor(data?: Partial<Supercomp>) {
    super(data);
  }
}

export interface SupercompRelations {
  // describe navigational properties here
}

export type SupercompWithRelations = Supercomp & SupercompRelations;
