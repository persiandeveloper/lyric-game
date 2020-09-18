import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'replaceQuestionHolder' })
export class ReplaceQuestionHolder implements PipeTransform {
  transform(value: string): string {
    var splitted = value.split(" ");
    var qindex = splitted.findIndex(x => x == '(-----)');

    if (qindex == -1) {
      return value;
    }

    splitted[qindex] = splitted[qindex].replace('(-----)', '<b class="text-danger">(----)</b>');

    if (qindex != 0) {
      splitted[qindex - 1] = splitted[qindex - 1].replace(splitted[qindex - 1],
        '<b>' + splitted[qindex - 1] + '</b>');
    }

    if (qindex < (splitted.length - 1)) {

      splitted[qindex + 1] = splitted[qindex + 1].replace(splitted[qindex + 1],
        '<b>' + splitted[qindex + 1] + '</b>');
    }

    return splitted.join(' ');
  }
}