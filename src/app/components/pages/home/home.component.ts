import { Component } from '@angular/core';
import { LocalStorageService } from '@app/shared/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  charactersFav$ = this.localStorageSvc.charactersFav$;
  constructor(private localStorageSvc: LocalStorageService){}


}
