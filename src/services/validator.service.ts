import {HttpErrors} from '@loopback/rest';
import {Credentials} from '../repositories/user.repository';

export function validateCredentials(credentials: Credentials) {
  if (credentials.username.length < 8) {
    throw new HttpErrors.UnprocessableEntity('Username leandth must be atleast 8 or greater ');
  }
  if (credentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity('password length should be greater than 8')
  }
}
