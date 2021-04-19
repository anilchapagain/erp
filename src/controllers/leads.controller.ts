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
    @param.query.string('market') market?: string,
  ): Promise<any>{
    if (
      market !== '' && market !== undefined
    ) {
      const mar = market.split(',');
      const marq = "'" + mar.join("','") + "'";
    const sql = await this.leadsRepository.dataSource.execute(`
    select distinct(submarket) from cre.tgt_lead_gen where market in (${marq})
    `);
    // console.log(sql);
    return sql
    }
    else if (market === '' || market === undefined) {
      const sql = await this.leadsRepository.dataSource.execute(`select distinct(submarket) from cre.tgt_lead_gen`);
      return sql
    }
    else if (Error()) {
      throw new HttpErrors.InternalServerError();
    }

  }
  @get('/probability')
  @response(200, {
    description: 'Array of Leads model instances',

  })
  async findprobability(
    @param.query.string('market') market?: string,
    ): Promise<any>{
      if (
        market !== '' && market !== undefined
      ) {
        const mar = market.split(',');
        const marq = "'" + mar.join("','") + "'";
      const sql = await this.leadsRepository.dataSource.execute(`
      select distinct(probability) from cre.tgt_lead_gen where market in (${marq})
      `);
      // console.log(sql);
      return sql
      }
      else if (market === '' || market === undefined) {
        const sql = await this.leadsRepository.dataSource.execute(`select distinct(probability) from cre.tgt_lead_gen`);
        return sql
      }
      else if (Error()) {
        throw new HttpErrors.InternalServerError();
      }
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
      const loca = sub_market.split(',');
      const locaq = "'" + loca.join("','") + "'";
      const mar = market.split(',');
      const marq = "'" + mar.join("','") + "'";
      const pro = sale_propensity.split(',');
      const proq = "'" + pro.join("','") + "'";


      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = ('${year}')
      and extract (month from last_update_date) = ('${month}')
      and market in (${marq})
      and submarket in (${locaq})
      and probability in (${proq})
      order by case probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
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
      const loca = sub_market.split(',');
      const locaq = "'" + loca.join("','") + "'";
      const pro = sale_propensity.split(',');
      const proq = "'" + pro.join("','") + "'";
      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = '${year}'
      and extract (month from last_update_date) = '${month}'
      and submarket in (${locaq})
      and probability = '${proq}'
      order by case probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
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
      const loca = sub_market.split(',');
      const locaq = "'" + loca.join("','") + "'";
      const mar = market.split(',');
      const marq = "'" + mar.join("','") + "'";
      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = ('${year}')
      and extract (month from last_update_date) = ('${month}')
      and market in (${marq})
      and submarket in (${locaq})
      order by case probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
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
      const loca = sale_propensity.split(',');
      const locaq = "'" + loca.join("','") + "'";
      const mar = market.split(',');
      const marq = "'" + mar.join("','") + "'";
      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = '${year}'
      and extract (month from last_update_date) = '${month}'
      and market in (${marq})
      and probability in (${locaq})
      order by case probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
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
      const mar = market.split(',');
      const marq = "'" + mar.join("','") + "'";
      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = ('${year}')
      and extract (month from last_update_date) = ('${month}')
      and market in (${marq})
      order by case probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
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
      const loca = sub_market.split(',');
      const locaq = "'" + loca.join("','") + "'";
      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = '${year}'
      and extract (month from last_update_date) = '${month}'
      and submarket in (${locaq})
      order by case probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
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
      const loca = sale_propensity.split(',');
      const locaq = "'" + loca.join("','") + "'";
      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = '${year}'
      and extract (month from last_update_date) = '${month}'
      and probability in (${locaq})
      order by case probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
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
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
      end
      limit 100`;
      const sql = await this.leadsRepository.dataSource.execute(`
      select * from cre.tgt_lead_gen where extract (YEAR FROM last_update_date) = '${year}'
      and extract (month from last_update_date) = '${month}'
      order by case probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
      end
      limit 100
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


