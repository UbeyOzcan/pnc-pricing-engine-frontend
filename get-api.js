async function getData(product, power, vehage, drivage, bm, vhgas, area) {
  const url = `http://127.0.0.1:8080/${product}?power=${power}&VehAge=${vehage}&DrivAge=${drivage}&BonusMalus=${bm}&VehGas=${vhgas}&Area=${area}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(url);
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

getData('motor', '90', '3', '30', '0', 'Regular', 'D')