import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Character } from '@app/shared/interfaces/data.interfaces';
import { LocalStorageService } from '@app/shared/services/local-storage.service';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.css'],  // Cambié "styleUrl" a "styleUrls"
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent {
  @Input() character: Character | null = null;

  constructor(private localStorageSvc: LocalStorageService) {}

  toggleFavorite(): void {
    // Verifica que 'this.character' no sea null
    if (this.character) {
      this.character.isFavorite = !this.character.isFavorite; // Alterna el estado de isFavorite
      this.localStorageSvc.addOrRemoveFavorite(this.character!);  // Agregar o eliminar del localStorage
    }
  }

  // Método para obtener la clase según el estado de isFavorite
  getIcon(): string {
    return this.character?.isFavorite ? 'bi-heart-fill' : 'bi-heart';
  }
}
