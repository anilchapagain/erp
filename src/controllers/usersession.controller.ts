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
import {Usersession} from '../models';
import {UsersessionRepository} from '../repositories';

export class UsersessionController {
  constructor(
    @repository(UsersessionRepository)
    public usersessionRepository : UsersessionRepository,
  ) {}

  @post('/usersessions')
  @response(200, {
    description: 'Usersession model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usersession)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usersession, {
            title: 'NewUsersession',
            exclude: ['id'],
          }),
        },
      },
    })
    usersession: Omit<Usersession, 'id'>,
  ): Promise<Usersession> {
    return this.usersessionRepository.create(usersession);
  }

  @get('/usersessions/count')
  @response(200, {
    description: 'Usersession model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usersession) where?: Where<Usersession>,
  ): Promise<Count> {
    return this.usersessionRepository.count(where);
  }

  @get('/usersessions')
  @response(200, {
    description: 'Array of Usersession model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usersession, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usersession) filter?: Filter<Usersession>,
  ): Promise<Usersession[]> {
    return this.usersessionRepository.find(filter);
  }

  @patch('/usersessions')
  @response(200, {
    description: 'Usersession PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usersession, {partial: true}),
        },
      },
    })
    usersession: Usersession,
    @param.where(Usersession) where?: Where<Usersession>,
  ): Promise<Count> {
    return this.usersessionRepository.updateAll(usersession, where);
  }

  @get('/usersessions/{id}')
  @response(200, {
    description: 'Usersession model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usersession, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usersession, {exclude: 'where'}) filter?: FilterExcludingWhere<Usersession>
  ): Promise<Usersession> {
    return this.usersessionRepository.findById(id, filter);
  }

  @patch('/usersessions/{id}')
  @response(204, {
    description: 'Usersession PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usersession, {partial: true}),
        },
      },
    })
    usersession: Usersession,
  ): Promise<void> {
    await this.usersessionRepository.updateById(id, usersession);
  }

  @put('/usersessions/{id}')
  @response(204, {
    description: 'Usersession PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usersession: Usersession,
  ): Promise<void> {
    await this.usersessionRepository.replaceById(id, usersession);
  }

  @del('/usersessions/{id}')
  @response(204, {
    description: 'Usersession DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usersessionRepository.deleteById(id);
  }
}
