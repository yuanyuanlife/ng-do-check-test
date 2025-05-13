import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DefaultParentComponent } from './components/default-parent/default-parent.component';
import { OnPushParentComponent } from './components/on-push-parent/on-push-parent.component';
import { DefaultChildComponent } from './components/default-child/default-child.component';
import { OnPushChildComponent } from './components/on-push-child/on-push-child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    DefaultParentComponent, 
    OnPushParentComponent, 
    DefaultChildComponent, 
    OnPushChildComponent
  ],
  template: `
    <div class="container">
      <h1>Angular 变更检测演示</h1>
      <p>
        这个应用演示了 OnPush 变更检测策略和默认变更检测策略在不同组件组合下的行为。
        打开浏览器控制台查看 ngDoCheck 和各个计算属性的调用次数。
      </p>
      
      <div class="controls">
        <div class="timer-control">
          <button (click)="toggleTimer()">{{ timerRunning ? '停止计时器' : '启动计时器' }}</button>
          <span *ngIf="timerRunning">计时器每秒触发一次变更</span>
        </div>
        
        <div class="mouse-control">
          <button (click)="mouseMoveTrigger = !mouseMoveTrigger">
            {{ mouseMoveTrigger ? '停止鼠标移动监听' : '启动鼠标移动监听' }}
          </button>
          <span *ngIf="mouseMoveTrigger">鼠标移动将触发变更检测</span>
        </div>
      </div>

      <div class="components-container">
        <app-default-parent></app-default-parent>
        <app-on-push-parent></app-on-push-parent>
      </div>
      
      <div class="explanation">
        <h2>变更检测行为说明</h2>
        <ul>
          <li>默认变更检测 (Default)：每次变更检测周期都会检查组件</li>
          <li>OnPush 变更检测：只在输入属性变化、事件发生或异步管道触发时才会检查</li>
          <li>父组件是 OnPush 时：如果父组件被跳过检测，其所有子组件也会被跳过，无论子组件是什么策略</li>
          <li>observe 函数是否触发 console.count 取决于检测策略和具体触发方式</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    h1 {
      color: #333;
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
    }
    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 20px 0;
    }
    .timer-control, .mouse-control {
      padding: 10px;
      background-color: #f5f5f5;
      border-radius: 5px;
    }
    .timer-control button, .mouse-control button {
      margin-right: 10px;
    }
    .components-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .explanation {
      margin-top: 30px;
      padding: 15px;
      background-color: #e8eaf6;
      border-radius: 5px;
    }
  `]
})
export class AppComponent {
  timerRunning = false;
  private timerId: any = null;
  mouseMoveTrigger = false;

  @HostListener('document:mousemove')
  onMouseMove(): void {
    if (this.mouseMoveTrigger) {
      console.count('Mouse move event');
    }
  }

  toggleTimer(): void {
    if (this.timerRunning) {
      clearInterval(this.timerId);
      this.timerRunning = false;
    } else {
      // 每秒触发一次变更
      this.timerId = setInterval(() => {
        console.count('Timer tick');
      }, 1000);
      this.timerRunning = true;
    }
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}
