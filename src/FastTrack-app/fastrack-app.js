import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '../servicios-app.js';

/**
 * @customElement
 * @polymer
 */
class FastTrackApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <servicios-app on-success-post="_responseData" datos={{arraydatos}} id="postCard"></servicios-app>
      <h2>Hello [[prop1]]!</h2>
      <div>
      <label for="usuario">Usuario</label>
      <input id= "usuario" type="text" value="{{nombre::input}}"/>
      </div>
      <div>
      <label for="clave">Contraseña</label>
      <input id="clave" type="password" value="{{clave::input}}"/>
      </div>
      <button on-click="_boton" type="button" name="button">Enviar</button>



    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'FastTrack-app'
      },
      arraydatos:{
        type:Array,
        notify: true, 
        value: function(){
          return{
            nombre:'',
            clave:''
          }
        }
      },
      nombre:{
        type: String
      },
      clave:{
        type:String
      }
    };
  }
  _boton(e){
    this.arraydatos.nombre=this.nombre;
    this.arraydatos.clave=this.clave;
    console.log("que paso",this.arraydatos.nombre);
    this.$.postCard.tomaDatos();
    this.$.postCard.executeService();
  }
  _responseData(e){
    console.log("respuesta",e.detail);

  }
}

window.customElements.define('fastrack-app', FastTrackApp);
