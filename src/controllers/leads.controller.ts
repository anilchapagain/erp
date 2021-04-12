import {
  repository
} from '@loopback/repository';
import {
  get,
  HttpErrors,
  param,
  response
} from '@loopback/rest';
import {LeadsRepository} from '../repositories';

export class LeadsController {
  constructor(
    @repository(LeadsRepository)
    public leadsRepository : LeadsRepository,
  ) {}

  // @post('/leads')
  // @response(200, {
  //   description: 'Leads model instance',
  //   content: {'application/json': {schema: getModelSchemaRef(Leads)}},
  // })
  // async create(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Leads, {
  //           title: 'NewLeads',
  //           exclude: ['property_id'],
  //         }),
  //       },
  //     },
  //   })
  //   leads: Omit<Leads, 'property_id'>,
  // ): Promise<Leads> {
  //   return this.leadsRepository.create(leads);
  // }


  @get('/market')
  @response(200, {
    description: 'Array of Leads model instances',

  })
  async findmarket(
  ): Promise<any>{
    const sql = this.leadsRepository.dataSource.execute(`
    select distinct(market) from cre.tgt_lead_gen
    `);
    console.log(sql);
    return sql
  }
  @get('/submarket')
  @response(200, {
    description: 'Array of Leads model instances',

  })
  async findsubmarket(
  ): Promise<any>{
    const sql = this.leadsRepository.dataSource.execute(`
    select distinct(submarket) from cre.tgt_lead_gen
    `);
    console.log(sql);
    return sql
  }
  @get('/probability')
  @response(200, {
    description: 'Array of Leads model instances',

  })
  async findprobability(
  ): Promise<any>{
    const sql = this.leadsRepository.dataSource.execute(`
    select distinct(probability) from cre.tgt_lead_gen
    `);
    console.log(sql);
    return sql
  }


  @get('/leads')
  @response(200, {
    description: 'Array of Leads model instances',

  })
  async find(
    @param.query.string('year') year?: string,
    @param.query.string('month') month?: string,
    @param.query.string('market') market?: string,
    @param.query.string('sub_market') sub_market?: string,
    @param.query.string('sale_propensity') sale_propensity?: string,
  ): Promise<any> {
    if (year !== '' && year !== undefined
      && month !== '' && month !== undefined
      && market !== '' && market !== undefined
      && sub_market !== '' && sub_market !== undefined
      && sale_propensity !== '' && sale_propensity !== undefined
      )
    {
      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = ('${year}')
      and extract (month from last_update_date) = ('${month}')
      and market = '${market}'
      and submarket = '${sub_market}'
      and probability = '${sale_propensity}'
      order by case probability
      when 'High' then 1
      when 'Medium' then 2
      when 'Low' then 3
      when 'Not for Sale' then 4
      end

      `);
      // console.log(sql)
      if (sql.length > 0) {
        return sql
      }
      else return 'no data matched'
    }
    else if (
      year !== '' && year !== undefined
      && month !== '' && month !== undefined
      && sub_market !== '' && sub_market !== undefined
      && sale_propensity !== '' && sale_propensity !== undefined
    )
    {
      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = '${year}'
      and extract (month from last_update_date) = '${month}'
      and submarket = '${sub_market}'
      and probability = '${sale_propensity}'
      order by case probability
      when 'High' then 1
      when 'Medium' then 2
      when 'Low' then 3
      when 'Not for Sale' then 4
      end
      `);
      // console.log(sql)
      if (sql.length > 0) {
        return sql
      }
      else return 'no data matched'
    }


