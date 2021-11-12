//--------------- Data select - 쿼리 송신 및 json 수신 ---------------------
const getData = async dataObj => {
  try {
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

//---------------  Data Insert/Update/delete - 쿼리 송신 ------------------
const setData = async dataObj => {
  try {
    console.log(dataObj.qry);
    const response = await fetch('http://54.180.126.3/phpdir/ref_set.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataObj),
    });
  } catch (error) {
    console.error(error);
  }
};

//------------ Data select Check(True/False) - 쿼리 송신 및 json 수신 ----------
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

//--??---
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

module.exports = {
  getData,
  setData,
  overlabCheck,
  sendUserEmail,
};
