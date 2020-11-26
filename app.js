const TMDB_ENDPOINT_BASE = 'https://api.themoviedb.org/3';
const TMDB_SITE = 'https://www.themoviedb.org/movie/'
var tz;

/* function PesquisaFilmes () {
    $.ajax({
        // Passar a URL ENDPOINT BASE + /movie/now_playing
        url: TMDB_ENDPOINT_BASE + '/configuration/timezones',
        data: {
            api_key: 'f8107df5e7f8da141cf40bc5671bdcc4',
            
        }
    })
    // Receber o JSON
    .done(function (data) {
        tz = data[31].zones
    }

} */


// Função que cria os cards dos filmes
function MostraFilmesEmCartaz () {
    //Executar requisição AJAX

    $.ajax({
        // Passar a URL ENDPOINT BASE + /movie/now_playing
        url: TMDB_ENDPOINT_BASE + '/movie/now_playing',
        data: {
            api_key: 'f8107df5e7f8da141cf40bc5671bdcc4',
            language: 'pt-BR'
        }
    })
    // Receber o JSON
    .done(function (data) {
 
        let codigo_html = '';
        
         // Montar os cards
         for (i=0; i< 12; i++) {

            // Concatenar o código do Card com os dados do JSON
            titulo = data.results[i].title;
            imagem = 'https://image.tmdb.org/t/p/w500' + data.results[i].poster_path;
            descricao = data.results[i].overview;
            descricao = descricao.substr(0, 97) + '...';
            date = data.results[i].release_date;
            site = TMDB_SITE + data.results[i].id;

            codigo_html += `<div class="single_img_destaque col-12 col-sm-12 col-md-6 col-lg-3">
            <div class="card card_destaque">
                <img src="${imagem}" class="card-img-top"
                    alt="${titulo}">
                <div class="card-body">
                    <h5 class="card-title"> ${titulo}</h5>
                    <p class = "card_date">Data: ${date}</p>
                    <p class="card-text">${descricao}</p>
                    <a href="${site}" target="_blank" class="btn btn-primary">Ver detalhes</a> 
                </div>
            </div>
        </div>`;
         }


        // Repassar os cards para a página
         $('#lista_filmes').html(codigo_html)

    });

}

function PesquisaFilmes () {
    
    $.ajax({
        // Passar a URL ENDPOINT BASE + /movie/now_playing
        url: TMDB_ENDPOINT_BASE + '/search/movie',
        data: {
            api_key: 'f8107df5e7f8da141cf40bc5671bdcc4',
            query: $(".search").val(),
            language: 'pt-BR'
        }
    })
    // Receber o JSON
    .done(function (data) {
        let codigo_html = '';
        
         // Montar os cards
         for (i=0; i< data.results.length; i++) {

            // Concatenar o código do Card com os dados do JSON
            titulo = data.results[i].title;
            imagem = 'https://image.tmdb.org/t/p/w500' + data.results[i].poster_path;
            descricao = data.results[i].overview;
            descricao = descricao.substr(0, 97) + '...';
            date = data.results[i].release_date;
            site = TMDB_SITE + data.results[i].id;

            codigo_html += `<div class="single_img_destaque col-12 col-sm-12 col-md-6 col-lg-3">
                <div class="card card_destaque">
                    <img src="${imagem}" class="card-img-top"
                        alt="${titulo}">
                    <div class="card-body">
                        <h5 class="card-title"> ${titulo}</h5>
                        <p class = "card_date">Data: ${date}</p>
                        <p class="card-text">${descricao}</p>
                        <div class="card-footer">
                            <a href="${site}" target="_blank" class="btn btn-primary">Abrir filme</a>
                        </div>
                        
                    </div>
                </div>
            </div>`;
         }

         let resultado = "Resultados para '" + $(".search").val() + "':"


        // Repassar os cards para a página
         $('#lista_filmes').html(codigo_html)
         $('.titulo_search').html(resultado)    

    });
}


$( document ).ready(function () {

    MostraFilmesEmCartaz ();

    $('.btn_Pesquisar').click(PesquisaFilmes);
});