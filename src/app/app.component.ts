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
    nome: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  ngOnInit() {
    this.GerarToken();
    console.log(this.profileForm.controls.nome.errors);
  }

  onSubmit() {

    console.warn(this.profileForm.value);

    var inputNome = this.profileForm.value["nome"];
    this.CadastrarProdutos(inputNome);
  }

  GerarToken() {
    this.AppService.GerarToken().toPromise().then((res) => {
      this.tokenUser = res;
      this.Listar();
    })
  }

  Listar() {
    this.AppService.ListaProdutos(this.tokenUser)
      .toPromise()
      .then((produtos) => {
        var listaDeProdutos: any;
        listaDeProdutos = produtos;
        this.dataSource = listaDeProdutos;
      })
      .catch((err) => {
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
        this.LimparCampos();
      })
      .catch((err) => {
        var erros = err;
      });

  }

  LimparCampos() {
    this.profileForm.patchValue({
      nome: '',
    });
  }

  CarregarTela() {
    this.profileForm.patchValue({
      nome: 'Teste Campo',
    });
  }

  // Propriedades do formulário que vamos utilizar para obter os erros
  get nome() {
    return this.profileForm.get('nome');
  }
}

