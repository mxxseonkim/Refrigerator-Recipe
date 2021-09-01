const getData = async dataObj => {
  console.log(dataObj.qry);
  try {
    const response = await fetch('http://3.35.18.154/phpdir/ref_get.php', {
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

const setData = async dataObj => {
  console.log(dataObj.qry);
  try {
    const response = await fetch(`http://3.35.18.154/phpdir/ref_set.php`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataObj),
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getData,
  setData,
};
