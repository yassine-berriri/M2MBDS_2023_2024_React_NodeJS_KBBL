export default class Tools {
 
    static convertToSimpleDate(isoDate) {
      const date = new Date(isoDate);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      //return `${year}-${month}-${day}`;
      return `${day}/${month}/${year}`;
    }
  }