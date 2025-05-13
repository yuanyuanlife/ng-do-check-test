import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppState {
  counter: number;
  text: string;
  items: string[];
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private initialState: AppState = {
    counter: 0,
    text: 'Initial text',
    items: ['Item 1', 'Item 2', 'Item 3']
  };

  private stateSubject = new BehaviorSubject<AppState>(this.initialState);
  
  // 暴露状态的可观察对象
  readonly state$ = this.stateSubject.asObservable();
  
  // 提供当前状态的快照
  get currentState(): AppState {
    return this.stateSubject.getValue();
  }

  // 更新计数器
  incrementCounter(): void {
    const state = this.currentState;
    this.stateSubject.next({
      ...state,
      counter: state.counter + 1
    });
    console.count('StateService.incrementCounter called');
  }

  // 更新文本
  updateText(text: string): void {
    const state = this.currentState;
    this.stateSubject.next({
      ...state,
      text
    });
    console.count('StateService.updateText called');
  }

  // 添加一个项目
  addItem(item: string): void {
    const state = this.currentState;
    this.stateSubject.next({
      ...state,
      items: [...state.items, item]
    });
    console.count('StateService.addItem called');
  }

  // 重置状态
  resetState(): void {
    this.stateSubject.next(this.initialState);
    console.count('StateService.resetState called');
  }
} 