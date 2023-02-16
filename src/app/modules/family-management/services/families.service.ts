import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AddFamily } from '../models/add-family.model';
const API_URL = `${environment.apiUrl}/api`;

@Injectable({
  providedIn: 'root',
})
export class FamiliesService {
  constructor(private http: HttpClient) {}

  // public methods
  addNewFamily(addFamily: AddFamily): Observable<any> {
    return this.http.post<any>(`${API_URL}/families`, addFamily);
  }
  getAllFamilies(): Observable<AddFamily[]> {
    return this.http.get<AddFamily[]>(`${API_URL}/families`);
  }
  getFamilyById(id: string): Observable<AddFamily> {
    return this.http.get<AddFamily>(`${API_URL}/families/${id}`);
  }
  editFamily(addFamily: AddFamily, id: string): Observable<any> {
    return this.http.put<any>(`${API_URL}/families/${id}`, addFamily);
  }
}
