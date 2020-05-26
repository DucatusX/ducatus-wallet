import { Injectable } from '@angular/core';
import { PlatformProvider, ProfileProvider, WalletProvider } from '..';
// import { HttpClient } from '@angular/common/http';

declare const cordova;

@Injectable()
export class MoonPayProvider {
  private isAndroid: any;
  constructor(
    private walletProvider: WalletProvider,
    private profileProvider: ProfileProvider,
    private platformProvider: PlatformProvider
    // private httpClient: HttpClient
  ) {
    document.addEventListener("deviceready", () => {
      window.open = cordova.InAppBrowser.open;
    }, false);
    this.isAndroid = this.platformProvider.isAndroid;
  }

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
          // this.httpClient.post('https://urlsign.census.cx', { url })
          //   .toPromise().then((result: { signed_url: string }) => {
          //   resolve(result.signed_url || url);
          // }, () => {
          resolve(url);
          // });
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

    linkPromise.then((link: string) => {
      const location = this.isAndroid ? 'yes' : 'no';
      window.open(link, '_blank', `location=${location},toolbarcolor=#23272A,closebuttoncaption=Сlose,closebuttoncolor=#d8373e,navigationbuttoncolor=#d8373e,fullscreen=no,toolbarposition=bottom,lefttoright=yes`);
    });

    return true;
  }
}
