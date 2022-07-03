function checkCashRegister(price, cash, cid) {
  const UNIT_AMOUNT = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1.0,
    "FIVE": 5.0,
    "TEN": 10.0,
    "TWENTY": 20.0,
    "ONE HUNDRED": 100.0,
  };

  let totalCID = 0;

  for (let element of cid) {
    totalCID += element[1];
  }
  // Round totalCID to 2 decimal places
  totalCID = totalCID.toFixed(2);

  let changeToGive = cash - price;

  const changeArray = [];

  if (changeToGive > totalCID) {
    return { status: "INSUFFICIENT_FUNDS", change: changeArray };
  } else if (changeToGive.toFixed(2) === totalCID) {
    return { status: "CLOSED", change: cid };
  } else {
    cid = cid.reverse();

    for (let elem of cid) {
      elem[1] = elem[1].toFixed(2);

      let holder = [elem[0], 0];
      while (changeToGive >= UNIT_AMOUNT[elem[0]] && elem[1] > 0) {
        holder[1] += UNIT_AMOUNT[elem[0]];
        elem[1] -= UNIT_AMOUNT[elem[0]];
        changeToGive -= UNIT_AMOUNT[elem[0]];
        changeToGive = changeToGive.toFixed(2);
      }
      if (holder[1] > 0) {
        changeArray.push(holder);
      }
    }
  }
  if (changeToGive > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: changeArray };
}

checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
