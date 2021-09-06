import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.models';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId: string;
  game: Game;
  routeSub: Subscription;
  gameSub: Subscription;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private httpService: ApiService
  ) {}
  ngOnDestroy() {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.gameSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  getGameDetails(id: string) {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        console.log(gameResp);

        this.game = gameResp;
        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
      });
  }

  getColor(value: number) {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }
}
