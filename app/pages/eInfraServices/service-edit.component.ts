/**
 * Created by pgl on 21/08/17.
 */

import {Location} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Service} from "../../domain/eic-model";
import {AuthenticationService} from "../../services/authentication.service";
import {NavigationService} from "../../services/navigation.service";
import {ResourceService} from "../../services/resource.service";
import {ServiceFormComponent} from "./service-form.component";

@Component({
    selector: "service-edit",
    templateUrl: "./service-form.component.html",
    styleUrls: ["./service-edit.component.css"]
})
export class ServiceEditComponent extends ServiceFormComponent implements OnInit {
    private sub: Subscription;

    constructor(protected resourceService: ResourceService, protected fb: FormBuilder, private route: ActivatedRoute,
                protected router: NavigationService, private authenticationService: AuthenticationService,
                private location: Location) {
        super(resourceService, fb, router);
        this.editMode = true;
    }

    ngOnInit() {
        super.ngOnInit();
        this.sub = this.route.params.subscribe(params => {
            this.serviceID = atob(params["id"]);
            this.resourceService.getService(this.serviceID).subscribe(service => {
                ResourceService.removeNulls(service);
                if (service.providers.indexOf(this.authenticationService.user.email.split("@")[0]) > -1) {
                    this.serviceForm.patchValue(this.toForms(service));
                } else {
                    this.location.back();
                }
            });
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    toForms(service: Service) {
        let ret = {};
        Object.entries(service).forEach(([name, values]) => {
            let newValues = [];
            if (Array.isArray(values)) {
                values.forEach(entry => {
                    newValues.push({entry});
                });
            } else {
                newValues = values;
            }
            ret[name] = newValues;
        });
        return <Service>ret;
    }

    onSuccess(service) {
        this.successMessage = "Service edited successfully!";
        this.router.service(service.id);
    }

    onSubmit(service: Service, isValid: boolean) {
        super.onSubmit(service, isValid);
    }
}