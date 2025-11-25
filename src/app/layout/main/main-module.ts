import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing-module';
import { Main } from './main';
import { RouterModule } from '@angular/router';
import { Configuration } from './configuration/configuration';
import { NavBar } from './nav-bar/nav-bar';
import { NavLeft } from './nav-bar/nav-left/nav-left';
import { NavRight } from './nav-bar/nav-right/nav-right';
import { NavSearch } from './nav-bar/nav-left/nav-search/nav-search';
import { Navigation } from './navigation/navigation';
import { NavContent } from './navigation/nav-content/nav-content';
import { NavCollapse } from './navigation/nav-content/nav-collapse/nav-collapse';
import { NavGroup } from './navigation/nav-content/nav-group/nav-group';
import { NavItem } from './navigation/nav-content/nav-item/nav-item';
import { NavLogo } from './navigation/nav-logo/nav-logo';
import { SharedModule } from '../../shared/shared-module';
import { Dashborad } from '../../pages/dashborad/dashborad';


@NgModule({
  declarations: [
    Main,
    Dashborad,
    Configuration,
    NavBar,
    NavLeft,
    NavRight,
    NavSearch,
    Navigation,
    NavContent,
    NavCollapse,
    NavGroup,
    NavItem,
    NavLogo
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
