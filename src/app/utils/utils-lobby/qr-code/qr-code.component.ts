import { Component, OnInit } from '@angular/core';

import * as QRCode from 'qrcode';

const URL_BASE = "https://api.whatsapp.com/send/?phone=%2B14155238886&text=join+broken-skill&type=phone_number&app_absent=0";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.generateQRCode(URL_BASE);
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
