export function getSector(pNum1: number,pNum2: number): string {

  if(-0.01<Math.abs(pNum1-pNum2)&&Math.abs(pNum1-pNum2)<0.01){
  return "P";
  }else if(pNum1>pNum2){
  return "B";
}else {
  return "S";

  }
}
export function getForm(pSector: string): string {
  let temp: string = '';
  let cont = 0;
  let result = '';
  while (cont != pSector.length) {
    temp += pSector[cont];
    if (temp.length == 3) {
      if (temp.search('BS') != -1 || temp == 'PSP' || temp.search('SB') != -1) {
        result += 'P';
      } else if (temp.search('SP') != -1 || temp.search('PS') != -1) {
        result += 'M';
      } else if (temp.search('BP') != -1 || temp.search('PB') != -1) {
        result += 'V';
      } else if (temp == 'PPP') {
        result += 'L';
      } else if (temp == 'SSS') {
        result += 'S';
      } else if (temp == 'BBB') {
        result += 'B';
      } else if (temp.search('F') != -1) {
        result += 'F';

      }
      temp = '';
    }
    cont++;
  }
  return result;
}
