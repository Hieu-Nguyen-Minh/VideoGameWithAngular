import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models/game.models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  sort: string;
  games: Array<Game>;
  private routeSub: Subscription;
  private gameSub: Subscription;

  constructor(
    private HttpService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGame('metacrit', params['game-search']);
      } else {
        this.searchGame('metacrit');
      }
    });
  }

  searchGame(sort: string, search?: string) {
    this.gameSub = this.HttpService.getGameList(sort, search).subscribe(
      (gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      }
    );
  }

  openGameDetails(id) {
    this.router.navigate(['details', id]);
  }
}
