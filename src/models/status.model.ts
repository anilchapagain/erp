import {Entity, model, property} from '@loopback/repository';

@model({settings: { postgresql: { schema: 'cre', table: 'tgt_lead_status'} }, })
export class Status extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  property_id: string;

  @property({
    type: 'string',
  })
  user?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'date',
    required: true,
  })
  inserted_date: string;


  constructor(data?: Partial<Status>) {
    super(data);
  }
}

export interface StatusRelations {
  // describe navigational properties here
}

export type StatusWithRelations = Status & StatusRelations;