    else if (
      year !== '' && year !== undefined
      && month !== '' && month !== undefined
      && market !== '' && market !== undefined
      && sub_market !== '' && sub_market !== undefined
    )
    {
      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = ('${year}')
      and extract (month from last_update_date) = ('${month}')
      and market = '${market}'
      and submarket = '${sub_market}'
      order by case probability
      when 'High' then 1
      when 'Medium' then 2
      when 'Low' then 3
      when 'Not for Sale' then 4
      end


      `);
      // console.log(sql)
      if (sql.length > 0) {
        return sql
      }
      else return 'no data matched'
    }

    else if (
      year !== '' && year !== undefined
      && month !== '' && month !== undefined
      && market !== '' && market !== undefined
      && sale_propensity !== '' && sale_propensity !== undefined
    )
    {
      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = '${year}'
      and extract (month from last_update_date) = '${month}'
      and market = '${market}'
      and probability = '${sale_propensity}'
      order by case probability
      when 'High' then 1
      when 'Medium' then 2
      when 'Low' then 3
      when 'Not for Sale' then 4
      end
      `);
      // console.log(sql)
      if (sql.length > 0) {
        return sql
      }
      else return 'no data matched'
    }
    else if (year !== '' && year !== undefined
    && month !== '' && month !== undefined
      && market !== '' && market !== undefined
    )
    {
      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = ('${year}')
      and extract (month from last_update_date) = ('${month}')
      and market = '${market}'
      order by case probability
      when 'High' then 1
      when 'Medium' then 2
      when 'Low' then 3
      when 'Not for Sale' then 4
      end
      `);
      // console.log(sql)
      if (sql.length > 0) {
        return sql
      }
      else return 'no data matched'
    }
    else if (
      year !== '' && year !== undefined
      && month !== '' && month !== undefined
      && sub_market !== '' && sub_market !== undefined
    )
    {
      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = '${year}'
      and extract (month from last_update_date) = '${month}'
      and submarket = '${sub_market}'
      order by case probability
      when 'High' then 1
      when 'Medium' then 2
      when 'Low' then 3
      when 'Not for Sale' then 4
      end
      `);
      // console.log(sql)
      if (sql.length > 0) {
        return sql
      }
      else return 'no data matched'
    }
    else if (
      year !== '' && year !== undefined
      && month !== '' && month !== undefined
      && sale_propensity !== '' && sale_propensity !== undefined
    )
    {
      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = '${year}'
      and extract (month from last_update_date) = '${month}'
      and probability = '${sale_propensity}'
      order by case probability
      when 'High' then 1
      when 'Medium' then 2
      when 'Low' then 3
      when 'Not for Sale' then 4
      end
      `);
      // console.log(sql)
      if (sql.length > 0) {
        return sql
      }
      else return 'no data matched'
    }
    else if (
      year !== '' && year !== undefined
      && month !== '' && month !== undefined
    )
    {
      const sql1 = `select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = '${year}'
      and extract (month from last_update_date) = '${month}'
      order by case probability
      when 'High' then 1
      when 'Medium' then 2
      when 'Low' then 3
      when 'Not for Sale' then 4
      end
      limit 1000`;
      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = '${year}'
      and extract (month from last_update_date) = '${month}'
      order by case probability
      when 'High' then 1
      when 'Medium' then 2
      when 'Low' then 3
      when 'Not for Sale' then 4
      end
      limit 1000
      `);
      console.log(sql1)
      if (sql.length > 0) {
        return sql
      }
      else return 'no data matched'
    }
      else if (Error()) {
        throw new HttpErrors.InternalServerError();
      }






  }



  // @get('/leads/{id}')
  // @response(200, {
  //   description: 'Leads model instance',
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(Leads, {includeRelations: true}),
  //     },
  //   },
  // })
  // async findById(
  //   @param.path.string('id') id: string,
  //   @param.filter(Leads, {exclude: 'where'}) filter?: FilterExcludingWhere<Leads>
  // ): Promise<Leads> {
  //   return this.leadsRepository.findById(id, filter);
  // }

  // @patch('/leads/{id}')
  // @response(204, {
  //   description: 'Leads PATCH success',
  // })
  // async updateById(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Leads, {partial: true}),
  //       },
  //     },
  //   })
  //   leads: Leads,
  // ): Promise<void> {
  //   await this.leadsRepository.updateById(id, leads);
  // }




}


