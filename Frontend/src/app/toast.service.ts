import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController : ToastController
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

}
