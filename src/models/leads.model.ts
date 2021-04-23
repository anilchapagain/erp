import {Entity, model, property} from '@loopback/repository';

@model({settings: { postgresql: { schema: 'cre', table: 'tgt_lead_gen'} }, })
export class Leads extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  property_id?: string;

  @property({
    type: 'string',
  })
  market?: string;

  @property({
    type: 'string',
  })
  property_name?: string;

  @property({
    type: 'string',
  })
  property_address?: string;

  @property({
    type: 'string',
  })
  property_zip_code?: string;

  @property({
    type: 'string',
  })
  property_phone?: string;

  @property({
    type: 'string',
  })
  property_units?: string;


  constructor(data?: Partial<Leads>) {
    super(data);
  }
}

export interface LeadsRelations {
  // describe navigational properties here
}

export type LeadsWithRelations = Leads & LeadsRelations;
