import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {Supercomp} from '../models';
import {Credentials, SupercompRepository} from '../repositories';
// import {Credentials, UserRepository} from '../repositories/.repository';
import {BcryptHasher} from './hash.password';

export class MyUserService implements UserService<Supercomp, Credentials>{
  constructor(
    @repository(SupercompRepository)
    public userRepository: SupercompRepository,

    // @inject('service.hasher')
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher

  ) { }
  async verifyCredentials(credentials: Credentials): Promise<Supercomp> {
    // implement this method
    const foundUser = await this.userRepository.findOne({
      where: {
        username: credentials.username
      }
    });
    if (!foundUser) {
      throw new HttpErrors.NotFound('user not found');
    }
    const passwordMatched = await this.hasher.comparePassword(credentials.password, foundUser.password)
    if (!passwordMatched)
      throw new HttpErrors.Unauthorized('password is not valid');
    return foundUser;
  }
  convertToUserProfile(user: Supercomp): UserProfile {
    let userName = '';
    if (user.name)
      userName = user.name;
    // if (user.lastName) {
    //   userName = user.firstName ? `${user.firstName} ${user.lastName}` : user.lastName;
    // }
    return {
      [securityId]: user.name!.toString(),
      name: user.username,
      id: user.id,
      email: user.comp_email
    };
    // throw new Error('Method not implemented.');
  }

}
