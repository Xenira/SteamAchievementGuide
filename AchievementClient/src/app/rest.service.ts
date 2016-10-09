import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';

@Injectable()
export class RestService {

  constructor(private _http: Http) { }

  ExecuteGet(url: string) {
    return this._http.get(url)
      .map(this.ExtractData)
      .catch(this.HandleError);
  }

  ExtractData(res: Response) {
    let body = res.json();
    return body;
  }

  private HandleError(error: any) {
    return Observable.throw(error);
  }

}
