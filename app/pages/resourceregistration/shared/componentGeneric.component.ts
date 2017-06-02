import {Component, Injector, ViewChild, ElementRef} from "@angular/core";
import {MyGroup} from "../myform/my-group.interface";
import {Validators} from "@angular/forms";
import {EnumValues, componentTypeEnum, applicationTypeEnum} from "../../../domain/omtd.enum";
import {
    Description, revisionDesc, componentTypeDesc, applicationTypeDesc,
    applicationDesc, applicationFunctionDesc
} from "../../../domain/omtd.description";
/**
 * Created by stefanos on 24/5/2017.
 */
@Component({
    selector: 'componentGeneric-form',
    template : `
<accordion-group #group1 [panelClass]="'customAccordionPanel'"
                 [isOpen]="true">
    <div accordion-heading>
        <span>
            <i class="fa fa" [ngClass]="valid ? 'fa-check':'fa-exclamation'" aria-hidden="true"></i>
            {{label}}
            <i class="fa" [ngClass]="{'fa-angle-down': !group1?._isOpen, 'fa-angle-up': group1?._isOpen}" aria-hidden="true"></i>
        </span>
    </div>
    <div [formGroup]="group">
        <!--<div formGroupName="{{name}}">-->
            
            <form-inline [description]="componentDesc" [valid]="getMyControl('componentType').valid">
                <select name="role" class="form-control" formControlName="componentType">
                    <option *ngFor="let value of componentType" [value]="value.key" [selected]="value.key == ''">
                    {{value.value}}
                    </option>
                </select>
            </form-inline>
            
            <div class="form-group-divider"></div>
            
            <form-inline [description]="applicationCDesc">
                <label class="radio-label">
                    <input type="checkbox" formControlName="application" #idapplication>
                    Check if component can be used as an integrated end-user application
                </label>
            </form-inline>
                     
            <div class="form-group-divider"></div>
            
            <form-inline [description]="applicationFunctionType"
                         [valid]="getMyControl('applicationFunction').valid" 
                         [hidden]="!idapplication.checked">
                <select name="role" class="form-control" formControlName="applicationFunction">
                    <option *ngFor="let value of applicationType" [value]="value.key" [selected]="value.key == ''">
                    {{value.value}}
                    </option>
                </select>
            </form-inline>

            <div class="form-group-divider"></div>
        
            <componentCreationInfo-form [parentGroup]="group" [required]="true"></componentCreationInfo-form>
            
        <!--</div>-->
    </div>
</accordion-group>
`,
    styleUrls : ['./templates/common.css']
})

export class ComponentGenericFormControl extends MyGroup {

    readonly groupDefinition = {
        componentType : ['', Validators.required],
        application : false,
        applicationFunction : ['', Validators.required]
    };

    @ViewChild('idapplication')  applicationCheckBoc : ElementRef;

    private componentType :  EnumValues[] = componentTypeEnum;
    private applicationType : EnumValues[] = applicationTypeEnum;
    private applicationFunctionType : Description = applicationFunctionDesc;
    private componentDesc : Description = componentTypeDesc;
    private applicationDesc : Description = applicationTypeDesc;
    private applicationCDesc : Description = applicationDesc;

    required = true;

    name = 'componentInfo';

    label = 'Component General Info';

    ngOnInit(){
        super.ngOnInit();
        this.getMyControl('application').valueChanges.subscribe(_ => {
            let applicationFunction = this.getMyControl('applicationFunction');
            if (!_) applicationFunction.disable();
            else applicationFunction.enable();
        });
        this.getMyControl('applicationFunction').disable();
    }

}