import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'ngx-auth';
import { TokenStorage } from './token-storage.service';
import { Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import {Router} from "@angular/router";


interface AccessData {
  accessToken: string;
  refreshToken: string;
  user : any;
}

@Injectable()
export class AuthenticationService implements AuthService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router : Router,
    private spinner: Ng4LoadingSpinnerService,
  ) {}

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {Observable<boolean>}
   * @memberOf AuthService
   */
  public isAuthorized(): Observable < boolean > {
    return this.tokenStorage
      .getAccessToken()
      .map(token => !!token);
  }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * localStorage
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable < string > {
    return this.tokenStorage.getAccessToken();
  }

  public getLoggedInUser() : Observable< any >{
    return this.tokenStorage.getLoggedInUser();
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * @returns {Observable<any>}
   */
  public getHeaders() : any{
    var authToken = localStorage.getItem('accessToken');      
    if(authToken){
      var headers = new HttpHeaders({
        'Content-Type': 'application/json'})
        .set('authToken', authToken)
        .set('Content-Type', 'application/json');
      }else{
        var headers = new HttpHeaders({
          'Content-Type': 'application/json'})
          .set('Content-Type', 'application/json');
      }

      return headers;
  }
  public refreshToken(): Observable < AccessData > {
    return this.tokenStorage
      .getRefreshToken()
      .switchMap((refreshToken: string) => {
        return this.http.post(`http://localhost:9009/refresh`, { refreshToken });
      })
      .do(this.saveAccessData.bind(this))
      .catch((err) => {
        this.logout();

        return Observable.throw(err);
      });
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * @param {Response} response
   * @returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   * @param {string} url
   * @returns {boolean}
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh');
  }

  /**
   * EXTRA AUTH METHODS
   */

  public login(data): Observable<any> {
    this.spinner.show();
    var headers = this.getHeaders()
    return this.http.post(`http://localhost:9009/user/login`, data, {headers : headers})
    .do((res: any) => {
      if(res.status){
        const tokens = {
          accessToken: res.result.authToken,
          refreshToken: res.result.authToken,
          user : res.result
        }
        this.saveAccessData(tokens)
      }
      this.spinner.hide();
    },(res) => {
      this.spinner.hide();
    });
  }

  /**
   * Logout
   */
  public logout(): void {
    this.tokenStorage.clear();
    var headers = this.getHeaders();
    const res =  this.http.post(`http://localhost:9009/user/logout`, {}, {headers : headers});
    this.router.navigate(['/user/login']);
  }

  /**
   * Save access data in the storage
   *
   * @private
   * @param {AccessData} data
   */
  private saveAccessData({ accessToken, refreshToken, user }: AccessData) {
    this.tokenStorage
      .setAccessToken(accessToken)
      .setRefreshToken(refreshToken)
      .setLoggedInUser(JSON.stringify(user));
  }

}
