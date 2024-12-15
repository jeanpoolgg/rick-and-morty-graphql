import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Character } from '@app/shared/interfaces/data.interfaces';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrl: './characters-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent {
  @Input() character: Character | null = null;

  toggleFavorite(): void {}
}
