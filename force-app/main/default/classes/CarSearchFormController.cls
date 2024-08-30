public with sharing class CarSearchFormController {
    @AuraEnabled(cacheable = true)
    public static List<Car_Type__c> getCarTypes(){
        return [SELECT Id, Name from Car_Type__c];
    }
}

