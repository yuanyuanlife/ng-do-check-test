import { Component, Input, OnInit, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-child',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="child default-child">
      <h3>默认变更检测子组件</h3>
      <p>计数器: {{ expensiveCounter }}</p>
      <p>文本: {{ expensiveText }}</p>
      <p>Items计算: {{ expensiveItemsCalculation }}</p>
    </div>
  `,
  styles: [`
    .child {
      border: 2px solid #43a047;
      padding: 10px;
      margin: 5px;
      border-radius: 5px;
      width: 100%;
      max-width: 300px;
    }
    .default-child {
      background-color: #e8f5e9;
    }
  `]
})
export class DefaultChildComponent implements OnInit, DoCheck, OnChanges {
  @Input() counter: number = 0;
  @Input() text: string = '';
  @Input() items: string[] = [];

  ngOnInit(): void {
    console.count('DefaultChildComponent.ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.count('DefaultChildComponent.ngOnChanges');
  }

  ngDoCheck(): void {
    console.count('DefaultChildComponent.ngDoCheck');
  }

  // 昂贵的计算属性
  get expensiveCounter(): number {
    // 模拟昂贵计算
    let result = this.counter;
    for (let i = 0; i < 100; i++) {
      result = Math.sqrt(result * result);
    }
    console.count('DefaultChildComponent.expensiveCounter');
    return this.counter;
  }

  get expensiveText(): string {
    // 模拟昂贵计算
    let result = '';
    for (let i = 0; i < 100; i++) {
      result = this.text + i;
    }
    console.count('DefaultChildComponent.expensiveText');
    return this.text;
  }

  get expensiveItemsCalculation(): number {
    // 模拟昂贵计算
    if (!this.items.length) return 0;
    
    let sum = 0;
    for (let i = 0; i < 100; i++) {
      sum += this.items.reduce((acc, item) => acc + item.length, 0);
    }
    console.count('DefaultChildComponent.expensiveItemsCalculation');
    return this.items.length;
  }
} 