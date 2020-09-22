import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'appcat',
    loadChildren: () => import('./pages/appcat/appcat.module').then( m => m.AppcatPageModule)
  },
  {
    path: 'find-asses',
    loadChildren: () => import('./pages/find-asses/find-asses.module').then( m => m.FindAssesPageModule)
  },
  {
    path: 'pay-asses',
    loadChildren: () => import('./pages/pay-asses/pay-asses.module').then( m => m.PayAssesPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'mybills',
    loadChildren: () => import('./pages/mybills/mybills.module').then( m => m.MybillsPageModule)
  },
  {
    path: 'bill-asses/:id',
    loadChildren: () => import('./pages/bill-asses/bill-asses.module').then( m => m.BillAssesPageModule)
  },
  {
    path: 'totbill-asses',
    loadChildren: () => import('./pages/totbill-asses/totbill-asses.module').then( m => m.TotbillAssesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
