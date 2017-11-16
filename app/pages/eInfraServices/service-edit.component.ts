/**
 * Created by pgl on 21/08/17.
 */
import {Component, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Service} from "../../domain/eic-model";
import {ResourceService} from "../../services/resource.service";
import {ServiceFormComponent} from "./service-form.component";

@Component({
    selector: "service-edit",
    templateUrl: "./service-form.component.html",
    styleUrls: ["./service-edit.component.css"]
})
export class ServiceEditComponent extends ServiceFormComponent implements OnInit {
    constructor(protected resourceService: ResourceService, protected fb: FormBuilder, private route: ActivatedRoute, protected router: Router) {
        super(resourceService, fb, router);
        this.serviceForm = this.fb.group(this.formGroupMeta);
    }

    ngOnInit() {
        super.ngOnInit();
        this.editMode = true;
        this.route.params.subscribe(this.onParams.bind(this));
    }

    onParams(params) {
        this.resourceService.getService(atob(params["id"])).subscribe(this.onService.bind(this), console.error);
    }

    toForms(service: Service) {
        let ret = {};
        for (let fieldName in service) {
            let fieldValue = service[fieldName];
            let patchedValue = [];
            if (Array.isArray(fieldValue)) {
                for (let i = 0; i < fieldValue.length; i++) {
                    patchedValue[i] = {"entry": fieldValue[i]};
                }
            } else {
                patchedValue = fieldValue;
            }
            ret[fieldName] = patchedValue;
        }
        return <Service>ret;
    }

    onService(service) {
        ResourceService.removeNulls(service);
        this.serviceForm.patchValue(this.toForms(service));
    }

    onSuccess(service) {
        this.successMessage = "Service edited successfully!";
        this.router.navigate(["/landingPage/service/" + btoa(service.id)]);
    }

    onSubmit(service: Service, isValid: boolean) {
        service.id = atob(
            decodeURIComponent(window.location.href).substr(decodeURIComponent(window.location.href).lastIndexOf(
                "/") + 1));
        super.onSubmit(service, true);
    }
}