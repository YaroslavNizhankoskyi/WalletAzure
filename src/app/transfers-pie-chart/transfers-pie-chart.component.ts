import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfers-pie-chart',
  templateUrl: './transfers-pie-chart.component.html',
  styleUrls: ['./transfers-pie-chart.component.css']
})
export class TransfersPieChartComponent implements OnInit {

  @Input() transfers = new Array()

  options = {
    backgroundColor: '#dee1e3',
    title: {
      text: 'Pie by money',
      left: 'center',
      top: 20,
      textStyle: {
        color: 'black',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: [
      {
        name: 'Counters',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
        ].sort((a, b) => a.value - b.value),
        roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: 'black',
            },
          },
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)',
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
        },
        itemStyle: {
          normal: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: () => Math.random() * 200,
      },
    ],
  };

  constructor() { }

  ngOnInit(): void {
    let data = new Array()

    let map = new Map<string, number>();

    console.log(this.transfers)

    this.transfers.forEach(el => {
      map.set(el.category, (map.get(el.category) || 0) + el.amount)      
    });

    for(let [key, value] of map){
      data.push({value: value, name: key})
    }
    
    this.options.series[0].data = data;
  }
}
