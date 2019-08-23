/**
   *  Create Email Template
   *
   * @param {object} template - template object containing text(string) and html(string)
   * @param {string} link - link to embed in template
   *
   * @returns {object} returns object containing text(formatted) and html(formatted)
   *
   * @example
   *
   *    createTemplate(resetPasswordTemplate, 'www.resetpassword.com')
  */
const createTemplate = (template, link) => {
  const { text, html } = template(link);
  return { text, html };
};

export default createTemplate;
