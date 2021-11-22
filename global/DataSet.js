import googleVisionKey from '../googleKey/googleVisionKey.json';
import googleTranslationKey from '../googleKey/googleTranslationKey.json';

//--------------- Data select - ì¿¼ë¦¬ ?†¡?‹  ë°? json ?ˆ˜?‹  ---------------------
const getData = async dataObj => {
  try {
    //console.log(dataObj.qry);
    const response = await fetch('http://54.180.126.3/phpdir/ref_get.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataObj),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

//---------------  Data Insert/Update/delete - ì¿¼ë¦¬ ?†¡?‹  ------------------
const setData = async dataObj => {
  try {
    //console.log(dataObj.qry);
    const response = await fetch('http://54.180.126.3/phpdir/ref_set.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataObj),
    });
  } catch (error) {
    console.error(error);
  }
};

//------------ Data select Check(True/False) - ì¿¼ë¦¬ ?†¡?‹  ë°? json ?ˆ˜?‹  ----------
const overlabCheck = async dataObj => {
  try {
    const response = await fetch('http://54.180.126.3/phpdir/id_check.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataObj),
    });
    const json = await response.text();
    //console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
};

//------------ ?•„?´?”” ë°? ë¹„ë??ë²ˆí˜¸ ì°¾ê¸° ?•Œ ?´ë©”ì¼ ?†¡?ˆ˜?‹  ------------
const sendUserEmail = async dataObj => {
  try {
    const response = await fetch(
      'http://54.180.126.3/phpdir/sendEmail.php',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataObj),
      },
    );
    const json = await response.text();
    //console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
};

//------------ ?´ë¯¸ì?? ?¸?‹ ------------

const labelDetection = async (imgPath) => {
  let url = googleVisionKey.googleCloud.api + googleVisionKey.googleCloud.apiKey;
    let tmp = '';
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        requests: [
          {
            image: {
              "content": imgPath,
            },
            features: [
               { type: 'LABEL_DETECTION', maxResults: 10 },
            ],
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        tmp = data.responses[0].labelAnnotations;
      })
      .catch((err) => console.log('error : ', err));
    

    return tmp;
}


//------------ ?…?Š¤?Š¸ ?¸?‹ ------------

const textDetection = async (imgPath) => {
  let url = googleVisionKey.googleCloud.api + googleVisionKey.googleCloud.apiKey;
  let tmp = '';
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      requests: [
        {
          image: {
            "content": imgPath,
          },
          features: [
            { type: 'TEXT_DETECTION', maxResults: 5 },
          ],
        },
      ],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      tmp = data.responses[0].fullTextAnnotation.text;
    })
    .catch((err) => console.log('error : ', err));
  
  let result = tmp.split('\n');
  return result;
}




//------------ ?…?Š¤?Š¸ ë²ˆì—­ ------------

const textTranslation = async (textArr) =>{
  let result = [];
  let url = googleTranslationKey.googleTranslation.api + googleTranslationKey.googleTranslation.apiKey;
  let fromLang = 'en';
  let toLang = 'kor';

  for(let i =0 ; i<textArr.length;i++){
    let text = textArr[i].ingredient;
    url += '&q=' + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;
    await fetch(url, { 
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(res => res.json())
    .then((response) => {
      let name = response.data.translations[i].translatedText;
      let prob = textArr[i].prob;
      result.push({ingredient: name, prob: prob});

    })
    .catch(error => {
      console.log("There was an error with the translation request: ", error);
    });

  }
  return result;

  
}

module.exports = {
  getData,
  setData,
  overlabCheck,
  sendUserEmail,
  textTranslation,
  labelDetection,
  textDetection,
};
