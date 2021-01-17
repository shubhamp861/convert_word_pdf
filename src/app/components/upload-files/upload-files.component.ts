import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html'
})
export class UploadFilesComponent{

  selectedFiles: FileList=undefined;
  currentFile: File;
  progress;
  res;
  fileInfos: Observable<any>;
  fileName;
  message;
  pdfFile;
  removebtn=true;

  constructor(private uploadService: UploadFileService,private http: HttpClient) { 
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadFileToServer(form: NgForm){
    console.log(form);
    this.currentFile = this.selectedFiles.item(0);
    this.fileName= this.currentFile.name;
    this.message="Uploading file to server ";
    this.uploadService.downloadPdf(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          // let file = new Blob([event.body], { type: 'application/pdf' });

          form.resetForm();
          this.pdfFile = new Blob([event.body], { type: 'application/pdf' });
          this.progress='';
          this.message="Ready to Downloaded.";
          this.removebtn=false;

          // var downloadURL = window.URL.createObjectURL(file);
          // var link = document.createElement('a');
          // link.href = downloadURL;
          // link.download = (this.fileName).slice(0, -5)+".pdf";
          // link.click();
          // this.currentFile=undefined;
          // form.resetForm();
          // this.progress='';
          // this.message="Ready to Downloaded.";form: NgForm
       
          }
      },
      err => {
        this.progress = 0;
        this.currentFile = undefined;
      });
    }

    downloadpdf(){
      var downloadURL = window.URL.createObjectURL(this.pdfFile);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = (this.fileName).slice(0, -5)+".pdf";
      link.click();
      this.currentFile=undefined;
     // form.resetForm();
     this.message="Downloaded.";
     this.removebtn=true;
    }
}
