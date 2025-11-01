import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
// import { LoginComponent } from './domains/login/login.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./domains/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./domains/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./domains/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },]
  }


  //   {
  //     path: '',
  //     component: LayoutComponent,
  //     canActivate: [routeGuard],
  //     children: [
  //       {
  //         path: 'dashboard',
  //         loadComponent: () =>
  //           import('@app/domains/dashboard/dashboard.component').then(
  //             (m) => m.DashboardComponent
  //           ),
  //       },
  //       {
  //         path: 'evidence',
  //         loadComponent: () =>
  //           import('@app/domains/evidence/evidence.component').then(
  //             (m) => m.EvidenceComponent
  //           ),
  //       },
  //       {
  //         path: 'evidence-detail/:id',
  //         loadComponent: () =>
  //           import('@app/domains/evidence-detail/evidence-detail.component').then(
  //             (m) => m.EvidenceDetailComponent
  //           ),
  //       },
  //       {
  //         path: 'cases',
  //         loadComponent: () =>
  //           import('@app/domains/cases/cases.component').then(
  //             (m) => m.CasesComponent
  //           ),
  //       },
  //       {
  //         path: 'people',
  //         loadComponent: () =>
  //           import('@app/domains/people/people.component').then(
  //             (m) => m.PeopleComponent
  //           ),
  //       },
  //       {
  //         path: 'manage-locations',
  //         loadComponent: () =>
  //           import(
  //             '@app/domains/manage-locations/manage-locations.component'
  //           ).then((m) => m.ManageLocationsComponent),
  //       },
  //       {
  //         path: 'reports',
  //         loadComponent: () =>
  //           import('@app/domains/reports/reports.component').then(
  //             (m) => m.ReportsComponent
  //           ),
  //       },
  //     ],
  //   },
  //   {
  //     path: '**',
  //     loadComponent: () =>
  //       import('@app/shared/not-found/not-found.component').then(
  //         (m) => m.NotFoundComponent
  //       ),
  //   },
];
