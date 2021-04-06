import { Component } from '@angular/core';
import { Service } from '../app/service/AppService';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'AngularWithVisualCode';
  tokenUser: string = "";

  displayedColumns: string[] = ['Id', 'Nome'];
  dataSource: any;

  constructor(public AppService: Service) {
  }

  profileForm = new FormGroup({
    nome: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.GerarToken();
   } 

  GerarToken() {
    this.AppService.GerarToken().toPromise().then((res) => {
      debugger
      this.tokenUser = res;
      this.CadastrarProdutos('Humberto');
    })
  }

  Listar() {
    this.AppService.ListaProdutos(this.tokenUser)
      .toPromise()
      .then((produtos) => {
        var listaDeProdutos: any;
        listaDeProdutos = produtos;
        debugger
        this.dataSource = listaDeProdutos;
      })
      .catch((err) => {

        debugger
        var erros = err;
      });
  }  

  CadastrarProdutos(nome: any) {

    var produto =
    {
      Id: 0,
      Nome: nome,
      Imagem: ""
    };

    this.AppService.InsereProduto(produto, this.tokenUser)
      .toPromise()
      .then((okk) => {
        var ok = okk;
        this.Listar();
        //this.LimparCampos();
      })
      .catch((err) => {
        debugger
        var erros = err;
      });

  }  

  LimparCampos() {
    this.profileForm.patchValue({
      nome: '',
    });
  }  
}

