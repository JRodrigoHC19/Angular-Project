# ProyectoFinal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



## URLs: 
#### /app/services/auth/login.service.ts
* URL_LOGIN
  * http://localhost:8000/api/user/login/
* URL_REGISTER
  * http://localhost:8000/api/user/register/
* URL_PROFILE
  * http://localhost:8000/api/user/profile/
* URL_CHANGE_PWD
  * http://localhost:8000/api/user/changepassword/



#### /app/services/database/database.service.ts
* URL_MESSAGES
  * http://localhost:8080/messages
* URL_USER_LIST
  * http://localhost:8080/users/
* URL_POST_CHANNEL
  * http://localhost:8080/channels/
* URL_MSG_BY_ID   ~ line 41
  * http://localhost:8080/messages/${id}
* URL_ONE_USER    ~ line 67
  * http://localhost:8080/users/search/${id}
* URL_GET_CHANNEL ~ line 74
  * http://localhost:8080/channels/search/${id}


#### /app/service/websocket/chat.service.ts
* URL_WEBSOCKET
  * ws://localhost:8040
