import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import  '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-ajax/iron-request.js';


class ServiciosApp extends PolymerElement {
    static get properties() {
        return {
            cuerpo:{
                type:Array,
                notify: true,
                value: ""
            },
            claveUsuario:{
                type:String,
                value:""
            },
            usuario:{
                type:String,
                value:""
            },
            datos:{
                type: Object,
                notify: true
            }

        }
    }

    static get template() {
        return html`

         <iron-ajax
            id="serviceMDB"
            method="post"
            url="https://artichoke.platform.bbva.com/TechArchitecture/co/grantingTicket/V02"
            body='[[cuerpo]]'
            handle-as="json"
            content-type="application/json"
            on-response="_handleResponse"
            on-error="_handlenerror">
          </iron-ajax> 


        `;
    }
    _handlenerror(e){
        console.log("",e.detail.error);
    }
    _handleResponse(e){
        console.log("",e.detail.__data.response);
        this.dispatchEvent(new CustomEvent('success-post', {detail: e.detail.__data.xhr.getResponseHeader('tsec')}));
        
    }
    tomaDatos(){
        console.log("esta construyendo");
        var datosbody = {
            authentication: {
                userID: this.datos.nombre,
                consumerID: "10000033",
                authenticationType: "02",
                authenticationData: [{
                    idAuthenticationData: "password",
                    authenticationData: [this.datos.clave]
                }]
            },
            backendUserRequest: {
                userId: "",
                accessCode: this.datos.nombre,
                dialogId: ""
            }
         };
         this.set('cuerpo',datosbody);
        }
        executeService() {
            this.$.serviceMDB.generateRequest();
        }
}

customElements.define('servicios-app', ServiciosApp);