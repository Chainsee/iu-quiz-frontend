import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenDelete {
  static deleteJwtToken() {
    localStorage.removeItem('jwtToken');
  }
}
