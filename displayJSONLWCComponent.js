import { LightningElement, track, wire} from 'lwc';
import LWCRestMethod from "@salesforce/apex/LWCRest.LWCRestMethod";
export default class DisplayJSONLWCComponent extends LightningElement {

    @track totalAmount = 0;
    @track totaDataLength = 0;
    @track selectedRows = 0;
    @track columns = [{
        label: 'Creditor',
        fieldName: 'creditorName',
        type: 'text'
    },
    {
        label: 'First Name',
        fieldName: 'firstName',
        type: 'text'
    },
    {
        label: 'Last Name',
        fieldName: 'lastName',
        type: 'text'
    },
    {
        label: 'Min Pay%',
        fieldName: 'minPaymentPercentage',
        type: 'percent',
        typeAttributes:{ maximumFractionDigits: 3 }
    },
    {
        label: 'Balance',
        fieldName: 'balance',
        type: 'currency'
    }
];

@track displayJsonList = [];
@wire(LWCRestMethod,{})
displayJSONResponse({data}){
  if(data){
    console.log('displayJsonList : '+data);
    this.displayJsonList = JSON.parse(data);
    for(var jsonVal in this.displayJsonList){
        this.displayJsonList[jsonVal].minPaymentPercentage = (this.displayJsonList[jsonVal].minPaymentPercentage)/100;
    }
    this.totaDataLength = this.displayJsonList.length;
  }
}

getSelectedRows(event){
    this.totalAmount = 0;
    const selectedRows = event.detail.selectedRows;
    this.selectedRows = selectedRows.length;
        for (let i = 0; i < selectedRows.length; i++){
            this.totalAmount = this.totalAmount + selectedRows[i].balance;
        }
}
addDebt(){
    let idValue = this.displayJsonList.length + 1;
    var jsonData = JSON.parse(JSON.stringify(this.displayJsonList));
    jsonData.push(
        {
            "id": idValue,
            "creditorName": "",
            "firstName": "",
            "lastName": "",
            "minPaymentPercentage": 0,
            "balance": 0

        }
    );
    this.displayJsonList = JSON.parse(JSON.stringify(jsonData));
    this.totaDataLength = this.displayJsonList.length;
}
removeDebt(){
    let rowValue = this.displayJsonList.length - 1;
    var jsonData = JSON.parse(JSON.stringify(this.displayJsonList));
    jsonData.splice(rowValue,1);
    this.displayJsonList = JSON.parse(JSON.stringify(jsonData));
    this.totaDataLength = this.displayJsonList.length;
}

}