import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController : ToastController,
    private domSanitizer : DomSanitizer,
    private navController : NavController
  ) { }


  async showToast(message: string, duration: number = 2000, color : string) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'bottom',
      color: color
    });

    await toast.present();
  }

  showErrorToast(message : string){
    this.showToast(message, 2000, 'danger');
  }

  showWarningToast(message : string){
    this.showToast(message, 2000, 'warning');
  }

  showSuccessToast(message : string){
    this.showToast(message, 2000, 'success');
  }

  async showSuccessToastWithLink(message : string){

    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
      buttons:[
        {
          text: 'Manage your meals',
          handler: () => {
            this.navController.navigateForward("/profile")
          }
        }
      ]
    });

    await toast.present();
  }

}
