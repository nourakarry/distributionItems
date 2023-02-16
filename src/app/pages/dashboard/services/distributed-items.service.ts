import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DistributedItem } from '../models/distributed-item.model';
const API_URL = `${environment.apiUrl}/api`;

@Injectable({
  providedIn: 'root',
})
export class DistributedItemsService {
  constructor(private http: HttpClient) {}

  // public methods
  addDistributedItem(additem: DistributedItem): Observable<any> {
    return this.http.post<any>(`${API_URL}/distributedItems`, additem);
  }
}
