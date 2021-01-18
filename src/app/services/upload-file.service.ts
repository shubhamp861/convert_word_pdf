import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
 
  burl=" http://localhost:8081";
  url = 'https://word-to-pdf-convert.herokuapp.com/';
  
  constructor(private http: HttpClient) { }

  // upload(file: File): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  //   const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
  //     reportProgress: true,
  //     responseType: 'arraybuffer' as 'json'
  //   });
  //    return this.http.request(req);
  // }
  
   downloadPdf(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true,
      responseType: 'arraybuffer' as 'json'
    });
     return this.http.request(req);}

  //    } 
  // uploadandDownload(file: File)
  //    {
  //     const formData: FormData = new FormData();
  //     formData.append('file', file);
  //     // const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
  //     //   responseType: 'arraybuffer' as 'json'
  //     // });
  //     //  return this.http.request(req);
  //      return this.http.post(this.url+"/upload",formData,{
  //         responseType: 'arraybuffer' as 'json'
  //       });
    
  //    }
     
}