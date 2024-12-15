import { Component } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.css'
})
export class CharactersListComponent {
    characters$ = this.dataSvc.characters$;
    constructor(private dataSvc: DataService){}

    ngOnInit(): void {
    }
}
