/*вывод даты в нужном формате */
export default function formatDate (dat) {
  
    const datDate = new Date(dat);
    let monthNames= [ "янв", "фев", "март", "апр", "май", "июнь","июль", "авг", "сент", "окт", "нояб", "декаб"];
    let mon=monthNames[datDate.getMonth()];
    let newDate = `${datDate.getDate()} ${mon} ${datDate.getFullYear()}г`;
    
    return newDate;
  }