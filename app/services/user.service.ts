/**
 * Created by stefania on 8/30/16.
 */
import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {User} from "../domain/eic-model";
import {Observable} from "rxjs/Rx";
import * as util from "util";

@Injectable()
export class UserService {

    constructor(private http: Http) {
    }

    loginUser(username: string, password: string): Observable<User> {
        return this.http.post(process.env.API_ENDPOINT + "/user/login", JSON.stringify({username, password}))
            .map(res => <User> res.json())
            // .map(this.extractData)
            .catch(this.handleError);
    }

    registerUser(user: User): Observable<User> {
        let args = new RequestOptions({headers: new Headers({"Content-Type": "application/xml"})});
        let xmlFormatUser = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
            "<tns:user xmlns=\"http://einfracentral.eu\" xmlns:tns=\"http://einfracentral.eu\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://einfracentral.eu https://builds.openminted.eu/job/eic-registry-model/ws/target/generated-resources/schemagen/schema1.xsd\">";
        for (let field in user) {
            xmlFormatUser+=util.format("\n\t<%s>%s</%s>", field, user[field], field);
        }
        xmlFormatUser+="\n</tns:user>";
        console.log(xmlFormatUser);

        return this.http.post(process.env.API_ENDPOINT + "/user/add", xmlFormatUser, args)
            .map(res => <User> res.json())
            // .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}