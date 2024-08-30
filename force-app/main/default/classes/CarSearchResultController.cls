public with sharing class CarSearchResultController {
    @AuraEnabled(cacheable=true)
    public static List<Car__c> getCars( String carTypeId ) {
      if (String.isEmpty(carTypeId)) {
        //Fetching all type of cars records avaiable for rent
        return [
          SELECT Id, Name, Picture__c, Contact__r.Name, Geolocation__Latitude__s, Geolocation__Longitude__s
          FROM Car__c
          WHERE Available_For_Rent__c  = true
        ];
      } else {
        //Fetching all type of cars records avaiable for rent and have Car_Type__c matches the carTypeId(selected option in combobox)
        return [
          SELECT Id, Name, Picture__c, Contact__r.Name, Geolocation__Latitude__s, Geolocation__Longitude__s
          FROM Car__c
          WHERE Available_For_Rent__c = true AND Car_Type__c =: carTypeId  // : before carTypeId indicates carTypeId is a variable, and its value should be dynamically inserted into the SOQL query at runtime. //carTypeId is single value So use = instead of IN
        ];
      }
    } 
}
