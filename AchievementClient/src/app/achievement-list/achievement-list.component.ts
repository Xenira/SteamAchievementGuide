import { Component, OnInit } from '@angular/core';

import { RestService } from '../rest.service';

@Component({
  selector: 'app-achievement-list',
  templateUrl: './achievement-list.component.html',
  styleUrls: ['./achievement-list.component.css']
})
export class AchievementListComponent implements OnInit {

  game: string;
  achievements: any[] = [];

  constructor(private _rest: RestService) { }

  ngOnInit() {
    setInterval(() => {
      this.loadAchievements();
    }, 30 * 1000);
    this.loadAchievements();
  }

  loadAchievements() {
    this._rest.ExecuteGet('http://localhost:3000/api/achievements/76561198036810321').subscribe(
      (data: any) => {
        if (!data || !data.success) return;
        let rawAchievements: any[] = data.achievements;
        let notAchieved = rawAchievements.filter((data) => {
          return data.achieved == 0;
        });
        let cAchieved = rawAchievements.length - notAchieved.length;
        this.game = `${data.gameName} | ${Math.round(100 / rawAchievements.length * cAchieved)}% Completed (${cAchieved}/${rawAchievements.length})`;
        this.achievements = notAchieved;
      }
    );
  }
}
