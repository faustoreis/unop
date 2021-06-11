export function urlParams(endpointStr) {
    var parametro = endpointStr;

    if (parametro === undefined || parametro === "") return "Endpoint inválido";
    if (parametro.indexOf("?") === -1 || parametro.indexOf("=") === -1) return "Endpoint inválido";

    var arrParam = parametro.substr(parametro.indexOf('?')+1).split("&");
    var item = [];
    var valor = [];
    var jsonTxt = "";
    var finalJson = [];

    arrParam.map(elm => {
      item.push(elm.split("=")[0]);
      valor.push(elm.split("=")[1]);
      return null;
    });

    item.map((elm,idx) => {
      jsonTxt += '"'+[elm]+'":"'+ valor[idx]+'",'; 
      return null;     
    });

    jsonTxt = "{" + jsonTxt.substring(0, jsonTxt.length - 1) + "}";

    finalJson.push(item);
    finalJson.push(valor);
    finalJson.push(JSON.parse(jsonTxt));

    return finalJson;
}