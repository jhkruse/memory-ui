import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { StartViewComponent } from './start-view/start-view.component';

const routes: Routes = [
  {
    path: '',
    component: StartViewComponent
  },
  {
    path: 'board',
    component: BoardComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
