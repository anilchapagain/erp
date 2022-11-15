/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Supercomp} from '../models';
import {SupercompRepository} from '../repositories';

export class SupercompanyController {
  constructor(
    @repository(SupercompRepository)
    public supercompRepository: SupercompRepository,
  ) {}

  @post('/supercomps/users/database')
  @response(200, {
    description: 'Supercomp model instance',
    content: {'application/json': {schema: getModelSchemaRef(Supercomp)}},
  })
  async createsud(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Supercomp, {
            title: 'NewSupercomp',
            exclude: ['id'],
          }),
        },
      },
    })
    supercomp: Omit<Supercomp, 'id'>,
  ): Promise<any> {
    let checkdb = [];
    checkdb.length = 0;
    const sql = `  select schema_name
from information_schema.schemata where schema_name = '${supercomp.db_name}'`;
    checkdb = await this.supercompRepository.dataSource.execute(
      `
    ${sql}
      `,
    );
    console.log('sql', sql);
    console.log('checkdb', checkdb);
    // return checkdb;

    if (checkdb.length > 0) {
      return `duplicate schema found ${checkdb}`;
    }
    const schem = await this.supercompRepository.dataSource.execute(`
    create schema  ${supercomp.db_name}
    `);
    const createtable = await this.supercompRepository.dataSource.execute(`
    CREATE TABLE ${supercomp.db_name}.erpusers (
      id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
      username varchar NULL,
      "password" varchar NULL
    );
    `);
    const createuser = await this.supercompRepository.dataSource.execute(`
    INSERT INTO ${supercomp.db_name}.erpusers
(username, "password")
VALUES('${supercomp.name}', '${supercomp.password}');
    `);
    const add = await this.supercompRepository.create(supercomp);

    return 'added db ';
  }

  @post('/supercomps')
  @response(200, {
    description: 'Supercomp model instance',
    content: {'application/json': {schema: getModelSchemaRef(Supercomp)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Supercomp, {
            title: 'NewSupercomp',
            exclude: ['id'],
          }),
        },
      },
    })
    supercomp: Omit<Supercomp, 'id'>,
  ): Promise<Supercomp> {
    return this.supercompRepository.create(supercomp);
  }

  @get('/supercomps/count')
  @response(200, {
    description: 'Supercomp model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Supercomp) where?: Where<Supercomp>,
  ): Promise<Count> {
    return this.supercompRepository.count(where);
  }

  @get('/supercomps')
  @response(200, {
    description: 'Array of Supercomp model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Supercomp, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Supercomp) filter?: Filter<Supercomp>,
  ): Promise<Supercomp[]> {
    return this.supercompRepository.find(filter);
  }

  @patch('/supercomps')
  @response(200, {
    description: 'Supercomp PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Supercomp, {partial: true}),
        },
      },
    })
    supercomp: Supercomp,
    @param.where(Supercomp) where?: Where<Supercomp>,
  ): Promise<Count> {
    return this.supercompRepository.updateAll(supercomp, where);
  }

  @get('/supercomps/{id}')
  @response(200, {
    description: 'Supercomp model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Supercomp, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Supercomp, {exclude: 'where'})
    filter?: FilterExcludingWhere<Supercomp>,
  ): Promise<Supercomp> {
    return this.supercompRepository.findById(id, filter);
  }

  @patch('/supercomps/{id}')
  @response(204, {
    description: 'Supercomp PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Supercomp, {partial: true}),
        },
      },
    })
    supercomp: Supercomp,
  ): Promise<void> {
    await this.supercompRepository.updateById(id, supercomp);
  }

  @put('/supercomps/{id}')
  @response(204, {
    description: 'Supercomp PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() supercomp: Supercomp,
  ): Promise<void> {
    await this.supercompRepository.replaceById(id, supercomp);
  }

  @del('/supercomps/{id}')
  @response(204, {
    description: 'Supercomp DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.supercompRepository.deleteById(id);
  }
}
