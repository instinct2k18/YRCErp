import { Injectable } from '@angular/core';
import * as jsPdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfgenerateService {

  constructor() { }

  getCollegeAddress(address) {
    address = address.split(', ').join(',').split(',');
    return (address.slice(Math.max(address.length - 5, 1)));
  }
  csv(x) {
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    const otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    return (res + '/-') ;
  }
  splitCollegeAddress(address) {
    const full = [];
    const regex = /(.{1,45})(.{1,90})(.{1,90})(.*)/gmis;
    const match = regex.exec(address);
    full.push(match[1]);
    full.push(match[2]);
    full.push(match[3]);
    return full;
  }
  splitBankAddress(address) {
    const full = [];
    const regex = /(.{1,58})(.{1,90})(.{1,90})(.*)/gmis;
    const match = regex.exec(address);
    full.push(match[1]);
    full.push(match[2]);
    full.push(match[3]);
    return full;
  }


form1(clg_name, clgAddr, voucher_no, current_date, received_date, bank_details,
  letterNumber, letterDate, receiptNumber, receiptDate) {

  const address = this.getCollegeAddress(clgAddr);
  const doc = new jsPdf();
  doc.setFontSize(12);
  const x = 26;
  let y = 85;

  doc.fromHTML('The Principal,', x, y);

  y += 5;
  doc.fromHTML(clg_name + ',' , x, y);
  if (address[0] !== undefined) {
    y += 5;
    doc.fromHTML(address[0] + ',' , x, y);
  }
  if (address[1] !== undefined) {
    y += 5;
    doc.fromHTML(address[1] + ',' , x, y);
  }
  if (address[2] !== undefined) {
    y += 5;
    doc.fromHTML(address[2] + ',' , x, y);
  }
  if (address[3] !== undefined) {
    y += 5;
    doc.fromHTML(address[3] + ',' , x, y);
  }
  y += 10;
  doc.fromHTML('Dear Sir/Madam, ', x, y);

  y += 10;
  doc.fromHTML('<b>Sub</b>:- Registration of Youth Red Cross', 57, y);

  y += 5;
  if (letterNumber) {
    doc.fromHTML('<b>Ref</b>:- Your Letter No: <b>' + letterNumber , 57, y);
  } else {
    doc.fromHTML('<b>Ref</b>:- Your Letter No:', 57, y);
  }
  y += 5;
  doc.fromHTML('<b>Date</b>:- ' + letterDate, 57, y);
  y += 5;
  doc.fromHTML('<sup>**********</sup>', 3.5 * x + 4, y);
  y += 5;
  doc.fromHTML('We acknowledge with thanks the receipt of <b>Bank Draft / Cheque No: ' + voucher_no + '</b> Dated:', 35, y);
  y += 5;
  doc.fromHTML('<b>' + received_date + '</b>,  <b>' + bank_details + '</b>', x, y);
  y += 5;
  doc.fromHTML('for <b>Rs.1,500/- (Rupees One Thousand Five Hundred Only) </b>towards onetime payment of ', x, y);
  y += 5;
  doc.fromHTML('College Registration.', x, y);
  y += 10;
  doc.fromHTML('Receipt No: ' + receiptNumber + ' Dated:' + receiptDate + ' for Rs.1,500/- is enclosed.', 35, y);

  // doc.fromHTML('Receipt No:' + receiptNumber, 35, 140);
  // doc.fromHTML('Dated:' + receiptDate, 80, 140);
  // doc.fromHTML('for Rs.1,500/- is enclosed.', 120, 140);

  y += 10;
  doc.fromHTML('Participation of students in Red Cross activities promotes understanding and accepting', 35, y);

  y += 5;
  doc.fromHTML('of civic responsibilities and maintaining a spirit of friendliness.', x, y);

  y += 10;
  doc.fromHTML('Thanking you, ', 37, y);
  y += 10;
  doc.fromHTML('Yours truly, ', x * 5.75 + 6, y);

  y += 20;
  doc.fromHTML('<b>General Secretary</b>', x * 5.75, y);

  doc.save(clg_name + '_Form 1 _'  + current_date + '.pdf');
}

  form2(clg_name, clgAddr, voucher_no, current_date, receivedDate, bankDetails, student_count, fee, letterNumber,
    letterDate, receiptNumber, receiptDate) {
      const x = 26;
      let y = 85;
      const doc = new jsPdf();
      doc.setFontSize(13);
      doc.fromHTML('The Principal,', x, y);
      y += 5;
      doc.fromHTML(clg_name + ',' , x, y);

      const address = this.getCollegeAddress(clgAddr);
      if (address[0] !== undefined) {
        y += 5;
        doc.fromHTML(address[0] + ',' , x, y);
      }
      if (address[1] !== undefined) {
        y += 5;
        doc.fromHTML(address[1] + ',' , x, y);
      }
      if (address[2] !== undefined) {
        y += 5;
        doc.fromHTML(address[2] + ',' , x, y);
      }
      if (address[3] !== undefined) {
        y += 5;
        doc.fromHTML(address[3] + ',' , x, y);
      }
      y += 10;
      doc.fromHTML('Dear Sir/Madam, ', x, y);

      y += 10;
      doc.fromHTML('<b>Sub</b>:- Registration of College and Sending student membership amount', 57, y);

      y += 5;
      doc.fromHTML('<b>Ref</b>:- Your Letter No: <b>' + letterNumber + '</b> Date: <b>' + letterDate + '</b>', 57, y);
      y += 5;
      doc.fromHTML('<sup>**********</sup>', 3.5 * x + 4, y);

      y += 5;
      doc.fromHTML('We acknowledge with thanks the receipt of ' + voucher_no + ' for Rs.1,500/- <b>(Rupees One</b>', 35, y);

      y += 5;
      doc.fromHTML('<b>Thousand Five Hundred Only)</b> being the onetime payment of College Registration Fee', x, y);
      y += 5;
      doc.fromHTML('and ' + student_count + ' Students membership Fee 30% of Rs. '
      + this.csv(parseInt(fee, 10)) + ' (Total Rs: ' + this.csv(parseInt(fee, 10) + 1500) + ' )', x, y);

      // doc.fromHTML('Receipt No: ' + receiptNumber, 35, 130);
      // doc.fromHTML('Dated:', 80, 130);
      // doc.fromHTML('for Rs.' + this.csv(total) + ' is enclosed.', 120, 130);

      y += 10;
      doc.fromHTML('Receipt No: ' + receiptNumber + 'Dated: ' + receiptDate + ' for Rs.'
      + this.csv(parseInt(fee, 10) + 1500) + ' is enclosed.', 35, y);

      y += 5;
      doc.fromHTML('On behalf of Indian Red Cross Society,  Karnataka State Branch,  I thank you for your', 35, y);
      y += 5;
      doc.fromHTML('kind co-operation,  I request you to continue your co-operation in enrolling more number of', x, y);
      y += 5;
      doc.fromHTML('students every year at the time of admission. Kindly utilize 70% out of the membership fee', x, y);
      y += 5;
      doc.fromHTML('collected for Youth Red Cross activities mentioned in the guidelines.', x, y);

      y += 10;
      doc.fromHTML('Participation of students in Red Cross activities promotes understanding and accepting', 35, y);
      y += 5;
      doc.fromHTML('of civic responsibilities and maintaining a spirit of friendliness.', x, y);

      y += 10;
      doc.fromHTML('Thanking you, ', 37, y);
      y += 5;
      doc.fromHTML('Yours truly, ', x * 5.75 + 6, y);
      y += 20;
      doc.fromHTML('<b>General Secretary</b>', x * 5.75, y);

      doc.save(clg_name + '_Form 2_' + current_date + '.pdf');

  }

  form3(clg_name, clgAddr, voucher_no, current_date, received_date, bank_details,
    student_count, fee, letterNumber, letterDate, receiptNumber, receiptDate) {
    const address = this.getCollegeAddress(clgAddr);
    const doc = new jsPdf();
    const x = 26;
    let y = 85;
    doc.setFontSize(13);
    doc.fromHTML('The Principal,', x, y);
    y += 5;
    doc.fromHTML(clg_name + ',' , x, y);
    if (address[0] !== undefined) {
      y += 5;
      doc.fromHTML(address[0] + ',' , x, y);
    }
    if (address[1] !== undefined) {
      y += 5;
      doc.fromHTML(address[1] + ',' , x, y);
    }
    if (address[2] !== undefined) {
      y += 5;
      doc.fromHTML(address[2] + ',' , x, y);
    }
    if (address[3] !== undefined) {
      y += 5;
      doc.fromHTML(address[3] + ',' , x, y);
    }

    y += 10;
    doc.fromHTML('Dear Sir/Madam, ', x, y);

    y += 10;
    doc.fromHTML('<b>Sub</b>:- Student Membership Amount.', 57, y);

    y += 5;
    doc.fromHTML('<b>Ref</b>:- Your Letter No: <b>' + letterNumber + '</b> Date: <b>' + letterDate + '</b>', 57, y);
    y += 5;
    doc.fromHTML('<sup>**********</sup>', 3.5 * x + 4, y);

    y += 5;
    doc.fromHTML('We acknowledge with thanks the receipt of <b>Bank Draft / Cheque No: ' + voucher_no + '</b> Dated:', 35, y);
    y += 5;
    doc.fromHTML('<b>' + received_date + '</b>,  <b>' + bank_details + '</b>', x, y);
    y += 5;
    doc.fromHTML('for <b>Rs.' + this.csv(fee) + ' </b> towards 30% membership contribution from ' + student_count + ' students. ', x, y);

    y += 10;
    doc.fromHTML('Receipt No: ' + receiptNumber + ' Dated:' + receiptDate + ' for Rs.1, 500/- is enclosed herewith.', 35, y);

    y += 10;
    doc.fromHTML('Participation of students in Red Cross activities promotes understanding and accepting', 35, y);
    y += 5;
    doc.fromHTML('of civic responsibilities and maintaining a spirit of friendliness.', x, y);

    y += 10;
    doc.fromHTML('Thanking you, ', 37, y);
    y += 10;
    doc.fromHTML('Yours truly, ', x * 5.75 + 6, y);
    y += 20;
    doc.fromHTML('<b>General Secretary</b>', x * 5.75, y);

    doc.save(clg_name + '_Form 3_' + current_date + '.pdf');
  }

  form4(clg_name, clgAddr, voucher_no, current_date, received_date, bank_details,
    student_count, fee, letterNumber, letterDate, receiptNumber, receiptDate) {
    const address = this.getCollegeAddress(clgAddr);
    const doc = new jsPdf();
    const x = 26;
    let y = 85;
    doc.setFontSize(13);
    doc.fromHTML('The Principal,', x, y);
    y += 5;
    doc.fromHTML(clg_name + ',' , x, y);
    if (address[0] !== undefined) {
      y += 5;
      doc.fromHTML(address[0] + ',' , x, y);
    }
    if (address[1] !== undefined) {
      y += 5;
      doc.fromHTML(address[1] + ',' , x, y);
    }
    if (address[2] !== undefined) {
      y += 5;
      doc.fromHTML(address[2] + ',' , x, y);
    }
    if (address[3] !== undefined) {
      y += 5;
      doc.fromHTML(address[3] + ',' , x, y);
    }
    y += 10;
    doc.fromHTML('Dear Sir/Madam, ', x, y);

    y += 10;
    doc.fromHTML('<b>Sub:- Student Membership Amount.</b>', 57, y);
    y += 5;
    doc.fromHTML('<b>Ref</b>:- Your Letter No: <b>' + letterNumber + '</b> Date: <b>' + letterDate + '</b>', 57, y);
    y += 5;
    doc.fromHTML('<sup>**********</sup>', 3.5 * x + 4, y);

    y += 5;
    doc.fromHTML('We acknowledge with thanks the receipt of <b>Bank Draft / Cheque No: ' + voucher_no + '</b> Dated:', 35, y);
    y += 5;
    doc.fromHTML('<b>' + received_date + '</b>,  <b>' + bank_details + '</b>', x, y);

    y += 5;
    doc.fromHTML('for <b>Rs.' + this.csv(fee) + ' </b> towards 30% membership contribution from ' + student_count +
      ' Students. ', x, y);

    y += 10;
    doc.fromHTML('Receipt No:' + receiptNumber + ' Dated:' + receiptDate + ' for Rs.'
    + this.csv(fee) + ' is enclosed.', 35, y);

    y += 10;
    doc.fromHTML('So far your College has not enrolled in the youth Red Cross wing. Therefore,  I request', 35, y);
    y += 5;
    doc.fromHTML('you kindly to register your college by paying one-time payment of Rs.1,500/- as per', x, y);
    y += 5;
    doc.fromHTML('Government order No: ED 64/ Miscellaneous/2011 Bengaluru dtd. 22/12/2011.', x, y);

    y += 10;
    doc.fromHTML('Thanking you, ', 37, y);
    y += 10;
    doc.fromHTML('Yours truly, ', x * 5.75 + 6, y);
    y += 25;
    doc.fromHTML('<b>General Secretary</b>', x * 5.75, y);

    doc.save(clg_name + '_Form 4_' + current_date + '.pdf');
  }

  splitCollegeAddressForReceipt(address) {
    const full = [];
    const regex = /(.{1,45})(.{1,90})(.{1,90})(.*)/gmis;
    const match = regex.exec(address);
    full.push(match[1]);
    full.push(match[2]);
    full.push(match[3]);
    return full;
  }

  splitBankAddressForReceipt(address) {
    const full = [];
    const regex = /(.{1,58})(.{1,90})(.{1,90})(.*)/gmis;
    const match = regex.exec(address);
    full.push(match[1]);
    full.push(match[2]);
    full.push(match[3]);
    return full;
  }

  generateReceipt(r_no, currentDate, voucher_no, received_date, bankDetails, student_count, fee, clg_name, clgAddress) {

    const img = 'iVBORw0KGgoAAAANSUhEUgAABnYAAAkjCAMAAAALF4H3AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABvUExURf///9/f3/n39wcHBxwcHJOTk1hYWAAAAP8AAKWlpZubm/Ls7LCwsHZ2du0cJBAQEOfn5zY2NtHR0SoqKmlpacfHx01NTUJCQtra2oGBgYuLi19fX729vf9SUra2tv97e//R0f+3t/8kJP+mpv+YmNMQgskAAJb2SURBVHja7NyLkqq4GoZhJGiKUwEioGJx/5e5CUBOgLv3nu4ZV8/71NRUixBOq/P5J9hBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPt6rzxOHBAD8Ck7nfu4vnxE7N24MAPw7fEbsPGSbxU8LNwYAfoXI7tuz7FNiJ5YDI40A8Pt9TuzEwau/9Oq/Xg3/cWsA4Fe4J0nyWPr3yyfFzpn5HQD4/fM6xA4AgNgBABA7xA4AgNgBABA7xA4AgNgBABA7OnbEclh1HUXcHAD4FUQU1dFnxk68ps78PVYAwC9wCYIg/ANiBwDwa3x47ESfc1gAgL/cv1+C0x8QOwCAXzPM9ifEDh8QAIBqh9gBABA7AABih9gBABA7AABih9gBAGKH2AEAEDsAAGKH2AEAEDsAAGKH2AEAYofYAQAQOwAAYofYAQAQOwAAYofYAQBih9gBABA7xA4AEDvEDgCA2AEAEDvEDgCA2AEAEDvEDgAQO8QOAIDYAQAQO8QOvkmaJMk58f53DYIwWcyrra/C8ecm0bIm3bYY3y7t5TGEeslpXdtp62U2CbN83OSWn1/LRsOyzn16te7wau9mXdhMr+5Wo+47qbXxa/7x5P7zn5YNzrK+ba3DW1rXqyzXJvZOLdu5lPHSfJKU9qbLq+BwK+367NtLf77v3DpzG5LhHjpLnQadjR5tm+y01Yy7Ge/AM0vXo3SPaeA3hdghdvBN7nLHMwjSbvpJ9PNql/mNVvVuWWSvWyWh3V55E1JMbxTP9Y17tSxY2preL846p3Lh7Hr0LKYX9Rw0yw4jp+9bF85Z1tTzLlSXOjjvlJ3ZOJ7fye12Ts6xLZ3wuKS3X0+ti7XvD9vppWrmuuz3Mf7c7VzJKGjnH7p543C+kJGJnf2tFq9KyvniVK/NreutyyaK/r5d6jY2XWshZb3tAaw7qq5gujmolt8UYofYwTfGTvHIhqGTUgxDltRr359IKeXV7onlUq6ElZAyz8aVexUPVWl10OOCvgmDe+68ofrCKLXbinRYNZGU7SsMyqw2kVCqjvCmy4tqjTxLqPrGTi/sTaPT6uadxGycTikR2S09piVu0abaKpx9TWnRWb8yUiw1002niNrrJR6GpzqNYYinkx4jVG160ZvehJS9dQAHW01yKaPnKQyHSgr53Ny7qzrMLBuyp7p5IrGWDpNMBbpzItNNPXnlaStllJRBOiX5U69XzY3EN2KH2CF28M2xc13qmamDCqOl6wmFlJVZsZZS2J3XHEHpuJkwazVCymWE6KU2D/fLh9qqONQmT5Mu6/KbnXnBWep23S40cSqU3FrdvBOawJwzQNrje9MH/ZsbaFOt1diLXtKK3UD9krRW39+vdcttPZJsSTQVIK1TYD2lqOzYO9pqTp16GZu76UCwVXrVV2FOq7LLJa/amerOs3u2lc7osF7fVDe/NYdsJS6IHWIHfzl2+sCOnSBbO7jI+ZDbWR3YYFU+tdUdp+MmDzsVbla45U5bax+qyprc+vieW0WI+VSeSSk30wuZEwR3q2OOhf1OUJigSWRROwmYSVH4PXos68gbirtKt0wqdBulPrVOinSNqGyJNHXJSmdgq9V1UvB2q+n8zLhe5cSwbkvfE3Uxqs1S9aJw7rbo/AzprWKv0ZfCvvlhJKl2iB1iB98YO83a+xTrZ/3/IXacdMmlLEKnPjqZvvnhtHW2Or3Q6iTt2CnthBGbyY3ByaKTFTtuIKnYaUzsJFIKe4997cdOJ583bwrkLuVzmc5ZmrwF/qlVSxTpuiXIRbSey8us/vQqls1W84VWNVfuFHPdm9hRd2vJaSd2Xk61k8uLOv3Uq+My62jO29gZT4DYIXaIHXxf7CyfhnW1E/RyN3aE6Yjt2Lmb/lDNV1s1wtmaqvFiR6y9290dPLqeG2s0zIkd+YXYWbMsE0exE0uZCmvArpSyibx5k7Glk2r77sbOtbKqj0jHTqpPrVv2aQKkmfv8tBB6uPLmziy92eosnEOo3ZfrPdOhctNXw14ahHHmjChmpTde2TnDcM35uhM7afziN4XYIXbwTcLm6sdO2ZT71c5u7KRmdCdxZ0RK8xjVYbWTO+lief5MtRNLEV6s83rIOvAH2R6yC0LhLlRFYSOl6HYH2eZTuzahXz+8rjqAs7Udb7Bwu1XYNHPh4RRcDynF402189Dbt958jn3FijCo7Acc1AGJfGfViMcIiB1iBz/s4j3z5Pc87cEgW2mec2qd4atplG0Z9ynduZ1WWmM59e7hPH6s2gkz03QYyWQTO2qZOsTOjZ3X9BR5dlzt2ONh7vMPoT7N7rAz97cq/Ye4d0bZ7Lom15fochg7F9XiwxkJffoPTxA7xA6xgw+JnaNqp9FVhpqMqL0ml9WOqh2/b/3xaieRMlXHuQTUIEQaeIVNI2U6V26pFzulkHIZInPndtxywZ0tWdNuypTBDNP5/K0y79m1UG5ukPNRoNfDgmbp6+ZctFSoi9g4Ed6657lz8+Pbnd8OYofYwT8TO7vVTi6lKHUH7Hwez3XPeTS3M2xKhcPY+b65neAmpH7oq1f/4J3+vZ/O2psCmQfHnjpi/lu148WOKvzGwAprmQdvqp3MK/cy73bI8LjaMXWjWXpxy7hkDs3IfmA8OiiNzM2PJBM7xA6xg5+JHfH/VDulqRUa52uRgf1MwVG1437B5u0g23fN7YytNmthUErR+LETijluan8KZJifFp/LlWhnbudd7AxSimTt978UO72ftLXcPFPgPUB99pY23rMS1Xw3eikiu4aq3sZOsnPlQewQO/ipakdEmtiNnav10TnzR8xi/Wy11zfruZ3HTg9tqh2z8+Ko2inMOl+tdsqpB3/Mu1en5MZOIub5qVzYE1X3ucHXOpH1rtp57Z2UKhbLYvud18OtWn/Spdt+c8fUNU0h5fot1IuUouuqrt4+FnFd79PVCs2j2CmmRvauPIgdYgd/T+w4g2x5HCePdlwjs0fCnK/7Z07s5DvVTv7F2ImOqh1nla/N7ZzMHwKYHh4I3djprO/RvPzY0dNV0c73dt5VO/MfBBLV8fX3t+qkFJvYabbVzul0bxKVUVVqBZYoikJ4o4e5rMOlntPLT/LgLxBEcyOqDaodYofYwd8XO2++t7P+6c7QSZmvVTt6bie3ZlDC66zcH2T7trmd+3w4zTTB/x/2rkPJWR4J2hK2zoQiZ85XF97/GQ9JhBHgtWGdt/uv/6u1DUIBptUzI+FMaWfflykTD5IZ7ey7rAJT7UxSCvgSl2Z8aZ+By2fdonaycdvPeNyRtddAzDa9h34/BPmocIIfaEcNPvOgdkA7oB3gRbQzcbKVrmvnKmJB3URGbMceyOZSbKcisZ1A7zrdHfewdTsqPqI3QlP5xBPaKYfs4poG23vaUfUqpZtuXWxHL4w97m5XO8fpfkDhfImTdKdVnudVbjHRQH0/V0Z3dXtGHMaSnKuxHYaUAtAOaAd4EO3wDet2jjQlIJrOnEdSuRTbOVCTz2qyT+VE7fC7qh1JiD4L9Ncm7VjCyjRiqi4G2lFbhxa7mP8c25nHcNhMFe1+PCuZlrKQyba8MHSM+Lj5iX7Nu5aF46gxcTWTrcwjPB2gHdAO8AZqR1lhxxJiWIniTE3YuILxkto5G+EgRrbpf9y6naK7klvpBhm00wjBeQda52LggLPKKgjXxnau0s70rGpark8S0GYEc52M5OiQlmXjIPOfaQcA7YB2gBfRDl9at2PTd7FM5+PhsGvBJKUg5EQF5cYVw2XaWad2zqYJ56Ns6dSObO3R0pUwaKcmK/hJbQjtqKBLk69ct7OedqYuy2JhZe01tUNxIOnXx3E7iWz+/h3QDmgHtAM8iXY2rduxSLB/Go7wB06Z2NxwON03dmoJx03PfrVux9xohpGietpRSRF6J2ZKO4yLxHBzBXPakVkFebbw4gNKGOtpZ3rWVDueFkq9Re0EAev6Nlwqy1v0CE4HPwjwgIB2QDvAs9XOhT3ZTuRlcJMM6pQEfnxjqu4PM+/ESFELR+3zK7WzN1ah7okfqacdFaKpd1PasellGlIKoR3FiP7D1Y7SISSqkhgEfbPaYb7e+yaitSR7EkWmqDqX6cLgR5c2eQNAO6Ad4HG0c2lPtnicLktbTkxjQl6lk9OEqWA8rDFcR/F4xV+pnZ2R/OwSR57dE14y5CdT2glp/RnZcboQfKAd84WkwYNSCiYkLqNR5e4m2jG+PXePc2K+RWEcGjlmDvlh4TVv7WCEeEBAO6Ad4AW0Y1GL6BLj35swm5rWgk7fbbqzS0XsqbEaZfTK7UpOaee0pHYuv11UvbOOrmOxZ7QTDSxKaCcys4nj8Y1oEeUEeeErTrY57ThraUeFxiIisazZlp3ZLPtwRjtHrfSYL2jmANl550RfktSIxde8xaAd0A5oB7g/wll+Lhd0VX1MaMmmTqycvLElN992TSbrxIwVfr95qLTnXIjYGTVNTzuesQOZveS3sg1DnRqJZ0QbNELEjDBe50Uqk/Mok7zBYNMM8Hz02432uPd/kfd182TyPE3fILrgzVp4CqdnFVzwOBjIfWGzgHzypon5BCHq/i7NSYVHeFMW0nWFM75olRPasZFeANoB7QD3hzTU1LJqOz7SQ0AX2R85MaHyuIFrpKX22pPY2eKiJiax4UJk8nzmWgaFnLkQlsvkonp/zGuTpEWscDbdd2dWC+WVC4cLygVBiaw8q7jwxxBJzmeuKns4UT4ExOGknGlW0JeemZ2VjERGaK1nq3DGBp7RnbslspielfZd45Rc+OfZKWpM7KVvrcBp/wv2drcvtSR3uueBvFg/mkyqqko2O42He0C93cdRpRQV/5kwAdAOaAdYj8DTWwTUg2lintp4xepMf6XiGX4p7WKaqWPz/thEnamlCZPOMWHFPheW6TJKZQl+HHMhYmPTF2Xs9A+13xl3N9TV0am9qbKSmrXG03QtMl1WcdR1Gmyz4jBLlZoPCcJNTqratTxR7QzdHUv0E1CyriWW/nzqS88bynGadva1Pn1sq62rHh9MF5qureVd2IF6+axCba+mGpHNX3qjx0TU0dK3KlNP/dsq1kqNru8FxsX8sh9qfRV9CxzGwSdI8IyAdkA7wF2xT+qkRZ0MMsTRn5PO/ZToj0q/uOrg8VimfuxtsmMfQ8sKE3dqYJmbhLH85Tz9pUlyy4qzQ7CLOrt70BfvLKqbaBjzfbMWaVe/ce7P7LqtR5x7hONOuljKekV3JVs3Q5bJSKtaVLJ01T0kJ/uY64pG+pR6pIuyO82M45y6Dkyc5QFYPqstv8zjthHl0kYBXnft89K3ST+isv5e93dBL9Z+N3DvIWtHxgqzUu+y4/RtH0py8YyAdkA7wMPB/lx12N2uyj6+x9nb3QAAaAcAAAAA7YB2AAAAANAOAAAAANoB7QAAAIB2QDsAAAAAaAcAAAAA7YB2AAAAANAOAAAAANoB7QAAAIB2QDsAAAAAaAe0AwAAANoB7QAAAACgHQAAAAC0A9oBAAAAQDsAAAAAaAe0AwAA8CA4//nHT/iPA9p5Be38758/4V940xQAAB+L//7jZ/wbtPMC2mFvMCoAAACgHdAOaAcAANAOaOf+cEA7AAD8Wdp5QhgBtAO1AwAAaAdqB2oHAAAAtAO1A9oBAAC0A9qB2gEAAADtfLHawcIdAABAO6AdqB0AAIDf0w4y2RDbAQAAgNoB7fwxMLJNUxDgwQUA0A5o55744062tDzmYebZ0SC104Tn+gNza0scd1/FqMy56FN4vyDe14QVmwYRUtAOaAdqR8G1+ntB8Dirk6TOfSHESXXMof3RL6OvaaxjZxYXQvhhWSwRcHx4N2Pth7bzDT1fCeEnYB7QDmgHamfHamGC63/P8sciFoJX32MqWMm79klkwexnIUT6VjW21WBkJ/Ylt5nJPOxogxJAO1A7f412WCZmCIUQrpr7+1xYxdoS1x2dplFaPKmxkkUp/Mb4OQrVrRds7MlHjE4yTAXysvlg0ePkpNdH5vFE8uARj9I0gsJCJttnqp2vvXPLKefwOo2FUK6mwudi/eT/4K3prLMUH81z2tpI36Fl0cbS1lWdDgq3DXZ+f5nk5NyQoX6YHeskCT7uLgumfK+ZZ8/Fg923crCPOwBqB2rnnewBFyKukyTr7IJVBiwXPFOdEm96ZisRrrAlnhCifk5bXS7yc2vt2HmcevuDgtgPJp5vm4FbwrvP5ISV6bI468iHl592lxXWvB1W3bDjo8VOIIc42AGgnY9UO996O3rC6mwci1zbld4ujwuuntRS2uHz6iIPq8JBuRDWk5xHdnwmDNTB63/0xSgtTluKj4WI7yF40liUozhbQPxpdnSJdRTnP5wSpDlB9Ai0A7XzVmDW7ME/97aYSSvM11NCJccv399YAb7RyP8SzSBtFEEGmeA2cwdFscX1I20rL38reJgnfFcToRDZkVdTxcM/knXy0j4dvGxKpNWDL50Ika+egn6jOgLtgHbeB9HswQ+kZSg6syeEv77Mg7aOt00yUyGyl7R8iGlJgeL6XPGkN3iANggwzQ/h79IjiljE+45+RMJqEeya3Mz3+LTEgsASx2ESUhxCqtseHTKNBV87Ho6VfeGDDtp5R9r5q042W0yfyloGe9RfeTcOm9TOUnry8sEvcr07vdyxVW6vbifrLTzP15fYyRL+m4U/ri9yp69JJWfr0mAX5eilyj8tuYXFEzdX4Q2a5/zoQV6vp1guvjEFAZlsH6l2vjSTLXCnzifZ+SrOq3xs29WOPNe9fnAmXrU8s2eYsrFEyONhZt5/vbrA4dR8M5GWXGSsEz0qhT3ppwWpp1VC9pwbkd3QhOA22ZXNu5LZuq8eLivc9XrKe1qGC9QO1A72ZCPGWM1Oo/722Kp2ZBrcVcvkh69qae9QswT3mNWrunRIK3DXFjgGYfi2aBVLhNBiRiYT8B2lHTVFKI/1c1in4eJ47Ur2bdRcCWupJDfufbkPHePVQbrT5kRG0A5o5+5q54+wTqo6v9EzRYX1kYQDzZJt3rap9lDHtFUq8exrf61RpLH/bEMARvn61Hm2SuZQtMOLV/RNeD3az25bb1XwIVdwNsHx3vD+5yS5EbQD2oHaeQb0oviC2N/1Zi8wQuDJu7onXRosGWlnV2+Nd7s0Tctyt/S9mpwzrcO4lmQv2Q1P+sCuyNBg8MZeU8+nCxMc//1yI7SPtfzCBxu0A7XzvtCWM9DekVH5rNU7dG19nL5nU8904Y41pk6wuK/92tByYOwztNYfVvUKo/P+vZJ26huSSeJbgjPNxUVQ+Ruup2HhU7K6QTugHagd6hLRna8MZtknem0ph2bJcu8tBU9j0M6odnZ7f/OqEtvf7GCU1dFRkOPraSeIhbgWdIv8G6Ig+SXx4G7dgujxWl8cvvDJRibbR6qdv7GboE1ox+PGKn5C0Vc+q/6sqOC5uFkO+6Fbg59mCTdU4VbaSSZqZ9RBgl8hjnkV94aDcQXfMmvQBSbtXNWKZtsvXNG5UhM26cGWer1rZTTXF/oqIxMvN3cNKTNn0wHOutGzxcWZlvN/9q50vVFciWJJoI/tE4ABG9yZe/v9H3LCJlVpAXDsmaRH6l+dxFhIUEenllPBC544z3Y87JyEnf8G27mabMfwND0ELsipmNWdVMEIu0MspyhLF7iQK786hQ4OTuEYMTHYDigl3XQiNZ2wwCl2MFZnVn6ZA4Idugc7H4hM5nb57IrtxJoiesVfVBp4R2qW4x2hdG/VQxd76E95MItShJtfRSJhecL6rYzC26D/ViYxxpb105Lie/HDOlB52PFOtm87WqpgZ+ErtWFWKWfgnUso59ZiEpJDA7yI5TQRepm5VITTjcLIGmgkBfKrhDwxhQ1DpsIwucF2xlqTuXZn46JN6+iRgByMyyVIuOO4qYBPD8LOfY/toHsnEbWWk07H+C2B7Om4UYfqbiqqI+5cSduBfYj3Y++Rw2tVUHpLi0tVNc1tf+MegnJeb+Dm1FVBB1YSbSSlXQbKOYb0QjpIyzYa/6lHNaOcwwd1vPSz7TE87HjY8WwHj4WhFMDlgOtFl2Zd8qy39IOZbR1p8ZvfoBYDyXRNYN5nOU7bibS5rojFrqNkdFAwVfxxagquJ43yLnaznSBlO1SlaTd6JKBeEqNYDun4Tpiolct+CnaWpLcFauaeNoMVwjmnvPtwMsv1cNBPvWlIIvTEbdkvh7bJ9Ks0p2wXMdYPlfNnSHF7xGE+dEgalLX3ZsvZuqYW1onjr6rlcl2FGNI8W9tnLlczR56UhlAp3k8hd2IWBv9ZchEedjzb+bZjeX8nZrJGOArjXZbB76Ao1xY1xWRcMYR8YOHhtrhBv/mdahrQ8wXbttT0Ius2Yqp489wUXFSHhqRxxnaCIG03AzON4koWs0ZyLN0ZBvlesvBEdrrgLOzIFn0T1FxqWyJEAWfDbI28C9TUh7OamfEN5DLldPwbuht2IjHcScEo5a4hro6LkVDs/VWiLjsUOhQtCneae00+WmpbBu6AHRLhBy74ED8w88DDjmc733YI0PusMXWzgBJ/otGZukhLXNg/KVhSiDyi5IJgzqKb7obbNfK7p6bgeMzEREEaN9vJhMv5N1GBkvOEcQtoTog12UmGHIy7FYgDvBKGnY3Ie6EO6A1ciQyCjm7qS41aILuu5CXwPeXc0vh8z+wmjJ8Y1OYEJL0+OZZ/YKDHSRxi8YuqxhZUoOuSj/FE0ZkKd9wBO2CRe8xlf1QfH5/J9iPZzh+fyTa220kg0hRGFjGMlkfTMZMJ+SNWQjtUzeKVdaUcOLPRkzbJIX9flyQbTEP4OD8Fl1e/XRIcGldsJ402qE5znSbXXKRNhV9JsoHOKWyYHuykoRMB0QLCTr8BOxUw60OQUaG3bSAfkZ1aKENcTPtksBBUKXubXJ50G5nMN6rjPEpOAY++6M1V2PgR1DYnd51CTQeUFH4Q3MyiqRoqj5p0SQ7DsP6wG6Zx1Re5mwimuvK3EdEhf/3aG793DNzv3Sv8RTzsvHpXfn15V3797yeDziMyjCTRX65CRFWiXkEy8DaF/S87LVSx5CY8mI21qB4DuPojG+0safLailYnpuB4FHrK61sQBG62kzHqrrhZHDq0CSqLjPKFKouMXW3bJCxTrs3jsHMTdbyiMO1CPkhbuuqaLgtThpGG4+tsmuXU/6GxGRjziMsZcS7RBjJZFroeWSzpzuDO5CdVI5pvTiRXjTbdwRoY15ghtVG/YBfApdfnO10vCTu19uZmEcESKfbExrCOkCmQlH6XLOo9KvOa8X8PO99wV379XNDB5fWru4dpBGUqdIikhSin1z8tbdqZHYCdiT2YGcmKBiEHFGELdNx6dWX1J8enYPePMZUFYI/tpMOmnk+ojJtqFCcj2Td0hIZ4m+372Dixwo67N0CfKktJR3625mKtWX5UrfmjpRbYWYurmuB2FQ6QjORWNpEDmWwjmqOCxSlHG04P66QlWDmmATvrHg6DXiols6HhJdcfJkFwsbgkLbATZIU6IdEgE/UteHAb0fWw42HHw86ZUem2oYWvvdD2aNkfsbQ1kBFXmHuAYGeKplgKYRg6mivvm3QBFTI6kJ2fgg0z2PyFmZvtZGwbIlbYqQIl6qYsG4YdGL/ahh0mYeYM7MBvnP2UDxxEp3DNC9XlRs4GgGhAsrwr624IO5wXHYGtLOJrV9fdNWF7AN+s55XU6ucTdRfl9z4M73mL0h0hh0LPXxoyC+wopYmq1DjYgiEoSboBbF6x1WYLdtAi3+cw5PULTZk87HjY8bAToBdQOlDAGVw5f/ArWMvjrjDhSYMdpQ4KYafW2dRCd1qdBnCcM3VsCi7rLhvQWWI76bBX4wkNtZLaXgnUTQ8YSHXQTfBIOWqoh2CHbsMOQTs2zUh1H6V4zYm03B+anW3QS4gzgxdXF4c/zHdFmiP1vZcwKpmgVDBWd0PeM37HzqlLAnKXgcO15GhdSFY62U6+nBjAncADgg12FFuVxM0FO4GmlkQEaojuYcfDjoeds2OuUWkj8O5TKFOATWaqZZOqlxKmIJca7Ejz2Jmwox8ZeyB6vR6Vb+enYAvMyEiDeNjYTsZ2W7yF6Ayda7l4BuxI45ftUQMH7IR7tIJi7I5gnxyqL3CywXZktETr5x1xA3ay/RiacO5GY4sKPUpucA+TbTeGVxbp6pE7zc0Dws0FO4qtrmnUTtipHXDNbx52POx42HlmRJwP0+tTKH/IDb6Wve14XQZbNr9zwc4+2wlSMWzDzrEpWMdFepoSI7aT2lO63U42wMYWS2jCTn8EdmLudLLtwo7Aa0GgRgzV11yHHZPtkFpvjGbCzkVHJhd/sxE1Utp/LKu4OltsZ6Hlm2xnfIJJcJztALa68DvnZq3BQ3l79NlWgB52POy8dPz+obBTCFWickfO/8owouNw2vz6OdihhtJxrtx6Vtg5NgWXQVwd87nGdnBta10ccLKBes3ZcD3JdkLcUC8Cp/zkJOzYmFB7gu1cjVTvSPcnkXJXJ24xLszirUxcOneSe1x22c59g/+cgR3JVpdomBN2Oq512m2d6m0edjzseLZzYEBRrBYSHAureAPsmBazUBnVr4cdpZ1QItgZoUPs445uqOekZRoGO2xnM0LTYwMZgVP+UdipT8GOM7YTm9I6BtvJDyRwEVy8CX7B5r1Mb48sCfs+yQp9cokjtqMS0e52J9t52FnY6pq5eBx2eg87HnY87LwMgiispGG2QP0hD1f5FbaTcZqRp2CHHbrJojSzxdnYjY7EoMzE3g7GMGbjipXr9J5kOz02hi24vYTG/yDbuVFOr8U27GSci343lL5GQ0SbPNYLkuLWXHl9jUqk4cD6FN43HZxOtmfYDt2EHcI4V0Vax2FngbudfI8/DXaIhx0PO28ZA3Swr7UexevYTrfPdirKa84S8i62A1xjMLYzT7Upt6vwdUM91uao4vonYzsJ/lQETGnCvw473dHYztRXlVKcaKbBztQDj7JkxwTdsa6AYExQTqWujlat84Cr1zqdbJWZUkC/xHZGsfAo3ecwBuxUPqXAw46HnZeNB7Tfd1uzs5c72bSsqJTRetTaFOMh+D2wAwp9TJUCJb+TuGFniW6QnHMo3vYk24lxZl4L7vkVsLPPdhZf2Br2QmwmQp+RSggs3gSeVJySxXmop0YVw7yd7SSUi8RknQfYTnUoYd/DjocdDzuHDLIAWVWxzf6+O5OtpXyq5hu4yIu3ONk0vqNrsql6jmLnDD3qrqH+ck/Gdh5YeK4FtjXZayr+ktjOTC5jwD9UVzWJ0OUjgJJGmw1wQIbAoTELdCeYZZYutvOalIJRmqO7BE/BzvKMRB52POx42HnB6IBfrbJlUB+iGs/HdhKZ0nW5Uqlu+WK2s/SQdihQf2z0FoVOtp5ygS3Uk2xnKUSiEdiC5btjegx2vsZ2OOV1fMPtD1Iddjgvm8wuC77hOTw47goV8hNs5/E828kE51qM6jjsJN8qo8DDjoedHz6u4IxIbC/1ezPZRtsnrVl6fxvsKM0uS78dSQKqDdgZhRe0TsfPxnbW3A1ayHVZExpi/k7Y6fVeBmAUJuzof7NNLpv6BOxMO1dgW97tZ7I9zXbIwLmhRnEcdq56vbKHHQ87/8qu/P4zYKeH/h5mKdz5mpOt22E7HdYIeJeTLdArPXG/nc5Jd6Qxi4VMm/4y25G3eV1vRgrcvAJ23CkFmJFkWW2BHdS4glawO8/OcqPEQC2YU7fXPsmyuxSCVsuXartwWKXgBNtpGKem4Otx2GGWfnoedjzseLbz5Ejgm9eegZ1XsJ1Mi4NEb2M7StnN6Lcj88g1OToIIyVUhPtqbEeZ/9tsG5WsWvbW2A4UpRkxj4DObJLIxaCONoZ6AgdQPs3ytl76FwjKWV1G1z5uFEkkEFsaDJLlaZWCo2yn5Jx9OI9c+7DTfC+y42HHw84PHzFkO/mzsHMitgMJ0Bxxuf0jsCNLSyxsZ71xmruMmb0R3LNsR4qtlFOjGqDFmb3VyTZ+QY3qlFQ7TwANkuHM9yWFHo6SS1KkZFQusNnpAjwECZ7bS1QKrGyH8zYNvgA7A2o9+J+BHV+342HnTSODZ8TQ0kXxnZlssV4m9EYnm/QembGdUSiB2w+0IS41Ocx2drQGZGJdTzoaIdXN8L2wszIcKcM8WHpILAxHanguBObUcgcRj91xrWTd7dp4iLbYzpMqBSLZcjDv1u1cXN/p2Y6HHQ87zzvZFgWuD8uZ/52abOUXYac+f6d/s3dlyw3qSBQkGcoAxSrENtyqufP/3zhGbFoBO07KJH2eHGKDEKiPTrfUbVY7KydRizGjzjnaOad2tsVzfiabs++nnVnhRM4O7ThOWmIf18qE4Snaoea8D+Emtfji/X6Hdt6mdix9elbteJZljkA7QDtAOy+hFC1VbRil35ilINRM+nfSTmSP7Zg2xL9GO+diO5tXUi26EBnj1qh+JrbD7LGd9fgmaDtsrpjXCe6+7AXaYeY+a7c6eTfFn6vt26FaToIvpgJ9jXYGIWk10A7QDtDO10HEkozI153Y35iTLdKMwnc62fo9tbNwYnHCmL1B7Qi7K+UcpIOJdtIsqd+odpwaC0LErHYeDey0zjnsbkTvt7Zpg4imkZ5kdGWSKVP1WJJbcmp+776dl2mH1+muPol1gHaAdq6NmzyKkxdzsmUvxXYa7TvfqXboTmxnSyrmPqN28ldjO6LckXinN9AOJcJcG7/ByVYkte5elGnHTcTibKdiO+ktk/b5VIHO1TTBa3jf831cO3tq571ZCl6kHZ4eqPusUQu082dp5zfs20GTsd0SvhDdmJ+y+cVLK9lKadfkT9GOWe3kZgsl52SznfJ5teMIOQLEMjW62hmfEUnVfjXSjn+Odjopy7VR7aBMUg0n1A66GbKyJayVOi7Avk+i1ebLyf8MhQ++We00J2iHp1UKnD9JO7CSDdTOmwnHpdHNG+eeUq6tTB/TpzxcRBUFp9SOvGtytMXE6NN6Q0422njLubOAIl3tLLdQmSfE+a6rjIXq948z5Is5m1vBrioFtnmK7M12p76dcEP/VGwnkFcqGmlHqf52rHbkJN8S9XRLVYuaCVlHI72MADlWO8Nzaqffp53umHYQ832SO3+TdkDtAO28D2lbkcUdQspem3A+b/PRlrYrko+wvfDJmjhgNqvDOmEe3ko7g6fMxDHDgt1G3BIuW3fkDR6x0cm27H9ck80kZf2k2lk3Ts7Zz8y043bKyYYdtbPM7XE17KidGhfoiHYiJenlodpBbDcVThWkTlqKqa4fLUuUNenLK4OzpcqC7lIL7LQTGJ5UZKQdN1c0up120szHHXKAdoB2gHa+hLDcqalJ9Pm+bucW2RBqQ35LZmxSO3OF+m022y6OJuJORpxVxhWvZ5pgt4gBMZpCtmTyR4xHTnpRedSsXhxSc0e126VQvJg9Yc8/ruhTsR3HCaUcZmzSBFSkHdppnbF00JKTNOh1iuSl1FIL7aAC94FXkIRkMb+kIbZTY0LbqkiSgjW90f1li5LYMaZ52Ir2NFhP+iCkHU1i/k89J1usl2FAyE6xyzESCxcLknkulK+bdpVRsD5XmmAyfOAYBtoB2rkWXNkIE2nwp/rEfvEFCR6RYptD5nyQ17KYSOLUSDuVELW/i04U3gzk+SWKty30yLs/0QQrcnuCyrGdjpMWeArYL/k5a8fpk4VYtl9jr1/POGcsaJT0lnfknFc7+qPo7u5GO6iPC52ChSuOKcZQKYSVcilvJ/ao0RRXi87FvAdcg9pBhbA0AI/FQI/UzlI+I6u8KiuwLf1nTDePnKdqiFTujZGG9dhOIRDrXKdveYNF/xutZS/uqG9nokorXE23mgonG9+svtYvg7vQAdoB2gHaeSvr+D6OFKsm+y82abQZfYaXGXeD+QpY3bJ7c4ESEhjO5aGaTZZwUwvJvUjugmxiMVkiHqeacCaCYshQWaY5WUhknUnXwZoK5yYTQ5s6qFkLvVG9bGYzX4+dKkOZah2XFH7WxHHH1sckhf8b0aIXeZoJKXtcLaRfBK22IKJROSGuNNpRwzTJ7Yh2qKxA3L71iD3QMxBfL++ACr0zB9VHJmfQjl0Hxf5CO8scJqlRO5eOo3LF01Hy3JPl0qHUwhi1whQJ7+amANoB2gHaeQbIMPdvthrN2Fe2losOudV4iaW/uHcsD0pmmuJWvXQyodrLPPZ74ew8cFvrfHiuCZbb7Q7rXK5maDNSyWoVtRoyuMr8dQIc9m1n0lJJk551eLKj9hFJe/aV2M2YiJyE2rIyKrtiK+EmZEdQvlNtb0FjSyLtWRMoRIb9lGnU6dSDfT/J1Gprc1/HVebv96b6OLCX4TXZGhIuMi3xoNo7yart0qgh0nsg6C+qjYy/STuwkg1o5y2ITeyQLfNFIi7VXQ+JXh1lEilsokNRlyhKQrUtuW5MOzVXY6GtKj7fBJ11ZqteeE0QDUMUNF2mdkBCNY/+FuyOmCYhlEJvjntjqsZ4ZrS2+8WgNR/PVpLINy2xSu+VcoNMjE3UxquRpjaHWMR35LZHpb1lrV/tGYnEuh45jEq805tRpbZfrEXB1MQPtNJ5Tyr0RplxNeE80zmnWEHtAO385FO54r6dMeOlN6QopTfJC8LutO47U3B1nY+LbpHKmNfFQXcxrb7BTDEtHfAaVl8mlst0XCio9kwT5PZUfKneINEAoo2oCcQbHgzxLpS3kpCrDLeVxps1JMGTU8S62gnDm3YLrfEvYdm21BqRmCrpDCExkoDU4tzETMVBXH2M7egdw9+HolVvsNwNl0grQDItRJa3TPIzGvhSXCFXBxJTaYXe+uVdSIQ7dHkmheiDxzH65z9H+O+h+TrCPwho5ymEPzIZ+N/1aKcRx2TeClN/bE3uH+vOnin6iw0DM5rjyUW/E1gSZ5zTTh1BQsSyrHm+CRs8k93iF43JGmbSr6NZ8zDIDMQnaxBsUScnQC3Ew2yBBUqsD2t2ty27aWXa4vvtky6I+ui2OsAUHuXPg5T3ob+367Lz+NAA3fS9MflIxlxrbf033tXhJhi0FPyxWP509Y4pS5s747I0FFU7tSvQJK/EZXVoHBZx+NED+ZgR/v1uKQO088pz+4Cn8vMgSs2Q8C6IHtyZvQr3MeLjavxh3kTHJ6vWrQ7jVFoJ0452TlpLWxoyBj/VBIFjA7tpGy0hbgwUa2w79URvpMkWdsqU+SnFE2syJGt2QlZjfW1835t3cWdqq9xJJ0mbnK8NV3MiFJK0GSqDW9FG8UIIyeGSct3M5Dj1RBW4OBWjnzIe2Cl8UkTanAN5Fop0ObdY1gdEWJ59jBo5yy8/1IF2PpF2wr9IO7Upt1QdlIyQwgusozwnmilOM5baerbE9lwidaa58dxCWUvbJP0XmzBPWvf/3zODVgoSm9eu9g4izLTYW9xwhLztloXHSVbe0wO7XB7tnK8rvRdL35PO63Z6D2SK3abs3B790fVHyqDP8/7ejI4t7EVyd/WelA/jYHjuvUT8QZHMNTTCRpFpaV8KTZNW7qXPXUoAtANq53pI49dmcYZRiNBrHgB04hD6ehNOOSLQcz86crugLxsrlOZ1il59JMffSI+/g9Lnr7QIQsx9tTzfUjwYfhair71zJ3obvfL0pB/1B55boB2gHaAdAOBTgGjQxnF7p1cWC9nH5f0E2vk9tBMC7QAAAAX1R1URBdoBtQMAAH45Iv8OtAO0A2oHAAD8HO0Mv+NGgHYuqXYQDEEA4K+hlpeUB5l3UUMAtANqBwAAXAIZEda8jTmYLup0A9q5pNqBAQgA/D1QIacpT5x70Z2jQDugdgAAwDUQrJmd0uq6YgdoB9QOAAC4Cnrik65pyjHnaFVf9S6AdoB2AADAZTCUGUmSomrr697Dvx+wZgpoRwU42QAAwK8FqB1QOwAAAAC0A2oH9u0AAACgHaAdUDsAAAAAtPMX1Q68uAAAAGgHaAfUDgAAAHyddmAlG6gdAAAAALUDagcAAACAdoB2fop2YCUbAAAA2gHaeR/AyQYAAIB2gHbAyQYAAABAO6B2AAAA4HfRDqxkA7UDAAAAoHZA7fxm9IHUGznNDbOfNKd1eJbHU5qnwt9BKRalH8qb9ou4rKXvRzsnL0uxeU2ZX73/US1311N4oue+o+k5zcOfaw1yaZ6+MjUPqSsfcHNaI/05aK+48mzq+IrLi4B2Lql2fvdKtjzx18HkxoQ/gaKlhPRrB0VVMh3erAojE7LHZ0/47Di0418mTZiRmP888THZgH2MHKdZ/47HqvV+In2jcJxy/bNxnG7+WIylt3zhq8T3O6E1K7zxuuKBrGp67dYD8fvt8jldD1PHiZbPvdAiQgpW3pHSFdLFU+lIwbzATNooYLxrk45WpFNbvdy/tb9NPXd06WA9Kcf2VWp/Sfi9KyQStsU0XOO8IC23yobWCLcq/Ct3ivX2pH6j82emT3yaDI+Xw+yGtKbPMBZicwPP9xtxnjW9zpgFSHgO09lJI7BMxKZj8XysT/wSaAdoB9TO10m38P1kGn4o9kUsI6wvhIPebMKmY9jHd8dh/BN/bg4q+Uf+r+mIE80/xfN/fD9wnHI98H/2rnXpcRSHOkDismMXvt83tbXv/5AbkACBsZOe7p3e6TI/ejKOY2GMz9GRBN+aJNauOSGdkoc9oXQWJHz0zlWdb73Lq1YlyTMNjrYh8Sz2hBE6oc+92cNjouekPvpKhuByfGZ2KHbGKzzoDss8pjRFSu5H3QoLew2DeDDesZH7ZLo1owaN258f0w7T3/tUkEs6WbTLEesNuQjpV59Ic1pJH0LS48/bsAclGRFzP7uh2pFVXw4wwo52ng93fjtFnoMR48/BHQPGVXN7u2jnop2/Re380bQz23eSjR7rmDd/8Y+KhtCOOotZJlD4uPpnKzfxkYZtIAilaEfszijJr0rHNTKp+O7cgvTGtgVpZ3c0pB2LmrP5fLvbw5udk2/a2d9HXXlDQc1U6Ufr73YPzuiRdvy2HY93bOQ+mO5hBDOPdqydeMv3JNL5BrhyR2K98WnHtCaxpFV61LVRriVSJ5ibKzO0s59v4ez2aYfV9Hx5Q/Shbbb+mGua6NTkE+yinYt2Ltr5yZuXBk6QdUQ+3YrBvcOAOHJpqg1wV8CrzQzBZEnC1Nv9UO/jS7PKdmty/XbzPEmeCtfqAvCkeNV4ZQZPW8U5tIf72DQG8yYTacpFkjAgBYhlaQsDQ6AuG228bRbV+weILNW15d06ZYFrzqy0sXqZ57Ul6EHVBiAf2FCyrNV31xPveVIyBEZoAZGzzCWiYA0/jBhnVdNCXLIsO7TOq92k14e7vmrAmZ8dMNbvq81da2VndLyjI/fBNPAFd8IAHry4ncySekciQBZybm79asg//hzJXOtr8hQa0C0Ve8IF6mdin0Ja+OCOXDEWtykXMGYgSHTX27IsOwicLcmBYzH7tz9Pz5dWqS3DR5yKrlyFIUXjLYnXc9IfuJ4BA+XrP4d2rkq2K8j297bcepbwhg7Mube5BWCkmpxGMgril24GSwZu4zc5RtBy+E+FTMbUW6ziGHDghkhwR8qSSfKswe+f9An4SvRo4f0d39CLHZJkUtjGTG9QnzXCQEfngoU53zns1tfvnTuOkUVJBIDAEBIiJdcfp5agWdz4SiKV95jcuWnjEuTjrTWhKoD0B46yxBuMjvfByJ2ZZubWbj42j2fpP2Oa+XQNHJ30Eqwd9Ya8akAf4olkJyYXwsMx1j9/hKklEvVF9yhzQ9W5EHEYm+uXZVkp7YBaziDXZD6uOCVNmPlhJj64G2pSq8kGI1VfaueinUvt/FwbzUv+5B6w5Hh8TGnUvzOOLcKgeYd78yq3xLPeILkzgih4GgGlPFf16toDCuM7o5QUqFZwYMIpanEug2N54mjH0pFF/r54qQvw0va3pPAbAppOMTjaQS9aUY1NZ7QWkwnt6E6aez0xbhJkImJ8xegdXlBgqAqwVJUXvIpe33hxNN4HI3dmWj1Y6Wc7FjOYR60zpgsvP8QnErcTx72hwTJg65FpMSEmMhBm2qz7LFNDpGWSPKWbqbO5UcaYug8eqWt8aYlKw4Wt+8xrGMaSvA/6+4ebOjfrsPQ+X1+0c9HO/07t/MGVbIxzBKDFj/grF08asWMhqXLpY/02lwgAlnY0xLW9A/qJSa5RpLIs8z5ZVoR2mjSVTwpXCg/agHbQQo7WLe0olFop8tcqsJPRHHdHoTJ97mknrnbGFuVOnHaQxu7JoXEP+1vUfhSCgyz4y+B6ac7lmAXrjJFgvHueRkfuzHStqrV86fKJdpRAGh70pC2IuakrTEfP0b9piGN1JWEdTDfdEyN9wh+tfuppdorF0E6l/x1j+TPoz0yDgytlM6YfxES/F0aB9STGeDe+Wf5Pe8n//Z9zgHtetPMbaCf51+9/Kr+r9TbUDrkYx7AVVzGUMvWcXHAGwSdXMFiMkMCxtINpd9Ft6krDI2MJK5bEo51k1pF7p3aeeW7hQUKsQ/08RjvJbdks3GjErsrGQ/5WX6LcklDtILEWEdppHO2UViEMGTrDAe1I4604Rj4x7iHcfRff9EBswBItA41MXx5vMDreByN3Ylr936zff/76lnZUR4uCKpIu9SvfWJuK7bA3Xpts3YFwAc/WeTN5JEMjfZqcnG6d8UYn/W9TTskH2lnJvfZ4F5WbZnBno6Ok4EnyNP1H1lD/H+D7RTtXc8OOYR4I+VM3c6tsjM0Rb+niQhoGe3heJtRlC5F4ygd/ucgzrDTaHXgFFUy7IBtB6JkHSKlRURR5512iozAxBZW0H9TOwFDutC63w4naAaIWx8ZXKLlirILSB9ACYcKCRIWqHmAOODXLB+8WX7Hxjo/cielSe/a1N3yfaGdU+TpGU/awxoVQStOc9CaImGHpHK1huLu827gvvZjC8Ki0FlDOqqKOQzbwaIcKvbuZzGu54L1AvuduHintnp4Dgp9nwa520c7VPrbFoG6VRrGnpf6976Fr2gFeyq3a8epqeVeFIaWPtCMPaKf3a4jmNEY7psraY0mTrsEC3u5U7ZDczpCg3DkIsoGy48fGgxJjm0Jy4iZW8pvQ4nIKcfHxjo7csWlFHjU+RovuH0oKJhiWlQCxCA3uYF6eKGy+q5x72jq+KpJ/C0N6mFmy8wByVae0Y3M7hdN+GO+jO2g4Vsop7biEUH3KqFe7aOdqX7TSoO4tTjsy8FwzVxYFMAjuN4HBha4iJAvff1Lt/ADtiAB+LR6l6S6/slM7pVM7uHJjI7TjqZ3O9u/EOGGQaS8iDmiH0xVOPu3sxjuqLw5NZ+A0AMwv36mdEqbIxl2CRX6kHfFp0kkv+W85bQ6JwA4vkalObM371c3naodhbqlvcpGm4SJZPb1VpSQInJYeFuaZyQs2Ltq52s+0zpTm0GIB0tSryXdq5+5gEMBzJTBYzWTVIL/9IrWzfUM7Ui9TCQVH6Rks97TD90E2rXZgQtanakd+MG6F334LgCEMsnmw3HariNDOfrw/qR3PtPr1sD4eXkj1nHZ0dO3xWB+EtUWQCPwhtYOvuZxCQaOeQxthrG1HO2mEdtavaIe6CGEhOYrAwhc42GNYCXbRzkU7V/s1tFNZBzYNkaQOjs4uLV+QNYKmwIcVpXKhm7negcEvUDthbmcMaafV3qzeoweS2V4lWxNbO3OS20nc3gDHuZ322Dgunimihds2lhapiyJ5ctUJUjRBx/tM7RyZnnabIuxo5zZPMa3h7UYQlNX/mNrJjJbzwmy4LrbfZ9/Mg+t8Zwgs6KF6VNPAv1Q7dgGXuoK/SxAs2kGBnu1yO6N1FS7YuGjnar+GdsZdndf2xO9JUoLkIxAG7VYtGfilmDGoYJsCB9J/Ve0w92XxSe3oGmZ9iQIWZHQ0t7PE1AWlnadfyUYgN6Z2KgeGx8ZVuruMqSzr9dObqHrHR7aAWt1rFxnv/JPaiZgugy1mIrRThl0NtqW5u+tQfmimL9WOVg4DXYTs+iB0x3frYqCY2ZW7kDyk8Sumb3M7al51oPXyxfeLBqAw5+bYyefW7160c9HO1X4h7eRhlG3jog+zuU8CAIYIekI7ldvnwLi1z7+sdiq6rUDm7xl2TDt5OcN+WgpoOu56z0TMCxdktdLkxJBEqml92qFqZ/aL+iLGTR10HZc1gKaEB98nanS063bmMoe9DApCO3S8j/TFgWk1BDLTbSBhMlpSoKx5uRWFFTX8prUPH/QHqcyrhMy+UjsZbH0zwEQiF4DlqDJa2zD40TCyYspft/OV2lHjMG19lTDBSSJJ7y6hN9nupNzw4TSEeZeLdi7audovph3cNMWCYw9ZdQhEVB7U5glVOwgKbrmoff8fNED342oH3vzcdbT6hnas5SkIspWRpTMYKcMzcqeoBF2RE1U7QEHtgfEmIfUMk4zvtNl5i++1u82nxF/SqPeTkexovM/VTmi6cCS8kSdJ1A4bUy5ZGPHL6NNvLBBzqxTUzj52Xc2Z2snQKvJh7Uw9TNirOCAOaw3n5JPGI1lRNN/TjotE8pr6SGsFz14p9tH9qvLKu52Av9pFO1f7K0071lPi5A5CDFs4BEEKs5mJw6qW+bTTk6CPflmHyjmJta9dbiHt3ALmkGF4ByIxW7CoaE4PcjtatQzms6tkw3hTHSavSti3Uv9MOJaUBodbL7fjaGeTJL0RN75a9ij2OXQ9ApJug6fd7cxTO2pwW3oROt7ZycgdmB5IHosUFTjauY1hSRgTrnZgcpE57AP+oSa9cVx/2BvXcisbsHp5ZB45eLmWXaAvIwSFsrRMP6/fLKK0A3//AHeg1vus8rJ4t6xLMVJq/a2V2ylwlRRctHO1n24LCSWgFz3mfbEIW+IK+2W1BUsmKOw1+FLal3lwoAAoLsueMdglOvdefhq/2cIDc7hLMzi54t6/uiBKxQbCf4Q+7lmez6OtDtY+NRd5vsCfnjMoQ2NIcE/zts3Sgf1k1xQWVO1AdGfO87JOqXYKjXNrHNGqC8vJ6Zik4m09H9wO1EC3eZbfwY6u6P0ve9eh47iuQx1JsREXuNcY+f/PfKNONSeL3TczF+DBAotJEW0mOUekKDHwd5n2XMJ0DXRehgy0NM5kj/JYwkqBHZwPIGcOUqNl5EPH+3nee3dVcI+etq2lXwWI+t77wUl3xtbA+Kekyp4HQs4V6JW89P769KqmgKlfeSWz/C638l5nr2PDauLgcciqBnzrR9y3g7KD+FuUIAXj9dtRjXVAmxkKzlRZFY+b1lxSdh5emy+zUK1/2K2iFVNlzdRcddH7fZjl0wk217ET44yp11J9jSuNdF6pGHUvPXq4f+ncs8jcqB0dcvTR1Mw9W99GmTbeMara3fFwTTd5ab2CtpIGjV4IC4ZjaX/HPJcyzeyDtk6gJawNrWlsaqBRxEcU1vU5n43ug5b4HFU+U72jnXhbNfN2HQTuRfSIcHUh3kXKLgl6EMq2xPf7zuxr1AXNz2VUo/WbiW3DLkFK6qjTsIiP1iNtoOwg/gYzpAynu6jOlGXkDglGz05H2AtuMTTIj4Ps/W5cGdxI8kw80HtkbieqReFPV4MS4LDT2hq2eaNNdFb8AO1HbzYE1KPXZvrrt3lbhwvjndt6TNOmv14OulrK9exYm7cm7e+Y51KmKXjQXjPxVc6pTwNSRLz+f1AybcwS/xxdPz3dquwNxlIpTu8WZysS8b4Hw1U07xTh2XkGM82xaXQ6MYCOo7rsvo3XwiNQdhCfo3KX2TedjHrCTIvZAEoX037LocHB/FYJ3z/xUHPp1S6ih7JDP5GdbJYlT0XvNNf6QHZKR3ZatjR1KhWjb5rpg7nuzui9JkPQ45j1z3IL6BQa97jfq00A6Z5Dvb0vVWfxUHaGqL8/lR1j+kPZ2d7KjoqHOhXCgm/FZ7KTR2VH+jd5vDM581bHx1vwPUjJzh62WJWyw/KXvWhaRPczEfW9p7kensSbxCJQdhB/gh5sbBE/rKF+vIaAobu5ftTDxx0gqrOu53/TL4J8WT67/68TuI3Xj7VR6c7Hv3LWd2N7feelk+3LU3/9Xdi+xtgurrlaQTrXu8EhcrQeAmUH8YfYCzxSF4H4DCVWFKDsIP7BVDt2JA4CgYjgmSq1Q6DsIP7wl/RANyAQb8E3O8UqwxEoO4g/C3fasIkwAoEIcceCApQdxD9B6e67RCAQcRy4aQdlB/Fv0CyoOgjEJyzVV+gElB0EAoFAoOyg7CAQCAQCZQeBQCAQKDsoOwgEAoGyg7KDQCAQCJQdBAKBQKDsoOwgEAgEAmUHgfgIr5ezE2N7ff/5wsPLObafvF6X+6gq7/n5teHHiEDZQdlBfIyy2Rv1b4N/2V49RDxgubWz7+D/9nvdaUY2D/IuBuYlltVn/ic83uQsigUON5oOzm8sH85fJG3BQ1cuPWPr16Bns8u3fdmEl5DDBtFZVvNH4aF596KY4OtbcYL4y3WK60HtHef5o76982fKD+/8vB3LyFj/rMnX2OLRu/MpA3u4/RJlB2UH8d0AvUhr+JdtcilbgtmmQHPYCK2XFLs5veMi/cZW0aUYRAcTaMCt8MqSlgen9fPgtVOLW3D523a34z2mZ29QvxU4fweTraejDgPmm4hTPOM3p9WqeMV87c+UH679vNl+eLzTbCOl1eCE7dkKjNRQdlB2EN+N1ZGdNSI7si2mZd4IT6uXb5ZVbzHZudkm0YrU23Ak0LM4sEwd2aGh7AQW3FBnjFx0RDBo5TE+UM4tcvNHdJTidiE7wDVpf6b8cOnn0tNxcc7sSFF2UHZQdhC/BHuuOmavvHXwnlPVR9gkmnSPZpNo2tbIhF883T0XMA1/yi7I69NM3RU3W/6UpN5KNaCSGylJWjbjt/mUZV2uRHLMq6SFiMSOq1af1YQzdFSNtZmnMovfDHuHr5NXTscse+T9tXQ43nH6N6f9+dYPET8f+kds7rKDn/LyHMw7Cro8O/wFoOyg7CC+HTMMMjpBTz1go73wmVc2CSqKx/yFWjW8V2syetZP+TS6dFNNhNmwSiLnryxJplJbVe6wa9qyErJSxxppCxCnuE5+Yd3RaoUTDy4dT/cJihbBwuozvo0KOJmzlwpR9mzr9bMychu7rrsNj7yI9sGU3qm3bZvLEeTz0v5M+SHlZxWdrXxFp5uAWjmfsnrZjl9+lB2UHcRPgIC81CY470kiTA7zMTt8oJMUPgMlUKsOp5szqwuPPwlV76OaEiewshK1fIAH7sKus/5fRBjaQLDwXWW8eiVfk1o1kRRdZdlMQdZOM75J23G5YZ3Ocx1ZRtaioHb9RKvs2RqXZP7VD+D22Bt/pvyQ8HMlwxj9Adb6FUpAaeNMNe745UfZQdlB/LDsDILhdpiievEvhD833ilkQTip5nTYao70ZGcxQ3X6S6fyWUZ2SG+fjVo+7KqJ4GrmUHtgIcyxGVHjKb1dxCg9MeFDpW5BR1BMD6iDj0YmxpTs8AurmBIPkSPksjMf90Hc+xTIDrWyI93G3vgz5YeEnxvqRkp3Y6Jz1HP2cokIlB2UHcSPyM7chmTEmbxuo2kflyZrQ4cTU5NsV3Y48bEH5M9Gd7gzssP5kJ4Xlq3sTDKnBa81tBDKTrGoy75xwRF1CWcGox1Rq5Zbxl8bmLZb1XObze+VRdHeYLTTCB9OkZjrDqIduWy0vPFnyg8JP7f+utCi7XWOW1B2UHZQdhC/QXZenP1bt3a3o3yB3iNClyYrGF9wOmwOtepwUig7fErfEIc/b7ssl7ayk+0lubKsZYeI5ZDV3XYSseA8rWu7mpk/W/bNnGWklhGALK0W45273gHDl2gem1NUPUxb5kQ7GZlqotRKys4kCL1rwp2vMMkmknlqlcqJdio3Xov7Ie7n0yvKELXW7QujHZQdlB3Er5SdB1WlVR5R0kmx1BKTnaqGa+OSDomahrvRDhNvEXJBX64V6lVOpy0r2SEiVOg9bbmwYKWCP0nb/OG91ybZfM1Vm166yFjOvlTxsnE+yzZJ6DLaOer6cZclg/s7f6b8EPfzYUumNeqZgCTbUko0KDsoOyg7iB+XnTLYNqOZfJD/AeaVs/OWta3eD8I6QIeKXjcn2jllLPCKWaEfW1bxwlrAirYPLDjhjtiuSSdHSKaI7Bwyh3VE0nYx2aFFZIdsJNqxW2rqt/5M+SHu5yldT9Eldg0hUHZQdhA/JDssykWnmjzvLsvuzmZ7PouuHDpU03An2sll6ZTaJ9O9k52E5cO52NYZ5sqCerezlZKWb2RnlNFfV4Tl0FsoRWNi5CDaMZiGt/5M+SHu51zuxkHZQaDsIP4DsmMpEx6MyRNWeV3Xh8u8u/OOdrFRB9/20mh+LYGYVOKBr6HWME6IyU7CshcvwIn9pQWtFk+a4N1Iko0nttqv8WoWhlbJaIfSz6OdosgJiHZi/kz5Ie7nJ0Y7CJQdxH9Jdg659320qx6Ve9CKrjFTsrOrLY/wKBo5C5fTcMqAmNwjR7ZcyE7KstmEX0uS35OhxBi50znLqnKxQ4OQKBLtPJOn9qTXdvosuzFF6LdEtDMQQrozL/xKtpg/U36I+1lqZ5uWnWmTeKDsoOyg7CB+XHZobTYbppjcPKMrr9SxaPdAduw78zAFVQSlC6HspCwr2ek7tWESbMm8tMCVoldFZOQ1seD8GlDJFmd8eFJbNMlmK9moIPSz6O/RaAfu25Enn6b9mfJD3M91+qA1rGRD2UHZQfwy2WGcDF9e8mUUWSMBh3lN5ZXi/lcgO2ZrfQ54Dg71vJadlOXD5qZkbMaq7BMLinhN/unVe/moMMlW+gPeP4t2sr0QazurOKwtFu3IPwZ7lWl/pvwQ93MVOQn1KXf/xk4pQNlB2UHZQfyg7DRgBt6q6fJM7amaCyQqW/ArU0WtWQ9Saw729JbcJqzUpn357YebS0LZSVoGpxTIQ2RMUfG1BQ4GhUKVYF8k2XprtQ7SdrGSAn1KQbdtlfTEcRXtbLY9gt234/kz6YeEnxdzLnVmA1OxuwmjHZQdlB3Er5QdNXlWyzuTl9UxNG1lR73B1PvqWbiZhks6JPCIsj4o9gpkJ2kZyI5OKR2fWMgydUpBab/xjs1AdgagXIR6Cb3LaEeGUzRyRI8T7cgj5dZLfyb9kPCz6t1jNjSRRv+FpxSg7KDsIH4NKjgPlnvnZdggyPYEKSqzYLJb+lTLEZroDB1mzj6gMqyDg7FD0FwtbRnu55/A8s4bCzaPNoHT1QDxTv6eUHgqqQpCnq4oxQqoe033NFZSdoA7kScRySFS/kz7IeFnXQaxyhvZuNK2tyyIduRxBngUKMoOyg7ihz56qBuqk8tO1Pkzekej6mjZcz4jK1jrULS3biZ1pSiTWToUR4yOlUP/9O623aFmleZTy5qI2UzeWQA3WrTNeevmyT1Cpxq902fENS0EZuRgDbUUisU9hkasnhzHPsm+bEE0oYZZjuNo1EvaK39e+CHuZ3MfBZ3KWtbstTMItFaouc7lI1B2UHYQ34TV1GvxhezV9pju4dZH28mTNnMLe3zqSIAznWm2LOp8S0OH/2PvbLgaxaEAimmV2thja9XWVkwI/P/fuFCAfJCgU52d2T33rmfHBsIDWt/tgwDjoi5VxCJ4tOWdHSt27ybeaWT/6aJHZ6TZfjaCV6HEhiO/2yAH57DfUL3YZ64unMLGu8ppswifWB0Mfcuym4U7w2J8MJC/Vc7+PKT2Q2o/X6IEA/o66+y8bbZv4IKni6IdtAP/NjvvodZOetonHrz8/JL7aVIOg6nO9mHLH+PXcFc7uT2a5UjhNbx+cZ2K/ORFdi2yn41gD90t3KT8OA4Y+7CNO187+yBpd1OXdv4nt3zwCe4WEHmo9bJdg+T+PKT2Q2o/dyXgnXc97TbwJA+1RjtoB/60dhaeduyrnZf0bPvmJfh2PpwPCrXT6ePb2nEif1M7zXostk+2ONtmX9XO4irtPMxr5/HQHQRM7s/UO/B8k9jPw9aMvnodxOrcLw7toB20A3+W49OI9F69DL+02VnY9hvn9ydvGVs7pTvrcJndjXH5Nv7kzxWsQft1/2uR3VcvsxHstrZZVj68bTand3eStD36POy9PIYb/DSJcPM0JThzIryJRxFrn7wnsf2Q3M8j28smfsjEu5xeR0A7aAf+KsSPzTSdS/zAQr/ZRXxvfjH5/89syO9ZEL5BO2gHAADQDgAAoB20AwAAaAcAANAO2gEAQDtoBwAA0A7aAQBAO2gHAADQDgAAoB20AwAAaAcAANAO2gEAQDtoBwAA0A7An0OX2n0pypJ7JwOgHQAXZWmUUTu/9+YoCmNMUVTj82C07VG5rxrDmJVxlqeK1aqZwy5UKekF9J4jLZVPXQ6ThZoy6VErX3khpTLtdiidlZHeXjy7ocXQJ9Je1CK77IHZVgC0A+CzspRZVji/X1KzM3mwRG2biiyrxhci06sJzRyNjNwQzkQvz0c6mzI1ZaVj7UbJxFZWdh1MqvcYb9LFm6Bte7O3zGwrANoBmNeO8bRTGj8tV59oR0X8IL+hnUZ1F/klJsR6ROsMUQRz1bPxYl2K4WhhNd2+ZCsA2gGYUAxSKAqdZap/2f4+5lIzzlP3h6uG9ua1Loq++2AUY9x/artQP0TzytdOYRIakUUxLUxEvL1bxcA6ZtwQpwZLx2tDjnvFGBvQysr4ZWG8FQDtAETFYw9b9a+MdHJpowqRycJLp0Vf3tjCoM325WV22Rc9UlRDhu8XVXSz9zpT0zXpOla61Hpwm3GnlLKhn1L67U2HZMbv112JLBsOhon5eEOtUzXziXrlrH0xrrou7GbEWwHQDkD0EJRx0qoeM7fwjy4p9+hRl1vdtF72s7S5XQ2ZXQ89pJeLdaosUaP/xHhoTQt7YE87nlNOD+lWKCYcPFe7OhKdUcr5eMozsbZ1lHB9Ww3h4q0AaAcgTmXz8kVBauqZUU7KaseE2hmSsHVB3ffwtVPOa6eP2C/GPZ+kL6Paqm5dHB31PWT0MJu34i0mKi03XrggNZy86qeU7obIVCsA2gGYPcxm+gTbf1MPs3Uvp3S1o4fUq+yXf9NVUV+sdryapg9S+lPkZT31MJsnjv6ViUrVlh9ynCcVTwVlU2+uygrJKQGTrQBoByCBHBSjbRrW4ZAs6Ryrilc7WaWcsuHSs+yuefnlg2w210tfELrXYyWySbUzXWdrk8IPY2bjhcZ1ljGObKvbGUXR/RtvBUA7AAn6ikDa40+Tb/xeMo6f2/Ht4Z7dkH1S7lDz1c4lY4vKPePUT6nKMrgoZhi94K2i9hZqptFqORtPTMYm1F45OF4lpDOROasRtgKgHYAUxXglpfEyaTGZR02rHeXnaKEmNUfsyptktdOsxji02UwvUfXWya92MhO5dmfmep5EPLkK7VWOB+qEN+ra9MfV4q0AaAcgxXidSnCmoxCTI03i6mrnq9pxDCOzqXZmqp1iumQxcyFNIl4Zng0aWi5O8q8V6r0YbwVAOwApqvAy/VS1U2Sfaef6aqcOJFBGp5hktdNfbvPlaicRb3qKSLsiqkzMMPFWALQDkCCsblSi2lFjtWN+tdpRWsv2p5qvdlQ9OaU/DikQw3AAGa12TKSyMenrNxPx5EQ7pR3Fp2WWaWWCY37xVgC0A5BC6CA71yuvosm+PqQgWe18eSSbntRD4Ui2ZmUut/30Q4nISDZRxEZVz8ebFEjjyOzGLN2SZF3Y+6/FWwHQDsAMoQtkYgC1jmtHf6Xa8WqHuZFsdXhCxr1up+gXUWbhQbY6Zhg11YA0ejZeER9ArYQ3emK4PXeZaAVAOwAzyNAF4cEp91pMv8gwflb/frUT3ifOvUuB1Lora4zfI7bKri6do17tuDM1F68OxhTYS5b8OxDoviqqIq01HylAOwCfVztOyq78KsG7YYxyZ9ZhhXF1tePcI834Z+b9+wnYW/h41Y6K35OtCA6hXUbt1XPxRDC8wh6nk/54gf7+bvFWALQD8Kl2XBf4mdhEbv+vxyxeTPP8FdWOIxftPW7A1073GCAdlF3DGObJmLVhcLhydFrMx6u8RbmHzbwJ4y1A460AaAcgzXTk2nBHZyWl7Ad7BVf1rFRVqcmNAeT0os3aXbiYhspctdVOl+7BP8O4gELVanhcj3F6tO0mHAFuKccbCFSVMjZ2Ot5gmkJLWRar8Cao7RWhzZRuzLRKtgKgHYAUxn9cdF+VmNijpL0KYprry+kg4l9+uqhxEvxqpeQqftmPnns8qEv47M+LddLxssjzSIcFF7HnzSVaAdAOwBe047hg5tp7zzsqi2rHfKYdPaed8YYzRfTx0zKmHaPjm+c/nfty6dFMPLf6CS9urfp7CPn3NZi0Yh1AOwCzJFwgSise458kF8pqIbtSO7PVzthQxKqdIgu1Ywqlk9tn19ao/mRVMl4vUWmv/hz6dDMV9o4Epoq2MooN0A7AJ2hL8EVdlLVqKKff34VuJ1RSCL91ZBwE5y08FcrpqL2Vku4Ub9nu68/qC6Hb7ahtzGQ87XdRlbueogutq8vCnFYxbQVAOwD/BcQVU35PPAC0g3YAANAO2gEAALQDAABoB+0AAADaAQAAtIN2AADQDtoBAAC0g3YAANAO2gEAALQDAABoB+0AAADaAQAAtIN2AADQDtoBAAC0AwAAaAftAAAA2gEAALSDdgAA0A7aAQAAtAMAAGgH7QAAANoBAAC0g3YAANAO2gEAALSDdgAA0A7aAQAAtAMAAGgH7QAAANoBAAC0g3YAANAO2gEAALQDAABoB+0AAADaAQAAtIN2AADQDtoBAAC0g3YAANAO2oG/ixd2AQDaQTt/Px9P/0aUp4/fHkIc5iY+3PBG/75lv/8HlM9HAO2gHTcnbzZvm9vh1fqtfZlM09vn/XJ3Eu7f08fz4Rz+3b+3C2l+3m4fZDry9rRc3IZFw/NuudxtjtnL6aqteRsin+77RCfWu/z1x/faw25MI6L5Lzsvx0nrzbASzU+zFdu35eLhqiByWMy4Mdck/PP+cXk4bbP1+09s+Lpfpbf1u/hqn9gbHXmnrttHt/v87aqexy7+0X72Noe7/o1aH5avk93lNYq33fJ8dJb2PLMWN5vHPPoR8Jfy8LrfH9YiGm/s0bTuz8Mek03//WYbnRb567xfrodIy+Wd/St/f10e7m2nbse8Z/9n0M6f/iK2fszzMclvX/NNUhUvi8Wi3R/2m9v7fvkQST/ilOePd5vnfZ4/i3QGy3M/G9285of7ozzeLnfLzXVbc7PL88Pb+vS8zPeXv6SP28ef1o54aLarTxYP59Pra9bk1bPdhXftKjRsdvljlp2e8/zhykgvy2ZRm80hz3fX5eaXfX73cSNf3h4Pi/sf2fjtOc+X5815mT9+9ZvB9I2OvlPX/Z2e8vy6j8rr4vK3PXw8j4fHWzmUrssPsV6cgnrWbdzu90e5WQyZ+3ieXYvT8yL6EfiHnStbklzFoU4grUgvARgbvEX+/2eOkcBpvFRXZ1fP3LiTfuiq8oKFBDrSkdzpKJOsvMU1uxZiOYseiRN83AT+JeeTaye78yaBrrXk19pwvoainOW0SktX/93p2Qd2/vcJjwRYY5snXKIOk7roKgdg2LpC7TmqMI6+ng0AX9BPIvVGXdwWGbMwvRuOAzwpZgNOniD/adh5PGyEHSazrFyGr8V2HiuMF9zfA/xd2Mla4IosxN/BnQcPLilTBoofWi2A6QXLf8PfixPYObHUW4d57+FGan9EuSpuVj874W5oU6slJ5lBs2hJq6Af718rg51GHukod7qlC2hwKsTy9zB3NQBgCqPFvZtzAKmO1052pwMoSPHtsxtljAXuaM9HTBoZKab9kGwf2Pm7hwaQ/eozr4M2S5Cwhm4jOHbpaGyy1M89RuKNevmiS5h5FyqqdYfnYQO2P0+yNTzAjoKRZXOWtVvY6V/Zo/b/yLeznazmoMKs9BsE28bb3eTwM3NXBDsZEwDfhUJzBjtHS711uPeynXxINSXUmiOAQYW9MqHDyZGiouoVU+mvpTjNdtJRDC8pYJOXQmSl6IPm/JKeNT4xkEHSaye7c9Qh9DBV2G44tuKcIdrwfrPL/+3HB3b+AbBjXhnMF7CTl9Hv1EFHUmW/gJ0CIP+mN3LbLTa7P4adOdAILf/xjaRWki0nhqiW57CDBZA/gJ0BIDgjAPa7DzPBN1oc65+aOx8iVfNdmu0XsDO/CJ93YOcdPO0lS8OIF4LasLzFhq5KTzIBSAuW6zJYr/8G7OxGEQF6QV4KkVVFfJu/qW7iOPZw7bg7G9kT7PTturYU/qBFkvOWRmuy/4PjAzv/ANi5T2uM1FzPtF9pDdzoSvIi+xXsVF+xbGZbaZ5TniJ/cy6vCL8BiiZr+IuwkxU40yvYyf4w2wmuwY/x+2T7ALApmpTtj819iJnYd5HM8Pt3LPVfzHZy2b7KHsxsYI9xKEJE4S5ONtH8Yn33G7DT8WQUTa/rUBWnQmTZLYh89z5p3Y8TLvD02mF3MlNkBDuligEmri0d5j4SXN1hKsoP7Hxg5+8f7s50dPox2ynvWoh8PufkKsoiJPsl7IzAw45mhZPSBjJF1UaYIgmC80D1vzCOFXpktUCCummN1KHZgdXGuBoZBDUZ4wZ7GkMXISz3JFufC1NEMYzQ9+Xhql2O+uZ7mtr2jm1BRjji7is7ZbcpPnMNO6zJ2LTIfU6yDSnspCplDyeEJVwoRzOXuWgvsx0FEJTd+16/PKixHIwwbXAjlRVSPxIbgNpHDRsZhmX6yzjz8sNPs5t09tRiudRYY/KBhGlyIU3Su7hmO/kL1WYbdIpyOC2iqc4MfW2pjA1GhtauvhYluxsRUuzlFdbpQqmSbW3oFy+vl7csk1jmWiw/nuHh3onCm3h5M/OWTtZqzwFAxnkVHPotGpKJapAXJ4eYero1ndzDjhqNYrUQeb/CzkMLh3+xXFTZYRTPC7CMaWT7ToV4HUUSSU1Jvheu7XdnbbMsre91OLSKi7XCNc0EAPC2/MDOB3b+fraTKREK3yHb6Y1VWSfOyrVM4oJmHNq+tu688S3ATimAU5TOXN6XY6j0NBJHTxqcJOyaGUYBMLQcnVvBC8ZGkEgAuIllvfZ7thSjb/4RZ85MCZBlINlm4QSdZ5p3maIIr+KB1mOy9W1BAmVaBKwMQD4LLa560FZ2Rflx+JzVnDUH2GlsAjupSktr+qx3WPVtJUClOWyc3y7baWOKMXPHsirUQho5KTZw0kqru7KSvN26VnFIWLcyPAk3lAGbdY6DmKXPTRvfWvXgmG7eRVV2JikSxGynWdvAWCvmTE1gFDnBIivzUIo6M/S1pXpTK9WCt1AOAMoJHZPlwd87AADYxIYx2xlJeT2HgR5uBIDMSoMunQ0pAmcPa/xYrgwcoFajdW0o7QczjJtn0pN5xIJ81XAKO+XEAW4asa0JsNMKxzlqrKdJTbtRLIC+Wa0uhdhgSIIfLqmx0bX97py9hk2SAD1wrXQxeJjRHJ1FqUX/gZ0P7Px92PEpPzZLUbbDDG0QfsKOzOR2HgDaDbUIXu8UdjoDsT00R9dVY2dWKbCSVG29kYK9jhmToEfWWpU9KRquka5+4i5TvhA6YjV03sHO2Ku+GwUElroGHzIzBxRTOryJkzT0pPI4OqHjqMlfajC5is98ke0oGPrCsWwGPW5hZ6qq6m4S2NmpNEc4ZgKm5d8euJ5v+bTPHoO7LNu1Ed3gWA49hpI2W5sGR1HSxJ4bTezbEHYyhOICsZAtyJxVusosPjXmCHINzWfYZzuskqtvGilNdeB7fymGvlG7wZmhry3FTE3jLEKyB4B94irrcc1p0lbdl6kNQ20nWsSFtiywt84NHql0MMnee+OHA5pggBs9DIYCrzreet+0TKQnbUSbCfhFtuNzF8JQQ7CjCwTFB0Zg6P7dbhRmASAsgVMhNrtLJHGAPV7b7c7SZ7G7bCfHProV/LvY/IPfBwj1gZ0P7Px92PGz9Wut4+RJYtlYHpIZS90HLfEASoBgZ7AjJitg/Zatie2hPhFowwKXG2/UwJFO0NFvCtqETMLkZUMPnzMfJyIVYdOKARdCAIAITFRLzuWB4w+4R3vKrG6B1xtqdBwj3oW+YOL4THFKcWyyHdY8CxyiaRKSTWitI88YYCdV6fxqufBiXtXUB4A815yv1JwIfbU5CokztP4PJtHtsU0HRwGHotbOrAnsFLFHm9p6Sz+OdgHrRAK52pt2JdUUp6sN1iMqupeTnCeGvrZUQUq9c2+Vjvwtk/BAzzxR4mr2NgzZzgZ2GC6mIioQp3A7SxpKR3BYUHbKNPhmrjZyX/dNf116Ur8AIzZ67GEnSmBpl3BSQKxDMVrdu1GYBghfV50KsQHsLR09cHW8ttudeU1v3MDOjUK5ItJ53Ss2YC3/g2LbB3Y+sPPN2k6IsBzLiGQT+xBo4y3I2a0h3/20RVpwPT/4y+8NoK21zvnicclDeXxL+ffAj7ATKP95ExcixeRdiy+h1iD9V939kbphlePgVKzt4CD4Ec39RhCraA6YL2DYfvNfC7KQALXkvecLu6sTPuxY23kksJOqNI8OiCPgcJivYKeaNci1naDz8y1RbsYhlHsYfndi/QHUeBscijsEA4lZV9ihPDAo2XHxpFKQAoGDypBYxLlP87BJgMZoZeOjBFZ0BEHLGKeGvraUBesPg/6vCahCrVya3CCVvVMbOl4fsp1mJWy/gh3v5w0t/DJopd14/HFj5PSkjkrOL7OdmF51VDMNPGu+jS72o7Dc3gFIU6dCrGInRcBbwpzFa+nufFCkmGQ7OX2XusLOvG1Amd5onPzAzgd2fj/bwSS/JZJNxbXIDmF4Gf+DjbhrSg75Bck2vBDJQqfoKL2/CYwRT0m2/UqPvbGRDCPKgRkAOVKlXQKYgp1WDLKJU5oTOtlmHmyoBpMHpzCjX6yid+5bYxPY6S7sXn4LdrJpAzs7lcrY7GZQjRyeV7CjPDejN3Psco3/30+z+jy88R70qzbZhDmgZWJWQeah7OERlTwDgH7SCNN+0Fjbsa8o3EX7T0FbrNDUH3Jq6GtLCR7fxl7IQRF6qBWNUcaNDSmDKBPYeXFqCexUdzxeLYENIncbrSy8wuKnUms7B67A5ORKj9mL2s5GAomJaehkm7ZJhOPJKMwJls0S4HF4307udltqYy7ZoPFasjtvgW7ews4j0GhV7OR5blt6mITuAzsf2PkvwI6v/0OB2U63LkGxwxRm69Xb6Og43QXsMLd+XK834fy4eqNtECyOrtyFbGeKu7tCv6ksAAgq02sAMM2pM2OSfg3ZToCQ/7B3LkqSokoYVqQkvB1VvJdR7/+Yx+QmWNo7M9szO93x/xEbO1VdKoLkRyYJsoqvzA1+JVmL0cxspzxj5Q9h58e8najzsBNWKbO5W9EoPsKOjvHnXm55N7WbJunmc7p/X0PTiHOq4blZT0E2a0I3LpKE/I/sakChsVNwwY1RlnZdlEnNevCqiWrxumvo25aq/ZwSix1tKl86MyU1K1X9Nrya25k9b6c9sDPq/uyliUj6XWX5rSb5M9u2vefjhV+6A1wU+B47rfCxkzz9tg3Osqj42qDTXMLrheXOpB/3roKdCNzfgt5ZiTqpk6QWIknMSKSzy3Nm6+RkwUYYT4E92YCdP4IdWricrCKIrfFTd+qfx4MpbY8bb7BD3ohZhjp5ZtFl5wSD4IvVh61YjtiaGYirId82uV6YSSGSOZgxKJ0pUMeb5aIaIY2kiJrDTi5qFuu5qa6mEXf5md5OFGLHq1LmVqrohRkfeDuF+pG1ApkyXAoUQyLMiJTCjRdrYtvzvMC5WY23U4XeDm2px9X64fI9Fc5lsm1uFklaC7eQ1WZjsql7ft019G1L1X4ldInwsENeS7EfkbK3Ngy9HW3+PW8n8bydx5PUe9Z1rP1hkPKqZ8tmf1Ol8MvMUo27UOMtdiYTRH33dk5nqfUzrhPKwusF5d6kHy7Mg50Ijr8FvXMHnBLlRpskGjvxSchfTOv5jb2KGdgBdv7A3I62BCoUdVhFHqYQV6nfa5h5sJc77FC6kd1iymbbLnRk+T4Inr293ujI5vB2Vms/SzpLpxIEaupXQ6S3HX1ejaHJWD+8IJtqw1FFwh12WC3yatVBcTWF/anejo+dU5XKwyxU0cninoNsqnDatzA7mahbKlwAdKHsLjuxXPkt5Hsrj7dmDbwdhx2q1OJJhBpcXS7+3I5NK3QrGp3VVoHVPrI3dN3Qty3ltgrvsrO3Q/n302g2iA7bUM/tFLfezgdzO/slU/3rITqijdK0XlDo4MvCTMWxg+sfeDv5DXbCszTW9xnVAZeFUHUjg5nMtrj+22XvdEG2Qr48vyaN3soW9fJbUwfY+Yu8Hb37rH5YdXyGiSBOsxiPvsmVxbY2Zb7FTmS3Xy6tjawyMtqT6ZK+ee4T7+PQe3M7jXArqasoyjN9wjqK9ABw8ROFw9DNfA6y6f5/WKE+kTrI3emvSp279vnezqlKF5sYq2vvH7wdKsgYHZEwDYrWhEXmUd2Rnv/JPPPX+pkK2frWrMam6ZQChx09fh71DJTebbyb3rwdmo+v7S5glj+Z81DtfNZVQ9+1lAUZo1WV1tvRZpuN3gnCNtTejiXAdPJ2Hhrv8/UmD7P2k+2Gaqk6sc7PJg54Jj38shdm4ZMzzhfYURdkiRoOXGEnPAuzpKzUo3BZCD84ppa6lsa7Yev5b5e9067baaRdp9vQg6+fCe67xoxnwA6w83slV2/sI4wRNumV6kF96NXvC39tu8qHctFzbe07hYSubYfQ1GqDw6ReMEd5ANNQdL1Uec9qQ/eiDvoqpTRY/g3K9rn9FXuz6LSldTu5sq8FRal1yG87hS50n3JbJLtMNhr/1cQT1gsxz7MxD3qwF6uLN9OOnRcz+42QtWfv9/ZP3k4nQv9P25ywSgvD5VmX3W6ewp48OLS35tKkjumFoh0XU/SiD7xkLFOJZ6lIZFnEi78RF63DtDjL0vdmHVVkLlcz6UeyuB6ErPSTVQieN03Ot8Cg6laJa+OCtdpNZSpKOSX7B/JAs2I4NfTKg4VJby1FCSJ9VwxTGrmtWwwac1qww5h9tvw2NA8JV6uJKpViT/cZW7aR2Z8nkfhNyCpltQuz2GrQrnhRt4anTeTy9O0RwZdNrdOSE1cvboseVqmHxUbJMr0yN7GZbDoPXD9P4VlSA+9RfXlZCIoEP6gHvrLxqVz+bKBPuWqy8G9B7wy9nUb2m+rH2qV5qpJuuh+sasUDS9MI2AF2fqvm5AgQs1aY0R09ol3dmw0JuLaBIhGJrhH1meaWW3VwKgK/aEvsRoRdIuqM6bcr0PF6FaEQY7a2XNT+K+LYzrw2i1kx9JMJLUn78hEh44gtahv/XEX4c+rIvUql7uuDAWTCnuXQbau05rHVRkWvkOmFmHqZCyFHG4TY3ExI+pSrELTnu7GketXE6d4it77/RosIlvVbOx1UKc3MVCxqWrNg0ZCTssjywNjZj5MQfUMGPOnHqReClh+a96ZUOm6i6zco105RMb6aqHmNT/ZehkyIqWr7KhHjg3yNwVRERlemSmOjd4XDITZ5dfvh0iwOGQva8mXWV2h7+eCCt03Y0I0I0iIvWqpMdH9rIvdahEIxRu9PQDMTaXdqQ8b1AKei9Zkyn5IkfXnrU1kteJXKQQjpMW//yNdy5Q/ny9C+NKlJ7prr/bxbEq5cCb8siSb5wQQqBYs8v5RCxsQ7Ppn2XQygdZeY3s/SSDU+yw0fLwsxJK4LbqqK1EehCB3+LeydbrJPRSd5Yn6nr1zQfjwxV+E6JkS9lLnsGbAD7PxOddXUtml1jJANOFrBpXQ27xlFr7Ztpf7PdNcHl6PUYf9V1EdAZ+vpR5N+c2O+HzLl6h1uIjFvK2ueiUjGWPIljLhvqZr3bNVls3E/0mSZsYULaTa4yidZj5OKTvcj56OcjjniJZW6kO30XNWAl9KN2zGLK/ruEbE02S+8w8bu9VXaOMk8ibpnjF7fsh8j2zRrqv1/0xremwoAqheS3KT65E+qo7GyHTef9rOofVeCKo3mUdSSL2of/WkvstpnLd4h7SxNUY10L70iSUP/fLJBCr6yudZp7A8uhE1oL2gfIXnazIdlk7Iv7jWVYRkqIeo8WpK+m1WTqUJPE5cpT3XLLFyI+sHCu2vN3VH90JmbPqklNxt5VbWYBppTiU8NTRNU8oOWopqlxES6MlPNVbF8pAqYd/7x2pBnDtrwRU313DQh+Ssa6yVmlao2fdKBC5EWsZiyIFqcCMH7Y7RSSj62bieyeeQtPy9GC7/cWsnbl3OeqJipnSN8KNAkC59GXun2pedlLp/UhAP9ZL04S9HzKW3T+b4QrNXdjzpXFMXSferPfzv1TjuF1tLj8Tz6cWMuXLe1+WFO7Z0OUQTsADu/V+z6UzEfPlB8M/ppXOQ5ZvyfHlY2F+G/L8LtrOm6y2uxxisDm5ujlP9y28LmdOcXV/+Be/sxeVV6qg/3i2J9/kBrudPEcXRVK/7v4yG4alAGRh+at2I0ftPHHz8v5lfNTQm9hmbNJn+uho6xEQ3aWRN3Ob99zYFaXPT+oKoCsPjtcTr9sGjCP18+gmFL3bRPE9nZpfmm23gnCs9SBKW6LMRPPdrFz3eCU0UAO8DOX62GM9zbJ2gsv+8zsvziO38K7iplXb7Enc43qXMQsAPsfKLL9I3N5Z+8t+wbv9yxa3+R3r1L9GPt11hPAuwAO8DOb9f2janzB++t6atv6zOyJf1VSzyK+kHHsq3Nvwhhf+G1fBCwA+z8XDdjuLfPwM43HiKzX39bMmXkiYRzwV9f5Gbzyw1yIWAH2IGgL6KhGqfRew/13625n6Zxqhq0G7AD7EAQBEHADgRBEATsADsQBEHADrADQRAEATsQBEEQsAPsQBAEQcAOBEEQBOwAOxAEQcAOsANBEAQBOxAEQRCwA+xAEARBwA4EQRAE7AA7EARBwA6wA0EQBAE7wA4EQRCwA+xAEARBwA4EQRAE7AA7EARBELADQRAEATvADgRBELAD7EAQBEHADgRBEATsADsQBEEQsANBEAQBO8AOBEEQsAPsQNC1iq8rhtaDgB1gB/py1Pnf11WJ5oOAHWAHAnaAHQjYAXYg6CPsfNGSAzsQsAPsQMAOsAMBO8AOBAE7EATsADsQsAPsQMAOsAMBO18JOy80HwTsADsQsANvBwJ2gB0IAnYgCNgBdiBgB9iBgB1gBwJ2gB0IAnYgCNgBdiBgB9iBgJ3/FDvIZIOAHWAHAnbg7UDADrADQcAOBAE7wA4E7AA7ELAD7EDADrADQcAOBAE7wA4E7AA7ELDz32IHmWwQsAPsQMAOvB0I2AF2IAjYgSBgB9iBgB1gBwJ2gB0I2AF2IAjYgf7P3r3oKIqtARi12JQ73gKKeI/v/5hHAFFs7Jozl8yoa2WS6rLF6mRoP3/Y0MiO7CA7soPsDNrNp5MyqV579c9mx0o2ZEd2eLfsTMdF2ii2x2nSPpqvt2nPstsgX6QxK4osjE+jxWI0mo+X/aceLk8qj82D2/X8eP3t5WbfVGqXPlqadpAd2eFjpp08jTFdTKeLNMT09kb/HWM8zOeTy3/TY8y6h0Pc1JPOah2zsK4eSpYxps0zJ4dlXNTPSzbV9vUfYBtjOO731QPjWdWkGLfr/f6Sr7i5fDmmMcgOsiM7fEx2RusYx9dfxEm3XYxx181E7U6cjGOcXh88hdBsd4ihm1eS7bH5xTzGmLQbx6L6ukpjKC7dObU/ZNm+VjKOsoPsyA6fk53DNTujai7Jrw/fZ2eUzuovx3aCaZzj5tqV22Gyc/taZYxZF6CieSjUP2nebDVahrY/SZbIDrIjO3xgdqoJpRtmwn121nmza8feaZjxst3jb9POKBl32UkfslNlLeajSTtRLbvZapzLDrIjO3xgdqq/TYvB7DRFSWPslWBXjIZq9GzaqX7S5QW+Zl2E2sbtnkw7VrIhO7LDR2Ynb7LwHWPWD0R3kG17fSS/y84v08403ndreXcmybSD7MgOH5idarc9D2TnOLt2Yvvw4o/TzvUQ2/20c+5NO+UtO0F2kJ03ys5pXF820X02TY7VhRjFeGK3kZ1n2UmKGItkIDtFPcPM7meh/h7fnds5bX437Wx645JpB9l5s2knP8buU2z77pJ+2Wlk52l2ZpsY09vpnC47+TrW2TnFGL+H9/h22knKYvPrtNNl5xR7C+GWIU5lB9l5o+w0l2Hsb98mcW2fkZ3B7Gx25XydxXDMR/fZCbUY46yty/B4Mq2emVXPDPE3084k638OMu0gO2+XnTz2zuCOwt4+IzuD2QlpGmNc5PcPhxgnZXkqz9OimXb6CwL6005xeWJ5mi/CwLRzjjFmxTKNsehNN9sfs2MlG7LzitnJbndrDAf7jOwMZmdcz8Zp8pCd9ojbLMzaqWX4qNjdkoLpk2kn2ZXnU97fzLSD7LxhdvZZjOlMdmTn5+wkRYzH4eyMNnUwTv2DtoPZyX+7pOCX7Di3g+y8W3Ym1TtFt5wtuz/R85Xcf2Nn+vjsjFahP33cZWde7yxJfAjT1f11O5O77GQ/Zse0g+y8XXbq+wivH6ed2T4NIRbfbXl26fC7CR+Vnfpq0K/B7Nw6kf4w7dzcpp3zk+xsZQfZecfsjI4xhmk/O2WalqNkksXl7Pq2E2d2p4/PTnVZzTJ5kp2kbJaylb1Nk9lAdr6+TDvIzidnJ1nGGMr77HxloX5fOF3fZE5P3hb4sOzkaYz7J9mZ7JvTP5vepuPVQHa2eX/a+fPndqxkQ3ZeMTv1e0lWvxG053Y2oT2kdry+yZRTw47sNB9A4mkwO3l9HWn5cOXOotl/pvd3oB5Nm/M8f2TaCZYUIDvvmJ36VHE91jTTzqp751j9cmdHPjE7i9sMs7ituE9ijN3i+2TbdOX7fg11sth0/47bLTtl25Jzl53Jk1NCxZObHsgOsvO62QmT61/7+uNsk53F7fh8evfZlo/NzvL28aM6JJvNu8lnkdTySXG9qc00xLg9V89O5stj0o3NoayfOVvtQ3NtabWftdlax18WJzS7Z/z9UhbZQXZeddoZjRahvhdWk53t7UPspneLLD4xO+f9MsQYi32zr+yy6pv16nudhXoPDu2efF3ittuEGEOxTUPabFEeNu1TQvPs6hjb7jCur1Vef7e/nS0eBpvpIo0xxs2hlB1k5w2zU/UlnttzO+l1hUH9MdT9cj48O1+rVjuP7Opv8tWju91qujhujl0u8lXZf2ZeP9h9N/AKld7TZQfZebvsJEWM2a6ZdorbjbUWPywl4v2zMyR5+Pp/bvbHHv6ZlWzIzutlJ3SrjqpjJ2lzRG1zG3HWj5dhIDv/HaYdZOeFp536BHFocnO4LTs6Ptz8EdmRHZCdvyc79dLXQzMDdeuKiuF/LBLZkR2QnT9h1ztzc7wuW9tfL9NYhay+TDTfZt/2JtmRHZCdv2jauywiWbbndJJNrKec2TKcrh2KDrbJjuyA7PwV+eEY+pdF5Gl7kU6yiLFYH7Nidf0DO8cjO//F7FjJhuy8UnaSXy+LWHW3JMi/18f97QYF3+uVvUl2TDsgOyA7IDuyg+zIDrIjOyA7IDuyg+zIDrIjO8jOS2THSjZkR3aQHdMOsiM7IDsgO7KD7MgOsiM7yI7sgOyA7MgOsiM7yM6/mx0r2ZAd2UF2TDvIjuyA7IDsyA6yIzvIjuwgO7IDsgOyIzvIjuwgO/9udqxkQ3Zkh1fMzssy7SA7ssPLSV44O6YdZEd2AGRHdgCQHdkBkB3ZAUB2AJAd2QFAdgCQHdkBkB3ZAUB2AJAd2QFAdgCQHdkBkB3ZAUB2ZAdAdmQHANkBQHZkBwDZAUB2ZAdAdmQHANkBQHZkBwDZAUB2ZAdAdmQHANkBQHZkBwDZAUB2ZAcA2QFAdmQHQHZkBwDZAUB2ZAcA2QFAdmQHQHZkBwDZAUB2ZAcA2QFAdmQHQHZkBwDZkR0A2ZEdAGQHANmRHQBkBwDZkR0A2ZEdAGQHANmRHQBkBwDZkR0A2ZEdAGRHdgBkR3YAkB0AZEd2AJAdAGRHdgBkR3YAkB0AZEd2AJAdAGRHdgBkR3YAkB3/pwBkR3YAkB0AZEd2AJAdAGRHdgBkR3YAkB0AZEd2AJAdAGRHdgBkR3YAkB0AZEd2AJAdAGRHdgBkR3YAkB3ZAZAd2QFAdgCQHdkBQHYAkB3ZAZAd2QFAdgCQHdkBQHYAkB3ZAZAd2QFAdmQHQHZkBwDZAUB2ZAcA2QFAdmQHQHZkBwDZAUB2ZAcA2QFAdmQHQHZkBwDZkR0A2ZEdAGQHANmRHQBkBwDZkR0A2ZEdAGQHANmRHQBkBwDZkR0A2ZEdAGQHANmRHQBkBwDZkR0A2ZEdAGRHdgBkR3YAkB0AZEd2AJAd+B97dSwAAAAAMMjfOpFS2LHqdm6n6nZup6rbqep2bqeq26nqdm6n6nZup6rbuZ2q27mdqm6nqtu5napup6rbuZ2q27mdqm6nqtu5napup6rbuZ2q27mdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup3bqbqd26nqdqq6ndup6naqup3bqbqd26nqdqq6ndup6naqup3bqbqd26nqdm6n6nZup6rbqep2bqeq26nqdm6n6nZup6rbqep2bqeq26nqdm6n6nZup6rbuZ2q27mdqm6nqtu5napup6rbuZ2q27mdqm6nqtu5napup6rbuZ2q27mdqm6nqtu5napup6rbuZ2q27mdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup3bqbqd26nqdqq6ndup6naqup3bqbqd26nqdqq6ndup6naqup3bqbqd26nqdm6n6nZup6rbqep2bqeq26nqdm6n6nZup6rbqep2bqeq26nqdm6n6nZup6rbqep2bqeq26nqdm6nqtup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq27mdqtu5napup6rbuZ2qbqeq27mdqtu5napup6rbuZ2qbqeq27mdqtu5napu53aqbud2qrqdqm7ndqq6napu53aqbud2qrqdqm7ndqq6napu53aqbud2qrqdqm7ndqq6napu53aqup2qbud2qm7ndqq6napu53aqup2qbud2qm7ndqq6napu53aqup2qbud2qm7ndqq6ndupup3bqep2qrqd26nqdqq6ndupup3bqep2qrqd26nqdqq6ndupup3bqep2bqfqdm6nqtup6nZup6rbqep2bqfqdm6nqtup6nZup6rbqep2bqfqdm6nqttZqup2bqeq26nqdm6nqtup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq27mdqtu5napup6rbuZ2qbqeq27mdqtu5napup6rbuZ2qbqeq27mdqtu5napu53aqbud2qrqdqm7ndqq6napu53aqbud2qrqdqm7ndqq6napu53aqbud2qrqd26m6ndup6naqup3bqep2qrqd26m6ndup6naqup3bqep2qrqd26m6ndup6naq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ALIjOwDIDgCyIzsAsiM7AMgOALIjOwDIDgCyIzsAsiM7AMiO7ADIjuwAIDsAyI7sACA7AMiO7ADIjuwAIDsAyI7sACA7AMiO7ADIjuwAIDuyAyA7sgOA7AAgO7IDgOwAIDuyAyA7sgOA7AAgO7IDgOwAIDuyAyA7sgOA7AAgO7IDgOwAIDuyAyA7sgOA7MgOgOzIDgCyA4DsyA4AsgOA7MgOgOzIDgCyA4DsyA4AsgOA7MgOgOzIDgCyIzsAsiM7AMgOALIjOwDIDgCyIzsAsiM7AMgOALIjOwDIDgCyIzsAsiM7AMiO7ADIjuwAIDsAyI7sACA7AMiO7ADIjuwAIDsAyI7sACA7AMiO7ADIjuwAIDsAyI7sACA7AMiO7ADIjuwA/MdeHQsAAAAADPK3TqQUdqzbuZ2q27mdqm6nqtu5napup6rbuZ2q27mdqm6nqtu5napup6rbuZ2q27mdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup3bqbqd26nqdqq6ndup6naqup3bqbqd26nqdqq6ndup6naqup3bqbqd26nqdqq6ndup6naqup3bqep2qrqd26m6ndup6naqup3bqep2qrqd26m6ndup6naqup3bqep2qrqd26m6ndup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq27mdqtu5napup6rbuZ2qbqeq27mdqtu5napup6rbuZ2qbqeq27mdqtu5napup6rbuZ2qbqeq27mdqm6nqtu5narbuZ2qbqeq27mdqm6nqtu5narbuZ2qbqeq27mdqm6nqtu5narbuZ2qbud2qm7ndqq6napu53aqup2qbud2qm7ndqq6napu53aqup2qbud2qm7ndqq6ndupup3bqep2qrqd26nqdqq6ndupup3bqep2qrqd26nqdqq6ndupup3bqep2lqq6ndup6naqup3bqep2qrqd26m6ndup6naqup3bqep2qrqd26m6ndup6naqup3bqep2qrqd26m6ndup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq27mdqtu5napup6rbuZ2qbqeq27mdqtu5napup6rbuZ2qbqeq27mdqtu5napu53aqbud2qrqdqm7ndqq6napu53aqbud2qrqdqm7ndqq6napu53aqbud2qrqdqm7ndqq6napu53aqbud2qrqd26m6ndup6naqup3bqep2qrqd26m6ndup6naqup3bqep2qrqd26m6ndup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq27mdqtu5napup6rbuZ2qbqeq27mdqtu5napup6rbuZ2qbqeq27mdqtu5napup6rbuZ2qbqeq27mdqtu5napu53aqbud2qrqdqm7ndqq6napu53aqbud2qrqdqm7ndqq6napu53aqbud2qrqd26m6ndup6naqup3bqep2qrqd26m6ndup6naqup3bqep2qrqd26m6ndup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq27mdqtu5napup6rbuZ2qbqeq27mdqtu5napup6rbuZ2qbqeq27mdqtu5napu53aqbud2qrqdqm7ndqq6napu53aqbud2qrqdqm7ndqq6napu53aqbud2qrqd26m6ndup6naqup3bqep2qrqd26m6ndup6naqup3bqep2qrqd26m6ndup6naqup3bqep2qrqd26nqdqq6ndupup3bqep2qrqd26nqdqq6ndupup3bqep2qrqd26nqdqq6ndupup3bqep2bqfqdm6nqtup6nZup6rbqep2bqfqdm6nqtupCnt1LAAAAAAwyN86kVLYsdu5napup6rbuZ2q27mdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup2qbud2qrqdqm7ndqq6napu53aqbud2qrqdqm7ndqq6napu53aqbud2qrqdqm7ndqq6napu53aqbud2qrqd26m6ndup6naqup3bqep2qrqd26m6ndup6naqup3bqep2qrqd26m6ndup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq21mq6nZup6rbqep2bqeq26nqdm6n6nZup6rbqep2bqeq26nqdm6n6nZup6rbqep2bqeq26nqdm6n6nZup6rbuZ2q27mdqm6nqtu5napup6rbuZ2q27mdqm6nqtu5napup6rbuZ2q27mdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup3bqbqd26nqdqq6ndup6naqup3bqbqd26nqdqq6ndup6naqup3bqbqd26nqdqq6ndup6naqup3bqbqd26nqdm6n6nZup6rbqep2bqeq26nqdm6n6nZup6rbqep2bqeq26nqdm6n6nZup6rbuZ2q27mdqm6nqtu5napup6rbuZ2q27mdqm6nqtu5napup6rbuZ2q27mdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup3bqbqd26nqdqq6ndup6naqup3bqbqd26nqdqq6ndup6naqup3bqbqd26nqdm6n6nZup6rbqep2bqeq26nqdm6n6nZup6rbqep2bqeq26nqdm6n6nZup6rbuZ2q27mdqm6nqtu5napup6rbuZ2q27mdqm6nqtu5napup6rbuZ2q27mdqm6nqtu5napup6rbuZ2q27mdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup2qbud2qrqdqm7ndqpu53aqup3bqbqd26nqdqq6ndup6naqup3bqbqd26nqdqq6ndup6naqup3bqbqd26nqdm6n6nZup6rbqep2bqeq26nqdm6n6nZup6rbqep2bqeq26nqdm6n6nZup6rbqep2bqeq26nqdm6nqtup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq26nqdm6nqtup6nZup+p2bqeq27mdqtu5napup6rbuZ2qbqeq27mdqtu5napup6rbuZ2qbqeq27mdqtu5napu53aqbud2qrqdqm7ndqq6napu53aqbud2qrqdqm7ndqq6napu53aqbud2qrqdqm7ndqq6napu53aqup2qbud2qm7ndqq6napu53aqup2qbud2qm7ndqq6napu53aqup2qbud2qm7ndqq6ndupup3bqep2qrqd26nqdqq6ndupup3bqep2qrqd26nqdqq6ndupup3bqep2bqfqdm6nqtup6nZup6rbqep2bqfqdm6nqtup6nZup6rbqep2bqfqdm6nqttZqup2bqeq26nqdm6nKu3ZW6rCMBRA0XMrrXgraH01Cjj/YSqi+BqA8bhWyU9/A9mcRHYAkB3ZAZAd2QFAdgCQHdkBQHYAkB3ZAZAd2QFAdgCQHdkBQHYAkB3ZAZAd2QFAdmQHQHZkBwDZAUB2ZAcA2QFAdmQHQHZkBwDZAUB2ZAcA2QFAdmQHQHZkBwDZkR0A2ZEdAGQHANmRHQBkBwDZkR0A2ZEdAGQHANmRHQBkBwDZkR0A2ZEdAGRHdgBkR3YAkB0AZEd2AJAdAGRHdgBkR3YAkB0AZEd2AJAdAGRHdgBkR3YAkB0AZEd2AJAdAGRHdgBkR3YAkB3ZAZAd2QFAdgCQHdkBQHYAkB3ZAZAd2QFAdgCQHdkBQHYAkB3ZAZAd2QFAdmQHQHZkBwDZAUB2ZAcA2QFAdmQHQHZkBwDZAUB2ZAcA2QFAdmQHQHZkBwDZkR0A2ZEdAGQHANmRHQBkBwDZkR0A2ZEdAGQHANmRHQBkBwDZkR0A2ZEdAGQHANmRHQBkBwDZkR0A2ZEdAGRHdgBkR3YAkB0AZEd2AJAdAGRHdgBkR3YAkB0AZEd2AJAdAGRHdgBkR3YAkB3ZAZAd2QFAdgCQHdkBQHYAkB3ZAZAd2QFAdgCQHdkBQHYAkB3ZAZAd2QFAdmQHQHZkBwDZAUB2ZAcA2QFAdmQHQHZkBwDZAUB2ZAcA2QFAdmQHQHZkBwDZAUB2ZAcA2QFAdmQHQHZkBwDZkR0A2ZEdAGQHANmRHQBkBwDZkR0A2ZEdAGQHANmRHQBkBwDZkR0A2ZEdAGRHdgBkR3YAkB0AZEd2AJAdAGRHdgBkR3YAkB0AZEd2AJAdAGRHdgBkR3YAkB3ZAZAd2QFAdgCQHdkBQHYAkB3ZAZAd2QFAdgCQHdkBQHYAkB3ZAZAd2QFAdgCQHdkBQHYAkB3ZAUB2AJAd2QGQHdkBQHYAkB3ZAUB2AJAd2QGQHdkBQHYAkB3ZAUB2AJAd2QGQHdkBQHZkB0B2ZAcA2QFAdmQHANkBQHZkB0B2ZAcA2QFAdmQHANkBQHZkB0B2ZAcA2ZEdANmRHQBkBwDZkR0AZAcA2ZEdANmRHQBkBwDZkR0Avi4786GN4zBevl3EOEwBSGHYx2q8HvDRnFcdNZy0MZs8TDsAJNFFqf6SbdfZJ4AUFl0by7qzs3YVCpBKU2d2Drdpp+9LsUsAKfyV0m/rzM7GLAqQm+wAIDsAyI7sACA7AMiO7AAgOwDIjuwAyM4HsnN8/mFzAFLoXk/3OrLzP51HRPOwAMigeT7ba8nO5n0QAyCBWZ3nu3cdgJ953wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgLsTEWSlAG6icbUAAAAASUVORK5CYII=';
    const doc = new jsPdf();

    doc.setFontSize(12);

    doc.addImage(img, 0, 0, 210, 297);

    const x = 24;
    let y = 77;

    const report_address = this.splitCollegeAddressForReceipt(clgAddress);

    const bnkNamenAddress = bankDetails;
    const bankAddress = this.splitBankAddressForReceipt(bnkNamenAddress);

    doc.fromHTML('No:- ' + r_no , x , 56);
    doc.fromHTML('<b>Date</b>:- ' + currentDate , 19 * 8 , 56);

    // line 1
    doc.fromHTML('Received with thanks from The Principal, ' , x, y);
    if (report_address[0] !== undefined) {
      doc.fromHTML(report_address[0], x * 4, y);
    }
    // line 2
    if (report_address[1] !== undefined) {
      y += 5;
      doc.fromHTML(report_address[1], x, y);
    }

    // line 3
    if (report_address[2] !== undefined) {
      y += 5;
      doc.fromHTML(report_address[2], x, y);
    }

    y += 5;
    doc.fromHTML('the sum of Rupees ' + this.csv(fee) + ' towards one-time payment of Youth Red Cross College' , x, y);
    y += 5;
    doc.fromHTML('Registration fee ' + this.csv(1500) + ' x ' + student_count
      + ' 30% student membership Fee. Check/ Bank Draft no. ', x, y);
    y += 5;
    doc.fromHTML(voucher_no + ' Dated ' + received_date, x, y);
    doc.fromHTML(' ' + bankAddress[0], x * 2.5 + 10, y);
    y += 5;
    doc.fromHTML(bankAddress[1], x, y);
    y += 5;
    doc.fromHTML(bankAddress[2], x, y);
    doc.fromHTML('<b>Rs.</b> ' + this.csv(fee), x , 77 + 67 );
    doc.fromHTML('Official communications will be followed', x + 100 , 77 + 62 - 5 );
    doc.save(clg_name + '_' + currentDate + '.pdf');
  }
}
