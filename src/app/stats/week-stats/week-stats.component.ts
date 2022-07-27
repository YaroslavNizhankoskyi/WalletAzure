import { WeekStats } from './../../models/WeekStats';
import { Component, Input, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-week-stats',
  templateUrl: './week-stats.component.html',
  styleUrls: ['./week-stats.component.css']
})
export class WeekStatsComponent implements OnInit {

  @Input() walletId = null
  constructor(private walletService: WalletService) { }

  statsLoaded = false
  stats: any; 
  initOpts: any;
  options: any;

  ngOnInit() {
    this.walletService.getTransfersWeekStats(this.walletId).subscribe(x => {
      this.stats = x
      this.statsLoaded = true;
  
      this.initOpts = {
        renderer: 'svg',
        width: 300,
        height: 300
      };
    
      this.options = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.stats.days,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: 'Counters',
          type: 'bar',
          barWidth: '60%',
          data: this.stats.incomes
        }]
      };
    })
  }
}
