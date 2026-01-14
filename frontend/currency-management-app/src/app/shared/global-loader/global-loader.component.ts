import { Component } from '@angular/core';
import { LoaderService } from './loader-service';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.css']
})
export class GlobalLoaderComponent {
   loading$ = this.loaderService.loading$;
   constructor(private loaderService: LoaderService) {}

}
