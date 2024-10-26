import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from '../Services/authorization.service';

export const adminGuard: CanActivateFn = (route, state) => {

  let _authorizationService =inject(AuthorizationService )
  let router=inject(Router)
  if (_authorizationService.isLoggedIn()) {
    return true;
  }else{
     router.navigateByUrl('/Login');
     return false ; 

  }

};
