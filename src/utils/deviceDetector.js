import { UAParser } from "ua-parser-js";
export function detectDevice(userAgent=""){
 const t=new UAParser(userAgent).getDevice().type;
 return t==="mobile"?"Mobile":t==="tablet"?"Tablet":"Desktop";
}
