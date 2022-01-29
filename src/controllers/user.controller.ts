import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, getJsonSchemaRef, post, requestBody} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import * as _ from 'lodash';
import {
  PasswordHasherBindings,
  TokenServiceBindings,
  UserServiceBindings
} from '../keys';
import {Supercomp} from '../models';
// import {Usersession} from '../models';
import {User} from '../models/user.model';
import {SupercompRepository} from '../repositories';
// import {UsersessionRepository} from '../repositories';
import {UserRepository} from '../repositories/user.repository';
import {validateCredentials} from '../services';
import {BcryptHasher} from '../services/hash.password';
import {JWTService} from '../services/jwt-service';
import {MyUserService} from '../services/user-service';

export class CReUserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository, @repository(SupercompRepository)
    public superrepo: SupercompRepository,
    // @repository(UsersessionRepository)
    // public usersRepository: UsersessionRepository,

    // @inject('service.hasher')
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,

    // @inject('service.user.service')
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,

    // @inject('service.jwt.service')
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
  ) { }
  DB_SCHEMA = process.env.DB_SCHEMA;
  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchemaRef(Supercomp),
        },
      },
    },
  })
  async signup(@requestBody() userData: Supercomp) {
    validateCredentials(_.pick(userData, ['username', 'password']));
    userData.password = await this.hasher.hashPassword(userData.password);
    const savedUser = await this.superrepo.create(userData);
    // delete savedUser.password;
    return savedUser;
  }

  // @post('/login', {
  //   responses: {
  //     '200': {
  //       description: 'Token',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'object',
  //             properties: {
  //               token: {
  //                 type: 'string',
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // async login(@requestBody() credentials: Credentials): Promise<any> {
  //   // const data = {};
  //   // make sure user exist,password should be valid
  //   // const user = await this.userService.verifyCredentials(credentials);
  //   // console.log(user);
  //   // const userProfile = await this.userService.convertToUserProfile(user);
  //   // console.log(userProfile);

  //   // const token = await this.jwtService.generateToken(userProfile);
  //   // const generatedToken = Promise.resolve({token: token})
  //   const session = await this.userRepository.execute(
  //     `INSERT INTO ${this.DB_SCHEMA}.user_session
  //     (name,  "session")
  //     VALUES('${credentials.username}' ,'${token}') returning *;
  //     `,
  //   );
  //   console.log('done');
  //   const userdata = await this.userRepository.execute(
  //     `select * from ${this.DB_SCHEMA}.users u
  //     left join ${this.DB_SCHEMA}.roles r on u."role" = r.id
  //     where username = '${userProfile.name}'  `,
  //   );
  //   delete userdata[0].password;

  //   return {token, userdata, session};

  //   // return Promise.resolve({token: token})
  // }

  // @patch('/logout/{id}')
  // @response(204, {
  //   description: 'Usersession PATCH success',
  // })
  // async updateById(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Usersession, {partial: true}),
  //       },
  //     },
  //   })
  //   usersession: Usersession,
  // ): Promise<void> {
  //   await this.usersRepository.updateById(id, usersession);
  // }

  // return Promise.resolve({token: token})

  @authenticate('jwt')
  @get('/users/me', {
    // security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: getJsonSchemaRef(User),
          },
        },
      },
    },
  })
  async me(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile,
  ): Promise<UserProfile> {
    return Promise.resolve(currentUser);
  }
}
