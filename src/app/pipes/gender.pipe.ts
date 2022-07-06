import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: unknown): unknown {
    return value === 'F' ? 'Féminin' : 'Masculin' ;
  }

}
