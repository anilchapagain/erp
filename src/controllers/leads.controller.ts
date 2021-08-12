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
    public leadsRepository: LeadsRepository
  ) {}

  DB_SCHEMA = process.env.DB_SCHEMA


  @get('/market')
  @response(200, {
    description: 'Array of Leads model instances',

  })
  async findmarket(
  ): Promise<any>{
    const sql = this.leadsRepository.dataSource.execute(`
    select distinct(market) from ${this.DB_SCHEMA}.tgt_lead_gen order by market asc
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
    select distinct(submarket) from ${this.DB_SCHEMA}.tgt_lead_gen where market in (${marq}) order by submarket asc
    `);
    // console.log(sql);
    return sql
    }
    else if (market === '' || market === undefined) {
      const sql = await this.leadsRepository.dataSource.execute(`select distinct(submarket) from ${this.DB_SCHEMA}.tgt_lead_gen`);
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
      select distinct(probability) from ${this.DB_SCHEMA}.tgt_lead_gen where market in (${marq})
      `);
      // console.log(sql);
      return sql
      }
      else if (market === '' || market === undefined) {
        const sql = await this.leadsRepository.dataSource.execute(`select distinct(probability) from ${this.DB_SCHEMA}.tgt_lead_gen`);
        return sql
      }
      else if (Error()) {
        throw new HttpErrors.InternalServerError();
      }
  }

  @get('/leads/date')
  @response(200, {
    description: 'Array of Leads model instances',

  })
  async date(): Promise<any> {
    const sql = await this.leadsRepository.dataSource.execute(`
    select distinct (last_update_date) at time zone 'UTC-6' from ${this.DB_SCHEMA}.tgt_lead_gen
      `);
    return sql;
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
      with alldata as (select * from ${this.DB_SCHEMA}.tgt_lead_gen tlg
        left outer join  (select *, row_number() over(partition by property_id order by inserted_date desc) as rn from ${this.DB_SCHEMA}.tgt_lead_status  )
        tls on tlg.property_id =tls.property_id and tls.status not in ('notinterested')  and rn = 1  )
      select * from alldata
      where alldata.status not in ('notinterested')
      and  extract (YEAR FROM alldata.last_update_date) = ('${year}')
      and extract (month from alldata.last_update_date) = ('${month}')
      and alldata.market in (${marq})
      and alldata.submarket in (${locaq})
      and alldata.probability in (${proq})
      order by case alldata.probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
      end
      limit 100

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
      with alldata as (select * from ${this.DB_SCHEMA}.tgt_lead_gen tlg
        left outer join  (select *, row_number() over(partition by property_id order by inserted_date desc) as rn from ${this.DB_SCHEMA}.tgt_lead_status  )
        tls on tlg.property_id =tls.property_id and tls.status not in ('notinterested')  and rn = 1  )
        select * from alldata
      where alldata.status not in ('notinterested')
      and  extract (YEAR FROM alldata.last_update_date) = '${year}'
      and extract (month from alldata.last_update_date) = '${month}'
      and alldata.submarket in (${locaq})
      and alldata.probability = '${proq}'
      order by case alldata.probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
      end
      limit 100
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
      with alldata as (select * from ${this.DB_SCHEMA}.tgt_lead_gen tlg
        left outer join  (select *, row_number() over(partition by property_id order by inserted_date desc) as rn from ${this.DB_SCHEMA}.tgt_lead_status  )
        tls on tlg.property_id =tls.property_id and tls.status not in ('notinterested')  and rn = 1  )
      select * from alldata
      where alldata.status not in ('notinterested')
      and extract (YEAR FROM alldata.last_update_date) = ('${year}')
      and extract (month from alldata.last_update_date) = ('${month}')
      and alldata.market in (${marq})
      and alldata.submarket in (${locaq})
      order by case alldata.probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
      end
      limit 100


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
      with alldata as (select * from ${this.DB_SCHEMA}.tgt_lead_gen tlg
        left outer join  (select *, row_number() over(partition by property_id order by inserted_date desc) as rn from ${this.DB_SCHEMA}.tgt_lead_status  )
        tls on tlg.property_id =tls.property_id and tls.status not in ('notinterested')  and rn = 1  )
      select * from alldata
      where alldata.status not in ('notinterested')
      and extract (YEAR FROM alldata.last_update_date) = '${year}'
      and extract (month from alldata.last_update_date) = '${month}'
      and alldata.market in (${marq})
      and alldata.probability in (${locaq})
      order by case alldata.probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
      end
      limit 100
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
      with alldata as (select * from ${this.DB_SCHEMA}.tgt_lead_gen tlg
        left outer join  (select *, row_number() over(partition by property_id order by inserted_date desc) as rn from ${this.DB_SCHEMA}.tgt_lead_status  )
        tls on tlg.property_id =tls.property_id and tls.status not in ('notinterested')  and rn = 1  )
        select * from alldata
      where alldata.status not in ('notinterested')
      and extract (YEAR FROM alldata.last_update_date) = ('${year}')
      and extract (month from alldata.last_update_date) = ('${month}')
      and alldata.market in (${marq})
      order by case alldata.probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
      end
      limit 100
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
      with alldata as (select * from ${this.DB_SCHEMA}.tgt_lead_gen tlg
        left outer join  (select *, row_number() over(partition by property_id order by inserted_date desc) as rn from ${this.DB_SCHEMA}.tgt_lead_status  )
        tls on tlg.property_id =tls.property_id and tls.status not in ('notinterested')  and rn = 1  )
      select * from alldata
      where alldata.status not in ('notinterested')
        and extract (YEAR FROM alldata.last_update_date) = '${year}'
      and extract (month from alldata.last_update_date) = '${month}'
      and alldata.submarket in (${locaq})
      order by case alldata.probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
      end
      limit 100
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
      with alldata as (select * from ${this.DB_SCHEMA}.tgt_lead_gen tlg
        left outer join  (select *, row_number() over(partition by property_id order by inserted_date desc) as rn from ${this.DB_SCHEMA}.tgt_lead_status  )
        tls on tlg.property_id =tls.property_id and tls.status not in ('notinterested')  and rn = 1  )
      select * from alldata
      where alldata.status not in ('notinterested')
      and extract (YEAR FROM alldata.last_update_date) = '${year}'
      and extract (month from alldata.last_update_date) = '${month}'
      and alldata.probability in (${locaq})
      order by case alldata.probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
      end
      limit 100
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
      // const sql1 = `select * from ${this.DB_SCHEMA}.tgt_lead_gen tlg,
      // ${this.DB_SCHEMA}.tgt_lead_status tls
      // where tlg.property_id = tls.property_id
      // and tls.status not in ('notinterested')
      //   and extract (YEAR FROM tlg.last_update_date) = '${year}'
      // and extract (month from tlg.last_update_date) = '${month}'
      // order by case tlg.probability
      // when 'Hot' then 1
      // when 'Warm' then 2
      // when 'Cold' then 3
      // end
      // limit 100`;
      const sql = await this.leadsRepository.dataSource.execute(`
      with alldata as (select * from ${this.DB_SCHEMA}.tgt_lead_gen tlg
        left outer join  (select *, row_number() over(partition by property_id order by inserted_date desc) as rn from ${this.DB_SCHEMA}.tgt_lead_status  )
        tls on tlg.property_id =tls.property_id and tls.status not in ('notinterested')  and rn = 1  )
        select * from alldata
      where alldata.status not in ('notinterested')
      and  extract (YEAR FROM alldata.last_update_date) = '${year}'
      and extract (month from alldata.last_update_date) = '${month}'
      order by case alldata.probability
      when 'Hot' then 1
      when 'Warm' then 2
      when 'Cold' then 3
      end
      limit 100
      `);
      // console.log(sql1)
      if (sql.length > 0) {
        return sql
      }
      else return 'no data matched'
    }
      else if (Error()) {
        throw new HttpErrors.InternalServerError();
      }






  }




  @get('/charts')
  @response(200, {
    description: 'Array of Leads model instances',

  })
  async findbymarket(

    @param.query.string('market') market?: string,
    @param.query.string('year') year?: string,
  ): Promise<any> {
    if (
      year !== '' && year !== undefined
      && market !== '' && market !== undefined
      )
    {
      const mar = market.split(',');
      const marq = "'" + mar.join("','") + "'";
      const sql = await this.leadsRepository.execute(
        `select * from  ${this.DB_SCHEMA}.tgt_properties_metrics where market in (${marq}) and
        year_month between
          TIMESTAMP '${year}' - INTERVAL '6 months'
          and  TIMESTAMP '${year}' - INTERVAL '1 month'
       `
      )
      return sql
    }
    else return 'please select a market with date'
  }

  @get('/buyers')
  @response(200, {
    description: 'Array of BUyers model instances',

  })
  async buyers(

    @param.query.string('market') market?: string,
  ): Promise<any> {
    if (
      market !== '' && market !== undefined
      )
    {

      const mar = market.split(',');
      const marq = "'" + mar.join("','") + "'";
      const sql = await this.leadsRepository.execute(
        `select * from ${this.DB_SCHEMA}.tgt_buyers_metrics where market in (${marq})
        `
      )
      return sql
    }
    else return 'please select a market '
  }
  @get('/buyersmarket')
  @response(200, {
    description: 'Array of BUyers model instances',

  })
  async buyersmarket(

    // @param.query.string('market') market?: string,
  ): Promise<any> {
    // if (
    //   market !== '' && market !== undefined
    //   )
    // {

      // const mar = market.split(',');
      // const marq = "'" + mar.join("','") + "'";
      const sql = await this.leadsRepository.execute(
        `select distinct market from ${this.DB_SCHEMA}.tgt_buyers_metrics order by market asc
        `
      )
      return sql
    // }
    // else return 'please select a market '?
  }


  @get('/buyersproperty')
  @response(200, {
    description: 'Array of BUyers model instances',

  })
  async property(

    @param.query.string('city') city?: string,
  ): Promise<any>
  {
    if (
      city !== '' && city !== undefined
      )
    {

      const mar = city.split(',');
      const marq = "'" + mar.join("','") + "'";
      const sql = await this.leadsRepository.execute(
        `select distinct property_name from ${this.DB_SCHEMA}.tgt_lead_buyers_recommendation where city in (${marq}) order by property_name asc
        `
      )
      return sql
    }
    else return 'please select a city '
  }
  @get('/buyerscity')
  @response(200, {
    description: 'Array of BUyers model instances',

  })
  async city(

    @param.query.string('market') market?: string,
  ): Promise<any> {
    if (
      market !== '' && market !== undefined
      )
    {

      const mar = market.split(',');
      const marq = "'" + mar.join("','") + "'";
      const sql = await this.leadsRepository.execute(
        `select distinct city from ${this.DB_SCHEMA}.tgt_lead_buyers_recommendation where market in (${marq}) order by city asc
        `
      )
      return sql
    }
    else return 'please select a market '
  }
  @get('/propertybuyers')
  @response(200, {
    description: 'Array of BUyers model instances',

  })
  async buyersp(

    @param.query.string('property_name') property_name?: string,
    @param.query.string('property_city') property_city?: string,
  ): Promise<any> {
    // const mar = property_name.split(',');
    // const marq = "'" + mar.join("','") + "'";
    // const city = property_city.split(',');
    // const cityq = "'" + city.join("','") + "'";
    if (
      property_name !== '' && property_name !== undefined
      && property_city !== '' && property_city !== undefined
      )
    {

      const mar = property_name.split(',');
      const marq = "'" + mar.join("','") + "'";
      const city = property_city.split(',');
      const cityq = "'" + city.join("','") + "'";
      const sql = await this.leadsRepository.execute(
        `select * from ${this.DB_SCHEMA}.tgt_lead_buyers_recommendation where property_name in (${marq}) and city in (${cityq})
        `
      )
      return sql
    }
    else if (
      property_name !== '' && property_name !== undefined
    )
    {
      const mar = property_name.split(',');
    const marq = "'" + mar.join("','") + "'";
    // const city = property_city.split(',');
    // const cityq = "'" + city.join("','") + "'";
      const sql = await this.leadsRepository.execute(
        `select * from ${this.DB_SCHEMA}.tgt_lead_buyers_recommendation where property_name in (${marq})
        `
      )
      return sql

      } else if (
        property_city !== '' && property_city !== undefined
      )
    {
    //   const mar = property_name.split(',');
    // const marq = "'" + mar.join("','") + "'";
    const city = property_city.split(',');
    const cityq = "'" + city.join("','") + "'";
        const sql = await this.leadsRepository.execute(
          `select * from ${this.DB_SCHEMA}.tgt_lead_buyers_recommendation where city in (${cityq})
          `
        )
        return sql

    }
    else if (
      property_name === '' || property_name === undefined
      && property_city === '' || property_city === undefined
    )
    {
      return 'please select Property Name or Property City'
      }
    else return 'please select some data '
  }


}


