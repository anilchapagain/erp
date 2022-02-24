import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'erp',
  connector: 'postgresql',
  url: '',
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: '',
  database: 'erp',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ErpDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'erp';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.erp', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
