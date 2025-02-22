// const crypto = require("crypto");
// const axios = require("axios");
import crypto from "crypto"
import axios from "axios"

// Generate MD5 hash as hex
function md5(value) {
  return crypto.createHash("md5").update(value, "utf8").digest("hex");
}

function mexc_crypto(key, obj) {
  const timestamp = String(Date.now());
  // In Python, md5(key + timestamp)[7:] takes the substring from index 7 onward.
  // We do the equivalent in JavaScript.
  const g = md5(key + timestamp).slice(7);
  // JSON.stringify produces minimal JSON when no extra parameters are passed.
  const s = JSON.stringify(obj);
  const sign = md5(timestamp + s + g);
  return { time: timestamp, sign: sign };
}

// KEY = "WEB79491cce2b958e3fd6fbc2e11d9ba78112720e1d0cd3417f5dcbafaf50a8ebf9"
export class AllApi {
  constructor() {
    this.web_key = "WEB79491cce2b958e3fd6fbc2e11d9ba78112720e1d0cd3417f5dcbafaf50a8ebf9";
    this.base_url = "https://cors-anywhere.herokuapp.com/https://futures.testnet.mexc.com/api/v1/private";
    this.base_headers = {
      // "User-Agent":
      //   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
      //   "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      Authorization: "WEB79491cce2b958e3fd6fbc2e11d9ba78112720e1d0cd3417f5dcbafaf50a8ebf9",
      Cookie: "u_id=" + "WEB79491cce2b958e3fd6fbc2e11d9ba78112720e1d0cd3417f5dcbafaf50a8ebf9",
    };
  }

  async post_order(obj) {
    // market and limit
    const signature = mexc_crypto(this.web_key, obj);
    const headers = {
      ...this.base_headers,
      "Content-Type": "application/json",
      "x-mxc-sign": signature.sign,
      "x-mxc-nonce": signature.time,
    };
    const end_point = "/order/create";
    try {
      const response = await axios.post(this.base_url + end_point, obj, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error in post_order:",
        error.message,
        error.response && error.response.data
      );
      throw error;
    }
  }

  async post_order_trigger(obj) {
    const end_point = "/planorder/place/v2";
    const signature = mexc_crypto(this.web_key, obj);
    const headers = {
      ...this.base_headers,
      "Content-Type": "application/json",
      "x-mxc-sign": signature.sign,
      "x-mxc-nonce": signature.time,
    };
    try {
      const response = await axios.post(this.base_url + end_point, obj, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error in post_order_trigger:",
        error.message,
        error.response && error.response.data
      );
      throw error;
    }
  }

  async get_open_orders_limit() {
    const end_point = "/order/list/open_orders";
    try {
      const response = await axios.get(this.base_url + end_point, {
        headers: this.base_headers,
        data: [], // note: axios uses 'data' for POST so GET requests typically don’t require it.
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error in get_open_orders_limit:",
        error.message,
        error.response && error.response.data
      );
      throw error;
    }
  }

  async get_orders_triger() {
    const end_point = "/planorder/list/orders?states=1";
    try {
      const response = await axios.get(this.base_url + end_point, {
        headers: this.base_headers,
        data: [],
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error in get_orders_triger:",
        error.message,
        error.response && error.response.data
      );
      throw error;
    }
  }

  async get_open_positions() {
    const end_point = "/position/open_positions";
    try {
      const response = await axios.get(this.base_url + end_point, {
        headers: this.base_headers,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error in get_open_positions:",
        error.message,
        error.response && error.response.data
      );
      throw error;
    }
  }

  async close_order_triger(obj) {
    const end_point = "/planorder/cancel";
    const signature = mexc_crypto(this.web_key, obj);
    const headers = {
      ...this.base_headers,
      "Content-Type": "application/json",
      "x-mxc-sign": signature.sign,
      "x-mxc-nonce": signature.time,
    };
    // In Python, the object is wrapped in a list.
    try {
      const response = await axios.post(this.base_url + end_point, [obj], {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error in close_order_triger:",
        error.message,
        error.response && error.response.data
      );
      throw error;
    }
  }

  async close_all_orders_triger(obj) {
    const end_point = "/planorder/cancel_all";
    const signature = mexc_crypto(this.web_key, obj);
    const headers = {
      ...this.base_headers,
      "Content-Type": "application/json",
      "x-mxc-sign": signature.sign,
      "x-mxc-nonce": signature.time,
    };
    // Python code sends an empty object instead.
    try {
      const response = await axios.post(
        this.base_url + end_point,
        {},
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error in close_all_orders_triger:",
        error.message,
        error.response && error.response.data
      );
      throw error;
    }
  }

  async add_ST_TP_for_limit(obj) {
    const end_point = "/stoporder/change_price";
    const signature = mexc_crypto(this.web_key, obj);
    const headers = {
      ...this.base_headers,
      "Content-Type": "application/json",
      "x-mxc-sign": signature.sign,
      "x-mxc-nonce": signature.time,
    };
    try {
      const response = await axios.post(this.base_url + end_point, obj, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error in add_ST_TP_for_limit:",
        error.message,
        error.response && error.response.data
      );
      throw error;
    }
  }

  async close_all_limits(obj) {
    const end_point = "/order/cancel_all";
    // Python code uses an empty object
    const signature = mexc_crypto(this.web_key, {});
    const headers = {
      ...this.base_headers,
      "Content-Type": "application/json",
      "x-mxc-sign": signature.sign,
      "x-mxc-nonce": signature.time,
    };
    try {
      const response = await axios.post(
        this.base_url + end_point,
        {},
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error in close_all_limits:",
        error.message,
        error.response && error.response.data
      );
      throw error;
    }
  }

  async add_margin(obj) {
    // Expected obj format: {amount: '0.5134', positionId: id, type: 'ADD'}
    const end_point = "/position/change_margin";
    // const signature = mexc_crypto(this.web_key, obj);
    const headers = {
      ...this.base_headers,
      "Content-Type": "application/json",
      // "x-mxc-sign": signature.sign,
      // "x-mxc-nonce": signature.time,
    };
    try {
      const response = await axios.post(this.base_url + end_point, obj, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error in add_margin:",
        error.message,
        error.response && error.response.data
      );
      throw error;
    }
  }
}

async function main() {
  const TOKEN =
    "WEB79491cce2b958e3fd6fbc2e11d9ba78112720e1d0cd3417f5dcbafaf50a8ebf9";
  const bot = new AllApi(TOKEN);

  // obj3 from Python code (unused in main here) is kept for reference
  const obj3 = {
    symbol: "BTC_USDT",
    leverage: 50,
    price: 98500,
    triggerType: 1,
    triggerPrice: "98900",
    side: 3,
    openType: 1,
    orderType: 5,
    trend: 1,
    vol: "49572",
    takeProfitPrice: "97902.0",
    stopLossPrice: "99409.9",
    executeCycle: 3,
    marketCeiling: false,
    positionMode: 1,
    profitTrend: "1",
    lossTrend: "1",
    priceProtect: "0",
  };

  try {
    const pos = await bot.get_open_positions();
    const marginObj = {
      amount: "500",
      positionId: "22165579",
      type: "ADD",
    };
    const result_add = await bot.add_margin(marginObj);
    console.log("result_add_margin:", pos, "//////////", result_add);
  } catch (error) {
    console.error("Error in main:", error);
  }
}
