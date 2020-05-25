import { ProfileProvider, WalletProvider } from '..';

import { Injectable } from '@angular/core';
// import { InAppBrowserRef } from '../../models/in-app-browser/in-app-browser-ref.model';

declare const cordova;

@Injectable()
export class MoonPayProvider {
  constructor(
    private walletProvider: WalletProvider,
    private profileProvider: ProfileProvider,
    // private iab: InAppBrowserProvider
  ) { }

  private getMoonPayLink(walletId?) {
    let wallet;

    if (walletId) {
      wallet = this.profileProvider.getWallet(walletId);
      if (wallet.needsBackup) {
        return false;
      }
    }

    const api_key: string = 'pk_test_h7x0He1BR6K8IQVndW0mFJ27p9ccsb';
    let url: string = 'https://buy-staging.moonpay.io?apiKey=' + api_key;
    return new Promise(resolve => {
      if (walletId) {
        url += '&currencyCode=' + wallet.coin;
        this.walletProvider.getAddress(wallet, false).then(addr => {
          url += '&walletAddress=' + addr;
          resolve(url);
        });
      } else {
        resolve(url);
      }
    });
  }

  public openMoonPay(walletId?) {
    const linkPromise = this.getMoonPayLink(walletId);
    if (!linkPromise) {
      return false;
    }
    linkPromise.then((link) => {
      cordova.InAppBrowser.open(link, '_blank', 'location=no,toolbarcolor=#23272A,closebuttoncaption=Сlose,closebuttoncolor=#d8373e,navigationbuttoncolor=#d8373e,fullscreen=no,toolbarposition=bottom,lefttoright=yes');
    });

    return true;
  }

  // public openMoonPay(walletId?) {
  //   const linkPromise = this.getMoonPayLink(walletId);
  //   if (!linkPromise) {
  //     return false;
  //   }

  //   return linkPromise.then((link: string) => {
  //     this.iab
  //       .createIABInstance(
  //         'MoonPay',
  //         'location=yes,toolbarcolor=#000000ff,closebuttoncaption=Сlose,closebuttoncolor=#d8373e,navigationbuttoncolor=#d8373e,fullscreen=no,toolbarposition=top,lefttoright=yes',
  //         link
  //       )
  //       .then((res: InAppBrowserRef) => {
  //         res.show();
  //       });
  //   });
  // }
}
