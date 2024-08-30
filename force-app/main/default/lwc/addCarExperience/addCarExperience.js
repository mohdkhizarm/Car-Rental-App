import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';

//Fields
import NAME_FIELD from '@salesforce/schema/Car_Experience__c.Name';
import EXPERIENCE_FIELD from '@salesforce/schema/Car_Experience__c.Name';
import CAR_FIELD from '@salesforce/schema/Car_Experience__c.Name';
//Objects 
import EXPERIENCE_OBJECT from '@salesforce/schema/Car_Experience__c.Name';

import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class AddCarExperience extends LightningElement {
    
    expTitle = '';                                 
    expDescription = '';
    @api carId;

    handleTitleChange(event) {
        this.expTitle = event.target.value;
    }

    handleDescriptionChange(event) {
        this.expDescription = event.target.value;
    }

    addExperience() {
        const fields = {
            [NAME_FIELD.fieldApiName] : this.expTitle,
            [EXPERIENCE_FIELD.fieldApiName] : this.expDescription,
            [CAR_FIELD.fieldApiName] : this.carId,
        };

        const recordInput = { apiName: EXPERIENCE_OBJECT.objectApiName, fields };

        createRecord(recordInput).then(response => {
            this.showToast('SUCCESS', `Experience record added : ${response.id}`, 'success')
        }).catch(error => {
            this.showToast('ERROR', error.body.message, 'error')
        });
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(evt);
    }

}



