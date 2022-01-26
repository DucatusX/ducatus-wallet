import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BitcoreLib } from '@ducatus/crypto-wallet-core';
import { BwcProvider } from 'src/providers/bws';




@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;




  constructor(private activatedRoute: ActivatedRoute,private BWS: BwcProvider) { 
    let bit = BWS.getBitcore()
    console.log(bit.Address('1HcNLRtkRHo4sAUKza4914ukjYTQN57qsU','livenet'))
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }


}
