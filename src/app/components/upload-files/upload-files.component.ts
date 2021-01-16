import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent{

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  res;
  fileInfos: Observable<any>;
  fileName;

  constructor(private uploadService: UploadFileService,private http: HttpClient) { 
  //  this.uploadService.get().subscribe((res)=>{console.log(res)});
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
 
  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.fileName= this.currentFile.name;
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.res = event.body[0];
          console.log(event.body[0]);
          }
      },
      err => {
        this.progress = 0;
        this.currentFile = undefined;
      });
  
    this.selectedFiles = undefined;
  }
  downloadPdf(){
    this.currentFile = this.selectedFiles.item(0);
    this.fileName= this.currentFile.name;
    console.log(this.fileName);
    this.uploadService.downloadPdf(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          let file = new Blob([event.body], { type: 'application/pdf' });
          var downloadURL = window.URL.createObjectURL(file);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = (this.fileName).slice(0, -5)+".pdf";
          link.click();
          }
      },
      err => {
        this.progress = 0;
        this.currentFile = undefined;
      });
       // var fileURL = URL.createObjectURL(file);
      // window.open(fileURL);}

}
uploadandDownload()
{
  this.currentFile = this.selectedFiles.item(0);
  this.fileName= this.currentFile.name;
  this.uploadService.uploadandDownload(this.currentFile).subscribe( (res: any) =>{
    let file = new Blob([res], { type: 'application/pdf' });
    var downloadURL = window.URL.createObjectURL(file);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = this.fileName+".pdf";
    link.click();
   } );

  this.selectedFiles = undefined;
}
}
