import { View } from './View'
import { Negociacoes } from '../models/index'

export class NegociacoesView extends View<Negociacoes> {

    template(negociacoes: Negociacoes): string {

        const tbody = negociacoes.toArray().map(negociacao => `
        <tr>
            <td>${negociacao.reprData} </td>
            <td> ${ negociacao.quantidade} </td>
            <td> ${ negociacao.valor} </td>
            <td> ${ negociacao.volume} </td>
        </tr>     
        `).join('')

        return `
        <table class= "table table-hover table-bordered" >
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
                ${tbody}
            </tbody>

            <tfoot >
            </tfoot>
        </table>
        <script>
            alert("oi, me remova passando escapa = true no construtor da view")
        </script>               
        `
    }
}