//--------------- Data select - 쿼리 송신 및 json 수신 ---------------------
const getData = async dataObj => {
  console.log(dataObj.qry);
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
  console.log(dataObj.qry);
  try {
    const response = await fetch(`http://54.180.126.3/phpdir/ref_set.php`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataObj),
    });
  } catch (error) {
    console.error(error);
  }
};

//---------------- Data insert & Table create - 쿼리 송신 -----------------
const memberCreate = async dataObj => {
  try {
    const response = await fetch(`http://54.180.126.3/phpdir/mem_insert.php`, {
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
  console.log(dataObj.qry);
  try {
    const response = await fetch(`http://54.180.126.3/phpdir/id_check.php`, {
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

module.exports = {
  getData,
  setData,
  memberCreate,
  overlabCheck,
};
