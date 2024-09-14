import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(array: any[], searchWord: string): any[] {
    return array.filter( (item) =>  item.title.toLowerCase().includes(searchWord.toLowerCase()) );
  }

}
