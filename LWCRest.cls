public class LWCRest {
    @AuraEnabled(Cacheable=true)
    public static String LWCRestMethod(){
        HttpRequest httpRequest = new HttpRequest();  
        httpRequest.setEndpoint('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json');
  httpRequest.setMethod('GET');
        String strResponse = null;
        try {  
          Http http = new Http();   
                HttpResponse httpResponse = http.send(httpRequest);  
                if (httpResponse.getStatusCode() == 200 ) {  
                    strResponse = httpResponse.getBody();  
                } 
                else {  
                    throw new CalloutException(httpResponse.getBody());  
                } 
             
            } 
            catch(Exception ex) {  
                throw ex;  
            } 
         if(!String.isBlank(strResponse)) {
                return strResponse;
                //return GetJSON.parse(strResponse);
            }else{
                return null;
            }
    }
}