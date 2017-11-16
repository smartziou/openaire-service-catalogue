/**
 * Created by pgl on 28/08/17.
 */
import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserService} from "../../../services/user.service";

@Component({
    selector: "dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"]
})

export class DashboardComponent implements OnInit {

    user: string = null;

    constructor(public authenticationService: AuthenticationService, public userService: UserService) {
    }

    ngOnInit() {
        this.user = this.userService.user.name;
    }
}
