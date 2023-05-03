import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../interfaces/game';
import { ListType } from '../enums/list-type';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  ownedGames = new BehaviorSubject<Game[]>([]);
  wishListGames = new BehaviorSubject<Game[]>([]);
  
  constructor() { }

  saveGame(game: Game, listType: ListType) {
    let json: string | null = window.localStorage.getItem(listType.valueOf());
    let gameList: Game[] = json ? JSON.parse(json) : null;
    if (!gameList) {
        gameList = [game];
    } else {
        gameList = [...gameList, game];
    }
    window.localStorage.setItem(listType.valueOf(), JSON.stringify(gameList));

    json = window.localStorage.getItem(listType.valueOf());
    let parsedUpdateList: Game[] = json ? JSON.parse(json) : null;
    if (listType === ListType.OWNEDLIST) {
        this.ownedGames.next(parsedUpdateList);
    } else {
        this.wishListGames.next(parsedUpdateList);
    }
  }

  deleteGame(game: Game, listType: ListType) {
    let json: string | null = window.localStorage.getItem(listType.valueOf());
    let gameList: Game[] = json ? JSON.parse(json) : null;
    const gameIndex = gameList.findIndex(currGame => currGame.id === game.id);
    if (gameIndex > -1) {
        gameList.splice(gameIndex, 1)
        window.localStorage.setItem(listType.valueOf(), JSON.stringify(gameList));
    }

    if (listType === ListType.OWNEDLIST) {
        this.ownedGames.next(gameList.length > 0 ? gameList : []);
    } else {
        this.wishListGames.next(gameList.length > 0 ? gameList : []);
    }
  }

  getGameList(listType: ListType) {
    //replaced simpler code with the 2 lines below because that way it doesn't give you an error
    //it does the same thing though!
    let json: string | null = window.localStorage.getItem(listType.valueOf());
    let list: Game[] = json ? JSON.parse(json) : null;

    if (listType === ListType.OWNEDLIST) {
        this.ownedGames.next(!list ? [] : list);
    } else {
        this.wishListGames.next(!list ? [] : list);
    }
  }
}
