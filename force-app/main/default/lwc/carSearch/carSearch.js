import { LightningElement } from 'lwc';

export default class CarSearch extends LightningElement {
    carTypeId = '';                    // carTypeId->wrong, carTypeId=''->correct

    carTypeSelectHandler(event) {
        this.carTypeId = event.detail; // detail store carType, bcz event carry (detail: carTypeId)
        console.log("Inside Parent Handler", this.carTypeId);
    }
}


