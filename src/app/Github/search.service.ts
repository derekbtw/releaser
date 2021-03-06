import {EventEmitter, Injectable, Output} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class SearchService {
    readonly searchPath = 'https://api.github.com/search/repositories';

    @Output()
    public onComplete: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        private _http: Http
    ) {}

    search(terms): Observable<Repository[]> {
        if (!terms)
            return Observable.of<Repository[]>([]);

        const searchURL = `${this.searchPath}?q=${terms}+fork:true&sort=stars`;
        return this._http
            .get(searchURL)
            .map((response) => {
                this.onComplete.emit(response.json().items);
                return response.json().items;
            });
    }
}

export interface User {
    login: string;
    html_url: string;
    avatar_url: string;
}

export interface Repository {
    id: number;
    name: string;
    html_url: string;
    open_issues_count: number;
    stargazers_count: number;
    full_name: string;
    owner: User;
}
