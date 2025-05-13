import { Component, Input, OnInit, DoCheck, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-on-push-child',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="child on-push-child">
      <h3>OnPush变更检测子组件</h3>
      <p>计数器: {{ expensiveCounter }}</p>
      <p>文本: {{ expensiveText }}</p>
      <p>Items计算: {{ expensiveItemsCalculation }}</p>
    </div>
  `,
  styles: [`
    .child {
      border: 2px solid #f44336;
      padding: 10px;
      margin: 5px;
      border-radius: 5px;
      width: 100%;
      max-width: 300px;
    }
    .on-push-child {
      background-color: #ffebee;
    }
  `]
})
export class OnPushChildComponent implements OnInit, DoCheck, OnChanges {
  @Input() counter: number = 0;
  @Input() text: string = '';
  @Input() items: string[] = [];

  ngOnInit(): void {
    console.count('OnPushChildComponent.ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.count('OnPushChildComponent.ngOnChanges');
  }

  ngDoCheck(): void {
    console.count('OnPushChildComponent.ngDoCheck');
  }

  // 昂贵的计算属性
  get expensiveCounter(): number {
    // 模拟昂贵计算
    let result = this.counter;
    for (let i = 0; i < 100; i++) {
      result = Math.sqrt(result * result);
    }
    console.count('OnPushChildComponent.expensiveCounter');
    return this.counter;
  }

  get expensiveText(): string {
    // 模拟昂贵计算
    let result = '';
    for (let i = 0; i < 100; i++) {
      result = this.text + i;
    }
    console.count('OnPushChildComponent.expensiveText');
    return this.text;
  }

  get expensiveItemsCalculation(): number {
    // 模拟昂贵计算
    if (!this.items.length) return 0;
    
    let sum = 0;
    for (let i = 0; i < 100; i++) {
      sum += this.items.reduce((acc, item) => acc + item.length, 0);
    }
    console.count('OnPushChildComponent.expensiveItemsCalculation');
    return this.items.length;
  }
} 