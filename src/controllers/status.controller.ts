import {
  Count,
  CountSchema,
  Filter, repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Status} from '../models';
import {StatusRepository} from '../repositories';

export class StatusController {
  constructor(
    @repository(StatusRepository)
    public statusRepository : StatusRepository,
  ) {}

  @post('/statuses')
  @response(200, {
    description: 'Status model instance',
    content: {'application/json': {schema: getModelSchemaRef(Status)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Status, {
            title: 'NewStatus',
            exclude:['id']

          }),
        },
      },
    })
    status: Omit<Status,'id'>
  ): Promise<Status> {
    return this.statusRepository.create(status);
  }

  @get('/statuses/count')
  @response(200, {
    description: 'Status model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Status) where?: Where<Status>,
  ): Promise<Count> {
    return this.statusRepository.count(where);
  }

  @get('/statuses')
  @response(200, {
    description: 'Array of Status model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Status, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Status) filter?: Filter<Status>,
  ): Promise<Status[]> {
    return this.statusRepository.find(filter);
  }

  @patch('/statuses')
  @response(200, {
    description: 'Status PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Status, {partial: true}),
        },
      },
    })
    status: Status,
    @param.where(Status) where?: Where<Status>,
  ): Promise<Count> {
    return this.statusRepository.updateAll(status, where);
  }

  @get('/statuses/{property_id}')
  @response(200, {
    description: 'Status model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Status, {includeRelations: true}),
      },
    },
  })
  async findBy(
    @param.path.string('property_id') property_id: string,


  ): Promise<any> {
    const sql = await this.statusRepository.execute(
      `select * from ${process.env.DB_SCHEMA}.tgt_lead_status where property_id = '${property_id}' order by inserted_date DESC
      `
    )
    return sql;

  }

  @patch('/statuses/{id}')
  @response(204, {
    description: 'Status PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Status, {partial: true}),
        },
      },
    })
    status: Status,
  ): Promise<void> {
    await this.statusRepository.updateById(id, status);
  }

  @put('/statuses/{id}')
  @response(204, {
    description: 'Status PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() status: Status,
  ): Promise<void> {
    await this.statusRepository.replaceById(id, status);
  }

  @del('/statuses/{id}')
  @response(204, {
    description: 'Status DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.statusRepository.deleteById(id);
  }
}
