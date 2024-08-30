import { LightningElement, wire } from "lwc";
import getCarTypes from "@salesforce/apex/CarSearchFormController.getCarTypes";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";

export default class CarSearchForm extends NavigationMixin(LightningElement) {
  carTypes;

  @wire(getCarTypes)
  wiredCarTypes({ data, error }) {
    if (data) {
      this.carTypes = [{ value: '', label: 'All Types' }]; //Assigning 1st value to array, which we will use as default carType
      data.forEach((element) => {
        const carType = {}; //for object, always write const datatype o/w it will give err
        carType.value = element.Id; //(**IMP**) Value is storing ID
        carType.label = element.Name;
        this.carTypes.push(carType);
      });
    } else if (error) {
      this.showToast('ERROR', error.body.message, 'error'); //Function Call
    }
  }

  //Function Defination
  showToast(title, message, variant) {
    const evt = new ShowToastEvent({ //creating new toast event
      title: title,
      message: message,
      variant: variant
    });
    // this.dispatchEvent(some-event); is used to send/dispatch the event from the current component to other components
    this.dispatchEvent(evt); //dispatching/sending the event to salesforce for handling and perform_action->(show toast)
  }

  handleCarTypeChange(event) {
    const carTypeId = event.detail.value;
    console.log("Inside Child-1, carTypeId: ", carTypeId);
    const carTypeSelectionChangeEvent = new CustomEvent("cartypeselect", { detail: carTypeId });
    // this.dispatchEvent(some-event); is used to send/dispatch the event from the current component to other components
    this.dispatchEvent(carTypeSelectionChangeEvent); //dispatching/sending the event to parent for handling created event and perform_action->(store carTypeId)
  }

//   handleCarTypeChange(event){
//     const carTypeId = event.detail.value;

//     const carTypeSelectionChangeEvent = new CustomEvent('cartypeselect', {detail : carTypeId});
//     this.dispatchEvent(carTypeSelectionChangeEvent);
// }

  createNewCarType() {
    // Navigate to the CarType obj page to create new Car Type record
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Car_Type__c",
        actionName: "new"
      }
    });
  }
  
}

