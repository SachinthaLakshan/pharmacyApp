import emailjs from 'emailjs-com';

class EmailSender {
  /**
   *
   * @param tep_id: string
   * @param params: string
   *
   *
   */
  static sendEmail(tep_id, params) {
    emailjs
      .send('service_qazk93g', tep_id, params, 'user_snL2LQJwcOuIHtK6n3lnh')
      .then(
        function (response) {
          // console.log('SUCCESS!', response.status, response.text);
          return response.text;
        },
        function (error) {
          //  console.log('FAILED...', error);
          return error;
        }
      );
  }
}

export default EmailSender;
