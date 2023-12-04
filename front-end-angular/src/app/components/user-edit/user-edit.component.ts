import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
  providers: [UserService]
})
export class UserEditComponent {
  public page_title  : string;
  public status      : string;
  public user        : User;
  public identity    : any;
  public files       : NgxFileDropEntry[] = [];
  public url         : string;
  public isFileUpload : boolean;
  public file        : any;
  
  constructor(
    private _userService : UserService,
    private _route       : ActivatedRoute,
    private _router      : Router,


  ){
    this.page_title = 'Actualizar mi perfil'
    this.status     = ''
    this.identity   = this._userService.getIdentity()
    this.url        = this._userService.url
    this.isFileUpload = false;
  
    this.user       = new User (
      this.identity._id, 
      this.identity.name, 
      this.identity.surname, 
      this.identity.email,
      '',
      this.identity.image,
      this.identity.role
      );

  }

  onSubmit(form :any){
    if(this.file){
      this._userService.uploadImage(this.file, this.user).subscribe(
        response =>{
          console.log(response,'upload_img')
          if(response.status == 'success'){
              this.user.image = response.file_name
              this.updateUser();
          }
        },
        error =>{
          console.log(error,'upload_error')
          this.status = 'error'
        }
      )
    }
  }

  updateUser(){
    this._userService.update(this.user).subscribe(
      response =>{
        console.log(response,'update_user')
        if(response.status == 'success'){
          this.status = 'success'
        }
      },
      error =>{
        this.status = 'error'
        console.log(error,'update_error')
      }
    )
  }

      /***** file upload ***************/
      public dropped(files: NgxFileDropEntry[]) {
        this.files = files;
        if (files.length > 0) {
          const droppedFile = files[0];
    
          if (droppedFile.fileEntry.isFile) {
            const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
              // Aquí puedes acceder al archivo (File) y realizar acciones, como subirlo a un servidor.
              if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                // Lógica para procesar el primer archivo solamente
                this.files      = [droppedFile];
                this.user.image = file.name
                this.file       = file
              } else {
                // El archivo no tiene la extensión deseada
                alert('Por favor, selecciona un archivo JPG válido.');
              }
            });
          } else {
            const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
            console.log(fileEntry);
          }
        }
      }

      public fileOver(event : any) {
        console.log(event, 'event_filterOver');
      }
    
      public fileLeave(event : any) {
        console.log(event, 'event_filterLeave');
      }
      /********************************* */
    
}
