import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GetTagsService {

  constructor(private hhtp: Http) { }

  get(){
    return this.hhtp.get('https://conduit.productionready.io/api/tags');
  }
}
