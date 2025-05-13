import { Component, OnInit, DoCheck, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../shared/state.service';
import { FormsModule } from '@angular/forms';
import { DefaultChildComponent } from '../default-child/default-child.component';
import { OnPushChildComponent } from '../on-push-child/on-push-child.component';

@Component({
  selector: 'app-on-push-parent',
  standalone: true,
  imports: [CommonModule, FormsModule, DefaultChildComponent, OnPushChildComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="parent on-push-parent">
      <h2>OnPush变更检测父组件</h2>
      <p>计数器: {{ expensiveCounter }}</p>
      <p>文本: {{ expensiveText }}</p>
      <p>Items计算: {{ expensiveItemsCalculation }}</p>
      
      <div class="controls">
        <button (click)="increment()">增加计数器</button>
        <input [(ngModel)]="newText" placeholder="新文本" />
        <button (click)="updateText()">更新文本</button>
        <input [(ngModel)]="newItem" placeholder="新项目" />
        <button (click)="addItem()">添加项目</button>
      </div>

      <div class="children">
        <app-default-child [counter]="state.counter" [text]="state.text" [items]="state.items"></app-default-child>
        <app-on-push-child [counter]="state.counter" [text]="state.text" [items]="state.items"></app-on-push-child>
      </div>
    </div>
  `,
  styles: [`
    .parent {
      border: 2px solid #ff4081;
      padding: 15px;
      margin: 10px;
      border-radius: 5px;
    }
    .on-push-parent {
      background-color: #fce4ec;
    }
    .controls {
      margin: 10px 0;
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
    .children {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  `]
})
export class OnPushParentComponent implements OnInit, DoCheck, OnChanges {
  newText = '';
  newItem = '';
  state: any;

  constructor(private stateService: StateService) {
    this.state = this.stateService.currentState;
  }

  ngOnInit(): void {
    this.stateService.state$.subscribe(state => {
      this.state = state;
    });
    console.count('OnPushParentComponent.ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.count('OnPushParentComponent.ngOnChanges');
  }

  ngDoCheck(): void {
    console.count('OnPushParentComponent.ngDoCheck');
  }

  // 昂贵的计算属性，在模板中被引用
  get expensiveCounter(): number {
    // 模拟昂贵计算
    let result = this.state.counter;
    for (let i = 0; i < 100; i++) {
      result = Math.sqrt(result * result);
    }
    console.count('OnPushParentComponent.expensiveCounter');
    return this.state.counter;
  }

  get expensiveText(): string {
    // 模拟昂贵计算
    let result = '';
    for (let i = 0; i < 100; i++) {
      result = this.state.text + i;
    }
    console.count('OnPushParentComponent.expensiveText');
    return this.state.text;
  }

  get expensiveItemsCalculation(): number {
    // 模拟昂贵计算
    let sum = 0;
    for (let i = 0; i < 100; i++) {
      sum += this.state.items.reduce((acc: number, item: string) => acc + item.length, 0);
    }
    console.count('OnPushParentComponent.expensiveItemsCalculation');
    return this.state.items.length;
  }

  increment(): void {
    this.stateService.incrementCounter();
  }

  updateText(): void {
    this.stateService.updateText(this.newText);
    this.newText = '';
  }

  addItem(): void {
    this.stateService.addItem(this.newItem);
    this.newItem = '';
  }
} 