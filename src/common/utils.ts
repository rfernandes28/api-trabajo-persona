import * as moment from 'moment';

export function validarFormatoFecha(date: any) {
  return moment(date, 'MM/DD/YYYY', true).isValid();
}
