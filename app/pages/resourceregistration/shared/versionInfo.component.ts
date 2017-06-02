import {OnInit, Component, Injector} from "@angular/core";
import {MyGroup} from "../myform/my-group.interface";
import {Validators} from "@angular/forms";
import {EnumValues, versionTypeEnum} from "../../../domain/omtd.enum";
import {
    Description, revisionDesc, versionTypeDesc, updateFrequencyDesc,
    versionDesc
} from "../../../domain/omtd.description";
/**
 * Created by stefanos on 24/5/2017.
 */
@Component({
    selector: 'versionInfo-form',
    template : `
<accordion-group #group1 [panelClass]="'customAccordionPanel'"
                 [isOpen]="true" [panelClass]="myForm.valid ? 'panel-success' : 'panel-danger'">
    <div accordion-heading>
        <span>
            <i class="fa fa" [ngClass]="valid ? 'fa-check':'fa-exclamation'" aria-hidden="true"></i>
            {{label}}
            <i class="fa" [ngClass]="{'fa-angle-down': !group1?._isOpen, 'fa-angle-up': group1?._isOpen}" aria-hidden="true"></i>
        </span>
    </div>
    <div [formGroup]="group">
        <div class="form-group">
        
            <form-inline [description]="versionDesc" [valid]="getMyControl('version').valid">
                <input type="text" class="form-control" formControlName="version" placeholder="Version in the form of major.minor.patch">
            </form-inline>
            
            <div class="form-group-divider"></div>
            
            <form-inline [description]="versionTypeDesc">
                <select name="role" class="form-control" formControlName="versionType">
                    <option *ngFor="let value of versionType" [value]="value.key" [selected]="value.key == ''">
                    {{value.value}}
                    </option>
                </select>
            </form-inline>
            
            <div class="form-group-divider"></div>
            
            <form-inline [description]="revisionDesc">
                <textarea type="text" class="form-control" formControlName="revision" placeholder="Revision Text"></textarea>
            </form-inline>
            
            <div class="form-group-divider"></div>
            
            <form-inline [description]="updateFrequencyDesc">
                <input type="text" class="form-control" formControlName="updateFrequency" placeholder="Update Frequency">
            </form-inline>
        </div>
    </div>
</accordion-group>
`,
    styleUrls : ['./templates/common.css']
})

export class VersionFormControl extends MyGroup {

    readonly groupDefinition = {
        version : ['1.0.0', Validators.compose([Validators.required,Validators.pattern(/^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,3}$/)])],
        revision : '',
        versionType : '',
        updateFrequency : ''
    };

    private versionType :  EnumValues[] = versionTypeEnum;

    private revisionDesc : Description = revisionDesc;
    private versionTypeDesc : Description = versionTypeDesc;
    private updateFrequencyDesc : Description = updateFrequencyDesc;
    private versionDesc : Description = versionDesc;


    required = true;

    name = 'versionInfo';

    label = 'Version Info';
}