import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Consinee} from '../models';
import {ConsineeRepository} from '../repositories';

export class ConsineeController {
  constructor(
    @repository(ConsineeRepository)
    public consineeRepository : ConsineeRepository,
  ) {}

  @post('/consinees')
  @response(200, {
    description: 'Consinee model instance',
    content: {'application/json': {schema: getModelSchemaRef(Consinee)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consinee, {
            title: 'NewConsinee',
            exclude: ['id'],
          }),
        },
      },
    })
    consinee: Omit<Consinee, 'id'>,
  ): Promise<Consinee> {
    return this.consineeRepository.create(consinee);
  }

  @get('/consinees/count')
  @response(200, {
    description: 'Consinee model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Consinee) where?: Where<Consinee>,
  ): Promise<Count> {
    return this.consineeRepository.count(where);
  }

  @get('/consinees')
  @response(200, {
    description: 'Array of Consinee model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Consinee, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Consinee) filter?: Filter<Consinee>,
  ): Promise<Consinee[]> {
    return this.consineeRepository.find(filter);
  }

  @patch('/consinees')
  @response(200, {
    description: 'Consinee PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consinee, {partial: true}),
        },
      },
    })
    consinee: Consinee,
    @param.where(Consinee) where?: Where<Consinee>,
  ): Promise<Count> {
    return this.consineeRepository.updateAll(consinee, where);
  }

  @get('/consinees/{id}')
  @response(200, {
    description: 'Consinee model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Consinee, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Consinee, {exclude: 'where'}) filter?: FilterExcludingWhere<Consinee>
  ): Promise<Consinee> {
    return this.consineeRepository.findById(id, filter);
  }

  @patch('/consinees/{id}')
  @response(204, {
    description: 'Consinee PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consinee, {partial: true}),
        },
      },
    })
    consinee: Consinee,
  ): Promise<void> {
    await this.consineeRepository.updateById(id, consinee);
  }

  @put('/consinees/{id}')
  @response(204, {
    description: 'Consinee PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() consinee: Consinee,
  ): Promise<void> {
    await this.consineeRepository.replaceById(id, consinee);
  }

  @del('/consinees/{id}')
  @response(204, {
    description: 'Consinee DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.consineeRepository.deleteById(id);
  }
}
