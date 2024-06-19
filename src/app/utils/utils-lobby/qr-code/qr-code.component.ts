import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import * as QRCode from 'qrcode';
import { User, User_Channel } from 'src/@models/user.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { DatabaseService } from 'src/app/services/database/database.service';


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements AfterViewInit {
  doIhaveQR: boolean = false;
  client_id?: number;

  form = this.formBuilder.group({
    nameChannel: [
      "", [ Validators.required ]
    ]
  });

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService
  ) { }

  ngAfterViewInit(): void {
    this.loginService.UserRequest().subscribe({
      next: (data: User) => {
        if (!data.is_admin) {
          this.client_id = data.id;
          this.databaseService.getQRCode_One(data.id).subscribe({
            next: (channel) => {
              if (channel[0] != undefined) {
                this.generateQRCode(channel[0].nameChannel)
                this.doIhaveQR = true;
              }
            }
          });
        }
      }
    })
  }

  async QRCodeRequest() {
    let name = this.form.controls.nameChannel.value;
    let id = this.client_id;
    if (this.form.valid && name != null &&  id != null) {
      const data = { user_id: id, nameChannel: name };
      this.databaseService.postQRCode_One(data).subscribe({
        next: () => {
          this.doIhaveQR = false;
          this.generateQRCode(name ?? "");
        },
        error: () => alert("Error del servidor")
      });
    } else {
      alert("Los Datos no son Validos!");
    }
  }

  generateQRCode(text: string): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    QRCode.toCanvas(canvas, text, (error) => {
      if (error) {
        console.error('Error generating QR code', error);
      } else {
        console.log('QR code generated successfully');
      }
    });
  }
}
