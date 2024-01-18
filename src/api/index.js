let API_DOMAIN = '.ylands.ied.com/workshop-admin/';
if (import.meta.env.MODE === 'production') {
  API_DOMAIN = '.ylands.ied.com/workshop-admin/';
}

export const API_CODE = {
  OK:200,
  ERR_DATA:403,
  ERR_NO_DATA:301,
  ERR_LOGOUT:401,
}

export const API_FAILED = '网络连接异常，请稍后重试！';

export const apiReqs = {
  signIn: (config) => {
    let formData = config.data.value;
    config.url = 'http://' + config.data.value.serve_name + API_DOMAIN + 'api/auth/login';
    config.method = 'post';
    apiFetch(config);
  },
  // 获取数据
  getData: (config) => {
    config.url = API_DOMAIN + 'getData/';
    config.method = 'get';
    apiFetch(config);
  },
  // 委托background提交数据
  approveCreationByBackground: (config) => {
    config.background = true;
    config.url = API_DOMAIN + 'approveCreation/';
    config.method = 'post';
    apiFetch(config);
  }, 
}

function apiFetch(config) {
  if (config.background && import.meta.env.MODE === 'production') {
    sendRequestToBackground(config);
  } else {
    apiRequest(config);
  }
}

export function apiRequest(config) {
  if (config.data === undefined) {
    config.data = {};
  }

  config.method = config.method || 'post';

  let headers = {};
  let data = null;

  if (config.formData) {
    data = new FormData();
    Object.keys(config.data).forEach((key) => {
      data.append(key, config.data[key]);
    });
  }else {
    headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    data = JSON.stringify(config.data.value);
  }

  let axiosConfig = {
    method: config.method,
    headers,
    body: data,
  };

  fetch(config.url, axiosConfig).then((res) => res.json()).then((result) => {
    config.done && config.done();
    config.success && config.success(result);
  }).catch((err) => {
    config.done && config.done();
    config.fail && config.fail(API_FAILED);
  });
}

function sendRequestToBackground(config) {
  if(chrome && chrome.runtime) {
    chrome.runtime.sendMessage({contentRequest: 'apiRequest', config:config}, (result) => {
      config.done && config.done();
      if (result.result === 'succ') {
        config.success && config.success(result);
      }else {
        config.fail && config.fail(API_FAILED);
      }
    });
  }else{
    console.log('未找到chrome API');
  }
}