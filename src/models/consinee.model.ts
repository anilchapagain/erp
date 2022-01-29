import {Entity, model, property} from '@loopback/repository';

@model()
export class Consinee extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'boolean',
  })
  active?: boolean;


  constructor(data?: Partial<Consinee>) {
    super(data);
  }
}

export interface ConsineeRelations {
  // describe navigational properties here
}

export type ConsineeWithRelations = Consinee & ConsineeRelations;
