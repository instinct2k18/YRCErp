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

  // College Registration Fee only
  form1(clg_name, clgAddr, yrc_reg_no, voucher_no, current_date, received_date, bank_details) {

    const bankdraftOrCheckno = voucher_no;
    const bankdate = received_date;
    const bankdetails = bank_details;

    const address = this.getCollegeAddress(clgAddr);

    const letterno = yrc_reg_no;
    const dateref = current_date;


    const save_name = clg_name + current_date;

    const doc = new jsPdf();

    doc.setFontSize(13);
    // doc.setFont("");

    doc.fromHTML('The Principal,', 26, 50);
    doc.fromHTML(clg_name + ',' , 26, 55);
    doc.fromHTML(address[0] + ',' , 26, 60);
    doc.fromHTML(address[1] + ',', 26, 65);
    doc.fromHTML(address[2] + ',', 26, 70);
    doc.fromHTML(address[3] + ',',  26 , 75);
    doc.fromHTML('Dear Sir/Madam, ', 26, 85);

    doc.fromHTML('<b>Sub</b>:- Registration of Youth Red Cross', 57, 95);
    doc.fromHTML('<b>Ref</b>:- Your Letter No: <b>' + letterno + '</b> Date: <b>' + dateref + '</b>', 57, 100);
    doc.fromHTML('<sup> * *********</sup>', 3.5 * 26 + 4, 105);

    doc.fromHTML('We acknowledge with thanks the receipt of <b>Bank Draft / Cheque No: ' + bankdraftOrCheckno + '</b> Dated:', 35, 110);
    doc.fromHTML('<b>' + bankdate + '</b>,  <b>' + bankdetails + '</b>', 26, 115);
    doc.fromHTML('for <b>Rs.1, 500/- (Rupees One Thousand Five Hundred Only) </b>towards onetime payment of ', 26, 120);
    doc.fromHTML('College Registration.', 26, 125);

    doc.fromHTML('Receipt No:', 35, 135);
    doc.fromHTML('Dated:', 80, 135);
    doc.fromHTML('for Rs.1, 500/- is enclosed.', 120, 135);

    doc.fromHTML('Participation of students in Red Cross activities promotes understanding and accepting', 35, 145);
    doc.fromHTML('of civic responsibilities and maintaining a spirit of friendliness.', 26, 150);

    doc.fromHTML('Thanking you, ', 37, 160);
    doc.fromHTML('Yours truly, ', 26 * 5.75 + 6, 170);
    doc.fromHTML('<b>General Secretary</b>', 26 * 5.75, 190);

    doc.save(save_name + '.pdf');
  }

  form2(clg_name, clgAddr, yrc_reg_no, voucher_no, current_date, received_date, bank_details, student_count, fee) {
    const address = this.getCollegeAddress('');
    const letterno = yrc_reg_no;
    const dateref = current_date;

    const money = fee;
    const total = parseFloat(fee) + 1500;
    const stdno = student_count;

    const doc = new jsPdf();

    doc.setFontSize(13);
    // doc.setFont("Bookman Old Style");

    doc.fromHTML('The Principal,', 26, 50);
    doc.fromHTML(clg_name + ',' , 26, 55);
    doc.fromHTML(address[0] + ',' , 26, 60);
    doc.fromHTML(address[1] + ',', 26, 65);
    doc.fromHTML(address[2] + ',', 26, 70);
    doc.fromHTML(address[3] + ',',  26 , 75);

    doc.fromHTML('Dear Sir/Madam, ', 26, 85);

    doc.fromHTML('<b>Sub</b>:- Registration of College and Sending student membership amount', 57, 95);
    doc.fromHTML('<b>Ref</b>:- Your Letter No: <b>' + letterno + '</b> Date: <b>' + dateref + '</b>', 57, 100);
    doc.fromHTML('<sup>**********</sup>', 3.5 * 26 + 4, 105);

    doc.fromHTML('We acknowledge with thanks the receipt of D.D/Cheque for Rs.1, 500/- <b>(Rupees One</b>', 35, 110);
    doc.fromHTML('<b>Thousand Five Hundred Only)</b> being the onetime payment of College Registration Fee', 26, 115);
    doc.fromHTML('and ' + stdno + ' Students membership Fee 30% of Rs. ' + money + '/- (Total Rs: ' + total + '/- )', 26, 120);

    doc.fromHTML('Receipt No:', 35, 130);
    doc.fromHTML('Dated:', 80, 130);
    doc.fromHTML('for Rs.1, 500/- is enclosed.', 120, 130);

    doc.fromHTML('On behalf of Indian Red Cross Society,  Karnataka State Branch,  I thank you for your', 35, 135);
    doc.fromHTML('kind co-operation,  I request you to continue your co-operation in enrolling more number of', 26, 140);
    doc.fromHTML('students every year at the time of admission. Kindly utilize 70% out of the membership fee', 26, 145);
    doc.fromHTML('collected for Youth Red Cross activities mentioned in the guidelines.', 26, 150);

    doc.fromHTML('Participation of students in Red Cross activities promotes understanding and accepting', 35, 160);
    doc.fromHTML('of civic responsibilities and maintaining a spirit of friendliness.', 26, 165);

    doc.fromHTML('Thanking you, ', 37, 175);
    doc.fromHTML('Yours truly, ', 26 * 5.75 + 6, 180);
    doc.fromHTML('<b>General Secretary</b>', 26 * 5.75, 200);

    doc.save(clg_name + '-' + current_date + '.pdf');

  }

  form3(clg_name, clgAddr, yrc_reg_no, voucher_no, current_date, received_date, bank_details, student_count, fee) {
    const address = this.getCollegeAddress(clgAddr);
    const letterno = yrc_reg_no;
    const dateref = current_date;
    const bankdraftOrCheckno = voucher_no;
    const bankdate = received_date;
    const bankdetails = bank_details;
    const money2text = '';
    const noStd = student_count;
    const money = fee;

    const doc = new jsPdf();

    doc.setFontSize(13);
    // doc.setFont("");

    doc.fromHTML('The Principal,', 26, 50);
    doc.fromHTML(clg_name + ',' , 26, 55);
    doc.fromHTML(address[0] + ',' , 26, 60);
    doc.fromHTML(address[1] + ',', 26, 65);
    doc.fromHTML(address[2] + ',', 26, 70);
    doc.fromHTML(address[3] + ',',  26 , 75);

    // until here ^---
    doc.fromHTML('Dear Sir/Madam, ', 26, 85);

    doc.fromHTML('<b>Sub</b>:- Student Membership Amount.', 57, 95);
    doc.fromHTML('<b>Ref</b>:- Your Letter No: <b>' + letterno + '</b> Date: <b>' + dateref + '</b>', 57, 100);
    doc.fromHTML('<sup>**********</sup>', 3.5 * 26 + 4, 105);

    doc.fromHTML('We acknowledge with thanks the receipt of <b>Bank Draft / Cheque No: ' + bankdraftOrCheckno + '</b> Dated:', 35, 110);
    doc.fromHTML('<b>' + bankdate + '</b>,  <b>' + bankdetails + '</b>', 26, 115);
    doc.fromHTML('for <b>Rs.' + money + '/- ' + money2text + ' </b> towards 30% membership contribution from ' +
    noStd + ' students. ', 26, 120);

    doc.fromHTML('Receipt No:', 35, 130);
    doc.fromHTML('Dated:', 80, 130);
    doc.fromHTML('for Rs.1, 500/- is enclosed herewith.', 120, 130);

    doc.fromHTML('Participation of students in Red Cross activities promotes understanding and accepting', 35, 140);
    doc.fromHTML('of civic responsibilities and maintaining a spirit of friendliness.', 26, 145);

    doc.fromHTML('Thanking you, ', 37, 155);
    doc.fromHTML('Yours truly, ', 26 * 5.75 + 6, 165);
    doc.fromHTML('<b>General Secretary</b>', 26 * 5.75, 185);

    doc.save(clg_name + '-' + current_date + '.pdf');
  }

  form4(clg_name, clgAddr, yrc_reg_no, voucher_no, current_date, received_date, bank_details, student_count, fee) {

    const address = this.getCollegeAddress(clgAddr);
    const letterno = yrc_reg_no;
    const dateref = current_date;
    const bankdraftOrCheckno = voucher_no;
    const bankdate = received_date;
    const bankdetails = bank_details;
    const money2text = '';
    const noStd = student_count;
    const money = fee;
    const receiptMoney = 'receipt money';

    const doc = new jsPdf();

    doc.setFontSize(13);
    // doc.setFont("");

    doc.fromHTML('The Principal,', 26, 50);
    doc.fromHTML(clg_name + ',' , 26, 55);
    doc.fromHTML(address[0] + ',' , 26, 60);
    doc.fromHTML(address[1] + ',', 26, 65);
    doc.fromHTML(address[2] + ',', 26, 70);
    doc.fromHTML(address[3] + ',',  26 , 75);

    doc.fromHTML('Dear Sir/Madam, ', 26, 85);

    doc.fromHTML('<b>Sub:- Student Membership Amount.</b>', 57, 95);
    doc.fromHTML('<b>Ref</b>:- Your Letter No: <b>' + letterno + '</b> Date: <b>' + dateref + '</b>', 57, 100);

    doc.fromHTML('<sup>**********</sup>', 3.5 * 26 + 4, 105);

    doc.fromHTML('We acknowledge with thanks the receipt of <b>Bank Draft / Cheque No: ' + bankdraftOrCheckno + '</b> Dated:', 35, 110);
    doc.fromHTML('<b>' + bankdate + '</b>,  <b>' + bankdetails + '</b>', 26, 115);
    doc.fromHTML('for <b>Rs.' + money + '/- ' + money2text + ' </b> towards 30% membership contribution from ' + noStd +
      ' Students. ', 26, 120);
    doc.fromHTML('Receipt No:', 35, 130);
    doc.fromHTML('Dated:', 80, 130);
    doc.fromHTML('for Rs.1, 500/- is enclosed herewith.', 120, 130);

    doc.fromHTML('So far your College has not enrolled in the youth Red Cross wing. Therefore,  I request', 35, 140);
    doc.fromHTML('you kindly to register your college by paying one-time payment of Rs.1, 500/- as per', 26, 145);
    doc.fromHTML('Government order No: ED 64/ Miscellaneous/2011 Bengaluru dtd. 22/12/2011.', 26, 150);

    doc.fromHTML('Thanking you, ', 37, 160);
    doc.fromHTML('Yours truly, ', 26 * 5.75 + 6, 170);
    doc.fromHTML('<b>General Secretary</b>', 26 * 5.75, 195);

    doc.save(clg_name + '-' + current_date + '.pdf');
  }
}
