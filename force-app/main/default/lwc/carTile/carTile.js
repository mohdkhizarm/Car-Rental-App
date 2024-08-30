import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class CarTile extends LightningElement {
    @api car;           //car include all selected tile car record, this.car.id give car id of selected car
    @api carSelectedId;

    @wire(CurrentPageReference) pageRef;

    handleCarSelect(event){
        event.preventDefault();

        const carSelect = new CustomEvent('carselect', {detail:this.car.Id});
        this.dispatchEvent(carSelect);

        fireEvent(this.pageRef, 'carselect', this.car.Id);
    }

    get isCarSelected(){
        if(this.car.Id === this.carSelectedId){
            return "tile selected";
        }
        return "tile";
    }
}

