import isServer from './isServer';

const decodeServerSide = (html) => {
  try {
    const translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    const translate = {
      "nbsp": " ",
      "amp" : "&",
      "quot": "\"",
      "lt"  : "<",
      "gt"  : ">",
    };

    return html.replace(translate_re, function(match, entity) {
      return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
    });
  } catch(err) {
    console.error(err);
    return html;
  }
};

const decodeClientSide = (html) => {
  if (document) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
  } else {
    return html;
  }
};

export default function decodeHtml(html) {
  if (!isServer) {
    return decodeServerSide(html);
  }
  return decodeClientSide(html);
}
