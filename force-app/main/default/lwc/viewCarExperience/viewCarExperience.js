import { LightningElement, api, track } from 'lwc';
import getExperiences from '@salesforce/apex/ViewCarExperienceController.getExperiences';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';



export default class ViewCarExperience extends NavigationMixin(LightningElement) {

    @api carId;
    carExperiences;

    connectedCallback() {
        this.getCarExperience();
    }

    //Fetching multiple experience records of a car using carId with through Apex Method. //getRecord is used to get only one record so it is not used
    getCarExperience() {
        getExperiences({ carId: this.carId}).then((experiences) => {
            this.carExperiences = experiences;
        }).catch((error) => {
                this.showToast('ERROR', error.body.message, 'error')
        });
    }

    userClickHandler(event){
        const userId = event.target.getAttribute('data-userid');
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
              recordId: userId,
              objectApiName: "User",
              actionName: "view",
            }
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


    get hasExperiences(){
        if(this.carExperiences){
            console.log('if');
            return true;
        }
        console.log('else');

        return false;
    }
    
}