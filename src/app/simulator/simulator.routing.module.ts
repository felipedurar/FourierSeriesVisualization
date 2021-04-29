import { NgModule } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RouterModule, Routes } from '@angular/router';
import { SimulatorComponent } from './simulator.component';

const routes: Routes = [
//   {
//     path: 'pgs',
//     //loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule)
//   },
  {
    path: '',
    pathMatch: 'full',
    component: SimulatorComponent,
    data: {
      title: 'common.title',
      description: 'about.about-msg1'
    }
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class SimulatorRoutingModule { }
